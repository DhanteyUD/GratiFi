import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import AppLayout from "@/layout/AppLayout";

function Login() {
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
        <div className="w-screen h-screen px-[7.5%] pt-[150px] pb-[50px] text-white bg-[pink] border border-[red]">
          <div className="bg-[orange] h-full">Login</div>
        </div>
      </motion.section>
    </AppLayout>
  );
}

export default Login;
