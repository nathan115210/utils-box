import { describe, it, expect } from 'vitest';
import secureRandom from './secureRandom';

describe('secureRandom', () => {
  it('SHOULD return an integer number between 0 and Number.MAX_SAFE_INTEGER by default', () => {
    const result = secureRandom();
    expect(result).toBeGreaterThanOrEqual(0);
    expect(result).toBeLessThanOrEqual(Number.MAX_SAFE_INTEGER);
    expect(Number.isInteger(result)).toBe(true);
  });

  it('SHOULD return integer in [min, max] if both are integers', () => {
    for (let i = 0; i < 10; i++) {
      const result = secureRandom(1, 20);
      expect(result).toBeGreaterThanOrEqual(1);
      expect(result).toBeLessThanOrEqual(20);
      expect(Number.isInteger(result)).toBe(true);
    }
  });

  it('SHOULD return floating-point number in [min, max] if max is floating-number', () => {
    for (let i = 0; i < 10; i++) {
      const result = secureRandom(1, 7.7);
      expect(result).toBeGreaterThanOrEqual(1);
      expect(result).toBeLessThan(7.7);
      expect(Number.isInteger(result)).toBe(false);
    }
  });

  it('SHOULD return floating-point number in [min, max] if min is floating-number', () => {
    for (let i = 0; i < 10; i++) {
      const result = secureRandom(0.1, 7);
      expect(result).toBeGreaterThanOrEqual(0.1);
      expect(result).toBeLessThan(7);
      expect(Number.isInteger(result)).toBe(false);
    }
  });

  it('SHOULD return integer in [ceil(min), floor(max)] if integer=true', () => {
    for (let i = 0; i < 10; i++) {
      const value = secureRandom(0.1, 7.9, true);
      expect(Number.isInteger(value)).toBe(true);
      expect(value).toBeGreaterThanOrEqual(1);
      expect(value).toBeLessThanOrEqual(7);
    }
  });

  it('SHOULD RETURN integer number in [0, Number.MAX_SAFE_INTEGER] when min and max set as -Infinity and Infinity', () => {
    for (let i = 0; i < 10; i++) {
      const value = secureRandom(-Infinity, Infinity);
      expect(Number.isInteger(value)).toBe(true);
      expect(value).toBeGreaterThanOrEqual(0);
      expect(value).toBeLessThanOrEqual(Number.MAX_SAFE_INTEGER);
    }
  });

  it('SHOULD handle min > max by swapping values', () => {
    for (let i = 0; i < 10; i++) {
      const value = secureRandom(10, 5);
      expect(value).toBeGreaterThanOrEqual(5);
      expect(value).toBeLessThanOrEqual(10);
    }
  });

  it('SHOULD handle min === max by return min value', () => {
    for (let i = 0; i < 10; i++) {
      const value = secureRandom(5, 5);
      expect(value).equal(5);
    }
  });
});
