import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import AppLayout from "@/layout/AppLayout";

function Login() {
  const ref = useRef(null);
  const isInView = useInView(ref);

  const variants = {
    hidden: { opacity: 0, y: 100 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <AppLayout path={[]} canLogin={true} canSignup={true}>
      <motion.section
        ref={ref}
        initial="hidden"
        variants={variants}
        animate={isInView ? "visible" : "hidden"}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        <div>login</div>
      </motion.section>
    </AppLayout>
  );
}

export default Login;
