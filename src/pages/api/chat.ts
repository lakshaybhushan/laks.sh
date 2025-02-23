import type { APIRoute } from "astro";
import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { streamText, convertToCoreMessages } from "ai";
import aboutMe from "../../utils/aboutMe";

export const prerender = false;

const google = createGoogleGenerativeAI({
	apiKey: import.meta.env.GOOGLE_API_KEY,
});

export const POST: APIRoute = async ({ request }) => {
	const { messages } = await request.json();

	const result = streamText({
		model: google("gemini-2.0-flash-001"),
		system: aboutMe(),
		temperature: 0.5,
		messages: convertToCoreMessages(messages),
	});

	return result.toDataStreamResponse();
};
