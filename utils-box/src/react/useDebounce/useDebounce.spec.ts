import { describe, vi, it, expect } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import useDebounce from './useDebounce';

vi.useFakeTimers();

describe('useDebounce', () => {
  it('delays value update', () => {
    const { result, rerender } = renderHook(({ value, delay }) => useDebounce(value, delay), {
      initialProps: { value: 'hello', delay: 500 },
    });

    expect(result.current).toBe('hello');

    rerender({ value: 'world', delay: 500 });
    expect(result.current).toBe('hello');

    act(() => {
      vi.advanceTimersByTime(500);
    });

    expect(result.current).toBe('world');
  });
});
