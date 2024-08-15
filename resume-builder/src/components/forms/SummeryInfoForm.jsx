import { useContext, useState } from "react";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import { updateResume } from "@/service/globleApi";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import { BrainCircuit, Loader } from "lucide-react";
import { chatSession } from "@/service/aiModel";

const SummeryInfoForm = ({ enableNext }) => {
  const { info, setInfo } = useContext(ResumeInfoContext);
  const [loading, setLoading] = useState(false);
  const params = useParams();
  const [aiSummery, setAiSummery] = useState();

  const prompt =
    "Job title: {jobTitle}, generate 3 summery in 4 to 5 line each for my resume based on my Job Title in JSON format with field values experienceLevel and summery on experienceLevel 'Fresher', 'Intermediate' and 'Expert'";

  function handleTextChange(e) {
    console.log(e.target);
    const { name, value } = e.target;
    console.log(name, value);
    setInfo((prevInfo) => ({ ...prevInfo, [name]: value }));
  }

  function handleFormSubmit(e) {
    e.preventDefault();
    setLoading(true);
    const data = {
      data: {
        summery: info?.summery,
      },
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

  async function generateSummeryFromAI() {
    setLoading(true);
    const PROMPT = prompt.replace("{jobTitle}", info?.jobTitle);
    console.log(PROMPT);
    const result = await chatSession.sendMessage(PROMPT);
    console.log(JSON.parse(result.response.text()));
    setAiSummery(JSON.parse(result.response.text()));
    setLoading(false);
  }

  return (
    <div>
      <h2 className="font-semibold text-center text-4xl border-b-2 w-fit mx-auto my-4 mb-7">
        Tell About Yourself
      </h2>
      <form onSubmit={handleFormSubmit}>
        <div className="flex items-end justify-between">
          <label className="text-slate-300">Add summery</label>
          <Button
            type="button"
            variant="outline"
            onClick={generateSummeryFromAI}
            className="bg-transparent flex gap-3 border-rose-500 hover:border-rose-500 hover:text-white hover:bg-rose-500 transition-all duration-300 rounded-none"
          >
            <BrainCircuit /> Quick Generate with AI
          </Button>
        </div>
        <Textarea
          className="mt-3 bg-rose-800 border-none rounded-none placeholder:text-slate-300 min-h-[30vh]"
          name="summery"
          value={info.summery}
          placeholder="Write here.."
          onChange={handleTextChange}
        />
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
      {aiSummery && (
        <div>
          <h2 className="font-bold text-xl my-3 text-center">
            Suggestions for {info?.jobTitle}
          </h2>
          <hr className="h-1 border-rose-800 bg-rose-800 mb-3" />
          {aiSummery.summaries.map((item, index) => (
            <div key={index} className="text-sm text-slate-300 mb-2">
              <h2 className="font-semibold text-emerald-500 text-lg">
                {item.experienceLevel} :
              </h2>
              <p className="font-light">{item.summary}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SummeryInfoForm;
