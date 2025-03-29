import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import moment from "moment-timezone";

interface VisitorLocation {
	city: string;
	country: string;
	timestamp: number;
}

const LastVisit: React.FC = () => {
	const [lastVisit, setLastVisit] = useState<VisitorLocation | null>(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchLastVisit = async () => {
			try {
				const storedData = localStorage.getItem("lastVisitLocation");

				if (storedData) {
					setLastVisit(JSON.parse(storedData));
					setLoading(false);
				}

				try {
					const response = await fetch("/api/lastVisit");

					if (!response.ok) {
						throw new Error("Failed to fetch location data");
					}

					const data = await response.json();

					localStorage.setItem("lastVisitLocation", JSON.stringify(data));
					setLastVisit(data);
				} catch (error) {
					console.error("Error fetching location:", error);
				} finally {
					setLoading(false);
				}
			} catch (error) {
				console.error("Error in location handling:", error);
				setLoading(false);
			}
		};

		fetchLastVisit();
	}, []);

	if (loading) {
		return <span className="text-body text-xs">Loading location...</span>;
	}

	if (!lastVisit) {
		return <span className="text-body text-xs">Unknown location</span>;
	}

	const formattedDate = moment(lastVisit.timestamp).format("MMM D, YYYY");

	return (
		<motion.span
			className="text-body text-xs"
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			transition={{ duration: 0.3 }}>
			{lastVisit.city}, {lastVisit.country}
		</motion.span>
	);
};

export default LastVisit;
