import { useRef } from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { motion, useInView } from "framer-motion";
import Animation from "@/assets/animation/Animation3.lottie";
import AppLayout from "@/layout/AppLayout";
import { CivicAuthProvider, UserButton } from "@civic/auth-web3/react";

function Login() {
  const clientId = import.meta.env.VITE_CLIENT_ID;
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const variants = {
    hidden: { opacity: 0, y: 100 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <AppLayout path={[]} canLogin={false} canSignup={true}>
      <motion.section
        ref={ref}
        initial="hidden"
        variants={variants}
        animate={isInView ? "visible" : "hidden"}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        <div className="w-screen h-screen px-[7.5%] pt-[150px] pb-[50px] text-white">
          <div className="flex gap-[10px] justify-between h-full">
            <div className="flex flex-1 border border-[red]">
              <CivicAuthProvider clientId={clientId}>
                <UserButton />
              </CivicAuthProvider>
            </div>
            <div className="flex flex-1">
              <DotLottieReact src={Animation} autoplay loop />
            </div>
          </div>
        </div>
      </motion.section>
    </AppLayout>
  );
}

export default Login;
