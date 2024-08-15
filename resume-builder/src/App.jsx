import { useUser } from "@clerk/clerk-react";
import { Outlet, useNavigate } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import { Toaster } from "sonner";
function App() {
  const { user, isLoaded, isSignedIn } = useUser();

  const navigate = useNavigate();

  if (!isSignedIn && isLoaded) {
    navigate("/auth/signIn");
  }

  return (
    <>
      <Navbar />
      <Outlet />
      <Toaster />
    </>
  );
}

export default App;
