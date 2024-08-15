const SkillsInfoPreview = ({ info }) => {
  return (
    <div>
      <h2 className="font-bold text-lg" style={{ color: info?.themeColor }}>
        Education
      </h2>
      <hr
        className="border-[1.5px] mt-1 mb-2"
        style={{ borderColor: info?.themeColor }}
      />
      <div className="grid grid-cols-2  gap-2">
        {info?.skills.map((skill, i) => (
          <div key={i} className="flex items-center justify-between my-1">
            <h2 className="text-xs">{skill.name}</h2>
            <div className="h-2 bg-gray-200 w-[120px]">
              <div
                className="h-2"
                style={{
                  backgroundColor: `${info?.themeColor}`,
                  width: `${skill?.rating * 20}%`,
                }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SkillsInfoPreview;
