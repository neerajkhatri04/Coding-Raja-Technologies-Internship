import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import { useContext, useEffect, useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { toast } from "sonner";
import { useParams } from "react-router-dom";
import { updateResume } from "@/service/globleApi";
import { Loader } from "lucide-react";
const PersonalInfoForm = ({ enableNext }) => {
  const { info, setInfo } = useContext(ResumeInfoContext);
  const params = useParams();
  const [formInfo, setFormInfo] = useState({});
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    console.log(params);
    console.log(info);
  }, []);

  function handleInputChange(e) {
    enableNext(false);
    const { name, value } = e.target;
    setFormInfo((prev) => ({ ...prev, [name]: value }));
    setInfo((prevInfo) => ({ ...prevInfo, [name]: value }));
  }
  function handleFormSubmit(e) {
    e.preventDefault();
    setLoading(true);
    const data = {
      data: formInfo,
    };
    updateResume(params.resumeId, data)
      .then((res) => {
        enableNext(true);
        setLoading(false);
        toast("Success", {
          className: "text-green-600",
          description: "Your changes are saved successfully",
          action: {
            label: "Undo",
          },
        });
      })
      .catch((err) => {
        setLoading(false);
        toast("Failed", {
          className: "text-red-600",
          description: "Error has occurred while saving changes",
          action: {
            label: "Undo",
          },
        });
      });
  }

  return (
    <div>
      <h2 className="font-semibold text-center text-4xl border-b-2 w-fit mx-auto my-4">
        Personal Details
      </h2>
      <form onSubmit={handleFormSubmit}>
        <div className="grid grid-cols-2 mt-5 gap-3">
          <div>
            <label className="text-sm">First Name</label>
            <Input
              className="border-none transition-all duration-300 focus-visible:ring-0 bg-rose-800 rounded-none"
              name="firstName"
              onChange={handleInputChange}
              required
              defaultValue={info?.firstName}
            />
          </div>
          <div>
            <label className="text-sm">Last Name</label>
            <Input
              className="border-none transition-all duration-300 focus-visible:ring-0 bg-rose-800 rounded-none"
              name="lastName"
              onChange={handleInputChange}
              required
              defaultValue={info?.lastName}
            />
          </div>
          <div className="col-span-2">
            <label className="text-sm">Job Title</label>
            <Input
              className="border-none transition-all duration-300 focus-visible:ring-0 bg-rose-800 rounded-none"
              name="jobTitle"
              onChange={handleInputChange}
              required
              defaultValue={info?.jobTitle}
            />
          </div>
          <div className="col-span-2">
            <label className="text-sm">Address</label>
            <Input
              className="border-none transition-all duration-300 focus-visible:ring-0 bg-rose-800 rounded-none"
              name="address"
              onChange={handleInputChange}
              required
              defaultValue={info?.address}
            />
          </div>
          <div className="">
            <label className="text-sm">Phone</label>
            <Input
              className="border-none transition-all duration-300 focus-visible:ring-0 bg-rose-800 rounded-none"
              name="phone"
              onChange={handleInputChange}
              required
              defaultValue={info?.phone}
            />
          </div>
          <div className="">
            <label className="text-sm">Email</label>
            <Input
              className="border-none transition-all duration-300 focus-visible:ring-0 bg-rose-800 rounded-none"
              name="email"
              onChange={handleInputChange}
              required
              defaultValue={info?.email}
            />
          </div>
        </div>
        <div className="mt-3 flex justify-end">
          {loading ? (
            <Button className="bg-red-500 hover:bg-slate-400 transition-all duration-500">
              <Loader className="animate-spin" />
            </Button>
          ) : (
            <Button
              className="bg-emerald-600 hover:bg-slate-400 transition-all duration-500"
              type="submit"
            >
              Save
            </Button>
          )}
        </div>
      </form>
    </div>
  );
};

export default PersonalInfoForm;
