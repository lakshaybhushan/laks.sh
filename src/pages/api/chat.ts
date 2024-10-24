import type { APIRoute } from "astro";
// import { createOpenAI } from "@ai-sdk/openai";
import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { streamText, convertToCoreMessages } from "ai";
import aboutMe from "../../utils/aboutMe";

export const prerender = false;

const google = createGoogleGenerativeAI({
	apiKey: import.meta.env.GOOGLE_API_KEY,
});

export const POST: APIRoute = async ({ request }) => {
	const { messages } = await request.json();

	const result = await streamText({
		model: google("gemini-1.5-flash-8b"),
		system: aboutMe(),
		temperature: 0.5,
		messages: convertToCoreMessages(messages),
	});

	return result.toDataStreamResponse();
};
