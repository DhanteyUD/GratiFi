import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";

export const ScrollTriggeredAnimation = ({ children }) => {
	const ref = useRef(null);
	const isInView = useInView(ref, { triggerOnce: false });

	const variants = {
		hidden: { opacity: 0, y: 100 },
		visible: { opacity: 1, y: 0 },
	};

	return (
		<motion.section
			ref={ref}
			initial="hidden"
			variants={variants}
			animate={isInView ? "visible" : "hidden"}
			transition={{ duration: 1, ease: "easeOut" }}
		>
			{children}
		</motion.section>
	);
};
