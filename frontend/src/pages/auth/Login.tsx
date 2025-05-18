import { useRef, useEffect } from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { motion, useInView } from "framer-motion";
import { CivicAuthProvider } from "@civic/auth/react";
import { configKeys } from "@/config";
import { CustomLoginBtn } from "@/components";
import Animation from "@/assets/animation/Animation3.lottie";
import AnimationMobile from "@/assets/animation/Animation4.lottie";
import OnboardingLayout from "@/layout/OnboardingLayout";
import civicAuthLogo from "@/assets/image/civic-logo.png";

function Login() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const variants = {
    hidden: { opacity: 0, y: 100 },
    visible: { opacity: 1, y: 0 },
  };

  useEffect(() => {
    document.title = `GratiFi | Civic Login`;
  }, []);

  return (
    <CivicAuthProvider clientId={configKeys.clientId}>
      <OnboardingLayout menu={[]} canSignup={true}>
        <motion.section
          ref={ref}
          initial="hidden"
          variants={variants}
          animate={isInView ? "visible" : "hidden"}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <div className="w-screen h-screen px-[7.5%] pt-[100px] md:pt-[150px] pb-[50px] text-white">
            <div className="flex flex-col md:flex-row gap-[10px] justify-between h-full">
              <div className="flex md:hidden h-[200px] items-center justify-center bounce-in-top mb-5">
                <DotLottieReact src={AnimationMobile} autoplay loop />
              </div>

              <div className="h-full flex flex-col flex-1 justify-start md:justify-center items-center md:items-start slide-in-right">
                <span className="text-[12px] text-main dark:text-primary uppercase font-calSans tracking-wide mb-4 bg-black/10 dark:bg-white/10 px-4 py-1 rounded-full w-fit">
                  Secure Access
                </span>

                <h1 className="mb-6 leading-tight text-center md:text-left text-main dark:text-primary text-[35px] md:text-[60px]">
                  Login with Ease, <br />
                  <span className="text-primary dark:text-main dark:bg-primary font-extrabold">
                    Powered by Civic
                  </span>
                </h1>

                <p className="bg-secondary dark:bg-transparent text-main/70 dark:text-primary/70 text-sm md:text-lg mb-8 max-w-md text-center md:text-left">
                  Authenticate securely and seamlessly using your Civic
                  identity. No passwords, no friction — just tap and go.
                </p>

                <div className="w-fit">
                  <CustomLoginBtn className="min-w-[150px] py-[0.75rem] px-[1rem] rounded-full border border-main dark:border-primary bg-transparent text-main dark:text-primary hover:bg-primaryHover dark:hover:bg-gray-800 hover:text-main transition-all duration-300 ease-in-out">
                    Login
                  </CustomLoginBtn>
                </div>
              </div>

              <div className="hidden md:flex flex-1 h-full items-center justify-center">
                <DotLottieReact src={Animation} autoplay loop />
              </div>
            </div>
            <div className="flex justify-center items-center gap-[10px]">
              <div className="flex justify-center items-center gap-[10px] dark:bg-white/40 px-5 py-1">
                <p className="text-[13px] md:text-base text-main dark:text-dark">
                  Powered by
                </p>
                <img
                  src={civicAuthLogo}
                  alt="Civic Logo"
                  className="h-[20px] md:h-[30px]"
                />
              </div>
            </div>
          </div>
        </motion.section>
      </OnboardingLayout>
    </CivicAuthProvider>
  );
}

export default Login;
