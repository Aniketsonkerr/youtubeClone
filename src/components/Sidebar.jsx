import { MdOutlineHome } from "react-icons/md";
import { SiYoutubeshorts } from "react-icons/si";
import { MdOutlineSubscriptions } from "react-icons/md";
import { GoHistory } from "react-icons/go";
import { CgPlayList } from "react-icons/cg";
import { GoVideo } from "react-icons/go";
import { MdOutlineCastForEducation } from "react-icons/md";
import { MdOutlineWatchLater } from "react-icons/md";
import { AiOutlineLike } from "react-icons/ai";
import { FaFire } from "react-icons/fa6";
import { RiShoppingBag4Line } from "react-icons/ri";
import { CiMusicNote1 } from "react-icons/ci";
import { BiMovie } from "react-icons/bi";
import { HiMiniSignal } from "react-icons/hi2";
import { SiYoutubegaming } from "react-icons/si";
import { MdNewspaper } from "react-icons/md";
import { GoTrophy } from "react-icons/go";
import { MdCastForEducation } from "react-icons/md";
import { GiClothes } from "react-icons/gi";
import { MdOutlinePodcasts } from "react-icons/md";
import { IoSettingsOutline } from "react-icons/io5";
import { MdOutlineOutlinedFlag } from "react-icons/md";
import { IoMdHelpCircleOutline } from "react-icons/io";
import { RiFeedbackLine } from "react-icons/ri";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AppContext } from "../utils/appContext";
function Sidebar() {
  const { toggleBar } = useContext(AppContext);
  return (
    <>
      <div className={`${toggleBar ? " block " : " hidden "} absolute `}>
        <div className="flex flex-col items-center p-4 ">
          <ul className="flex flex-col flex-start ">
            <li className="flex flex-row justify-start p-1 mb-2 hover:bg-slate-100 rounded-lg ">
              <MdOutlineHome size={24} className="mr-3" />
              <Link to={"/home"}>Home</Link>
            </li>
            <li className="flex flex-row justify-start p-1 mb-2 hover:bg-slate-100 rounded-lg">
              <SiYoutubeshorts size={24} className="mr-3" />
              <Link to={"/shorts"}>Shorts</Link>
            </li>
            <li className="flex flex-row justify-start p-1 mb2 hover:bg-slate-100 rounded-lg">
              <MdOutlineSubscriptions size={24} className="mr-3" />
              <Link to={"/subscription"}>Subscription</Link>
            </li>
          </ul>
        </div>
        <hr />
        <div className="flex flex-col items-center p-4">
          <ul className="flex flex-col flex-start">
            <li>
              <h1 className="text-left font-semibold">
                <Link>You </Link>
              </h1>
            </li>
            <li className="flex flex-row justify-start p-1 space-x-3 mb-2 hover:bg-slate-100 rounded-lg">
              <GoHistory size={20} />
              <Link>History</Link>
            </li>
            <li className="flex flex-row justify-start p-1 space-x-3 mb-2 hover:bg-slate-100 rounded-lg">
              <CgPlayList size={20} />
              <Link>Playlists</Link>
            </li>
            <li className="flex flex-row justify-start p-1 space-x-3 mb-2 hover:bg-slate-100 rounded-lg">
              <GoVideo size={20} />
              <Link>Your videos</Link>
            </li>
            <li className="flex flex-row justify-start p-1 space-x-3 mb-2 hover:bg-slate-100 rounded-lg">
              <MdOutlineCastForEducation size={20} />
              <Link>Your Courses</Link>
            </li>
            <li className="flex flex-row justify-start p-1 space-x-3 mb-2 hover:bg-slate-100 rounded-lg">
              <MdOutlineWatchLater size={20} />
              <Link>Watch Later</Link>
            </li>
            <li className="flex flex-row justify-start p-1 space-x-3 mb-2 hover:bg-slate-100 rounded-lg">
              <AiOutlineLike size={20} />
              <Link>Liked videos</Link>
            </li>
          </ul>
        </div>
        <hr />
        <div className="flex flex-col items-center p-4 ">
          <h1 className="mr-14">Subscriptions</h1>
        </div>
        <hr />
        <div className="flex flex-col items-center p-4">
          <ul className="flex flex-col flex-start">
            <li>
              <h1 className="text-left font-semibold">
                <Link>Explore</Link>
              </h1>
            </li>
            <li className="flex flex-row justify-start p-1 space-x-3 mb-2 hover:bg-slate-100 rounded-lg">
              <FaFire size={20} />
              <Link>Trending</Link>
            </li>
            <li className="flex flex-row justify-start p-1 space-x-3 mb-2 hover:bg-slate-100 rounded-lg">
              <RiShoppingBag4Line size={20} />
              <Link>Shopping</Link>
            </li>
            <li className="flex flex-row justify-start p-1 space-x-3 mb-2 hover:bg-slate-100 rounded-lg">
              <CiMusicNote1 size={20} />
              <Link>Music</Link>
            </li>
            <li className="flex flex-row justify-start p-1 space-x-3 mb-2 hover:bg-slate-100 rounded-lg">
              <BiMovie size={20} />
              <Link>Movies</Link>
            </li>
            <li className="flex flex-row justify-start p-1 space-x-3 mb-2 hover:bg-slate-100 rounded-lg">
              <HiMiniSignal size={20} />
              <Link>Live</Link>
            </li>
            <li className="flex flex-row justify-start p-1 space-x-3 mb-2 hover:bg-slate-100 rounded-lg">
              <SiYoutubegaming size={20} />
              <Link>Gaming</Link>
            </li>
            <li className="flex flex-row justify-start p-1 space-x-3 mb-2 hover:bg-slate-100 rounded-lg">
              <MdNewspaper size={20} />
              <Link>News</Link>
            </li>
            <li className="flex flex-row justify-start p-1 space-x-3 mb-2 hover:bg-slate-100 rounded-lg">
              <GoTrophy size={20} />
              <Link>Sports</Link>
            </li>
            <li className="flex flex-row justify-start p-1 space-x-3 mb-2 hover:bg-slate-100 rounded-lg">
              <MdCastForEducation size={20} />
              <Link>Courses</Link>
            </li>
            <li className="flex flex-row justify-start p-1 space-x-3 mb-2 hover:bg-slate-100 rounded-lg">
              <GiClothes size={20} />
              <Link>Fashion & Beauty</Link>
            </li>
            <li className="flex flex-row justify-start p-1 space-x-3 mb-2 hover:bg-slate-100 rounded-lg">
              <MdOutlinePodcasts size={20} />
              <Link>Podcasts</Link>
            </li>
          </ul>
        </div>
        <hr />
        <div className="flex flex-col items-center p-4">
          <ul className="flex flex-col flex-start">
            <li className="flex flex-row justify-start p-1 space-x-3 mb-2 hover:bg-slate-100 rounded-lg">
              <IoSettingsOutline size={20} />
              <Link>Settings</Link>
            </li>
            <li className="flex flex-row justify-start p-1 space-x-3 mb-2 hover:bg-slate-100 rounded-lg">
              <MdOutlineOutlinedFlag size={20} />
              <Link>Report history</Link>
            </li>
            <li className="flex flex-row justify-start p-1 space-x-3 mb-2 hover:bg-slate-100 rounded-lg">
              <IoMdHelpCircleOutline size={20} />
              <Link>Help</Link>
            </li>
            <li className="flex flex-row justify-start p-1 space-x-3 mb-2 hover:bg-slate-100 rounded-lg">
              <RiFeedbackLine size={20} />
              <Link>Send feedback</Link>
            </li>
          </ul>
        </div>
        <hr />
        <div className="flex flex-col items-center text-gray-500 text-sm">
          <table className="grid grid-rows-3 p-4 font-medium">
            <tbody>
            <tr>
              <td>
                <Link>About</Link>
              </td>
              <td>
                <Link>Press</Link>
              </td>
              <td>
                <Link>Copyright</Link>
              </td>
            </tr>
            <tr>
              <td>
                <Link>Contact us</Link>
              </td>
              <td>
                <Link>Creators</Link>
              </td>
            </tr>
            <tr>
              <td>
                <Link>Advertise</Link>
              </td>
              <td>
                <Link>Developers</Link>
              </td>
            </tr>
            </tbody>
          </table>
          <table className="grid grid-rows-3 p-2 font-medium">
            <tbody>
            <tr>
              <td>
                <Link>Terms</Link>
              </td>
              <td>
                <Link>Privacy</Link>
              </td>
              <td>
                <Link>Policy & Safety</Link>
              </td>
            </tr>
            <tr>
              <td>
                <Link>How youtube works</Link>
              </td>
            </tr>
            <tr>
              <td>
                <Link>Test new features</Link>
              </td>
            </tr>
            </tbody>
          </table>
          <p>© 2024 Google LLC</p>
        </div>
      </div>
    </>
  );
}

export default Sidebar;
