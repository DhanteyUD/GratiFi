import { useEffect, useState } from "react";
import fakeMoneyImage from "@/assets/animation/fakemoney-tip.gif";
import realMoneyImage from "@/assets/animation/realmoney-tip.gif";

function Hero() {
  const images = [fakeMoneyImage, realMoneyImage];
  const [index, setIndex] = useState(0);
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsFading(true);

      setTimeout(() => {
        setIndex((prev) => (prev + 1) % images.length);
        setIsFading(false);
      }, 500);
    }, 10000);

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <section className="w-full h-screen px-[7.5%] pt-[150px] pb-[50px] text-white">
      <div className="w-full h-full flex justify-between items-center rounded-[15px] gap-5">
        <div className="h-full flex flex-col flex-1 justify-center">
          <span className="text-[12px] text-main uppercase font-calSans tracking-wide mb-4 bg-black/10 px-4 py-1 rounded-full w-fit">
            Tips should be simple
          </span>
          <h1 className="text-5xl mb-6 leading-tight text-main">
            Tip Effortlessly, <br />
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

        <div className="flex-1 h-full flex items-center justify-center">
          <div className="relative flex h-auto items-center justify-center overflow-hidden border border-b-[20px] border-main">
            <img
              src={images[index]}
              alt="Tipping"
              className={`transition-opacity duration-500 ${
                isFading ? "opacity-0" : "opacity-100"
              }`}
            />

            <span className="absolute top-5 right-5 w-[30px] h-[30px] rounded-full bg-main" />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
