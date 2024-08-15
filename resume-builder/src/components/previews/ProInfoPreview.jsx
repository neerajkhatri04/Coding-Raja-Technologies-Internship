export const ProInfoPreview = ({ info }) => {
  return (
    <div>
      <h2 className="font-bold text-lg" style={{ color: info?.themeColor }}>
        Experience
      </h2>
      <hr
        className="border-[1.5px] mt-1 mb-2"
        style={{ borderColor: info?.themeColor }}
      />
      {info?.experience.map((experience, i) => (
        <div key={i} className="gap-3">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-semibold">{experience?.title}</h3>
            <p className="text-sm">
              {experience?.startDate} to{" "}
              {experience?.currentlyWorking ? "Present" : experience?.endDate}
            </p>
          </div>
          <h3 className="text-sm font-medium">
            {experience?.companyName}, {experience?.city}, {experience?.state}{" "}
          </h3>
          {/* <p className="text-xs mb-3">{experience.workSummery}</p>
           */}
          <div
            className="exp"
            dangerouslySetInnerHTML={{ __html: experience?.workSummery }}
          />
        </div>
      ))}
    </div>
  );
};
