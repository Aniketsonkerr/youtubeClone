import { useContext, useState, useEffect, useMemo, useCallback } from "react";
import { AppContext } from "../utils/appContext";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { useInView } from "react-intersection-observer";

dayjs.extend(relativeTime);

function HomePage() {
  const { searchedVideo } = useContext(AppContext);
  const [videos, setVideos] = useState([]);
  const [limit] = useState(1000); // Increased limit to load many videos at once
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [selectedGenre, setSelectedGenre] = useState("All");
  const [channels, setChannels] = useState({});

  const { ref, inView } = useInView();

  // Fetch videos only once or on page change
  useEffect(() => {
    let ignore = false;

    const loadVideos = async () => {
      if (loading) return;
      if (!hasMore) return;

      setLoading(true);
      try {
        const response = await fetch(
          `http://localhost:3000/api/videos?page=${page}&limit=${limit}`
        );

        if (!response.ok) throw new Error("Failed to load videos");

        const result = await response.json();
        const newVideos = result.videos || [];
        console.log("Fetched videos:", newVideos.length);
        if (!ignore) {
          setVideos((prev) => [...prev, ...newVideos]);

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
  }, [page]);

  // Infinite Scroll - load more videos when in view
  useEffect(() => {
    if (inView && hasMore && !loading) {
      setPage((prev) => prev + 1);
    }
  }, [inView, hasMore, loading]);

  // Extract unique channel IDs from videos
  const uniqueChannelIds = useMemo(() => {
    const ids = new Set();
    videos.forEach((video) => {
      if (video.channelId) ids.add(video.channelId);
    });
    return Array.from(ids);
  }, [videos]);

  // Fetch channel data for unique channel IDs
  useEffect(() => {
    const fetchChannels = async () => {
      try {
        const promises = uniqueChannelIds.map((id) =>
          fetch(`http://localhost:3000/api/channel/${id}`).then((res) => {
            if (!res.ok) throw new Error("Failed to fetch channel");
            return res.json();
          })
        );

        const results = await Promise.all(promises);
        const channelsMap = {};
        results.forEach((channel) => {
          channelsMap[channel._id] = channel.channelName;
        });
        setChannels(channelsMap);
      } catch (err) {
        console.error("Error fetching channels:", err);
      }
    };

    if (uniqueChannelIds.length > 0) {
      fetchChannels();
    }
  }, [uniqueChannelIds]);

  // Generate genres from the full videos list for static slider
  const genres = useMemo(() => {
    const set = new Set(["All"]);
    videos.forEach((video) =>
      video.genres?.forEach((genre) => set.add(genre))
    );
    return Array.from(set);
  }, [videos]);

  // Filter videos in UI based on selectedGenre and searchedVideo
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

  const handleGenreChange = useCallback((genre) => {
    setSelectedGenre(genre);
  }, []);

  const formatViews = (views) => {
    if (views >= 1_000_000) return `${(views / 1_000_000).toFixed(1)}M`;
    if (views >= 1_000) return `${(views / 1_000).toFixed(1)}K`;
    return views || 0;
  };

  return (
    <>
      {/* Static Genres Slider */}
      <div className="flex flex-wrap justify-center gap-2 py-4 px-3">
        {genres.map((genre) => (
          <button
            key={genre}
            className={`px-4 py-2 rounded-full text-sm font-medium ${
              selectedGenre === genre
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
            onClick={() => handleGenreChange(genre)}
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
                {channels[video.channelId] || "Unknown Channel"}
              </p>
              <p className="text-xs text-gray-500">
                {formatViews(video.views)} views • {dayjs(video.uploadDate).fromNow()}
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
