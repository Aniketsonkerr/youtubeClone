import Navbar from "./Navbar";
import { useContext } from "react";
import { AppContext } from "../utils/appContext";
function Dashbord() {
  const { toggleBar } = useContext(AppContext);
  return (
    <>
      <div className={`${toggleBar ? " ml-60 " : "  "} w-full`}>
        <Navbar />
      </div>
    </>
  );
}

export default Dashbord;
