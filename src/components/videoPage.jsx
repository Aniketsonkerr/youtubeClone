import { useParams } from "react-router-dom";
import { useEffect, useState, useMemo } from "react";
import Video from "./Video";
import axios from "axios";
import { Link } from "react-router-dom";

function VideoPage() {
  const { id } = useParams(); // Video ID
  const [videos, setVideos] = useState([]);
  const [comments, setComments] = useState([]); // Store comments
  const [newComment, setNewComment] = useState(""); // Input for a new comment
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch videos and comments
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // Fetch video details
        const videoResponse = await axios.get(
          "http://localhost:3000/api/videos"
        );
        setVideos(videoResponse.data);

        // Fetch comments for the current video
        const commentResponse = await axios.get(
          `http://localhost:3000/api/comments/${id}`
        );
        setComments(commentResponse.data.comments || []);

        setLoading(false);
      } catch (err) {
        setError(err.message || "An error occurred");
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  // Find the current video based on the ID
  const currentVideo = useMemo(() => {
    return videos.find((video) => video._id === id) || null;
  }, [videos, id]);

  // Add a new comment
  const handleAddComment = async () => {
    if (!newComment.trim()) return;

    try {
      const response = await axios.post("http://localhost:3000/api/comment", {
        user: currentVideo.uploader, // Replace with actual user ID
        video: id,
        message: newComment,
      });
      setComments((prevComments) => [...prevComments, response.data.message]);
      setNewComment("");
    } catch (err) {
      console.error("Error adding comment:", err.message);
    }
  };

  // Delete a comment
  const handleDeleteComment = async (commentId) => {
    try {
      await axios.delete(`http://localhost:3000/api/comment/${commentId}`);
      setComments((prevComments) =>
        prevComments.filter((comment) => comment._id !== commentId)
      );
    } catch (err) {
      console.error("Error deleting comment:", err.message);
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p className="text-red-500">Error: {error}</p>;
  }

  if (!currentVideo) {
    return <p className="text-gray-600">Video not found.</p>;
  }

  return (
    <div className="flex flex-row justify-center items-start container mx-auto my-8 px-4">
      <div className="flex-1 mt-4">
        <Link to={`/channel/${currentVideo.channelId}`}>
          <h1 className="text-2xl font-bold text-gray-800">
            {currentVideo.title}
          </h1>
          <Video video={currentVideo} />
          <p className="text-gray-600 mt-4">{currentVideo.description}</p>
        </Link>

        {/* Comment Section */}
        <div className="mt-6">
          <h2 className="text-lg font-semibold text-gray-700 mb-4">Comments</h2>

          {/* Comment Input */}
          <div className="flex items-center gap-2 mb-4">
            <input
              type="text"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Write a comment..."
              className="flex-1 p-2 border border-gray-300 rounded"
            />
            <button
              onClick={handleAddComment}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Add
            </button>
          </div>

          {/* Comment List */}
          {comments.length > 0 ? (
            <ul className="space-y-4">
              {comments.map((comment) => (
                <li
                  key={comment._id}
                  className="flex justify-between items-start bg-gray-100 p-3 rounded"
                >
                  <div>
                    <p className="text-sm text-gray-800">{comment.message}</p>
                    <p className="text-xs text-gray-500 mt-1">
                      {comment.user} •{" "}
                      {new Date(comment.createdAt).toLocaleString()}
                    </p>
                  </div>
                  <button
                    onClick={() => handleDeleteComment(comment._id)}
                    className="text-red-500 text-sm hover:underline"
                  >
                    Delete
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">
              No comments yet. Be the first to comment!
            </p>
          )}
        </div>
      </div>

      {/* Other Videos */}
      <div className="w-1/3 ml-4 mt-4">
        <h2 className="text-lg font-semibold text-gray-700 mb-4">
          Other Videos
        </h2>
        <div className="flex flex-col gap-4  h-full justify-around ">
          {videos
            .filter((video) => video._id !== id)
            .map((video) => (
              <div key={video._id} className="flex items-center gap-2 ">
                <Link to={`/video/${video._id}`}>
                  <div className="flex flex-row">
                    <img
                      src={video.thumbnailUrl}
                      alt={video.title}
                      className="size-40 w-3/4 object-cover rounded"
                    />
                    <p className="text-sm text-gray-800">{video.title}</p>
                  </div>
                </Link>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default VideoPage;
