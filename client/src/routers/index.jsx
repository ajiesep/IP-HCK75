import { createBrowserRouter, redirect } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home";
import ExplorePage from "../pages/ExplorePage";
import DetailsPage from "../pages/DetailsPage";
import SearchPage from "../pages/SearchPage";
import GeminiAi from "../pages/GeminiAi";
import { GoogleOAuthProvider } from "@react-oauth/google";
import Login from "../pages/Login";

const router = createBrowserRouter([
  {
    path: "/login",
    element: (
      <GoogleOAuthProvider clientId="554479727507-70867vtpo11qqa220uvc2hcn7j99ccch.apps.googleusercontent.com">
        <Login />
      </GoogleOAuthProvider>
    ),
    loader: () => {
      if (localStorage.getItem("token")) {
        return redirect("/");
      }
      return null;
    },
  },
  {
    loader: () => {
      if (!localStorage.getItem("token")) {
        return redirect("/login");
      }
      return null;
    },
    path: "/",
    element: <App />,
    children: [
      { path: "/gemini", element: <GeminiAi /> },
      {
        path: "",
        element: <Home />,
      },
      {
        path: ":explore",
        element: <ExplorePage />,
      },
      {
        path: ":explore/:id",
        element: <DetailsPage />,
      },
      {
        path: "search",
        element: <SearchPage />,
      },
    ],
  },
]);

export default router;
