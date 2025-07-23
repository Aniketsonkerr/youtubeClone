import { Outlet } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Dashboard from "./components/Dashboard";
import { AppContext } from "./utils/appContext";
import { useState } from "react";

function App() {
  const [toggleBar, setToggleBar] = useState(false);
  const [searchedVideo, setSearchedVideo] = useState("");
  const [isSignUp, setIsSignUp] = useState(false); // 🆕 for SignIn toggle
  const [isLogin, setIsLogin] = useState(false);   // 🆕 for auth state

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

      {/* Dynamic margin for content if sidebar is open */}
      <div className={`${toggleBar ? "ml-60" : ""}`}>
        <Outlet />
      </div>
    </AppContext.Provider>
  );
}

export default App;
