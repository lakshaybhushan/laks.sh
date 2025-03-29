import type { APIRoute } from "astro";

export const prerender = false;

interface VisitorLocation {
	city: string;
	country: string;
	timestamp: number;
}

const locationCache = new Map<string, { data: VisitorLocation; cachedAt: number }>();
const CACHE_TTL = 24 * 60 * 60 * 1000; // 24 hours cache TTL

const getClientIp = (request: Request): string => {
	const headers = request.headers;
	const forwardedFor = headers.get("x-forwarded-for");

	if (forwardedFor) {
		const clientIp = forwardedFor.split(",")[0].trim();
		console.log(`[SERVER] Detected client IP: ${clientIp}`);
		return clientIp;
	}
	console.log(`[SERVER] Using fallback IP: 8.8.8.8`);
	return "8.8.8.8"; // Fallback
};

const getLocationFromIp = async (ip: string): Promise<VisitorLocation> => {
	const cachedData = locationCache.get(ip);
	if (cachedData && Date.now() - cachedData.cachedAt < CACHE_TTL) {
		console.log(`[SERVER] Using cached location data for IP: ${ip}`);
		return cachedData.data;
	}

	if (ip === "127.0.0.1" || ip === "::1" || ip === "8.8.8.8") {
		console.log(`[SERVER] Using localhost/fallback data for IP: ${ip}`);
		const localhostData = {
			city: "Localhost",
			country: "Development",
			timestamp: Date.now(),
		};

		locationCache.set(ip, { data: localhostData, cachedAt: Date.now() });
		return localhostData;
	}

	try {
		console.log(`[SERVER] Fetching location for IP: ${ip}`);
		const response = await fetch(`https://freeipapi.com/api/json/${ip}`);

		if (!response.ok) {
			console.error(`[SERVER] API response not OK: ${response.status} ${response.statusText}`);
			throw new Error(`Failed to fetch location data: ${response.statusText}`);
		}

		const data = await response.json();
		console.log(`[SERVER] API response data:`, data);

		if (data.error) {
			console.error(`[SERVER] API error: ${data.reason}`);
			throw new Error(`API Error: ${data.reason}`);
		}

		const locationData = {
			city: data.cityName || "Unknown",
			country: data.countryName || "Unknown",
			timestamp: Date.now(),
		};
		console.log(`[SERVER] Processed location data:`, locationData);

		locationCache.set(ip, { data: locationData, cachedAt: Date.now() });
		return locationData;
	} catch (error) {
		console.error("[SERVER] Error fetching location from IP:", error);
		const fallbackData = {
			city: "Unknown",
			country: "Unknown",
			timestamp: Date.now(),
		};

		locationCache.set(ip, { data: fallbackData, cachedAt: Date.now() });
		return fallbackData;
	}
};

export const POST: APIRoute = async ({ request }) => {
	try {
		const contentType = request.headers.get("content-type");

		if (contentType && contentType.includes("application/json")) {
			const body = await request.json();
			const { city, country } = body;

			if (city && country) {
				const visitorData: VisitorLocation = {
					city,
					country,
					timestamp: Date.now(),
				};

				const clientIp = getClientIp(request);
				locationCache.set(clientIp, { data: visitorData, cachedAt: Date.now() });

				return new Response(JSON.stringify(visitorData), {
					status: 200,
					headers: {
						"Content-Type": "application/json",
					},
				});
			}
		}

		const clientIp = getClientIp(request);
		const locationData = await getLocationFromIp(clientIp);

		return new Response(JSON.stringify(locationData), {
			status: 200,
			headers: {
				"Content-Type": "application/json",
			},
		});
	} catch (error) {
		console.error("Error processing location data:", error);
		return new Response(JSON.stringify({ error: "Failed to process location data" }), {
			status: 500,
			headers: {
				"Content-Type": "application/json",
			},
		});
	}
};

export const GET: APIRoute = async ({ request }) => {
	console.log(`[SERVER] Received GET request to /api/lastVisit`);
	try {
		const clientIp = getClientIp(request);
		const locationData = await getLocationFromIp(clientIp);
		console.log(`[SERVER] Responding with location data:`, locationData);

		return new Response(JSON.stringify(locationData), {
			status: 200,
			headers: {
				"Content-Type": "application/json",
			},
		});
	} catch (error) {
		console.error("Error retrieving location data:", error);
		return new Response(JSON.stringify({ error: "Failed to retrieve location data" }), {
			status: 500,
			headers: {
				"Content-Type": "application/json",
			},
		});
	}
};
