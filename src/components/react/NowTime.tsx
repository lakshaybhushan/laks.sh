import React, { useState, useEffect, Suspense } from "react";
import moment from "moment-timezone";
import { getTimeOfDay } from "../../utils/getTime";
import { motion, AnimatePresence } from "framer-motion";

const NowTime: React.FC = () => {
	const variants = {
		initial: { opacity: 0 },
		animate: { opacity: 1 },
		exit: { opacity: 0 },
	};

	const [location, setLocation] = useState<string>("Loading...");
	const [time, setTime] = useState<moment.Moment | null>(null);
	const [timeOfDay, setTimeOfDay] = useState<string>("");

	useEffect(() => {
		const fetchLocationAndTime = async () => {
			try {
				const locationData = { city: "New Delhi", timeZone: "Asia/Kolkata" };
				const currentTime = moment().tz(locationData.timeZone);
				setLocation(locationData.city);
				setTime(currentTime);
				setTimeOfDay(getTimeOfDay(currentTime));
			} catch (error) {
				console.error("Error fetching location or time:", error);
			}
		};

		fetchLocationAndTime();
	}, []);

	const renderSvg = () => {
		switch (timeOfDay) {
			case "morning":
				return (
					<img
						src="/daytime-icons/morning.svg"
						alt="Morning Icon"
						width={12}
						height={12}
					/>
				);
			case "afternoon":
				return (
					<img
						src="/daytime-icons/afternoon.svg"
						alt="Afternoon Icon"
						width={12}
						height={13}
					/>
				);
			case "evening":
				return (
					<img
						src="/daytime-icons/evening.svg"
						alt="Evening Icon"
						width={12}
						height={13}
					/>
				);
			case "night":
				return (
					<img
						src="/daytime-icons/night.svg"
						alt="Night Icon"
						width={12}
						height={12}
					/>
				);
			default:
				return null;
		}
	};
	return (
		<AnimatePresence>
			<motion.div
				key={`${location}-${timeOfDay}`}
				className="flex items-center gap-2"
				variants={variants}
				initial="initial"
				animate="animate"
				exit="exit"
				transition={{ duration: 0.3 }}>
				<motion.div
					initial={{ scale: 0, opacity: 0 }}
					animate={{ scale: 1, opacity: 1 }}
					transition={{ duration: 0.3, delay: 0.1 }}>
					<Suspense fallback={<div>Loading...</div>}>{renderSvg()}</Suspense>
				</motion.div>
				{time && (
					<motion.span
						className="text-xs text-body transition duration-150"
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ duration: 0.3, delay: 0.25 }}>
						{location}, {time.format("h")}
						<motion.span
							className="animate-pulse"
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							transition={{
								duration: 0.5,
								repeat: Infinity,
								repeatType: "reverse",
							}}>
							:
						</motion.span>
						{time.format("mm A")}
					</motion.span>
				)}
			</motion.div>
		</AnimatePresence>
	);
};

export default NowTime;
