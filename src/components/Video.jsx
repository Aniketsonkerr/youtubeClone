import React, { useRef } from "react";

function Video({ video }) {
  const videoRef = useRef(null);

  const handlePlayPause = () => {
    if (videoRef.current.paused) {
      videoRef.current.play();
    } else {
      videoRef.current.pause();
    }
  };

  return (
    <div className="video-container">
      {/* Video Element */}
      <video
        ref={videoRef}
        className="w-full rounded-lg shadow-md"
        controls
        preload="metadata"
        poster={video.thumbnailUrl} // Show thumbnail if video is not playing
      >
        <source src={video.videoLink} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Video Details */}
      <div className="video-details mt-2">
        <h1 className="text-lg font-semibold text-gray-800">{video.title}</h1>
        <p className="text-sm text-gray-600">{video.description}</p>
        <div className="flex items-center justify-between text-sm text-gray-500 mt-1">
          <span>{video.views} views</span>
          <span>{video.uploadDate}</span>
        </div>
      </div>

      {/* Play/Pause Button (Optional) */}
      <button
        onClick={handlePlayPause}
        className="mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Play/Pause
      </button>
    </div>
  );
}

export default Video;
