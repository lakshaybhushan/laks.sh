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
			console.log("[CLIENT] Starting location data fetch process");
			try {
				const storedData = localStorage.getItem("lastVisitLocation");
				const CACHE_TTL = 24 * 60 * 60 * 1000; // 24 hours cache TTL
				let shouldFetchFromApi = true;

				if (storedData) {
					console.log("[CLIENT] Found data in localStorage");
					const parsedData = JSON.parse(storedData) as VisitorLocation;
					setLastVisit(parsedData);
					setLoading(false);

					// Only fetch from API if stored data is older than the TTL
					if (parsedData.timestamp && Date.now() - parsedData.timestamp < CACHE_TTL) {
						console.log("[CLIENT] Using cached data (less than 24h old)");
						shouldFetchFromApi = false;
					} else {
						console.log("[CLIENT] Cached data is stale (older than 24h)");
					}
				} else {
					console.log("[CLIENT] No data found in localStorage");
				}

				if (shouldFetchFromApi) {
					console.log("[CLIENT] Fetching fresh data from API");
					try {
						const response = await fetch("/api/lastVisit");

						if (!response.ok) {
							console.error("[CLIENT] API response not OK:", response.status, response.statusText);
							throw new Error("Failed to fetch location data");
						}

						const data = await response.json();
						console.log("[CLIENT] Received API response:", data);

						localStorage.setItem("lastVisitLocation", JSON.stringify(data));
						console.log("[CLIENT] Saved new data to localStorage");
						setLastVisit(data);
					} catch (error) {
						console.error("[CLIENT] Error fetching location:", error);
					} finally {
						setLoading(false);
					}
				}
			} catch (error) {
				console.error("[CLIENT] Error in location handling:", error);
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
