import { useContext, useEffect, useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import TextEditor from "../TextEditor";
import { Delete, DeleteIcon, Loader, Trash2 } from "lucide-react";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import { updateResume } from "@/service/globleApi";
import { toast } from "sonner";
import { useParams } from "react-router-dom";

const formField = {
  ids: Date.now(),
  title: "",
  companyName: "",
  city: "",
  state: "",
  startDate: "",
  endDate: "",
  workSummery: "",
};

const ExperienceInfoForm = ({ enableNext }) => {
  const [loading, setLoading] = useState(false);
  const params = useParams();
  const [experienceList, setExperienceList] = useState([
    { ...formField, ids: Date.now() },
  ]);

  const { info, setInfo } = useContext(ResumeInfoContext);

  useEffect(() => {
    info?.experience.length > 0 && setExperienceList(info?.experience);
  }, []);

  function handleChange(index, event) {
    const { name, value } = event.target;
    const newEntries = experienceList.slice();

    newEntries[index][name] = value;

    setExperienceList(newEntries);
  }

  function addExperience() {
    setExperienceList((prev) => [...prev, { ...formField, ids: Date.now() }]);
  }

  const handleDelete = (id) => {
    setExperienceList((prevList) =>
      prevList.filter((experience) => experience.ids !== id)
    );
  };

  function handleTextEditorChange(event, name, index) {
    const newEntries = experienceList.slice();

    newEntries[index][name] = event.target.value;

    setExperienceList(newEntries);
  }

  function onSave() {
    setLoading(true);
    const data = {
      data: {
        experience: experienceList,
      },
    };
    updateResume(params.resumeId, data)
      .then((res) => {
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

  useEffect(() => {
    setInfo((prevInfo) => ({
      ...prevInfo,
      experience: experienceList,
    }));
  }, [experienceList]);

  return (
    <div>
      <h2 className="font-semibold text-center text-4xl border-b-2 w-fit mx-auto my-4">
        Experience
      </h2>
      <p className="font-light text-sm text-slate-300 text-center">
        Add any previous internship or job experience, if any.
      </p>
      <div className="mt-5">
        {experienceList.map((experience, i) => (
          <div
            key={experience.ids}
            className="mt-10 border-2 p-4 rounded-lg border-zinc-600"
          >
            <div className="flex justify-end">
              <Button
                className="bg-zinc-900"
                onClick={() => handleDelete(experience.ids)}
              >
                <Trash2 />
              </Button>
            </div>
            <div className="grid grid-cols-2 gap-2 ">
              <div className="mb-2">
                <label className="text-sm">Position Title</label>
                <Input
                  className="border-none transition-all duration-300 focus-visible:ring-0 bg-rose-800 rounded-none"
                  name="title"
                  defaultValue={experience.title}
                  // value={experience.title}
                  onChange={(event) => handleChange(i, event)}
                />
              </div>
              <div className="mb-2">
                <label className="text-sm">Company Name</label>
                <Input
                  className="border-none transition-all duration-300 focus-visible:ring-0 bg-rose-800 rounded-none"
                  name="companyName"
                  defaultValue={experience.companyName}
                  onChange={(event) => handleChange(i, event)}
                />
              </div>
              <div className="mb-2">
                <label className="text-sm">City</label>
                <Input
                  className="border-none transition-all duration-300 focus-visible:ring-0 bg-rose-800 rounded-none"
                  name="city"
                  defaultValue={experience.city}
                  onChange={(event) => handleChange(i, event)}
                />
              </div>
              <div className="mb-2">
                <label className="text-sm">State</label>
                <Input
                  className="border-none transition-all duration-300 focus-visible:ring-0 bg-rose-800 rounded-none"
                  name="state"
                  defaultValue={experience.state}
                  onChange={(event) => handleChange(i, event)}
                />
              </div>
              <div className="mb-2">
                <label className="text-sm">Start date</label>
                <Input
                  className="border-none transition-all duration-300 focus-visible:ring-0 bg-rose-800 rounded-none"
                  type="date"
                  name="startDate"
                  defaultValue={experience.startDate}
                  onChange={(event) => handleChange(i, event)}
                />
              </div>
              <div className="mb-2">
                <label className="text-sm">End Date</label>
                <Input
                  className="border-none transition-all duration-300 focus-visible:ring-0 bg-rose-800 rounded-none"
                  type="date"
                  name="endDate"
                  defaultValue={experience.endDate}
                  onChange={(event) => handleChange(i, event)}
                />
              </div>
              <div className="mb-2 col-span-2">
                <label className="text-sm">Work Summery</label>
                <TextEditor
                  index={i}
                  onTextEditorChange={(e) =>
                    handleTextEditorChange(e, "workSummery", i)
                  }
                  defaultValue={experience?.workSummery}
                  onChange={(value) =>
                    handleChange(i, { target: { name: "workSummery", value } })
                  }
                />
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-end gap-7 mt-4">
        <Button
          variant="outline"
          onClick={addExperience}
          className="bg-transparent hover:bg-rose-800 hover:border-rose-800 hover:text-white transition-all duration-500"
        >
          Add More Experience
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

export default ExperienceInfoForm;
