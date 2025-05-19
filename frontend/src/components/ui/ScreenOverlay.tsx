import gratifiIcon from "@/assets/image/gratifi-loading.png";

export default function ScreenOverlay({ message = "Loading... Please wait" }) {
  return (
    <div
      className="fixed w-full top-0 left-0 h-screen z-1000 flex justify-center items-center bg-primary/70 dark:bg-main/70"
      style={{
        zIndex: 9999,
      }}
    >
      <div className="p-6 w-auto gap-5 flex justify-center items-center flex-col">
        <div className="relative w-[50px] md:w-[100px] h-[50px] md:h-[100px]">
          <img
            src={gratifiIcon}
            alt="GratiFi loading icon"
            className="animate-pulse md:animate-none"
          />
          <span className="absolute w-2 md:w-4 h-2 md:h-4 rounded-full bg-secondary top-0 right-[7px] md:right-[15px] animate-bounce" />
        </div>
        <p className="text-main dark:text-white text-[14px] md:text-[20px] text-center font-calSans">
          {message}
        </p>
      </div>
    </div>
  );
}
