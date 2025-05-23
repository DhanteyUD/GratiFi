import { useNavigate } from "react-router-dom";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import Animation from "@/assets/animation/Animation5.lottie";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="h-screen flex flex-col justify-center items-center gap-4 px-4 dark:bg-dark3">
      <div className="flex flex-col justify-center items-center w-full md:w-[40%]">
        <DotLottieReact src={Animation} autoplay loop />
      </div>

      <div className="flex flex-col items-center justify-center gap-10">
        <p className="fade-in text-base text-main dark:text-primary font-jetBrains">Page not found</p>

        <button
          onClick={() => navigate(-1)}
          className="px-6 py-2 rounded-full border bg-primary dark:bg-main/50 border-main dark:border-main/50 text-main dark:text-primary font-jetBrains transition-all duration-300 ease-in-out hover:bg-main hover:text-white"
        >
          Go Back
        </button>
      </div>
    </div>
  );
}
