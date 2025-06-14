'use client';

import React, { useRef, useEffect } from 'react';
import { usePictureInPicture } from '../../../../utils-box/src/react/usePictureInPicture/usePictureInPicture';

export default function VideoPlayer() {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const { status, togglePictureInPicture } = usePictureInPicture(videoRef);
  const { isSupported, isActive, isReady } = status;
  return (
    <div>
      <video ref={videoRef} src="https://www.w3schools.com/html/mov_bbb.mp4" controls width={'100%'}
      />
      <button
        disabled={!isSupported || !isReady}
        onClick={togglePictureInPicture}
        className={`mt-2 border p-2 rounded  ${!isSupported || !isReady ? 'bg-gray-300 cursor-not-allowed' : 'bg-blue-500 text-white hover:bg-blue-600'}`}
      >
        {isActive ? 'Picture-InPicture Off' : 'Picture-InPicture On'}
      </button>
    </div>
  );
}