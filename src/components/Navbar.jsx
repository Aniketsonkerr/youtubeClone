import { CiBellOn, CiSearch } from "react-icons/ci";
import { CgProfile } from "react-icons/cg";
import { FiMenu } from "react-icons/fi";
import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import { AppContext } from "../utils/appContext";
import youtubeImage from "../assets/youtubelogo.png";

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

  function handleClick() {
    if (searchedVideo.trim()) {
      console.log(searchedVideo);
      setSearchedVideo("");
    }
  }

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    setIsLogin(false);
    alert("You have been logged out.");
  };

  return (
    <nav className="flex items-center justify-between px-4 py-2 shadow-sm sticky top-0 bg-white z-50 w-full">
      {/* Left: Menu + Logo */}
      <div className="flex items-center w-auto md:w-60">
        <FiMenu
          size={24}
          className="cursor-pointer mr-4"
          onClick={() => setToggleBar(!toggleBar)}
        />
        <img src={youtubeImage} alt="YouTube Logo" className="w-24 h-auto" />
      </div>

      {/* Center: Search Bar */}
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

      {/* Right: Icons + Auth */}
      <div className="flex items-center gap-3">
        {/* Mobile Search Icon */}
        <div className="md:hidden">
          <CiSearch
            size={22}
            className="text-gray-600 cursor-pointer"
            onClick={() => setMobileSearchVisible(!mobileSearchVisible)}
          />
        </div>

        {isLogin && (
          <Link to="/createChannel">
            <button className="hidden md:inline-block px-4 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600">
              + Create
            </button>
          </Link>
        )}

        <CiBellOn size={22} className="text-gray-600 cursor-pointer" />

        {/* Login / Logout */}
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

      {/* Mobile Search Bar */}
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
