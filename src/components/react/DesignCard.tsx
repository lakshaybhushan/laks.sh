"use client";

import { useState, useEffect } from "react";
import { ProgressiveBlur } from "./ProgressiveBlur";
import { motion } from "framer-motion";
import designsData from "../../constants/designs.json";

interface DesignCardProps {
	title: string;
	description: string;
	imageUrl: string;
}

export function DesignCard({ title, description, imageUrl }: DesignCardProps) {
	const [isHover, setIsHover] = useState(false);
	const [textColorClass, setTextColorClass] = useState("text-white");

	useEffect(() => {
		const matchingDesign = designsData.find((design) => design.title === title || design.imageUrl === imageUrl);

		if (matchingDesign && matchingDesign.color) {
			setTextColorClass(matchingDesign.color === "dark" ? "text-white" : "text-black");
		}
	}, [title, imageUrl]);

	return (
		<div
			className="group border-body/20 relative mt-2 h-full overflow-hidden rounded-lg border"
			onMouseEnter={() => setIsHover(true)}
			onMouseLeave={() => setIsHover(false)}>
			<img
				src={imageUrl}
				alt={title}
				className="cursor-pointer transition-all duration-300 ease-in-out group-hover:scale-105"
			/>
			<ProgressiveBlur
				className="pointer-events-none absolute bottom-0 left-0 h-[75%] w-full"
				blurIntensity={0.5}
				animate={isHover ? "visible" : "hidden"}
				variants={{
					hidden: { opacity: 0 },
					visible: { opacity: 1 },
				}}
				transition={{ duration: 0.2, ease: "easeOut" }}
			/>
			<motion.div
				className="absolute bottom-0 left-0"
				animate={isHover ? "visible" : "hidden"}
				variants={{
					hidden: { opacity: 0 },
					visible: { opacity: 1 },
				}}
				transition={{ duration: 0.2, ease: "easeOut" }}>
				<div className="flex flex-col items-start gap-0 px-5 py-4">
					<p className={`text-sm font-medium ${textColorClass}`}>{title}</p>
					<span className={`text-sm ${textColorClass}`}>{description}</span>
				</div>
			</motion.div>
		</div>
	);
}
