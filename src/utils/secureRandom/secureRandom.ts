import type { SecureRandomOptions } from './secureRandom.types';

/**
 * Generates a cryptographically secure random number.
 *
 * - No arguments: Returns an **integer** in [0, Number.MAX_SAFE_INTEGER].
 * - With `min` and `max`: Returns a random number in [min, max] (inclusive if integer, half-open if float).
 * - If `integer` is true, result is an integer in [ceil(min), floor(max)].
 *
 * @returns A cryptographically secure random number within the specified range.
 *
 * @example
 * secureRandom()
 * // => integer between 0 and Number.MAX_SAFE_INTEGER
 *
 * secureRandom(1, 20)
 * // => integer between 1 and 20
 *
 * secureRandom(1, 2.7)
 * // => float in [1, 2.7)
 *
 * secureRandom(0.1, 7.9, true)
 * // => integer between 1 and 7
 * @param options
 */
export function secureRandom(options?: SecureRandomOptions): number;
export function secureRandom(min?: number, max?: number, integer?: boolean): number;
export function secureRandom(a?: number | SecureRandomOptions, b?: number, c?: boolean): number {
  // Resolve inputs (support both options-object and positional forms)
  let min = 0;
  let max = Number.MAX_SAFE_INTEGER;
  let integer = false;

  if (typeof a === 'object' && a !== null) {
    ({ min = 0, max = Number.MAX_SAFE_INTEGER, integer = false } = a);
  } else {
    if (typeof a === 'number') min = a;
    if (typeof b === 'number') max = b;
    if (typeof c === 'boolean') integer = c;
  }

  // Clamp infinities / non-finite
  const minFinite = Number.isFinite(min) ? min : 0;
  const maxFinite = Number.isFinite(max) ? max : Number.MAX_SAFE_INTEGER;

  // Swap if reversed
  let lo = minFinite;
  let hi = maxFinite;
  if (lo > hi) [lo, hi] = [hi, lo];

  // Determine integer vs float: explicit flag wins; otherwise integer if both bounds are integers
  const isInteger = integer || (Number.isInteger(lo) && Number.isInteger(hi));

  // If integer mode but there are no integers in the range, fail early
  if (isInteger) {
    const intMin = Math.ceil(lo);
    const intMax = Math.floor(hi);
    if (intMin > intMax) {
      throw new RangeError(
        `secureRandom: no integers in range [${lo}, ${hi}] while "integer: true"`
      );
    }
  }

  // Require Web Crypto
  const cryptoObj = globalThis.crypto;
  if (!cryptoObj?.getRandomValues) {
    throw new Error(
      'secureRandom requires Web Crypto API (crypto.getRandomValues). Use a modern browser or Node >= 20.'
    );
  }

  // Uniform float in [0, 1)
  const buf = new Uint32Array(1);
  cryptoObj.getRandomValues(buf);
  const u = buf[0]! / (0xffffffff + 1);

  if (isInteger) {
    const intMin = Math.ceil(lo);
    const intMax = Math.floor(hi);
    // integer uniform in [intMin, intMax]
    return Math.floor(u * (intMax - intMin + 1)) + intMin;
  }

  // float in [lo, hi)
  return u * (hi - lo) + lo;
}

export default secureRandom;
