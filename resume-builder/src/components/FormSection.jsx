import { ArrowLeft, ArrowRight, Home } from "lucide-react";
import PersonalInfoForm from "./forms/PersonalInfoForm";
import { Button } from "./ui/button";
import { useState } from "react";
import SummeryInfoForm from "./forms/SummeryInfoForm";
import ExperienceInfoForm from "./forms/ExperienceInfoForm";
import EducationInfoForm from "./forms/EducationInfoForm";
import Skills from "./forms/Skills";
import { Link, Navigate, useParams } from "react-router-dom";
import ThemeColor from "./ThemeColor";

const FormSection = () => {
  const [activeForm, setActiveForm] = useState(1);
  const [enableNext, setEnableNext] = useState(false);

  const { resumeId } = useParams();
  return (
    <div>
      <div className="w-full flex justify-between items-center">
        <div className=" w-full flex justify-between my-5">
          <Link to="/dashboard">
            <Button size="sm" className="rounded-none">
              <Home />
            </Button>
          </Link>
          <ThemeColor />
          <div className="flex gap-4">
            {activeForm > 1 && (
              <Button
                size="sm"
                className="rounded-none"
                onClick={() =>
                  activeForm <= 1
                    ? setActiveForm(1)
                    : setActiveForm(activeForm - 1)
                }
              >
                <ArrowLeft />
              </Button>
            )}
            <Button
              size="sm"
              className="rounded-none"
              onClick={() => setActiveForm(activeForm + 1)}
              disabled={!enableNext}
            >
              <ArrowRight />
            </Button>
          </div>
        </div>
      </div>
      {activeForm == 1 && (
        <PersonalInfoForm enableNext={(x) => setEnableNext(x)} />
      )}
      {activeForm == 2 && (
        <SummeryInfoForm enableNext={(x) => setEnableNext(x)} />
      )}
      {activeForm == 3 && (
        <ExperienceInfoForm enableNext={(x) => setEnableNext(x)} />
      )}
      {activeForm == 4 && (
        <EducationInfoForm enableNext={(x) => setEnableNext(x)} />
      )}
      {activeForm == 5 && <Skills enableNext={(x) => setEnableNext(x)} />}
      {activeForm == 6 && <Navigate to={"/my-resume/" + resumeId + "/view"} />}
    </div>
  );
};

export default FormSection;
