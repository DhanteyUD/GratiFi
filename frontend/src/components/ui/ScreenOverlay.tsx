import gratifiIcon from "@/assets/image/gratifi-loading.png";

export default function ScreenOverlay({ message = "Loading... Please wait" }) {
  return (
    <div
      className="fixed w-full top-0 left-0 h-screen z-1000 flex justify-center items-center bg-primary/70"
      style={{
        zIndex: 9999,
      }}
    >
      <div className="p-6 w-auto gap-5 flex justify-center items-center flex-col">
        <div className="relative w-[100px] h-[100px]">
          <img src={gratifiIcon} alt="GratiFi loading icon" />
          <span className="absolute w-4 h-4 rounded-full bg-secondary top-0 right-[15px] animate-bounce" />
        </div>
        <p className="text-main text-[20px] text-center font-calSans">{message}</p>
      </div>
    </div>
  );
}
