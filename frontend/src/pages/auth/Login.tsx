import { useRef, useEffect } from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { motion, useInView } from "framer-motion";
import { CivicAuthProvider, UserButton, useUser } from "@civic/auth-web3/react";
import Animation from "@/assets/animation/Animation3.lottie";
import AnimationMobile from "@/assets/animation/Animation4.lottie";
import AppLayout from "@/layout/AppLayout";
import civicAuthLogo from "@/assets/image/civic-logo.png";

function Login() {
  const clientId = import.meta.env.VITE_CLIENT_ID;
  const { user } = useUser();

  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    console.log(user);
  }, [user]);

  const variants = {
    hidden: { opacity: 0, y: 100 },
    visible: { opacity: 1, y: 0 },
  };

  useEffect(() => {
    document.title = `GratiFi | Civic Login`;
  }, []);

  return (
    <CivicAuthProvider clientId={clientId}>
      <AppLayout menu={[]} canSignup={true}>
        <motion.section
          ref={ref}
          initial="hidden"
          variants={variants}
          animate={isInView ? "visible" : "hidden"}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <div className="w-screen h-screen px-[7.5%] pt-[100px] md:pt-[150px] pb-[50px] text-white">
            <div className="flex flex-col md:flex-row gap-[10px] justify-between h-full">
              <div className="flex md:hidden flex-1 items-center justify-center bounce-in-top">
                <DotLottieReact src={AnimationMobile} autoplay loop />
              </div>

              <div className="h-full flex flex-col flex-1 justify-start md:justify-center items-center md:items-start slide-in-right">
                <span className="text-[12px] text-main uppercase font-calSans tracking-wide mb-4 bg-black/10 px-4 py-1 rounded-full w-fit">
                  Secure Access
                </span>

                <h1 className="mb-6 leading-tight text-center md:text-left text-main text-[30px] md:text-[60px]">
                  Login with Ease, <br />
                  <span className="text-primary font-extrabold">
                    Powered by Civic
                  </span>
                </h1>

                <p className="bg-secondary text-main/70 text-lg mb-8 max-w-md text-center md:text-left">
                  Authenticate securely and seamlessly using your Civic
                  identity. No passwords, no friction — just tap and go.
                </p>

                <div className="w-fit">
                  <UserButton className="!text-main hover:!bg-primaryHover !transition-all !duration-300 !ease-in-out" />
                </div>
              </div>

              <div className="hidden md:flex flex-1 h-full items-center justify-center">
                <DotLottieReact src={Animation} autoplay loop />
              </div>
            </div>
            <div className="flex justify-center items-center gap-[10px]">
              <p className="text-main">Powered by</p>
              <img src={civicAuthLogo} alt="Civic Logo" className="h-[30px]" />
            </div>
          </div>
        </motion.section>
      </AppLayout>
    </CivicAuthProvider>
  );
}

export default Login;
