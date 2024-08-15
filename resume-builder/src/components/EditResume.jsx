import { useParams } from "react-router-dom";
import FormSection from "./FormSection";
import Preview from "./Preview";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import dummy from "./dummy";
import { useEffect, useState } from "react";
import { getResume } from "@/service/globleApi";

const EditResume = () => {
  const { resumeId } = useParams();
  // console.log(params);
  const [info, setInfo] = useState();

  useEffect(() => {
    getResumeInfo();
  }, []);

  const getResumeInfo = () => {
    getResume(resumeId).then((res) => {
      console.log(res.data.attributes);
      setInfo(res.data.attributes);
    });
  };

  return (
    <ResumeInfoContext.Provider value={{ info, setInfo }}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 container min-h-screen">
        <FormSection />
        <Preview />
      </div>
    </ResumeInfoContext.Provider>
  );
};

export default EditResume;
