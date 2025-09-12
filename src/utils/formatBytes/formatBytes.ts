import type { FormatBytesTypes } from './formatBytes.types';

/**
 * Human-readable bytes formatter.
 *
 * Overloads:
 *  - formatBytes({ bytes, decimals? })
 *  - formatBytes(bytes, decimals?)
 */
export function formatBytes(bytes: number, decimals?: number): string;
export function formatBytes(options: FormatBytesTypes): string;
export function formatBytes(arg1: number | FormatBytesTypes, decimals?: number): string {
  const bytes = typeof arg1 === 'number' ? arg1 : arg1.bytes;
  const dm = typeof arg1 === 'number' ? (decimals ?? 2) : (arg1.decimals ?? 2);

  if (bytes === 0) return '0 Bytes';

  const k = 1024;
  const fixed = dm < 0 ? 0 : dm;

  // Extend units a bit to avoid overflow; clamp index safely
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB'];
  const i = Math.min(Math.floor(Math.log(bytes) / Math.log(k)), sizes.length - 1);

  const value = bytes / Math.pow(k, i);
  return `${parseFloat(value.toFixed(fixed))} ${sizes[i]}`;
}

export default formatBytes;
