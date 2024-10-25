import fs from "fs";
import path from "path";
import React from "react";
import { ImageResponse } from "@vercel/og";
import { getCollection, type CollectionEntry } from "astro:content";

interface Props {
	params: { slug: string };
	props: { post: CollectionEntry<"thoughts"> };
}

export async function GET({ props }: Props) {
	const { post } = props;

	const SatoshiBold = fs.readFileSync(
		path.resolve(process.cwd(), "./public/fonts/Satoshi-Bold.ttf"),
	);
	const SatoshiMedium = fs.readFileSync(
		path.resolve(process.cwd(), "./public/fonts/Satoshi-Medium.ttf"),
	);

	const html = React.createElement(
		"div",
		{
			tw: "w-full h-full flex flex-col justify-between relative p-16",
			style: {
				background: "linear-gradient(135deg, #FDFFF4 0%, #E6F4F1 100%)",
				fontFamily: "Satoshi",
			},
		},
		React.createElement(
			"div",
			{
				tw: "flex-grow flex items-center justify-center",
			},
			React.createElement(
				"div",
				{
					tw: "text-8xl leading-tight tracking-tighter text-center max-w-[80%] mx-auto",
					style: {
						fontFamily: "Satoshi-Bold",
						maxWidth: "80%",
						background: "linear-gradient(180deg, #00997E 20%, #B1FFD0 120%)",
						backgroundClip: "text",
						color: "transparent",
					},
				},
				post.data.title,
			),
		),
		React.createElement(
			"div",
			{
				tw: "flex items-center justify-between",
			},
			React.createElement(
				"div",
				{
					tw: "flex items-center",
				},
				React.createElement("img", {
					tw: "w-6 h-6 rounded-full mr-4",
					src: "https://www.lakshb.dev/favicon.svg",
					alt: "Lakshay Bhushan",
				}),
				React.createElement(
					"div",
					{
						tw: "text-2xl text-[#00997E]",
						style: {
							fontFamily: "Satoshi-Medium",
							letterSpacing: "-0.05em",
						},
					},
					"Lakshay Bhushan",
				),
			),
			React.createElement(
				"div",
				{
					tw: "text-xl text-[#666666]",
					style: {
						fontFamily: "Satoshi-Medium",
						letterSpacing: "-0.05em",
					},
				},
				"lakshb.dev | thoughts",
			),
		),
	);

	return new ImageResponse(html, {
		width: 1200,
		height: 630,
		fonts: [
			{
				name: "Satoshi-Medium",
				data: SatoshiMedium.buffer,
			},
			{
				name: "Satoshi-Bold",
				data: SatoshiBold.buffer,
			},
		],
	});
}

export async function getStaticPaths() {
	const blogPosts = await getCollection("thoughts");
	return blogPosts.map((post: any) => ({
		params: { slug: post.slug },
		props: { post },
	}));
}
