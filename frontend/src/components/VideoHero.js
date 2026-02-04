import React, { useRef, useState, useEffect } from 'react';

const VideoHero = ({ src = '/videos/GiniVideo1.mp4' }) => {
  const videoRef = useRef(null);
  const [muted, setMuted] = useState(true);
  const [playing, setPlaying] = useState(true);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = muted;
      // try autoplay
      const p = videoRef.current.play();
      if (p && p.catch) p.catch(() => {});
    }
  }, [muted]);

  const toggleMute = () => {
    setMuted((m) => !m);
  };

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play();
      setPlaying(true);
    } else {
      videoRef.current.pause();
      setPlaying(false);
    }
  };

  return (
    <div className="video-hero">
      <video
        ref={videoRef}
        src={src}
        loop
        playsInline
        autoPlay
        muted={muted}
        controls={false}
        className="video-hero-video"
      />

      <div className="video-hero-overlay">
        <button className="mute-btn" onClick={toggleMute} aria-label="Toggle mute">
          {muted ? '🔇 Unmute' : '🔊 Mute'}
        </button>
        <button className="play-btn" onClick={togglePlay} aria-label="Play/Pause">
          {playing ? '⏸ Pause' : '▶️ Play'}
        </button>
      </div>
    </div>
  );
};

export default VideoHero;
