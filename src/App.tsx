import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import { useRef } from "react";

const VideoZoom = () => {
  const videoRef = useRef(null);
  const [scale, setScale] = useState(1);
  const [lastTouch, setLastTouch] = useState(0);

  const handleTouchMove = (e:any) => {
    if (e.touches.length === 2) {
      const [touch1, touch2] = e.touches;
      const currentDistance = Math.sqrt(
        Math.pow(touch2.pageX - touch1.pageX, 2) +
          Math.pow(touch2.pageY - touch1.pageY, 2)
      );

      if (lastTouch) {
        const lastDistance = lastTouch;
        const scaleChange = currentDistance / lastDistance;

        setScale((prev) => Math.min(Math.max(prev * scaleChange, 1), 3));
      }

      setLastTouch(currentDistance);
    }
  };

  const handleTouchEnd = () => {
    setLastTouch(0);
  };

  return (
    <div
      style={{
        touchAction: "none",
        overflow: "hidden",
        position: "relative",
        width: "100%",
        height: "auto",
      }}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <video
        ref={videoRef}
        controls
        style={{
          width: "300px",
          height: "300px",
          transform: `scale(${scale})`,
          transformOrigin: "center center",
        }}
        src="/IMG_2225.MOV"
      />
    </div>
  );
};

export default VideoZoom;


