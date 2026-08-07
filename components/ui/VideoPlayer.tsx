"use client";

import { useEffect, useRef, useState } from "react";

export interface VideoPlayerProps {
  videoSrc?: string;
  posterSrc?: string;
  title: string;
}

function PlayIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
      <path d="M8 5.14v13.72a1 1 0 0 0 1.5.86l11-6.86a1 1 0 0 0 0-1.72l-11-6.86a1 1 0 0 0-1.5.86Z" />
    </svg>
  );
}

function PauseIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
      <rect x="6" y="5" width="4" height="14" rx="1" />
      <rect x="14" y="5" width="4" height="14" rx="1" />
    </svg>
  );
}

function VolumeIcon({ muted }: { muted: boolean }) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <path d="M4 9v6h4l5 4V5L8 9H4Z" fill="white" />
      {!muted && (
        <path
          d="M16.5 8.5a5 5 0 0 1 0 7"
          stroke="white"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      )}
      {muted && (
        <path
          d="M15 9l5 6M20 9l-5 6"
          stroke="white"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      )}
    </svg>
  );
}

function FullscreenIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <path
        d="M8 4H4v4M16 4h4v4M8 20H4v-4M16 20h4v-4"
        stroke="white"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function formatTime(seconds: number): string {
  if (!isFinite(seconds) || seconds < 0) return "00:00";
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
}

export default function VideoPlayer({ videoSrc, posterSrc, title }: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const onPlay = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);
    const onTimeUpdate = () => setCurrentTime(video.currentTime);
    const onLoadedMetadata = () => setDuration(video.duration);

    video.addEventListener("play", onPlay);
    video.addEventListener("pause", onPause);
    video.addEventListener("timeupdate", onTimeUpdate);
    video.addEventListener("loadedmetadata", onLoadedMetadata);

    return () => {
      video.removeEventListener("play", onPlay);
      video.removeEventListener("pause", onPause);
      video.removeEventListener("timeupdate", onTimeUpdate);
      video.removeEventListener("loadedmetadata", onLoadedMetadata);
    };
  }, []);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      video.play();
    } else {
      video.pause();
    }
  };

  const seekTo = (clientX: number) => {
    const video = videoRef.current;
    const bar = progressBarRef.current;
    if (!video || !bar || !duration) return;
    const rect = bar.getBoundingClientRect();
    const ratio = Math.min(1, Math.max(0, (clientX - rect.left) / rect.width));
    video.currentTime = ratio * duration;
  };

  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = !video.muted;
    setIsMuted(video.muted);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const video = videoRef.current;
    const value = Number(e.target.value);
    setVolume(value);
    if (video) {
      video.volume = value;
      video.muted = value === 0;
      setIsMuted(value === 0);
    }
  };

  const toggleFullscreen = () => {
    const container = containerRef.current;
    if (!container) return;
    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      container.requestFullscreen();
    }
  };

  const progressPercent = duration ? (currentTime / duration) * 100 : 0;

  return (
    <div
      ref={containerRef}
      className="relative aspect-video overflow-hidden rounded-2xl bg-gradient-to-br from-brand-900 via-slate-700 to-brand-900 shadow-2xl"
    >
      <video
        ref={videoRef}
        src={videoSrc}
        poster={posterSrc}
        className="h-full w-full object-cover"
        playsInline
      >
        <track kind="captions" />
      </video>

      <button
        type="button"
        aria-label={isPlaying ? "Pause video" : "Play video"}
        onClick={togglePlay}
        className="absolute inset-0 flex items-center justify-center"
      >
        <span className="flex h-14 w-14 items-center justify-center rounded-full border border-white/30 bg-black/30 pl-0.5 backdrop-blur-sm transition-transform hover:scale-105">
          {isPlaying ? <PauseIcon /> : <PlayIcon />}
        </span>
      </button>

      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent px-4 pb-4 pt-10">
        <div className="flex items-center gap-3 text-xs text-white/80">
          <span>{formatTime(currentTime)}</span>
          <div
            ref={progressBarRef}
            onClick={(e) => seekTo(e.clientX)}
            className="relative h-1 flex-1 cursor-pointer rounded-full bg-white/20"
          >
            <div
              className="absolute inset-y-0 left-0 rounded-full bg-white"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <span>{formatTime(duration)}</span>
        </div>

        <div className="mt-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              type="button"
              aria-label={isPlaying ? "Pause" : "Play"}
              onClick={togglePlay}
              className="flex h-7 w-7 items-center justify-center rounded-full border border-white/30"
            >
              {isPlaying ? <PauseIcon /> : <PlayIcon />}
            </button>
            <button type="button" aria-label={isMuted ? "Unmute" : "Mute"} onClick={toggleMute}>
              <VolumeIcon muted={isMuted} />
            </button>
            <input
              type="range"
              min={0}
              max={1}
              step={0.01}
              value={isMuted ? 0 : volume}
              onChange={handleVolumeChange}
              aria-label="Volume"
              className="h-1 w-14 accent-white"
            />
          </div>

          <button
            type="button"
            aria-label="Toggle fullscreen"
            onClick={toggleFullscreen}
            className="flex h-7 w-7 items-center justify-center rounded-full border border-white/30"
          >
            <FullscreenIcon />
          </button>
        </div>
      </div>

      <span className="sr-only">{title}</span>
    </div>
  );
}
