import { describe, expect, it } from 'vitest';
import formatBytes from './formatBytes';

describe('formatBytes', () => {
  it('formats bytes correctly', () => {
    expect(formatBytes(0)).toBe('0 Bytes');
    expect(formatBytes(1024)).toBe('1 KB');
    expect(formatBytes(1048576)).toBe('1 MB');
    expect(formatBytes(123456789)).toBe('117.74 MB');
  });
});
