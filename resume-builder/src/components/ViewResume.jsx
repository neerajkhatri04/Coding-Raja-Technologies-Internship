import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import { Button } from "./ui/button";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import Preview from "./Preview";
import { getResume } from "@/service/globleApi";
import { useParams } from "react-router-dom";
import { RWebShare } from "react-web-share";

const ViewResume = () => {
  const [info, setInfo] = useState();
  const { resumeId } = useParams();

  useEffect(() => {
    getResumeInfo();
  }, []);

  const getResumeInfo = () => {
    getResume(resumeId).then((res) => {
      console.log(res.data.attributes);
      setInfo(res.data.attributes);
    });
  };

  function handleDownload() {
    window.print();
  }

  return (
    <ResumeInfoContext.Provider value={{ info }}>
      <div className="h-screen">
        <div id="no-print">
          <Navbar />
          <div>
            <h1 className="text-center text-2xl my-10">
              Your resume is ready to be shared🔥
            </h1>
            <div className="flex gap-10 justify-center">
              <Button
                onClick={handleDownload}
                className="bg-fuchsia-600 rounded-none hover:bg-fuchsia-800"
              >
                Download
              </Button>
              <RWebShare
                data={{
                  text: "Hello guys, this is my resume",
                  url:
                    import.meta.VITE_BASE_URL +
                    "/my-resume/" +
                    resumeId +
                    "/view",
                  title: info?.firstName + " " + info?.lastName + " Resume",
                }}
                onClick={() => console.log("shared successfully!")}
              >
                <Button className="bg-fuchsia-600 rounded-none hover:bg-fuchsia-800">
                  Share
                </Button>
              </RWebShare>
            </div>
          </div>
        </div>
        <div id="print-area">
          <Preview />
        </div>
      </div>
    </ResumeInfoContext.Provider>
  );
};

export default ViewResume;
