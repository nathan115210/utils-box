/**
 * Protects a DOM element from being removed or hidden.
 *
 * Uses a MutationObserver to:
 *  - Re-append the element if it is removed from the DOM
 *  - Restore visibility if hidden (e.g. display:none / visibility:hidden/collapse)
 *  - Optionally trigger a callback when tampering is detected
 *
 * @param elementId - The `id` of the element to guard.
 * @param opts - Optional configuration:
 *   - `root` (ParentNode): Ancestor node to observe. Defaults to `document.body`.
 *   - `onTamper` (() => void): Called whenever the element is restored/unhidden.
 *
 * @returns {GuardReturn} Control methods:
 *   - `disconnect()`: Stop observing and disable protection.
 *   - `setOriginalParent(node: Node)`: Update the parent used when re-attaching.
 *
 * @remarks
 * - The element must exist in the DOM when the guard starts.
 * - For performance, set `root` to the smallest stable container instead of `document.body`.
 */
import type { GuardOptions, GuardReturn } from './guardElement.types';

// Shared observer config
const observerConfig: MutationObserverInit = {
  childList: true,
  subtree: true,
  attributes: true,
  attributeFilter: ['style', 'class'],
};

export function guardElement(elementId: string, opts: GuardOptions = {}): GuardReturn {
  // Ensure a Node for observe(); ParentNode alone isn't assignable in TS
  const root = (opts.root ?? document.body) as unknown as Node;

  const el = document.getElementById(elementId);
  if (!el) throw new Error(`Element with id "${elementId}" not found`);

  // Record baseline (visible) styles to restore against class-based hiding
  const cs = getComputedStyle(el);
  const initialDisplay = cs.display;
  const initialVisibility = cs.visibility;

  // Preferred parent for re-attachment
  let originalParent: Node | null = el.parentNode;

  const observer = new MutationObserver((mutations) => {
    for (const m of mutations) {
      // 1) If our element was removed, put it back under its original parent
      if (m.type === 'childList' && m.removedNodes.length) {
        for (const node of Array.from(m.removedNodes)) {
          if (node === el) {
            observer.disconnect();
            (originalParent ?? root).appendChild(el);

            // Restore visibility (override any class-based hiding)
            el.style.setProperty('display', initialDisplay, 'important');
            el.style.setProperty('visibility', initialVisibility, 'important');

            opts.onTamper?.();
            observer.observe(root, observerConfig);
            break;
          }
        }
      }

      // 2) If someone tries to hide it via style/class, revert to baseline
      if (m.type === 'attributes' && m.target === el) {
        const now = getComputedStyle(el);
        const hidden =
          now.display === 'none' || now.visibility === 'hidden' || now.visibility === 'collapse';

        if (hidden) {
          observer.disconnect();
          el.style.setProperty('display', initialDisplay, 'important');
          el.style.setProperty('visibility', initialVisibility, 'important');
          opts.onTamper?.();
          observer.observe(root, observerConfig);
        }
      }
    }
  });

  observer.observe(root, observerConfig);

  return {
    disconnect() {
      observer.disconnect();
    },
    setOriginalParent(node: Node) {
      originalParent = node;
    },
  };
}

export default guardElement;
