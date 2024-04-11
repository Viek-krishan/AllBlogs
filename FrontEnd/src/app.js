import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import { ToastContainer } from "react-custom-alert";
import Home from "./components/Home";
import Footer from "./components/Footer";
import appStore from "./utils/store";
import ArticlePage from "./components/ArticlePage";
import Register from "./components/Register";
import LogIn from "./components/LogIn";
import Authentication from "./components/Authentication";
import Profile from "./components/ProfilePage";
import UploadPage from "./components/UploadPage";

const AppLayout = () => {

  

  return (
    <div className="container w-full overflow-hidden text-white bg-black ">
      <Provider store={appStore}>
        {/* ToastContainer is for custom alert messages */}
        <ToastContainer floatingTime={3000} />
        <Outlet />
        {/* <Footer /> */}
      </Provider>
    </div>
  );
};

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    errorElement: "",
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/article-page",
        element: <ArticlePage />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/login",
        element: <LogIn />,
      },
      {
        path: "/profile",
        element: <Profile />,
      },
      {
        path: "/upload",
        element: <UploadPage />,
      },
      {
        path: "/authentication",
        element: <Authentication />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={appRouter} />);
