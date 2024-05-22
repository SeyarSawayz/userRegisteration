import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import { createBrowserRouter } from "react-router-dom";
import Signin from "./components/Signin.jsx";
import Signup from "./components/Signup.jsx";
import Home from "./components/Home.jsx";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Signin />,
      },

      {
        path: "signup",
        element: <Signup />,
      },
      {
        path: "/home",
        element: <Home />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router}>
      <App />
    </RouterProvider>
  </React.StrictMode>
);
