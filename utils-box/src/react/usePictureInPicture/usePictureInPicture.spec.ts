import { describe, vi, it, expect, beforeAll, afterAll, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import usePictureInPicture from './usePictureInPicture';

describe('usePictureInPicture', () => {
  let originalPictureInPictureEnabled: boolean;
  let mockVideoElement: HTMLVideoElement;

  beforeAll(() => {
    // Backup the original value
    originalPictureInPictureEnabled = (document as any).pictureInPictureEnabled;
    (document as any).pictureInPictureEnabled = true;

    // Mock document.pictureInPictureElement and methods
    (document as any).pictureInPictureElement = null;
    (document as any).exitPictureInPicture = vi.fn().mockResolvedValue(undefined);
  });

  afterAll(() => {
    (document as any).pictureInPictureEnabled = originalPictureInPictureEnabled;
  });

  beforeEach(() => {
    mockVideoElement = document.createElement('video');
    Object.defineProperty(mockVideoElement, 'readyState', { value: 4, writable: false });
    mockVideoElement.requestPictureInPicture = vi.fn().mockResolvedValue(undefined);
  });

  it('should set isSupported and isReady initially if video is already loaded', () => {
    const ref = { current: mockVideoElement };
    const { result } = renderHook(() => usePictureInPicture(ref));

    expect(result.current.status.isSupported).toBe(true);
    expect(result.current.status.isReady).toBe(true);
    expect(result.current.status.isActive).toBe(false);
  });

  it('should toggle Picture-in-Picture on and off', async () => {
    const ref = { current: mockVideoElement };
    const { result } = renderHook(() => usePictureInPicture(ref));

    await act(async () => {
      await result.current.togglePictureInPicture();
    });

    expect(mockVideoElement.requestPictureInPicture).toHaveBeenCalled();
  });

  it('should respond to enter and leave events', () => {
    const ref = { current: mockVideoElement };
    const { result } = renderHook(() => usePictureInPicture(ref));

    act(() => {
      mockVideoElement.dispatchEvent(new Event('enterpictureinpicture'));
    });
    expect(result.current.status.isActive).toBe(true);

    act(() => {
      mockVideoElement.dispatchEvent(new Event('leavepictureinpicture'));
    });
    expect(result.current.status.isActive).toBe(false);
  });
});
