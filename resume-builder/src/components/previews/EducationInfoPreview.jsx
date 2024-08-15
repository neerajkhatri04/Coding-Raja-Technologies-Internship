const EducationInfoPreview = ({ info }) => {
  return (
    <div>
      <h2 className="font-bold text-lg" style={{ color: info?.themeColor }}>
        Education
      </h2>
      <hr
        className="border-[1.5px] mt-1 mb-2"
        style={{ borderColor: info?.themeColor }}
      />

      {info?.education.map((education, i) => (
        <div key={i} className="gap-3">
          <h2 className="text-xl font-semibold">{education?.universityName}</h2>
          <div className="flex items-center justify-between">
            <h2 className="text-sm">
              {education?.degree} in {education?.major}
            </h2>
            <p className="text-xs">
              {education?.startDate} - {education?.endDate}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default EducationInfoPreview;
