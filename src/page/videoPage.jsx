import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Video from "../components/Video";
import axios from "axios";

function VideoPage() {
  const { id } = useParams(); // Video ID from URL
  const [video, setVideo] = useState(null);
  const [relatedVideos, setRelatedVideos] = useState([]);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Adjust base API URL as needed
  const API_BASE = "http://localhost:3000";


  useEffect(() => {
    const fetchVideoAndComments = async () => {
      setLoading(true);
      setError(null);
      try {
        // 1. Fetch current video details by ID
        const { data: videoData } = await axios.get(`${API_BASE}/api/video/${id}`);
        setVideo(videoData);

        // 2. Fetch comments for this video
       const res = await axios.get(`${API_BASE}/api/comments/${id}`);
setComments(res.data.comments || []);


        // 3. Optionally fetch related videos (e.g. same genre, or uploader)
        const { data: allVideosData } = await axios.get(`${API_BASE}/api/videos?limit=10`);
        // Filter out the current video from related list
        setRelatedVideos(allVideosData.videos.filter((v) => v._id !== id));
      } catch (err) {
        setError(err.response?.data?.message || err.message || "Failed to load video");
      } finally {
        setLoading(false);
      }
    };

    fetchVideoAndComments();
  }, [id]);

  const handleAddComment = async () => {
    if (!newComment.trim()) return alert("Comment cannot be empty.");

    try {
      // Replace 'user' with actual logged-in user id from context or auth middleware
      const userId = "REPLACE_WITH_LOGGED_IN_USER_ID";

      const { data } = await axios.post(`${API_BASE}/api/comment`, {
        user: userId,
        video: id,
        message: newComment.trim(),
      });

      // Append new comment to existing comments
      setComments((prev) => [...prev, data.message]);
      setNewComment("");
    } catch (error) {
      console.error("Error adding comment:", error);
      alert("Failed to add comment.");
    }
  };

  const handleDeleteComment = async (commentId) => {
    if (!window.confirm("Are you sure you want to delete this comment?")) return;

    try {
      await axios.delete(`${API_BASE}/api/comment/${commentId}`);
      setComments((prev) => prev.filter((c) => c._id !== commentId));
    } catch (error) {
      console.error("Error deleting comment:", error);
      alert("Failed to delete comment.");
    }
  };

  if (loading) return <p>Loading video...</p>;
  if (error) return <p className="text-red-600">Error: {error}</p>;
  if (!video) return <p>Video not found.</p>;

  return (
    <div className="container mx-auto flex flex-col md:flex-row gap-8 px-4 my-8">
      {/* Main Video Section */}
      <main className="flex-1">
        <Link to={`/channel/${video.channelId}`}>

          <h1 className="text-3xl font-bold mb-4">{video.title}</h1>
        </Link>

        <Video video={video} />


        {/* Comments Section */}
        <section className="mt-8">
          <h2 className="text-xl font-semibold mb-4">Comments</h2>

          <div className="flex gap-2 mb-6">
            <input
              type="text"
              className="flex-1 border border-gray-300 rounded px-3 py-2"
              placeholder="Write a comment..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
            />
            <button
              onClick={handleAddComment}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Add
            </button>
          </div>

          {comments.length > 0 ? (
            <ul className="space-y-4">
              {comments.map((comment) => (
                <li
                  key={comment._id}
                  className="bg-gray-100 p-4 rounded flex justify-between items-start"
                >
                  <div>
                    <p className="text-gray-800">{comment.message}</p>
                    <p className="text-xs text-gray-500 mt-1">
                      {comment.uploader?.username || comment.user || "Unknown user"} •{" "}
                      {new Date(comment.createdAt).toLocaleString()}
                    </p>
                  </div>

                  <button
                    onClick={() => handleDeleteComment(comment._id)}
                    className="text-red-600 hover:underline text-sm"
                  >
                    Delete
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-600">No comments yet. Be the first to comment!</p>
          )}
        </section>
      </main>

      {/* Related Videos Sidebar */}
      <aside className="w-full md:w-1/3 space-y-4">
        <h2 className="text-xl font-semibold mb-4">Other Videos</h2>
        {relatedVideos.length > 0 ? (
          relatedVideos.map((vid) => (
            <Link
              key={vid._id}
              to={`/video/${vid._id}`}
              className="flex items-center gap-3 hover:bg-gray-100 p-2 rounded"
            >
              <img
                src={vid.thumbnailUrl || "https://via.placeholder.com/120x90"}
                alt={vid.title}
                className="w-28 h-20 object-cover rounded"
              />
              <div className="text-sm font-semibold text-gray-900">{vid.title}</div>
            </Link>
          ))
        ) : (
          <p>No other videos available.</p>
        )}
      </aside>
    </div>
  );
}

export default VideoPage;
