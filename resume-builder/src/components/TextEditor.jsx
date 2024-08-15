import { useContext, useState } from "react";
import {
  BtnBold,
  BtnBulletList,
  BtnClearFormatting,
  BtnItalic,
  BtnLink,
  BtnNumberedList,
  BtnRedo,
  BtnStrikeThrough,
  BtnStyles,
  BtnUnderline,
  BtnUndo,
  Editor,
  EditorProvider,
  HtmlButton,
  Separator,
  Toolbar,
} from "react-simple-wysiwyg";
import { Button } from "./ui/button";
import { Brain, Loader } from "lucide-react";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import { toast } from "sonner";
import { chatSession } from "@/service/aiModel";

const PROMPT =
  "title: {positionTitle}, title: developer, Based on the title, provide the work experience , for a company in bullet points for my resume (in HTML format). Result should only use ul and li tags, not in json format";

const TextEditor = ({ onTextEditorChange, index, defaultValue }) => {
  const [value, setValue] = useState(defaultValue);
  const { info, setInfo } = useContext(ResumeInfoContext);
  const [loading, setLoading] = useState(false);
  const generateSummeryFromAI = async () => {
    setLoading(true);
    if (!info.experience[index].title) {
      toast.error(
        "Please enter the position title to generate work experience"
      );
      return;
    }

    const prompt = PROMPT.replace(
      "{positionTitle}",
      info.experience[index].title
    );
    console.log(`title ${index}`, prompt);
    const result = await chatSession.sendMessage(prompt);
    console.log(result.response.text());
    setValue(result.response.text().replace("[", "").replace("]", ""));
    setLoading(false);
  };

  return (
    <div>
      <div className="flex justify-end my-5">
        <Button
          onClick={generateSummeryFromAI}
          variant="outline"
          className="flex gap-2 border border-red-300 text-white rounded-none bg-transparent transition-all duration-300"
        >
          {loading ? (
            <Loader className="animate-spin" />
          ) : (
            <>
              <Brain className="h-4" />
              <p>Generate with A.I</p>
            </>
          )}
        </Button>
      </div>
      <EditorProvider>
        <Editor
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
            onTextEditorChange(e);
          }}
        >
          <div className="text-zinc-900">
            <Toolbar>
              <BtnUndo />
              <BtnRedo />
              <Separator />
              <BtnBold />
              <BtnItalic />
              <BtnUnderline />
              <BtnStrikeThrough />
              <Separator />
              <BtnNumberedList />
              <BtnBulletList />
              <Separator />
              {/* <BtnLink /> */}
            </Toolbar>
          </div>
        </Editor>
      </EditorProvider>
    </div>
  );
};

export default TextEditor;
