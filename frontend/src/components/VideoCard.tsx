import React, { useState, useRef } from 'react';
import VideoPlayer from 'react-video-js-player';
import 'video.js/dist/video-js.css';
import { Video } from '../services/videoService';

interface VideoCardProps {
  video: Video;
}

const VideoCard: React.FC<VideoCardProps> = ({ video }) => {
  const [resolution, setResolution] = useState<"720p" | "1080p">("1080p");

  const playerRef = useRef<any>(null);


  const onPlayerReady = (player: any) => {
    playerRef.current = player;
  };

  /**
   * Handles resolution changes.
   * It captures the current playback time, switches the source URL,
   * and then seeks to the previous time so that the viewing experience is seamless.
   */
  const handleResolutionChange = (res: "720p" | "1080p") => {
    if (resolution !== res && playerRef.current) {
      // Capture current playback time
      const currentTime = playerRef.current.currentTime();
      // Choose the new source based on selected resolution
      const newSrc = res === "720p" ? video.cloudinary720pUrl : video.cloudinary1080pUrl;
      // Update the player's source with the new URL
      playerRef.current.src({ type: 'video/mp4', src: newSrc });
      // Seek to the previous playback time
      playerRef.current.currentTime(currentTime);
      // Update state so the UI reflects the active resolution
      setResolution(res);
    }
  };

  return (
    <div className="w-[300px] h-[500px] border border-gray-300 m-2 rounded-lg overflow-hidden relative bg-black">
      {/* 
        The VideoPlayer component automatically initializes video.js.
        The src prop is set based on the current resolution.
      */}
      <VideoPlayer
        src={resolution === "720p" ? video.cloudinary720pUrl : video.cloudinary1080pUrl}
        poster={'https://via.placeholder.com/300x500?text=Video+Poster'}
        controls={true}
        width="300"
        height="500"
        onReady={onPlayerReady}
      />
      {/* Overlay for the video title */}
      <div className="absolute bottom-0 left-0 bg-black bg-opacity-60 text-white w-full p-2 text-center">
        {video.title}
      </div>
      {/* Resolution control buttons */}
      <div className="absolute top-2 right-2 flex space-x-2">
        <button
          onClick={() => handleResolutionChange("1080p")}
          className={`px-2 py-1 rounded ${resolution === "1080p" ? "bg-blue-600" : "bg-gray-600"}`}
        >
          1080p
        </button>
        <button
          onClick={() => handleResolutionChange("720p")}
          className={`px-2 py-1 rounded ${resolution === "720p" ? "bg-blue-600" : "bg-gray-600"}`}
        >
          720p
        </button>
      </div>
    </div>
  );
};

export default VideoCard;
