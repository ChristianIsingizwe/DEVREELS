// src/components/VideoCard.tsx
import React, { useState, useRef } from 'react';
import VideoPlayer from 'react-video-js-player';
import 'video.js/dist/video-js.css';
import { Video } from '../interfaces/VideoInterfaces';

import Player from 'video.js/dist/types/player';

interface VideoCardProps {
  video: Video;
}

const VideoCard: React.FC<VideoCardProps> = ({ video }) => {
  const [quality, setQuality] = useState<'1080p' | '720p'>('1080p');
  const playerRef = useRef<Player | null>(null);

  const handlePlayerReady = (player: Player) => {
    playerRef.current = player;
  };

  const handleQualityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newQuality = e.target.value as '1080p' | '720p';
    if (newQuality === quality || !playerRef.current) return;

    const player = playerRef.current;
    const currentTime = player.currentTime();
    const wasPlaying = !player.paused();
    const newSrc =
      newQuality === '1080p'
        ? video.cloudinary1080Url
        : video.cloudinary720Url;

    player.src({ type: 'video/mp4', src: newSrc });
    player.one('loadedmetadata', () => {
      player.currentTime(currentTime);
      if (wasPlaying) {
        player.play();
      }
    });
    setQuality(newQuality);
  };

  const initialSrc =
    quality === '1080p' ? video.cloudinary1080Url : video.cloudinary720Url;

  return (
    <div className="video-card" style={{ marginBottom: '2rem' }}>
      <h3>{video.title}</h3>
      <p>{video.description}</p>
      <div style={{ marginBottom: '0.5rem' }}>
        <label htmlFor={`quality-select-${video.id}`}>Quality: </label>
        <select
          id={`quality-select-${video.id}`}
          value={quality}
          onChange={handleQualityChange}
        >
          <option value="1080p">1080p</option>
          <option value="720p">720p</option>
        </select>
      </div>
      <VideoPlayer
        controls
        src={initialSrc}
        width="720"
        height="420"
        onReady={handlePlayerReady}
      />
    </div>
  );
};

export default VideoCard;
