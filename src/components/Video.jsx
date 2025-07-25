import React, { useRef, useState ,useEffect} from "react";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import {
  AiOutlineLike,
  AiOutlineDownload,
  AiOutlineShareAlt,
  AiOutlineEllipsis,
} from "react-icons/ai";


dayjs.extend(relativeTime);

function Video({ video }) {
  const [expanded, setExpanded] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasSentView, setHasSentView] = useState(false);
  const videoRef = useRef(null);
  const descriptionMaxChars = 140;
  const [uploader, setUploader] = useState(null);
  
  useEffect(() => {
  const fetchUploader = async () => {
    try {
      const res = await fetch(`http://localhost:3000/api/user/${video.uploader}`);
      const data = await res.json();
      setUploader(data.username); // assuming API returns `{ username, email, ... }`
    } catch (err) {
      console.error("Failed to load uploader info:", err);
    }
  };

  if (video.uploader && typeof video.uploader === "string") {
    fetchUploader();
  }
}, [video.uploader]);

  const channel = video.channel || {};
  const viewsText =
    video.views && video.views >= 1000
      ? `${(video.views / 1000).toFixed(1)}K`
      : `${video.views || 0}`;

  const hashtags = video.hashtags || [];

  // Handle view tracking
  const handleView = async () => {
    if (hasSentView) return;
    try {
      await fetch(`http://localhost:3000/api/video/${video._id}/view`, {
        method: "POST",
      });
      setHasSentView(true);
    } catch (err) {
      console.error("Error tracking view:", err);
    }
  };

  const handleEnded = () => {
    setIsPlaying(false);
    setHasSentView(false);
  };

  return (
    <div className="bg-white  max-w-3xl  text-gray-800">
      {/* Video Player */}
      <video
        ref={videoRef}
        className="w-full rounded-lg shadow-sm"
        controls
        preload="metadata"
        poster={
          video.thumbnailUrl?.startsWith("http")
            ? video.thumbnailUrl
            : "https://via.placeholder.com/320x180?text=Preview"
        }
        onPlay={handleView}
        onEnded={handleEnded}
      >
        <source src={video.videoLink} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Title */}
      <h1 className="text-xl md:text-2xl font-bold mt-4">{video.title}</h1>

      {/* Channel Info */}
      <div className="flex flex-row items-center justify-between mt-4 mb-4">
        <div className="flex items-center gap-3">
          <img
            src={channel.avatar || "https://via.placeholder.com/40"}
            alt={channel.channelName}
            className="w-10 h-10 rounded-full object-cover"
          />
          <div className="flex flex-col">
  <Link to={`/channel/${video.channelId || video.uploader}`}>
    <span className="font-semibold">
      {channel.channelName || uploader || "Creator"}
    </span>
  </Link>
  <span className="text-sm text-gray-500">
    {channel.subscribers ? `${channel.subscribers} subscribers` : ""}
  </span>
</div>

        </div>
        <div className="flex items-center gap-2">
          <button className="px-4 py-2 rounded-full bg-blue-600 text-white font-medium hover:bg-blue-700">
            Join
          </button>
          <button className="px-4 py-2 rounded-full bg-gray-100 text-gray-900 font-medium hover:bg-gray-200">
            Subscribe
          </button>
        </div>
      </div>

      {/* Actions Row */}
      <div className="flex flex-row gap-3 mb-4 text-sm">
        <button className="flex items-center gap-1 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-full">
          <AiOutlineLike className="text-lg text-gray-800" />
          {video.likes || 0}
        </button>
        <button className="flex items-center gap-1 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-full">
          <AiOutlineShareAlt className="text-lg text-gray-800" />
          Share
        </button>
        <button className="flex items-center gap-1 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-full">
          <AiOutlineDownload className="text-lg text-gray-800" />
          Download
        </button>
        <button className="flex items-center px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded-full">
          <AiOutlineEllipsis className="text-lg text-gray-800" />
        </button>
      </div>

      {/* Metadata */}
      <div className="flex flex-wrap text-gray-600 text-sm gap-2 mb-2">
        <span>{viewsText} views</span>
        <span>•</span>
        <span>{dayjs(video.uploadDate).fromNow()}</span>
        {hashtags.map((hash, index) => (
          <span key={index} className="text-blue-600">#{hash}</span>
        ))}
      </div>

      {/* Description */}
      <div className="bg-gray-100 p-4 rounded-md text-sm leading-relaxed whitespace-pre-line">
        {expanded || video.description.length <= descriptionMaxChars
          ? video.description
          : video.description.slice(0, descriptionMaxChars) + "... "}
        {video.description.length > descriptionMaxChars && (
          <button
            onClick={() => setExpanded((prev) => !prev)}
            className="text-blue-500 ml-2"
          >
            {expanded ? "show less" : "more"}
          </button>
        )}
      </div>
    </div>
  );
}

export default Video;
