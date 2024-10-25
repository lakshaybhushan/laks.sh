const getRandomDelay = () => Math.random() * 0.5;

export const messageVariants = {
	initial: { opacity: 0, y: 20, scale: 0.9 },
	animate: {
		opacity: 1,
		y: 0,
		scale: 1,
		transition: { type: "spring", stiffness: 260, damping: 20 },
	},
	exit: {
		opacity: 0,
		scale: 0.8,
		transition: { duration: 0.2 },
	},
};

export const greetingVariants = {
	initial: { opacity: 0, y: 50, scale: 0.7 },
	animate: {
		opacity: 1,
		y: 0,
		scale: 1,
		transition: {
			type: "spring",
			stiffness: 200,
			damping: 20,
			delay: 0.2,
		},
	},
	exit: {
		opacity: 0,
		y: -20,
		scale: 0.9,
		transition: { duration: 0.3 },
	},
};

export const containerVariants = {
	hidden: { opacity: 0 },
	visible: {
		opacity: 1,
		transition: { staggerChildren: 0.2 },
	},
	exit: { opacity: 0 },
};

export const buttonVariants = {
	hidden: { opacity: 0, filter: "blur(10px)" },
	visible: (i: number) => ({
		opacity: 1,
		filter: "blur(0px)",
		transition: {
			delay: i * 0.2 + getRandomDelay(),
			duration: 0.5,
		},
	}),
	exit: { opacity: 0, filter: "blur(10px)" },
};
