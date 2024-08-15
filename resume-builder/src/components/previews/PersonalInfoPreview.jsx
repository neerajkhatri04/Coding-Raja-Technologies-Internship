const PersonalInfoPreview = ({ info }) => {
  return (
    <div>
      <h2
        className="font-bold text-xl text-center"
        style={{ color: info?.themeColor }}
      >
        {info?.firstName} {info?.lastName}
      </h2>
      <h2 className="text-center font-semibold">{info?.jobTitle}</h2>
      <h2 className="text-center font-light">{info?.address}</h2>

      <div className="flex justify-between w-full">
        <h2 className="font-light">{info?.phone}</h2>
        <h2 className="font-light">{info?.email}</h2>
      </div>
      <hr
        className="border-[1.5px] my-2"
        style={{ borderColor: info?.themeColor }}
      />
    </div>
  );
};

export default PersonalInfoPreview;
