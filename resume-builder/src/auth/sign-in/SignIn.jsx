import { SignIn } from "@clerk/clerk-react";
import React from "react";

export const SignInPage = () => {
  return (
    <div className="h-screen w-full flex justify-center items-center">
      <SignIn />
    </div>
  );
};
