type GuardOptions = {
  /** Container to observe; defaults to `document.body` */
  root?: ParentNode;
  /** Optional callback fired when tampering is detected */
  onTamper?: () => void;
};

export type GuardReturn = {
  /** Stop observing and disable protection */
  disconnect: () => void;
  /** Update the parent node where the element should be re-attached */
  setOriginalParent: (node: Node) => void;
};

/**
 * Protects a DOM element from being removed or hidden.
 *
 * This utility uses a MutationObserver to:
 *  - Re-append the element if it is deleted from the DOM
 *  - Restore visibility if hidden (e.g. `display: none`, `visibility: hidden`, `visibility: collapse`)
 *  - Optionally trigger a callback when tampering is detected
 *
 * @param elementId - The `id` of the element to guard.
 * @param opts - Optional configuration:
 *   - `root` (ParentNode): The ancestor node to observe. Defaults to `document.body`.
 *   - `onTamper` (() => void): Callback executed whenever the element is removed or hidden.
 *
 * @returns {GuardReturn} An object with control methods:
 *   - `disconnect()`: Stop observing and disable protection.
 *   - `setOriginalParent(node: Node)`: Update the parent node where the element should be re-attached if removed.
 *
 * @example
 * ```ts
 * // Protect a watermark element
 * const guard = guardElement('watermark', {
 *   onTamper: () => console.warn('Watermark tampered with! Restored automatically.'),
 * });
 *
 * // Later, when no longer needed
 * guard.disconnect();
 * ```
 *
 * @remarks
 * - Only works for elements that exist in the DOM at the time of initialization.
 * - To optimize performance, set `root` to the smallest stable container instead of defaulting to `document.body`.
 */

// Config shared by all observer.observe calls
const observerConfig: MutationObserverInit = {
  childList: true,
  subtree: true,
  attributes: true,
  attributeFilter: ['style', 'class'],
  attributeOldValue: true,
};

function guardElement(elementId: string, opts: GuardOptions = {}): GuardReturn {
  const root: ParentNode = opts.root ?? document.body;
  const el = document.getElementById(elementId);
  if (!el) throw new Error(`Element with id "${elementId}" not found`);

  // Remember the preferred parent to put it back into
  let originalParent: Node | null = el.parentNode;

  const observer = new MutationObserver((mutations) => {
    for (const m of mutations) {
      // 1) If our element was removed, put it back under its original parent
      if (m.type === 'childList' && m.removedNodes.length) {
        for (const node of Array.from(m.removedNodes)) {
          if (node === el) {
            observer.disconnect();
            (originalParent ?? root).appendChild(el);
            el.style.removeProperty('display');
            el.style.removeProperty('visibility');
            opts.onTamper?.();
            observer.observe(root, observerConfig);
            break;
          }
        }
      }

      // 2) If someone tries to hide it via style/class, revert styles
      if (m.type === 'attributes' && m.target === el) {
        const vis = el.style.visibility;
        const display = el.style.display;
        const isHidden = display === 'none' || vis === 'hidden' || vis === 'collapse';

        if (isHidden) {
          observer.disconnect();
          el.style.removeProperty('display');
          el.style.removeProperty('visibility');
          opts.onTamper?.();
          observer.observe(root, observerConfig);
        }

        const target = m.target as HTMLElement;
        const parentElement = target.parentElement;
        // if the attributes of the target element is changed, remove the target element and will fall back to above logic to re-add it
        parentElement?.removeChild(target);
      }
    }
  });

  observer.observe(root, observerConfig);

  return {
    disconnect: () => observer.disconnect(),
    setOriginalParent: (node: Node) => (originalParent = node),
  };
}

export default guardElement;
