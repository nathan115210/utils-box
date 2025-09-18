import { useCallback, useEffect, useState, type RefObject } from 'react';

export function usePictureInPicture(videoRef: RefObject<HTMLVideoElement | null>) {
  const [isSupported, setIsSupported] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    setIsSupported(document.pictureInPictureEnabled);

    const video = videoRef.current;
    if (!video) return;

    // Check if metadata is already loaded
    if (video.readyState >= 1) {
      setIsReady(true);
    } else {
      const handleLoadedMetadata = () => setIsReady(true);
      video.addEventListener('loadedmetadata', handleLoadedMetadata);
      return () => {
        video.removeEventListener('loadedmetadata', handleLoadedMetadata);
      };
    }
  }, [videoRef]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleEnter = () => setIsActive(true);
    const handleLeave = () => setIsActive(false);

    video.addEventListener('enterpictureinpicture', handleEnter);
    video.addEventListener('leavepictureinpicture', handleLeave);

    return () => {
      video.removeEventListener('enterpictureinpicture', handleEnter);
      video.removeEventListener('leavepictureinpicture', handleLeave);
    };
  }, [videoRef]);

  const toggle = useCallback(async () => {
    const video = videoRef.current;
    if (!video || !document.pictureInPictureEnabled) return;

    try {
      if (document.pictureInPictureElement !== video) {
        await video.requestPictureInPicture();
      } else {
        await document.exitPictureInPicture();
      }
    } catch (err) {
      console.error('Picture-in-Picture toggle failed:', err);
    }
  }, [videoRef]);

  return {
    status: {
      isSupported,
      isActive,
      isReady,
    },
    togglePictureInPicture: toggle,
  };
}

export default usePictureInPicture;
