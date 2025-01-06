import { useParams } from "react-router-dom";
import useFetch from "../utils/useFetch";
import { useEffect, useState, useMemo } from "react";
import Channel from "./Channel";
function ChannelPage() {
  const { id } = useParams();
  const { data, error, loading } = useFetch(
    "http://localhost:3000/api/channel"
  );
  const [channels, setChannels] = useState([]);

  useEffect(() => {
    if (data) {
      setChannels(data);
    }
  }, [data]);

  const currentChannel = useMemo(() => {
    return channels.find((channel) => channel._id === id) || null;
  }, [channels, id]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p className="text-red-500">Error: {error}</p>;
  }

  if (!currentChannel) {
    return <p className="text-gray-600">Video not found.</p>;
  }

  return (
    <>
      <Channel currentChannel={currentChannel} />
    </>
  );
}

export default ChannelPage;
