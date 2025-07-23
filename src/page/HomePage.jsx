import { useContext, useState, useEffect, useMemo } from "react";
import { AppContext } from "../utils/appContext";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { useInView } from "react-intersection-observer";

dayjs.extend(relativeTime); // For "x hours ago"

function HomePage() {
  const { searchedVideo } = useContext(AppContext);
  const [videos, setVideos] = useState([]);
  const [limit] = useState(9);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [selectedGenre, setSelectedGenre] = useState("All");

  const { ref, inView } = useInView(); // 👁️ used for infinite scroll

  // Fetch videos from API
 useEffect(() => {
  let ignore = false;

  const loadVideos = async () => {
    if (!hasMore || loading) return;
    setLoading(true);
    try {
      const genreQuery =
        selectedGenre && selectedGenre !== "All"
          ? `&genre=${encodeURIComponent(selectedGenre)}`
          : "";

      const response = await fetch(
        `http://localhost:3000/api/videos?page=${page}&limit=${limit}${genreQuery}`
      );

      if (!response.ok) throw new Error("Failed to load videos");

      const result = await response.json();
      const newVideos = result.videos || [];
      if (page === 1) {
  setVideos(newVideos);
} else {
  setVideos((prev) => [...prev, ...newVideos]);
}


      if (!ignore) {
        setVideos((prev) =>
          page === 1 ? newVideos : [...prev, ...newVideos]
        );

        if (newVideos.length < limit) setHasMore(false);
      }
    } catch (err) {
      if (!ignore) console.error("Error loading videos:", err);
    } finally {
      if (!ignore) setLoading(false);
    }
  };

  loadVideos();
  return () => {
    ignore = true;
  };
}, [page, selectedGenre]);


  // Infinite scroll: Increment page when in view
  useEffect(() => {
    if (inView && hasMore && !loading) {
      setPage((prev) => prev + 1);
    }
  }, [inView, hasMore, loading]);

  // Genre list generation
  const genres = useMemo(() => {
    const set = new Set(["All"]);
    videos.forEach((video) =>
      video.genres?.forEach((genre) => set.add(genre))
    );
    return Array.from(set);
  }, [videos]);

  // Filtered videos based on title and genre
  const filteredVideos = useMemo(() => {
    return [...videos]
      .filter((video) => {
        const matchTitle = video.title
          .toLowerCase()
          .includes(searchedVideo.toLowerCase());
        const matchGenre =
          selectedGenre === "All" ||
          (video.genres && video.genres.includes(selectedGenre));
        return matchTitle && matchGenre;
      })
      .sort(
        (a, b) =>
          new Date(b.uploadDate || b.createdAt) -
          new Date(a.uploadDate || a.createdAt)
      );
  }, [searchedVideo, selectedGenre, videos]);

  const formatViews = (views) => {
    if (views >= 1_000_000) return `${(views / 1_000_000).toFixed(1)}M`;
    if (views >= 1_000) return `${(views / 1_000).toFixed(1)}K`;
    return views || 0;
  };

  return (
    <>
      {/* Genres Filter */}
      <div className="flex flex-wrap justify-center gap-2 py-4 px-3">
        {genres.map((genre) => (
          <button
            key={genre}
            className={`px-4 py-2 rounded-full text-sm font-medium ${
              selectedGenre === genre
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
            onClick={() => {
              setVideos([]);     // reset videos when changing genre
              setPage(1);        // reset pagination
              setHasMore(true);  // allow new scroll
              setSelectedGenre(genre);
            }}
          >
            {genre}
          </button>
        ))}
      </div>

      {/* Videos Grid */}
      <div className="grid gap-6 px-4 sm:grid-cols-2 md:grid-cols-3">
        {filteredVideos.map((video) => (
          <div
            key={video._id}
            className="bg-white rounded shadow-sm hover:shadow-md transition"
          >
            <Link to={`/video/${video._id}`}>
              <img
                src={
                  video.thumbnailUrl?.startsWith("http")
                    ? video.thumbnailUrl
                    : "https://via.placeholder.com/300x180?text=No+Thumbnail"
                }
                alt={video.title}
                loading="lazy"
                className="w-full h-auto object-cover max-h-[200px]"
              />
            </Link>

            <div className="p-3 space-y-1">
              <h2 className="text-md font-semibold">{video.title}</h2>
              <p className="text-sm text-gray-600">
                {video.uploader?.username || "Unknown Creator"}
              </p>
              <p className="text-xs text-gray-500">
                {formatViews(video.views)} views •{" "}
                {dayjs(video.uploadDate).fromNow()}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Infinite Scroll Trigger */}
      {hasMore && (
        <div ref={ref} className="text-center py-6">
          {loading ? (
            <p className="text-sm text-gray-500">Loading more...</p>
          ) : (
            <p className="text-sm text-gray-400">Scroll to load more</p>
          )}
        </div>
      )}
    </>
  );
}

export default HomePage;
