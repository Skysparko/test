import { useState, useRef, TouchEvent } from "react";

const VideoZoom: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [scale, setScale] = useState<number>(1);
  const [lastTouch, setLastTouch] = useState<number>(0);
  const [translate, setTranslate] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });
  const [dragStart, setDragStart] = useState<{ x: number; y: number } | null>(
    null
  );

  const handleTouchMove = (e: TouchEvent<HTMLDivElement>) => {
    if (e.touches.length === 2) {
      // Zooming
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
    } else if (e.touches.length === 1 && dragStart) {
      // Panning
      const touch = e.touches[0];
      const deltaX = touch.pageX - dragStart.x;
      const deltaY = touch.pageY - dragStart.y;

      setTranslate((prev) => ({
        x: prev.x + deltaX,
        y: prev.y + deltaY,
      }));
      setDragStart({ x: touch.pageX, y: touch.pageY });
    }
  };

  const handleTouchStart = (e: TouchEvent<HTMLDivElement>) => {
    if (e.touches.length === 1) {
      const touch = e.touches[0];
      setDragStart({ x: touch.pageX, y: touch.pageY });
    }
  };

  const handleTouchEnd = () => {
    setLastTouch(0);
    setDragStart(null);
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
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <video
        ref={videoRef}
        controls
        style={{
          width: "300px",
          height: "300px",
          transform: `scale(${scale}) translate(${translate.x}px, ${translate.y}px)`,
          transformOrigin: "center center",
        }}
        src="/IMG_2225.MOV"
      />
    </div>
  );
};

export default VideoZoom;