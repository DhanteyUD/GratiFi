import { useNavigate } from "react-router-dom";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import Animation from "@/assets/animation/Animation5.lottie";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="h-screen flex flex-col justify-center items-center gap-4 px-4">
      <div className="flex flex-col justify-center items-center w-full md:w-[40%]">
        <DotLottieReact src={Animation} autoplay loop />
      </div>

      <div className="flex flex-col items-center justify-center gap-10">
        <p className="fade-in text-lg text-main font-calSans">Page not found</p>

        <button
          onClick={() => navigate(-1)}
          className="px-6 py-2 rounded-full border bg-primary border-main text-main font-calSans transition-all duration-300 ease-in-out hover:bg-main hover:text-white"
        >
          Go Back
        </button>
      </div>
    </div>
  );
}
