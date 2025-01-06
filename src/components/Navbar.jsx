import { CiBellOn, CiSearch } from "react-icons/ci";
import { CgProfile } from "react-icons/cg";
import { FiMenu } from "react-icons/fi";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AppContext } from "../utils/appContext";

function Navbar() {
  const {
    toggleBar,
    setToggleBar,
    searchedVideo,
    setSearchedVideo,
    isLogin,
    setIsLogin,
  } = useContext(AppContext);

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
    <div className="flex flex-row text-sm items-center justify-between">
      {/* Header */}
      <div className="w-60 h-full relative">
        <div className="flex flex-row items-center h-14 p-4">
          <FiMenu
            size={28}
            className="mr-4 cursor-pointer"
            title="Toggle Sidebar"
            onClick={() => setToggleBar(!toggleBar)}
            aria-label="Toggle Sidebar"
          />
          <img
            className="w-24"
            alt="YouTube Logo"
            src="https://uxwing.com/wp-content/themes/uxwing/download/brands-and-social-media/youtube-logo-icon.png"
          />
        </div>
      </div>

      {/* Search Bar */}
      <div className="flex md:w-65 relative items-center flex-grow max-w-lg">
        <input
          type="text"
          className="w-full h-10 rounded-l-full border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none p-2"
          placeholder="Search"
          onChange={(e) => setSearchedVideo(e.target.value)}
          value={searchedVideo}
          aria-label="Search Videos"
        />
        <button
          className="bg-gray-100 hover:bg-gray-200 border border-gray-300 rounded-r-full w-12 h-10 flex items-center justify-center"
          aria-label="Search"
          onClick={handleClick}
        >
          <CiSearch className="text-gray-600" size={20} />
        </button>
      </div>

      {/* Right Section */}
      <div className="flex items-center mr-8">
        {isLogin && (
          <Link to={"/createChannel"}>
            <button className="px-4 py-2 ml-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 focus:ring-2 focus:ring-blue-300">
              + Create
            </button>
          </Link>
        )}

        <CiBellOn
          size={24}
          className="text-gray-600 cursor-pointer ml-2 hover:text-gray-800"
          title="Notifications"
          aria-label="Notifications"
        />
        <div className="flex items-center ml-2 relative">
          {isLogin ? (
            <button
              onClick={handleLogout}
              className="group flex flex-row items-center"
            >
              <CgProfile size={24} className="text-gray-600" />
              <span className="ml-2">Log out</span>
            </button>
          ) : (
            <Link to={"/signIn"}>
              <button className="group flex flex-row items-center">
                <CgProfile size={24} className="text-gray-600" />
                <span className="ml-2">Sign In</span>
              </button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

export default Navbar;
