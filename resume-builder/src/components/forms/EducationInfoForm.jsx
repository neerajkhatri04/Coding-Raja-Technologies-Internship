import { Loader, Trash2, University } from "lucide-react";
import React, { useContext, useEffect, useState } from "react";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import { useParams } from "react-router-dom";
import { updateResume } from "@/service/globleApi";
import { toast } from "sonner";
// import default from './../../../postcss.config';

const EducationInfoForm = () => {
  const { info, setInfo } = useContext(ResumeInfoContext);
  const [loading, setLoading] = useState(false);
  const formField = {
    ids: Date.now(),
    universityName: "",
    degree: "",
    major: "",
    startDate: "",
    endDate: "",
    description: "",
  };

  const params = useParams();

  const [educationList, setEducationList] = useState([
    { ...formField, ids: Date.now() },
  ]);

  useEffect(() => {
    info?.education.length > 0 && setEducationList(info?.education);
  }, []);

  const handleDelete = (id) => {
    console.log("Deleting education: ", id);
    setEducationList((prevList) =>
      prevList.filter((education) => education.ids !== id)
    );
  };

  function handleChange(index, event) {
    const { name, value } = event.target;
    const newEntries = educationList.slice();

    newEntries[index][name] = value;

    setEducationList(newEntries);
  }

  function addEducation() {
    console.log(Date.now());
    setEducationList((prev) => [...prev, { ...formField, ids: Date.now() }]);
  }

  useEffect(() => {
    setInfo((prevInfo) => ({
      ...prevInfo,
      education: educationList,
    }));
  }, [educationList]);

  function onSave() {
    setLoading(true);
    const data = {
      data: {
        education: educationList,
      },
    };
    updateResume(params.resumeId, data)
      .then((res) => {
        console.log("Education saved successfully", res);
        setLoading(false);
        toast("Education saved successfully");
      })
      .catch((e) => {
        console.log("data:", data);
        console.error("Error saving education: ", e);
        setLoading(false);
        toast.error("Error saving education");
      });
  }

  return (
    <div>
      <h2 className="font-semibold text-center text-4xl border-b-2 w-fit mx-auto my-4">
        Education
      </h2>
      <p className="font-light text-sm text-slate-300 text-center">
        Add your education details
      </p>
      <div>
        {educationList.map((education, i) => (
          <div
            key={education.ids}
            className="gap-3 mt-10 border-2 p-4 rounded-lg border-zinc-600"
          >
            <div className="flex justify-end">
              <Button
                className="bg-zinc-900"
                onClick={() => handleDelete(education.ids)}
              >
                <Trash2 />
              </Button>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div className="col-span-2 ">
                <lable className="text-sm">University Name</lable>
                <Input
                  className="border-none transition-all duration-300 focus-visible:ring-0 bg-rose-800 rounded-none"
                  name="universityName"
                  defaultValue={education.universityName}
                  onChange={(e) => handleChange(i, e)}
                />
              </div>
              <div>
                <lable className="text-sm">Degree</lable>
                <Input
                  className="border-none transition-all duration-300 focus-visible:ring-0 bg-rose-800 rounded-none"
                  name="degree"
                  defaultValue={education.degree}
                  onChange={(e) => handleChange(i, e)}
                />
              </div>
              <div>
                <lable className="text-sm">Major</lable>
                <Input
                  className="border-none transition-all duration-300 focus-visible:ring-0 bg-rose-800 rounded-none"
                  name="major"
                  defaultValue={education.major}
                  onChange={(e) => handleChange(i, e)}
                />
              </div>
              <div>
                <lable className="text-sm">Start Date</lable>
                <Input
                  type="date"
                  className="border-none transition-all duration-300 focus-visible:ring-0 bg-rose-800 rounded-none"
                  name="startDate"
                  defaultValue={education.startDate}
                  onChange={(e) => handleChange(i, e)}
                />
              </div>
              <div>
                <lable className="text-sm">End Date</lable>
                <Input
                  type="date"
                  className="border-none transition-all duration-300 focus-visible:ring-0 bg-rose-800 rounded-none"
                  name="endDate"
                  defaultValue={education.endDate}
                  onChange={(e) => handleChange(i, e)}
                />
              </div>
              <div className="col-span-2">
                <lable className="text-sm">Description (optional)</lable>
                <Textarea
                  className="border-none transition-all duration-300 focus-visible:ring-0 bg-rose-800 rounded-none"
                  name="description"
                  defaultValue={education.description}
                  onChange={(e) => handleChange(i, e)}
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-end gap-7 mt-4">
        <Button
          variant="outline"
          onClick={addEducation}
          className="bg-transparent hover:bg-rose-800 hover:border-rose-800 hover:text-white transition-all duration-500"
        >
          Add More Education
        </Button>
        <Button
          className="bg-emerald-600 hover:bg-slate-400 transition-all duration-500"
          onClick={() => onSave()}
        >
          {loading ? <Loader className="animate-spin" /> : "Save"}
        </Button>
      </div>
    </div>
  );
};

export default EducationInfoForm;
