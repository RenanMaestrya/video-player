"use client";

import React, { useEffect, useRef, useState } from "react";

function formatTime(time: number) {
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
}

const VideoPlayer: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const handleTimeUpdate = () => setCurrentTime(video.currentTime);
    const handleLoadedMetadata = () => setDuration(video.duration);
    video.addEventListener("timeupdate", handleTimeUpdate);
    video.addEventListener("loadedmetadata", handleLoadedMetadata);
    return () => {
      video.removeEventListener("timeupdate", handleTimeUpdate);
      video.removeEventListener("loadedmetadata", handleLoadedMetadata);
    };
  }, []);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;
    if (isPlaying) {
      video.pause();
    } else {
      video.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleProgressClick = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    const bar = e.currentTarget;
    const rect = bar.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const percent = clickX / rect.width;
    const newTime = percent * duration;
    if (videoRef.current) {
      videoRef.current.currentTime = newTime;
    }
    setCurrentTime(newTime);
  };

  // Atualiza o estado de play/pause ao clicar diretamente no vídeo
  const handlePlay = () => setIsPlaying(true);
  const handlePause = () => setIsPlaying(false);

  return (
    <div className="w-full max-w-xl mx-auto bg-zinc-900 rounded-lg shadow p-4 flex flex-col gap-4 relative overflow-hidden">
      {isPlaying && (
        <video
          className="absolute inset-0 w-full h-full object-cover z-0 pointer-events-none"
          src="/synthwave-bg.mp4"
          autoPlay
          loop
          muted
          playsInline
          aria-hidden
          style={{
            filter: "blur(24px) brightness(0.6)",
            transition: "opacity 0.5s",
            opacity: 1,
          }}
        />
      )}
      <div className="relative z-10 flex flex-col gap-4">
        <video
          ref={videoRef}
          src="/video.mp4"
          className="w-full rounded-lg cursor-pointer"
          onClick={togglePlay}
          onPlay={handlePlay}
          onPause={handlePause}
        />
        <div className="flex items-center gap-4">
          <button
            onClick={togglePlay}
            className="px-4 py-2 bg-zinc-700 rounded text-white hover:bg-zinc-600 transition cursor-pointer"
            style={{ color: "white" }}
          >
            {isPlaying ? "Pause" : "Play"}
          </button>
          <span className="text-zinc-200 text-sm">
            {formatTime(currentTime)} / {formatTime(duration)}
          </span>
        </div>
        <div
          className="relative h-2 bg-zinc-700 rounded cursor-pointer"
          onClick={handleProgressClick}
        >
          <div
            className="absolute top-0 left-0 h-2 bg-blue-500 rounded"
            style={{ width: `${(currentTime / duration) * 100 || 0}%` }}
          />
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;
