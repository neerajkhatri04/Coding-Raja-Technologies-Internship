import React, { useContext, useEffect, useState } from "react";
import { Input } from "../ui/input";
import { Rating, Heart } from "@smastrom/react-rating";

import "@smastrom/react-rating/style.css";
import { Button } from "../ui/button";
import { Loader, Trash2 } from "lucide-react";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import { updateResume } from "@/service/globleApi";
import { useParams } from "react-router-dom";
import { toast } from "sonner";

const myStyles = {
  itemShapes: Heart,
  activeFillColor: "#f43f5e",
  inactiveFillColor: "#f9a8d4",
};

const formField = {
  ids: Date.now(),
  name: "",
  rating: 0,
};

const Skills = () => {
  const [skillsList, setSkillsList] = useState([
    { ...formField, ids: Date.now() },
  ]);

  const { resumeId } = useParams();
  const [loading, setLoading] = useState(false);
  const { info, setInfo } = useContext(ResumeInfoContext);

  useEffect(() => {
    info?.skills.length > 0 && setSkillsList(info?.skills);
  }, []);

  function handleChange(index, name, value) {
    const newEntries = skillsList.slice();

    newEntries[index][name] = value;

    setSkillsList(newEntries);
  }

  function addSkills() {
    setSkillsList((prev) => [...prev, { ...formField, ids: Date.now() }]);
  }
  const handleDelete = (id) => {
    setSkillsList((prevList) => prevList.filter((skill) => skill.ids !== id));
  };
  function onSave() {
    setLoading(true);
    const data = {
      data: {
        skills: skillsList,
      },
    };

    updateResume(resumeId, data)
      .then((res) => {
        console.log(res);
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
        console.log(err);
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
      skills: skillsList,
    }));
  }, [skillsList]);

  return (
    <div>
      <h2 className="font-semibold text-center text-4xl border-b-2 w-fit mx-auto my-4">
        Skills
      </h2>
      <p className="font-light text-sm text-slate-300 text-center">
        Add your skills
      </p>
      <div>
        {skillsList.map((item, i) => (
          <div
            key={skillsList.ids}
            className="flex items-end justify-between mt-10 border-2 p-4 rounded-lg border-zinc-600"
          >
            <div className="flex justify-end">
              <Button
                className="bg-zinc-900"
                onClick={() => handleDelete(item.ids)}
              >
                <Trash2 />
              </Button>
            </div>
            <div>
              <label className="text-xs">Name</label>
              <Input
                className="border-none transition-all duration-300 focus-visible:ring-0 bg-rose-800 rounded-none"
                defaultValue={item.name}
                onChange={(e) => handleChange(i, "name", e.target.value)}
              />
            </div>
            <div>
              <Rating
                className="flex items-center"
                style={{ maxWidth: 200 }}
                value={item.rating}
                defaultValue={item.rating}
                onChange={(v) => handleChange(i, "rating", v)}
                itemStyles={myStyles}
              />
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-end gap-7 mt-4">
        <Button
          variant="outline"
          onClick={addSkills}
          className="bg-transparent hover:bg-rose-800 hover:border-rose-800 hover:text-white transition-all duration-500"
        >
          Add More Skills
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

export default Skills;
