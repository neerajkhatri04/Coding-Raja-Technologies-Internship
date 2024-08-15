import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useUser } from "@clerk/clerk-react";
import { Loader, Plus, PlusIcon, X } from "lucide-react";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { createResume } from "../service/globleApi";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useNavigate } from "react-router-dom";

export const AddResume = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [resumeTitle, setResumeTitle] = useState("");
  const { user } = useUser();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleCreate = () => {
    setLoading(true);
    const uid = uuidv4();
    const data = {
      data: {
        title: resumeTitle,
        resumeId: uid,
        // date: new Date().toDateString(),
        userEmail: user?.primaryEmailAddress?.emailAddress,
        username: user?.fullName,
      },
    };
    createResume(data)
      .then((res) => {
        console.log(res);
        if (res) {
          setLoading(false);
        }
        navigate(`/dashboard/resume/${res.data.id}/edit`);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  };

  return (
    <div className="mb-10">
      <div
        className="px-12 py-10 flex items-center cursor-pointer gap-3 bg-white w-fit text-black font-semibold transition-all duration-500 hover:bg-sky-500 hover:text-white"
        onClick={() => setIsDialogOpen(!isDialogOpen)}
      >
        <Plus /> Add New Resume
      </div>
      <Dialog open={isDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="mb-2 text-xl">
              Create New Resume
            </DialogTitle>
            <DialogDescription>
              Enter the name of your resume
              <Input
                className="border-zinc-300 mt-2 focus:border-none transition-all duration-200"
                placeholder="Ex: Resume1"
                value={resumeTitle}
                onChange={(e) => setResumeTitle(e.target.value)}
              />
            </DialogDescription>
          </DialogHeader>
          <div className="flex gap-2">
            <Button
              className="bg-red-500 hover:bg-red-600"
              onClick={() => setIsDialogOpen(!isDialogOpen)}
            >
              <X />
            </Button>
            <Button
              className="bg-emerald-500 flex items-center gap-2 hover:bg-emerald-600"
              onClick={handleCreate}
              disabled={!resumeTitle || loading}
            >
              {loading ? (
                <Loader className="animate-spin" />
              ) : (
                <>
                  <PlusIcon /> Add
                </>
              )}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};
