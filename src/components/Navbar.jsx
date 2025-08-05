import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AppContext } from "../utils/appContext";
import youtubeImage from "../assets/youtubelogo.png";
import { CiBellOn, CiSearch } from "react-icons/ci";
import { CgProfile } from "react-icons/cg";
import { FiMenu } from "react-icons/fi";

function Navbar() {
  const {
    toggleBar,
    setToggleBar,
    searchedVideo,
    setSearchedVideo,
    isLogin,
    setIsLogin,
  } = useContext(AppContext);

  const [mobileSearchVisible, setMobileSearchVisible] = useState(false);
  const [userChannel, setUserChannel] = useState("");

  const navigate = useNavigate();

  // ✅ Fetch user channel on mount if logged in
useEffect(() => {
  const fetchUserChannel = async () => {
    try {
      const userId = localStorage.getItem("userId");
      const token = localStorage.getItem("accessToken");

      if (!userId || !token) return;

      const res = await fetch(`http://localhost:3000/api/user/${userId}`, {
        headers: {
          Authorization: `JWT ${token}`,
        },
      });

      const data = await res.json();
      console.log(data);
      if (
        data &&
        Array.isArray(data.channels) &&
        data.channels.length > 0
      ) {
        const firstChannelId = data.channels[0];
        console.log(firstChannelId._id);
        const channelRes = await fetch(
          `http://localhost:3000/api/channel/${firstChannelId._id}`
        );
        
        console.log(channelRes)
        const channelData = await channelRes.json();
        console.log(channelData);
        if (channelData) {
          setUserChannel(channelData);
        }
        console.log("User channel:", userChannel);

      }
    } catch (error) {
      console.error("Error fetching user channel:", error);
    }
  };

  if (isLogin) {
    fetchUserChannel();
  }
}, [isLogin]);

  const handleClick = () => {
    if (searchedVideo.trim()) {
      console.log(searchedVideo);
      setSearchedVideo("");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("userId");
    setIsLogin(false);
    setUserChannel(null);
    alert("You have been logged out.");
    navigate("/home");
  };

  return (
    <nav className="flex items-center justify-between px-4 py-2 shadow-sm sticky top-0 bg-white z-50 w-full">
      {/* Left: Logo/Menu */}
      <div className="flex items-center w-auto md:w-60">
        <FiMenu
          size={24}
          className="cursor-pointer mr-4"
          onClick={() => setToggleBar(!toggleBar)}
        />
        <img src={youtubeImage} alt="YouTube Logo" className="w-24 h-auto" />
      </div>

      {/* Search bar (desktop) */}
      <div className="hidden md:flex items-center flex-grow max-w-xl mx-4">
        <input
          type="text"
          className="w-full h-10 rounded-l-full border border-gray-300 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Search"
          value={searchedVideo}
          onChange={(e) => setSearchedVideo(e.target.value)}
        />
        <button
          onClick={handleClick}
          className="w-14 h-10 rounded-r-full border border-gray-300 bg-gray-100 hover:bg-gray-200 flex items-center justify-center"
        >
          <CiSearch size={20} className="text-gray-600" />
        </button>
      </div>

      {/* Icons + Auth */}
      <div className="flex items-center gap-3">
        {/* Mobile search icon */}
        <div className="md:hidden">
          <CiSearch
            size={22}
            className="text-gray-600 cursor-pointer"
            onClick={() => setMobileSearchVisible(!mobileSearchVisible)}
          />
        </div>

        {/* ✅ Show Create or Channel button */}
        {isLogin && !userChannel && (
          <Link to="/createChannel">
            <button className="hidden md:inline-block px-4 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600">
              + Create
            </button>
          </Link>
        )}

        {isLogin && userChannel && (
          <Link to={`/channel/${userChannel._id}`}>
            <button className="hidden md:flex items-center gap-2 border border-gray-200 px-3 py-1 rounded-full hover:bg-gray-100">
              <img
                src={userChannel.channelBanner || "https://via.placeholder.com/36"}
                alt={userChannel.channelName}
                className="w-6 h-6 object-cover rounded-full"
              />
              <span className="text-gray-800 font-normal">
                {userChannel.channelName}
              </span>
            </button>
          </Link>
        )}

        <CiBellOn size={22} className="text-gray-600 cursor-pointer" />

        {/* Auth buttons */}
        {isLogin ? (
          <button
            onClick={handleLogout}
            className="flex items-center gap-1 text-gray-700 hover:text-black"
          >
            <CgProfile size={24} />
            <span className="hidden md:inline">Log out</span>
          </button>
        ) : (
          <Link to="/signIn">
            <button className="flex items-center gap-1 text-gray-700 hover:text-black">
              <CgProfile size={24} />
              <span className="hidden md:inline">Sign In</span>
            </button>
          </Link>
        )}
      </div>

      {/* Mobile search bar */}
      {mobileSearchVisible && (
        <div className="absolute top-full left-0 w-full px-4 py-2 bg-white shadow-md md:hidden flex items-center">
          <input
            type="text"
            className="w-full h-10 rounded-l-full border border-gray-300 px-4 focus:outline-none"
            placeholder="Search"
            value={searchedVideo}
            onChange={(e) => setSearchedVideo(e.target.value)}
          />
          <button
            onClick={handleClick}
            className="w-12 h-10 rounded-r-full border border-gray-300 bg-gray-100 hover:bg-gray-200 flex items-center justify-center"
          >
            <CiSearch size={20} className="text-gray-600" />
          </button>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
