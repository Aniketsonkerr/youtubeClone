import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { AppContext } from "../utils/appContext";

function Channel({ currentChannel }) {
  const { user } = useContext(AppContext); // user._id expected from context
  const [videos, setVideos] = useState([]);
  const [editingVideoId, setEditingVideoId] = useState(null);
  const [editDetails, setEditDetails] = useState({});

  // Ensured owner ObjectId string match
  const ownerId =
    typeof currentChannel.owner === "string"
      ? currentChannel.owner
      : currentChannel.owner?._id || currentChannel.owner?.toString();

  const isOwner = user && user._id === ownerId;

  // Only fetch videos listed in currentChannel.videos (each should be string or ObjectId)
  useEffect(() => {
    async function fetchChannelVideos() {
      if (!currentChannel?.videos?.length) {
        setVideos([]);
        return;
      }
      try {
        // Each channel video is expected to be string ObjectId; fallback to ._id if object
        const promises = currentChannel.videos.map((vid) => {
          const videoId = typeof vid === "string" ? vid : vid._id;
          return axios
            .get(`http://localhost:3000/api/video/${videoId}`)
            .then((res) => res.data);
        });
        const results = await Promise.all(promises);
        setVideos(results);
      } catch (error) {
        console.error("Error loading channel videos:", error);
        setVideos([]);
      }
    }
    fetchChannelVideos();
  }, [currentChannel]);

  const handleEditClick = (video) => {
    setEditingVideoId(video._id);
    setEditDetails({ title: video.title });
  };

  const handleEditSave = async (videoId) => {
    try {
      const response = await axios.put(
        `http://localhost:3000/api/video/${videoId}`,
        editDetails,
        {
          headers: { Authorization: `Bearer ${user.token}` }
        }
      );

      setVideos((prevVideos) =>
        prevVideos.map((video) =>
          video._id === videoId ? { ...video, ...response.data } : video
        )
      );

      setEditingVideoId(null);
      setEditDetails({});
      alert("Video updated successfully!");
    } catch (error) {
      console.error("Error updating video:", error);
      alert("Failed to update the video.");
    }
  };

  const handleDeleteVideo = async (videoId) => {
    try {
      await axios.delete(`http://localhost:3000/api/video/${videoId}`, {
        headers: { Authorization: `Bearer ${user.token}` }
      });

      setVideos((prevVideos) =>
        prevVideos.filter((video) => video._id !== videoId)
      );

      alert("Video deleted successfully!");
    } catch (error) {
      console.error("Error deleting video:", error);
      alert("Failed to delete the video.");
    }
  };

  if (!currentChannel) {
    return <p className="text-gray-500">No channel selected.</p>;
  }

  return (
    <div className="container mx-auto p-4 bg-white rounded-lg shadow-md">
      <div className="w-full h-60 mb-4 overflow-hidden rounded-lg">
        <img
          src={currentChannel.channelBanner}
          alt={`${currentChannel.channelName} Banner`}
          className="w-full h-full object-cover"
        />
      </div>
      <h1 className="text-3xl font-bold text-gray-800 mb-2">
        {currentChannel.channelName}
      </h1>
      <p className="text-gray-600 mb-4">{currentChannel.description}</p>
      <p className="text-sm text-gray-500 mb-4">
        Subscribers: <strong>{currentChannel.subscribers}</strong>
      </p>

      <h2 className="text-2xl font-semibold text-gray-700 mb-2">Videos</h2>
      {videos.length > 0 ? (
        <div className="flex flex-wrap">
          {videos.map((video) => (
            <div
              key={video._id}
              className="bg-white hover:scale-105 rounded hover:shadow transition-all duration-300 ease-in-out mr-3 mb-3 p-2"
            >
              <Link to={`/video/${video._id}`}>
                <div className="w-full relative">
                  <img
                    src={video.thumbnailUrl}
                    alt={video.title}
                    className="rounded-md hover:rounded-none"
                  />
                </div>
              </Link>
              <div className="mx-1 my-2">
                <div className="flex flex-row justify-start items-center">
                  <img
                    src={video.avatar || "https://via.placeholder.com/50"}
                    alt="uploader"
                    className="w-10 rounded-full h-10 mr-2"
                  />
                  <div className="flex flex-col">
                    {editingVideoId === video._id ? (
                      <>
                        <input
                          type="text"
                          value={editDetails.title || ""}
                          onChange={(e) =>
                            setEditDetails((prev) => ({
                              ...prev,
                              title: e.target.value,
                            }))
                          }
                          className="border border-gray-300 rounded p-1 mb-2"
                        />
                        <button
                          onClick={() => handleEditSave(video._id)}
                          className="text-green-500 hover:underline"
                        >
                          Save
                        </button>
                        <button
                          onClick={() => setEditingVideoId(null)}
                          className="text-gray-500 hover:underline ml-2"
                        >
                          Cancel
                        </button>
                      </>
                    ) : (
                      <>
                        <h1 className="font-semibold">{video.title}</h1>
                        <p className="text-slate-500">
                          {currentChannel.channelName}
                        </p>
                        <p className="text-slate-500">
                          {video.views} views • {video.uploadDate}
                        </p>
                      </>
                    )}
                  </div>
                </div>
              </div>
              {isOwner && (
                <div className="flex justify-between items-center mt-2 px-2">
                  {editingVideoId !== video._id && (
                    <>
                      <button
                        onClick={() => handleEditClick(video)}
                        className="text-blue-500 hover:underline"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteVideo(video._id)}
                        className="text-red-500 hover:underline"
                      >
                        Delete
                      </button>
                    </>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500">No videos uploaded yet.</p>
      )}

    </div>
  );
}

export default Channel;
