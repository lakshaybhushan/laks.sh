import type { APIRoute } from "astro";

export const prerender = false;

interface VisitorLocation {
	city: string;
	region: string;
	timestamp: number;
}

const locationCache = new Map<string, { data: VisitorLocation; cachedAt: number }>();
const CACHE_TTL = 24 * 60 * 60 * 1000; // Cache TTL for 24 hours

const getClientIp = (request: Request): string => {
	const headers = request.headers;
	const forwardedFor = headers.get("x-forwarded-for");

	if (forwardedFor) {
		const clientIp = forwardedFor.split(",")[0].trim();
		return clientIp;
	}
	return "8.8.8.8"; // Fallback for local development
};

const getLocationFromIp = async (ip: string): Promise<VisitorLocation> => {
	const cachedData = locationCache.get(ip);
	if (cachedData && Date.now() - cachedData.cachedAt < CACHE_TTL) {
		return cachedData.data;
	}

	try {
		const response = await fetch(`https://freeipapi.com/api/json/${ip}`);

		if (!response.ok) {
			throw new Error(`Failed to fetch location data: ${response.statusText}`);
		}

		const data = await response.json();

		if (data.error) {
			throw new Error(`API Error: ${data.reason}`);
		}

		const locationData = {
			city: data.cityName || "Unknown",
			region: data.regionName || "Unknown",
			timestamp: Date.now(),
		};

		locationCache.set(ip, { data: locationData, cachedAt: Date.now() });
		return locationData;
	} catch (error) {
		const fallbackData = {
			city: "Unknown",
			region: "Unknown",
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
			const { city, region } = body;

			if (city && region) {
				const visitorData: VisitorLocation = {
					city,
					region,
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
	try {
		const clientIp = getClientIp(request);
		const locationData = await getLocationFromIp(clientIp);

		return new Response(JSON.stringify(locationData), {
			status: 200,
			headers: {
				"Content-Type": "application/json",
			},
		});
	} catch (error) {
		return new Response(JSON.stringify({ error: "Failed to retrieve location data" }), {
			status: 500,
			headers: {
				"Content-Type": "application/json",
			},
		});
	}
};
