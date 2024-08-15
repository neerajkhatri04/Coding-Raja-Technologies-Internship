import { UserButton, useUser } from "@clerk/clerk-react";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";

const Navbar = () => {
  const { user, isSignedIn } = useUser();

  return (
    <div className="h-24 px-7 flex items-center justify-between bg-white">
      <Link to="/">
        <img src="/logo.svg" alt="brand-logo" />
      </Link>

      {isSignedIn ? (
        <div className="flex gap-4">
          <Link to={"/dashboard"}>
            <Button>Dashboard</Button>
          </Link>
          <UserButton />
        </div>
      ) : (
        <Link to={"/auth/signIn"}>
          <Button>Create</Button>
        </Link>
      )}
    </div>
  );
};

export default Navbar;
