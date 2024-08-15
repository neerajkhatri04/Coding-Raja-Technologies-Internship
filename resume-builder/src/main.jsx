import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { SignInPage } from "./auth/sign-in/SignIn.jsx";
import Home from "./components/Home.jsx";
import { Dashboard } from "./components/Dashboard.jsx";
import { ClerkProvider } from "@clerk/clerk-react";
import EditResume from "./components/EditResume.jsx";
import ViewResume from "./components/ViewResume.jsx";

// Import your publishable key
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
      {
        path: "/dashboard/resume/:resumeId/edit",
        element: <EditResume />,
      },
    ],
  },
  {
    path: "/",
    exact: true,
    element: <Home />,
  },
  {
    path: "/auth/signIn",
    element: <SignInPage />,
  },
  {
    path: "/my-resume/:resumeId/view",
    element: <ViewResume />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/">
    <React.StrictMode>
      <div className="font-poppins bg-zinc-900 text-white">
        <RouterProvider router={router} />
      </div>
    </React.StrictMode>
  </ClerkProvider>
);

// bg-[#DBB5B5]
