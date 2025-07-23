import { useState, useEffect } from "react";
import { AppContext } from "./utils/appContext"; // adjust path as needed
import Sidebar from "./components/Sidebar";
import Dashboard from "./components/Dashboard";
import { Outlet } from "react-router-dom";

function App() {
  const [toggleBar, setToggleBar] = useState(false);
  const [searchedVideo, setSearchedVideo] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const [isLogin, setIsLogin] = useState(false); // Initially false

  // ✅ Check auth token on mount
  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) setIsLogin(true); // ✅ Persist login
  }, []);

  return (
    <AppContext.Provider
      value={{
        toggleBar,
        setToggleBar,
        searchedVideo,
        setSearchedVideo,
        isSignUp,
        setIsSignUp,
        isLogin,
        setIsLogin,
      }}
    >
      <div className="flex">
        <Sidebar />
        <Dashboard />
      </div>
      <div className={`${toggleBar ? "ml-60" : ""}`}>
        <Outlet />
      </div>
    </AppContext.Provider>
  );
}

export default App;
