const CustomSpinner = ({ theme = "#ffffff" }) => {
  const sharedClasses =
    "absolute inset-[-4px] rounded-full border-[4px] border-transparent";

  return (
    <div className="flex justify-center">
      <div
        className={`relative w-[25px] aspect-square rounded-full border-[4px] border-transparent animate-spin-layer`}
        style={{ borderRightColor: theme }}
      >
        <div
          className={`${sharedClasses} animate-spin-layer-slow`}
          style={{ borderRightColor: theme }}
        />
        <div
          className={`${sharedClasses} animate-spin-layer-slower`}
          style={{ borderRightColor: theme }}
        />
      </div>
    </div>
  );
};

export default CustomSpinner;
