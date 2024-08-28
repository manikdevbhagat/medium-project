import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import "./App.css";
import { Toaster } from "react-hot-toast";
import LandingPage from "./pages/Landing";
import HomeLayout from "./components/home/HomeLayout";
import BlogDetails from "./pages/BlogDetails";
import Homepage from "./pages/Homepage";
import WriteBlog from "./pages/WriteBlog";
import { useEffect, useState } from "react";
import ErrorPage from "./pages/ErrorPage";
import UserProfile from "./pages/UserProfile";

export const ROUTES = {
  BLOG_WRITE: "/blog/write",
};
const guestRouter = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/signin",
    element: <Signin />,
  },
]);

const userRouter = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,
    errorElement: <>Error loading page</>,
    children: [
      {
        path: "",
        element: <Homepage />,
      },
      {
        path: ROUTES.BLOG_WRITE,
        element: <WriteBlog />,
      },
      {
        path: "blog/:id",
        element: <BlogDetails />,
      },
      {
        path: "/profile",
        element: <UserProfile />,
      },
    ],
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/signin",
    element: <Signin />,
  },
]);

function App() {
  const [token, setToken] = useState<string | null>("");

  useEffect(() => {
    setToken(localStorage.getItem("jwt") ?? null);
    const handleStorageChange = () => {
      setToken(localStorage.getItem("jwt") ?? null);
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  return (
    <>
      <RouterProvider router={token === null ? guestRouter : userRouter} />
      <Toaster position="top-center" reverseOrder={false} />
    </>
  );
}

export default App;
