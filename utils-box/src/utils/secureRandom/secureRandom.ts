/**
 * Generates a cryptographically secure random number.
 *
 * - No arguments: Returns a float in [0, 1), similar to Math.random().
 * - With `min` and `max`: Returns a random number in [min, max).
 * - If `integer` is true or both `min` and `max` are integers, returns an integer in [ceil(min), floor(max)].
 *
 * @param min - Lower bound (inclusive). Defaults to 0.
 * @param max - Upper bound (exclusive for floats, inclusive for integers). Defaults to Number.MAX_SAFE_INTEGER.
 * @param integer - If true, always returns an integer. Defaults to false.
 * @returns A cryptographically secure random number within the specified range.
 *
 * @example
 * secureRandom()
 * // => an integer number between 0 and Number.MAX_SAFE_INTEGER
 *
 * secureRandom(1, 20)
 * // => an integer number between 1 and 20
 *
 * secureRandom(1, 2.7)
 * // => a floating-point number between 1 and 2.7 (
 *
 * secureRandom(0.1, 7)
 * // => a floating-point number between 0.1 and 7
 *
 * secureRandom(0.1, 7.9, true)
 * // => an integer number between 1 and 7
 *
 * secureRandom(-Infinity, Infinity)
 * // => an integer number between 0 and Number.MAX_SAFE_INTEGER
 */

const secureRandom = (min: number = 0, max: number = Number.MAX_SAFE_INTEGER, integer?: boolean): number => {
  // Ensure `range.min` is finite; if not (e.g. -Infinity)
  // Fall back to 0. Instead of Number.MIN_SAFE_INTEGER, to avoid negative number.
  let minValue = Number.isFinite(min) ? min : 0;
  //Ensure `range.max` is finite; if not (e.g. Infinity), fall back to the highest safe integer.
  // Number.MIN_SAFE_INTEGER
  let maxValue = Number.isFinite(max) ? max : Number.MAX_SAFE_INTEGER;

  // Revert min and max if min > max
  if (minValue >= maxValue) {
    let tempNum: number = minValue;
    minValue = maxValue;
    maxValue = tempNum;
  }

  // Decide if result should be integer
  let isInteger: boolean;
  if (integer) {
    isInteger = true;
  } else if (maxValue % 1 === 0 && minValue % 1 === 0) {
    isInteger = true;
  } else {
    isInteger = false;
  }
  // Generate a random float in [0, 1)
  const array = new Uint32Array(1);
  crypto.getRandomValues(array);
  //Note - In this case, Uint32Array always has a fixed length and always returns a number.
  const rand = array[0]! / (0xFFFFFFFF + 1);

  /**
   * Scale `rand` to the desired range, and return.
   * If `integer` is true, round down to the nearest integer.
   * Else, return a float.
   *
   * Use Math.ceil for minValue and Math.floor for maxValue to ensure the range includes only integers
   * between the smallest integer >= min and the largest integer <= max, even if min/max are floats.
   */
  if (isInteger) {
    // Use Math.ceil for min and Math.floor for max to ensure integer bounds
    const intMin = Math.ceil(minValue);
    const intMax = Math.floor(maxValue);
    return Math.floor(rand * (intMax - intMin + 1)) + intMin;
  } else {
    // Return float in [min, max)
    return rand * (maxValue - minValue) + minValue;
  }

};

export default secureRandom;