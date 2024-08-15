import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import { useContext } from "react";
import PersonalInfoPreview from "./previews/PersonalInfoPreview";
import SummeryInfoPreview from "./previews/SummeryInfoPreview";
import { ProInfoPreview } from "./previews/ProInfoPreview";
import EducationInfoPreview from "./previews/EducationInfoPreview";
import SkillsInfoPreview from "./previews/SkillsInfoPreview";

const Preview = () => {
  const { info, setInfo } = useContext(ResumeInfoContext);
  console.log(info);
  return (
    <div
      className="h-full text-black shadow-lg bg-white p-10 border-t-[20px]"
      style={{
        borderColor: `${info?.themeColor}`,
      }}
    >
      <PersonalInfoPreview info={info} />
      <SummeryInfoPreview info={info} />
      <ProInfoPreview info={info} />
      <EducationInfoPreview info={info} />
      <SkillsInfoPreview info={info} />
    </div>
  );
};

export default Preview;
