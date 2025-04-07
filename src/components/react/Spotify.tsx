import { useEffect, useState } from "react";
import { FaSpotify } from "react-icons/fa6";
import { motion, AnimatePresence } from "framer-motion";
import { RiArrowRightUpLine } from "react-icons/ri";

const variants = {
	initial: { opacity: 0, y: 20 },
	animate: { opacity: 1, y: 0 },
	exit: { opacity: 0, y: -20 },
};

const SpotifyNowPlaying = () => {
	const [loading, setLoading] = useState(true);
	const [result, setResult] = useState({
		albumImageUrl: "",
		artist: "No Artist",
		isPlaying: false,
		songUrl: "",
		title: "No Title",
		blurDataURL: "",
	});
	const [_, setImageLoaded] = useState(false);
	const [imageVisible, setImageVisible] = useState(false);

	const fetchNowPlaying = async () => {
		try {
			const response = await fetch("/api/nowPlaying");
			if (!response.ok) {
				throw new Error("Failed to fetch now playing data");
			}
			const data = await response.json();
			setResult(data);
		} catch (error) {
			console.error("Error fetching now playing item:", error);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchNowPlaying();

		const pollingInterval = setInterval(() => {
			fetchNowPlaying();
		}, 3500);

		return () => {
			clearInterval(pollingInterval as NodeJS.Timeout);
		};
	}, []);

	useEffect(() => {
		setImageLoaded(false);
		setImageVisible(false);
	}, [result.albumImageUrl]);

	const handleImageLoad = () => {
		setImageLoaded(true);

		setTimeout(() => {
			setImageVisible(true);
		}, 1500);
	};

	return (
		<AnimatePresence mode="wait">
			{loading ? (
				<motion.a
					key="loading"
					variants={variants}
					initial={{ scale: 0.8, opacity: 0 }}
					animate={{ scale: 1, opacity: 1 }}
					transition={{ duration: 0.3 }}
					exit="exit"
					href="https://open.spotify.com/user/amcdf5xiittevf5gl1ecjqfyu"
					rel="noopener noreferrer"
					target="_blank">
					<div className="text-body flex items-center gap-2 text-sm">
						<div className="flex h-[45px] w-[45px] items-center justify-center rounded-md bg-[#1CB955] text-black">
							<FaSpotify className="text-2xl" />
						</div>
						<p className="text-xs">
							<span className="font-medium text-black underline-offset-4 transition duration-150 ease-in-out">
								Hold up
							</span>
							<br />
							Checking Lakshay's Spotify...
						</p>
					</div>
				</motion.a>
			) : result.isPlaying ? (
				<motion.a
					key={result.songUrl}
					variants={variants}
					initial="initial"
					animate="animate"
					exit="exit"
					transition={{ duration: 0.3 }}
					href={result.songUrl}
					rel="noopener noreferrer"
					target="_blank">
					<div className="group flex h-[45px] transition-all duration-300 ease-in-out md:hover:scale-105">
						{result.albumImageUrl ? (
							<div className="relative h-[45px] w-[45px] overflow-hidden rounded-md">
								{/* Blur element that fades out */}
								{result.blurDataURL && (
									<motion.div
										className="absolute inset-0 bg-cover bg-center"
										style={{
											backgroundImage: `url(${result.blurDataURL})`,
											filter: "blur(8px)",
											transform: "scale(1.5)",
										}}
										initial={{ opacity: 1 }}
										animate={{
											opacity: imageVisible ? 0 : 1,
										}}
										transition={{ duration: 0.6 }}
									/>
								)}

								<motion.div
									className="absolute inset-0"
									initial={{ opacity: 0 }}
									animate={{
										opacity: imageVisible ? 1 : 0,
									}}
									transition={{ duration: 0.6 }}>
									<img
										src={result.albumImageUrl}
										alt="Album Art"
										width={45}
										height={45}
										onLoad={handleImageLoad}
										className="h-full w-full rounded-md object-cover transition-all duration-300 ease-in-out md:group-hover:grayscale"
									/>
								</motion.div>
							</div>
						) : (
							<motion.img
								src="/fallback.png"
								width={45}
								height={45}
								alt="fallbackImage"
								className="rounded-md"
								initial={{ scale: 0.8, opacity: 0 }}
								animate={{ scale: 1, opacity: 1 }}
								transition={{ duration: 0.3 }}
							/>
						)}
						<motion.div
							className="mt-1 ml-3 flex flex-col items-start justify-center"
							initial={{ opacity: 0, x: 20 }}
							animate={{ opacity: 1, x: 0 }}
							transition={{ duration: 0.3, delay: 0.1 }}>
							<h3 className="md:group-hover:text-primary text-xs font-medium text-black transition duration-150 ease-in-out">
								{result.title}
								<RiArrowRightUpLine className="text-primary inline opacity-0 transition-opacity duration-150 group-hover:opacity-100" />
							</h3>
							<p className="md:group-hover:text-primary text-xs text-black transition duration-150 ease-in-out">
								{result.artist}
							</p>
						</motion.div>
					</div>
				</motion.a>
			) : (
				<motion.a
					key="not-playing"
					variants={variants}
					initial={{ scale: 0.8, opacity: 0 }}
					animate={{ scale: 1, opacity: 1 }}
					transition={{ duration: 0.3 }}
					exit="exit"
					href="https://open.spotify.com/user/amcdf5xiittevf5gl1ecjqfyu"
					rel="noopener noreferrer"
					target="_blank">
					<div className="text-body flex items-center gap-2 text-sm transition-all duration-300 ease-in-out md:hover:scale-105">
						<div className="flex h-[45px] w-[45px] items-center justify-center rounded-md bg-[#1CB955] text-black">
							<FaSpotify className="text-2xl" />
						</div>
						<p className="text-xs">
							<span className="font-medium text-black underline-offset-4 transition duration-150 ease-in-out">
								Not playing
							</span>
							<br />
							Click to view my profile.
						</p>
					</div>
				</motion.a>
			)}
		</AnimatePresence>
	);
};

export default SpotifyNowPlaying;
