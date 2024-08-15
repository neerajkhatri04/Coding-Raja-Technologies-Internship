import { getResumes } from "@/service/globleApi";
import { AddResume } from "./AddResume";
import { useEffect, useLayoutEffect, useState } from "react";
import { useUser } from "@clerk/clerk-react";
import ResumeItem from "./ResumeItem";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import SplitType from "split-type";

gsap.registerPlugin(useGSAP);

export const Dashboard = () => {
  // const container = useRef();
  useGSAP(
    () => {
      const tl = gsap.timeline({});

      let text = new SplitType(".allResumeText");
      tl.from(".mask", {
        height: 0,
        opacity: 0,
        duration: 1,
        ease: "easeIn",
        stagger: 0.1,
      }).from(
        ".allResumeText",
        {
          y: 100,
          opacity: 0,
          duration: 1,
          ease: "easeIn",
          stagger: 0.1,
        },
        "<"
      );
    }
    // { scope: container }
  );

  const { user } = useUser();
  const [resumeList, setResumeList] = useState(null);

  useEffect(() => {
    user &&
      getResumes(user?.primaryEmailAddress.emailAddress)
        .then((res) => {
          setResumeList(res.data);
          console.log(res.data);
        })
        .catch((err) => console.error(err));
  }, [user]);

  return (
    <div className="p-10 min-h-screen">
      <div className="mask overflow-hidden">
        <h1 className="allResumeText text-center text-6xl font-extralight tracking-tighter mb-5">
          Your Resume
        </h1>
      </div>
      {/* Render resume components here */}
      <AddResume />
      <div className="grid grid-flow-row grid-cols-2 mg:grid-col-3 lg:grid-cols-4 gap-5">
        {resumeList?.map((item, id) => (
          <ResumeItem key={id} data={item} />
        ))}
      </div>
    </div>
  );
};
