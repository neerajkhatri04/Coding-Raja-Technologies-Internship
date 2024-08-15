import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { MenuIcon } from "lucide-react";
import { Link } from "react-router-dom";

const ResumeItem = ({ data }) => {
  const attribute = data.attributes;
  return (
    <Link className="mb-40" to={`/dashboard/resume/${data.id}/edit`}>
      <div className="font-poppins mb-10 border border-rose-800 p-3 hover:shadow-lg hover:scale-105 shadow-secondary-foreground transition-all duration-300">
        <div className="h-[50vh] flex justify-center items-center">
          <img className="h-[30vh]" src="resume-icon.png" alt="" />
        </div>
      </div>
      <div className="w-full flex justify-between ">
        <h1 className="text-center text-zinc-100 font-normal text-xl font-bold">
          {attribute?.title}
        </h1>
        <DropdownMenu>
          <DropdownMenuTrigger>
            <MenuIcon className="cursor-pointer" />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="border border-red-300 bg-red-400 px-2 py-4">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Billing</DropdownMenuItem>
            <DropdownMenuItem>Team</DropdownMenuItem>
            <DropdownMenuItem>Subscription</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </Link>
  );
};

export default ResumeItem;
