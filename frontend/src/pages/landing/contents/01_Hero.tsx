import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import Animation from "@/assets/animation/Animation1.lottie";
import fakeMoneyImage from "@/assets/animation/fakemoney-tip.gif";
import realMoneyImage from "@/assets/animation/realmoney-tip.gif";

function Hero() {
  const navigate = useNavigate();
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
    <section className="w-full h-screen px-[7.5%] pt-[100px] md:pt-[200px] pb-[50px]">
      <div className="w-full h-full flex flex-col md:flex-row justify-between items-center rounded-[15px] gap-5">
        <div className="flex md:hidden flex-1 items-center justify-center bounce-in-top">
          <DotLottieReact src={Animation} autoplay loop />
        </div>

        <div className="h-full flex flex-col flex-1 justify-start md:justify-center items-center md:items-start">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-[10px] md:text-[12px] text-main dark:text-primary uppercase font-calSans tracking-wide mb-4 bg-black/10 dark:bg-white/10 px-4 py-1 rounded-full w-fit"
          >
            Tips should be simple
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="mb-6 leading-tight text-center md:text-left text-main dark:text-primary text-[35px] md:text-[60px]"
          >
            Tip Effortlessly, <br />
            <span
              className={`${
                index === 0
                  ? "text-primary  dark:text-secondary hover:bg-secondary dark:hover:bg-main hover:text-main"
                  : "text-main bg-secondary hover:bg-primaryHover dark:hover:bg-primary"
              } font-extrabold transition-all duration-300 ease-in-out text-center md:text-left`}
            >
              Thank Generously
            </span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="text-main/70 dark:text-primary/70 text-sm md:text-lg mb-8 max-w-md text-center md:text-left"
          >
            Quick, secure, and heartfelt — showing your appreciation has never
            been easier.
          </motion.p>

          <motion.button
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.5 }}
            onClick={() => navigate("/login")}
            className={`${
              index === 0 ? "bg-secondary dark:bg-primary" : "bg-primary dark:bg-main dark:text-primary"
            } hover:bg-primaryHover transition-all duration-300 text-[14px] md:text-base ease-in-out px-8 py-3 rounded-full text-main font-semibold font-calSans shadow-md w-fit`}
          >
            Start Tipping
          </motion.button>
        </div>

        <div className="hidden md:flex flex-1 h-full items-center justify-center bounce-in-top">
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
