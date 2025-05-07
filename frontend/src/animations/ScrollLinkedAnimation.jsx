import React from "react";
import { motion, useScroll, useSpring } from "framer-motion";

export const ScrollLinkedAnimation = () => {
	const { scrollYProgress } = useScroll();

	const scaleX = useSpring(scrollYProgress, {
		stiffness: 100,
		damping: 30,
		restDelta: 0.001,
	});

	return <motion.div className="app-scroll-bar" style={{ scaleX }} />;
};
