import { useState } from "react";
import { useNavigate } from "react-router-dom";
function CreateChannelPage() {
  const [channelName, setChannelName] = useState("");
  const [description, setDescription] = useState("");
  const [channelBanner, setChannelBanner] = useState("");
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const token = localStorage.getItem("accessToken");

      if (!token) {
        throw new Error("Authentication token not found. Please log in.");
      }

      const response = await fetch("http://localhost:3000/api/channel", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `JWT ${token}`,
        },
        body: JSON.stringify({
          channelName: channelName,
          channelBanner: channelBanner,
          description: description,
        }),
      });

      if (!response.ok) {
        throw new Error(`Failed to create channel. Status: ${response.status}`);
      }

      const result = await response.json();
      alert("Channel created successfully");

      setChannelBanner("");
      setDescription("");
      setChannelName("");
    } catch (error) {
      alert(`Error: ${error.message}`);
    }
  }

  return (
    <div className="flex justify-center items-center m-2">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white p-6 rounded-lg shadow-md"
      >
        <div className="flex justify-center">
          <img
            src="https://i.pinimg.com/736x/15/0f/a8/150fa8800b0a0d5633abc1d1c4db3d87.jpg"
            alt="profile-pic"
            className="w-2/5"
          ></img>
        </div>
        <div>
          <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
            Create a New Channel
          </h1>

          <div className="mb-4">
            <label
              htmlFor="channelName"
              className="block text-gray-700 font-medium mb-2"
            >
              Channel Name
            </label>
            <input
              type="text"
              id="channelName"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              onChange={(e) => setChannelName(e.target.value)}
              value={channelName}
              placeholder="Enter your channel name"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="description"
              className="block text-gray-700 font-medium mb-2"
            >
              Channel Description
            </label>
            <textarea
              id="description"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              onChange={(e) => setDescription(e.target.value)}
              value={description}
              placeholder="Describe your channel"
              rows="4"
            ></textarea>
          </div>

          <div className="mb-4">
            <label
              htmlFor="channelBanner"
              className="block text-gray-700 font-medium mb-2"
            >
              Channel Banner URL
            </label>
            <input
              type="text"
              id="channelBanner"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              onChange={(e) => setChannelBanner(e.target.value)}
              value={channelBanner}
              placeholder="Enter image URL for the banner"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:ring-2 focus:ring-blue-300 focus:outline-none"
          >
            Create Channel
          </button>
        </div>
      </form>
    </div>
  );
}

export default CreateChannelPage;
