import { useParams } from "react-router-dom";
import useFetch from "../utils/useFetch";
import Channel from "../components/Channel";

function ChannelPage() {
  const { id } = useParams();

  // ✅ Fetch only the single channel for this ID
  const { data: currentChannel, error, loading } = useFetch(
    `http://localhost:3000/api/channel/${id}`
  );

  if (loading) return <p>Loading channel...</p>;

  if (error)
    return <p className="text-red-500">Error loading channel: {error}</p>;

  if (!currentChannel)
    return <p className="text-gray-600">Channel not found.</p>;
  
  return <Channel currentChannel={currentChannel} />;
}

export default ChannelPage;
