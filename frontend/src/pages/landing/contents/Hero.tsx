// import { DotLottieReact } from "@lottiefiles/dotlottie-react";
// import walletAnimation from "@/assets/animation/wallet.json";
import image from "@/assets/animation/realmoney-tip.gif";

function Hero() {
  return (
    <section className="w-full h-screen px-[7.5%] pt-[150px] pb-[50px] text-white">
      <div className="w-full h-full flex justify-between items-center rounded-[15px] gap-5">
        <div className="h-full flex flex-col flex-1 justify-center">
          <span className="text-[12px] text-main uppercase font-calSans tracking-wide mb-4 bg-black/10 px-4 py-1 rounded-full w-fit">
            Tips should be simple
          </span>
          <h1 className="text-5xl mb-6 leading-tight text-main">
            Tip Effortlessly, <br />{" "}
            <span className="text-primary hover:text-secondary font-extrabold transition-all duration-300 ease-in-out">
              Thank Generously
            </span>
          </h1>
          <p className="text-main/70 text-lg mb-8 max-w-md">
            Quick, secure, and heartfelt — showing your appreciation has never
            been easier.
          </p>
          <button className="bg-secondary hover:bg-primaryHover transition duration-300 ease-in-out px-8 py-3 rounded-full text-main font-semibold font-calSans shadow-md w-fit">
            Start Tipping
          </button>
        </div>

        <div className="flex-1 h-full flex items-center justify-center border border-[pink]">
          <div className="flex items-center justify-center border border-pink-400/30 text-white/50 text-xl font-light overflow-hidden">
            <img src={image} alt="Hero image" />
            {/* <DotLottieReact
              src="@/assets/animation/wallet.lottie"
              loop
              autoplay
            /> */}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
