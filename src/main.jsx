import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./page/HomePage.jsx";
import ErrorPage from "./page/ErrorPage.jsx";
import VideoPage from "./page/videoPage.jsx";
import SignIn from "./page/SignIn.jsx";
import CreateChannelPage from "./page/CreateChannelPage.jsx";
import ChannelPage from "./page/ChannelPage.jsx";
const app = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/home",
        element: <HomePage />,
      },
      {
        path: "/video/:id",
        element: <VideoPage />,
      },
      {
        path: "/signIn",
        element: <SignIn />,
      },
      {
        path: "/createChannel",
        element: <CreateChannelPage />,
      },
      {
        path: "/channel/:id",
        element: <ChannelPage />,
      },
    ],
    errorElement: <ErrorPage />,
  },
]);
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={app}></RouterProvider>
  </StrictMode>
);
