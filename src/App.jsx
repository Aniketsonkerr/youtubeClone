import { Outlet } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Dashbord from "./components/Dashboard";
import { AppContext } from "./utils/appContext";
import { useState } from "react";
function App() {
  const [searchedVideo, setSearchedVideo] = useState("");
  const [toggleBar, setToggleBar] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  return (
    <>
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
        <div className="flex flex-row">
          <Sidebar toggleBar={toggleBar} />
          <Dashbord
            isSignUp={isSignUp}
            toggleBar={toggleBar}
            setToggleBar={setToggleBar}
            setSearchedVideo={setSearchedVideo}
            searchedVideo={searchedVideo}
            setIsLogin={setIsLogin}
            isLogin={isLogin}
          />
        </div>
        <div className={`${toggleBar ? " ml-60 " : " "}`}>
          <Outlet
            searchedVideo={searchedVideo}
            isSignUp={isSignUp}
            setIsSignUp={setIsSignUp}
            setIsLogin={setIsLogin}
            isLogin={isLogin}
          />
        </div>
      </AppContext.Provider>
    </>
  );
}

export default App;
