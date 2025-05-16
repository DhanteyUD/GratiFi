import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import Animation from "@/assets/animation/Animation8.lottie";

interface ScreenFallbackProps {
  message: string;
  subText: string;
}

function ScreenFallback({ message, subText }: ScreenFallbackProps) {
  return (
    <div className="flex h-full md:h-[calc(100vh-115px)] overflow-hidden justify-center items-center bg-white rounded-[20px] border border-primary">
      <div className="flex flex-col justify-center items-center">
        <div className="hidden md:flex flex-1 h-full items-center justify-center mb-5">
          <DotLottieReact src={Animation} autoplay loop />
        </div>
        <h1 className="text-[20px] font-calSans text-main">{message}</h1>
        <p className="text-main italic">{subText}</p>
      </div>
    </div>
  );
}

export default ScreenFallback;
