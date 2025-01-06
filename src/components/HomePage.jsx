import { useContext, useState, useEffect, useMemo } from "react";
import { AppContext } from "../utils/appContext";
import useFetch from "../utils/useFetch";
import { Link } from "react-router-dom";

function HomePage() {
  const { searchedVideo } = useContext(AppContext); // Access search input from AppContext
  const [videos, setVideos] = useState([]); // All videos from the API
  const [selectedGenre, setSelectedGenre] = useState("All"); // Currently selected genre

  const { data, error, loading } = useFetch("http://localhost:3000/api/videos"); // Fetch videos

  // Set videos when data is fetched
  useEffect(() => {
    if (data) {
      setVideos(data);
    }
  }, [data]);

  // Extract genres dynamically from the video data
  const genres = useMemo(() => {
    if (!data) return ["All"];
    const extractedGenres = new Set(["All"]); // Start with "All"
    data.forEach((video) => {
      if (video.genres && Array.isArray(video.genres)) {
        video.genres.forEach((genre) => extractedGenres.add(genre));
      }
    });
    return Array.from(extractedGenres); // Convert Set to Array
  }, [data]);

  // Dynamically filter videos based on search input and selected genre
  const filteredVideos = useMemo(() => {
    return videos.filter((video) => {
      const matchesTitle = video.title
        .toLowerCase()
        .includes(searchedVideo.toLowerCase());
      const matchesGenre =
        selectedGenre === "All" || video.genres.includes(selectedGenre);
      return matchesTitle && matchesGenre;
    });
  }, [searchedVideo, selectedGenre, videos]);

  if (loading) return <p>Loading videos...</p>;
  if (error)
    return <p className="text-red-500">Error loading videos: {error}</p>;

  return (
    <>
      {/* Genres Filter */}
      <div className="flex justify-center overflow-x-auto gap-4 py-2 px-4 rounded-md mb-4 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200">
        {genres.map((genre) => (
          <button
            key={genre}
            className={`px-4 py-2 rounded-full text-sm font-medium ${
              selectedGenre === genre
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
            onClick={() => setSelectedGenre(genre)}
          >
            {genre}
          </button>
        ))}
      </div>

      {/* Videos Grid */}
      <div className="grid grid-cols-3 mt-5 gap-4 justify-items-center mx-2">
        {filteredVideos.length > 0 ? (
          filteredVideos.map((video) => (
            <div
              key={video._id}
              className="bg-white hover:scale-105 rounded hover:shadow transition-all duration-300 ease-in-out"
            >
              <div className="w-full relative">
                <Link to={`/video/${video._id}`}>
                  <img
                    src={video.thumbnailUrl}
                    alt={video.title}
                    className="rounded-md hover:rounded-none"
                  />
                </Link>
              </div>
              <div className="mx-1 my-2">
                <div className="flex flex-row justify-start items-center">
                  <img
                    src={
                      video.uploaderAvatar || "https://via.placeholder.com/40"
                    }
                    alt="uploader"
                    className="w-10 rounded-full h-10 mr-2 mb-7"
                  />
                  <div className="flex flex-col">
                    <Link to={`/channel/${video.channelId}`}>
                      <h1 className="font-semibold">{video.title}</h1>
                      <p className="text-slate-500">{video.uploader}</p>
                      <p className="text-slate-500">
                        {video.views} views • {video.uploadDate}
                      </p>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No videos available</p>
        )}
      </div>
    </>
  );
}

export default HomePage;
