import { useEffect, useState } from "react";
import { motion } from "framer-motion";
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
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-[12px] text-main uppercase font-calSans tracking-wide mb-4 bg-black/10 px-4 py-1 rounded-full w-fit"
          >
            Tips should be simple
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-5xl mb-6 leading-tight text-main"
          >
            Tip Effortlessly, <br />
            <span
              className={`${
                index === 0
                  ? "text-primary hover:bg-secondary hover:text-main"
                  : "text-main bg-secondary hover:bg-primaryHover"
              } font-extrabold transition-all duration-300 ease-in-out`}
            >
              Thank Generously
            </span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="text-main/70 text-lg mb-8 max-w-md"
          >
            Quick, secure, and heartfelt — showing your appreciation has never
            been easier.
          </motion.p>

          <motion.button
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.5 }}
            className={`${
              index === 0 ? "bg-secondary" : "bg-primary"
            } hover:bg-primaryHover transition-all duration-300 ease-in-out px-8 py-3 rounded-full text-main font-semibold font-calSans shadow-md w-fit`}
          >
            Start Tipping
          </motion.button>
        </div>

        <div className="flex-1 h-full flex items-center justify-center bounce-in-top">
          <div
            className={`${
              index === 0 ? "border-primary" : "border-main"
            } relative flex h-auto items-center justify-center overflow-hidden border border-b-[20px]`}
          >
            <img
              src={images[index]}
              alt="Tipping"
              className={`transition-opacity duration-500 ${
                isFading ? "opacity-0" : "opacity-100"
              }`}
            />

            <span
              className={`${
                index === 0 ? "bg-primary" : "bg-main"
              } absolute top-5 right-5 w-[30px] h-[30px] rounded-full`}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
