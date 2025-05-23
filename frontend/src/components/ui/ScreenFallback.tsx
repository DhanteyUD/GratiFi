import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import Animation from "@/assets/animation/Animation8.lottie";

interface ScreenFallbackProps {
  message: string;
  subText: string;
}

function ScreenFallback({ message, subText }: ScreenFallbackProps) {
  return (
    <div className="flex h-[calc(100vh-200px)] md:h-[calc(100vh-115px)] overflow-hidden justify-center items-center md:bg-white md:dark:bg-dark3 rounded-[20px] md:border md:border-primary dark:border-main">
      <div className="flex flex-col justify-center items-center">
        <div className="hidden md:flex flex-1 h-full items-center justify-center mb-5">
          <DotLottieReact src={Animation} autoplay loop />
        </div>
        <h1 className="text-center text-[14px] md:text-[20px] font-calSans text-main dark:text-primary">{message}</h1>
        <p className="text-main dark:text-primary/50 italic text-[12px] md:text-base">{subText}</p>
      </div>
    </div>
  );
}

export default ScreenFallback;
