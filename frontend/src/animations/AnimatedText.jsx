import React from "react";
import { motion } from "framer-motion";

const AnimatedText = ({
	el: Element = "h2",
	text,
	className,
	repeatDelay = 10000,
}) => {
	const sentence = {
		hidden: { opacity: 1 },
		visible: {
			opacity: 1,
			transition: {
				delay: 0.5,
				ease: "easeOut",
				repeat: Infinity,
				staggerChildren: 0.1,
				repeatDelay: repeatDelay / 1000,
			},
		},
	};

	const letter = {
		hidden: { opacity: 0, y: 50 },
		visible: { opacity: 1, y: 0 },
		transition: {
			duration: 0.5,
			ease: "easeOut",
		},
	};

	return (
		<motion.div
			className={className}
			variants={sentence}
			initial="hidden"
			animate="visible"
		>
			<Element>
				{text.map((part, index) =>
					part === "\n" ? (
						<br key={index} />
					) : (
						<React.Fragment key={index}>
							{part.split("").map((char, charIndex) => (
								<motion.span key={charIndex} variants={letter}>
									{char}
								</motion.span>
							))}
						</React.Fragment>
					)
				)}
			</Element>
		</motion.div>
	);
};

export default AnimatedText;
