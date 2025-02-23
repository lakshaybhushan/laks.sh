import {
	type Article,
	type Person,
	type WebSite,
	type WithContext,
} from "schema-dts";
import avatar from "../assets/avatar.png";
import type { CollectionEntry } from "astro:content";

export const thoughtsWebsite: WithContext<WebSite> = {
	"@context": "https://schema.org",
	"@type": "WebSite",
	url: `${import.meta.env.SITE}/thoughts/`,
	name: "Lakshay Bhushan • Thoughts",
	description: "Thoughts, writings from Lakshay Bhushan",
	inLanguage: "en_US",
};

export const mainWebsite: WithContext<WebSite> = {
	"@context": "https://schema.org",
	"@type": "WebSite",
	url: import.meta.env.SITE,
	name: "Lakshay Bhushan",
	description: "Lakshay Bhushan's personal portfolio website",
	inLanguage: "en_US",
};

export const personSchema: WithContext<Person> = {
	"@context": "https://schema.org",
	"@type": "Person",
	name: "Lakshay Bhushan",
	url: `${import.meta.env.SITE}`,
	image: `${import.meta.env.SITE}${avatar.src}`,
	sameAs: [
		"https://www.twitter.com/blakssh",
		"https://www.instagram.com/lakshaybhushan/",
		"https://www.linkedin.com/in/lakshaybhushan/",
	],
};

export function getArticleSchema(post: CollectionEntry<"thoughts">) {
	const articleStructuredData: WithContext<Article> = {
		"@context": "https://schema.org",
		"@type": "Article",
		headline: post.data.title,
		url: `${import.meta.env.SITE}/thoughts/${post.id}/`,
		image: {
			"@type": "ImageObject",
			url: `${import.meta.env.SITE}${post.data.cover.src}/`,
		},
		description: post.data.excerpt,
		datePublished: post.data.date.toString(),
		publisher: {
			"@type": "Person",
			name: "Lakshay Bhushan",
			url: import.meta.env.SITE,
			image: import.meta.env.SITE + avatar.src,
		},
		author: {
			"@type": "Person",
			name: "Lakshay Bhushan",
			url: import.meta.env.SITE,
			image: import.meta.env.SITE + avatar.src,
		},
	};
	return articleStructuredData;
}
