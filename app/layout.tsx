import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";

const satoshi = localFont({
	src: "../public/satoshi.woff2",
	variable: "--font-satoshi",
	weight: "400 500",
	style: "normal",
	display: "swap",
	fallback: ["Arial", "sans-serif"],
});

export const metadata: Metadata = {
	title: "Lakshay Bhushan",
	description:
		"Product designer in Berlin, designing interfaces for the web at Vercel.",
};

export const viewport: Viewport = {
	themeColor: "#0a0a0a",
	colorScheme: "dark",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" className={`${satoshi.variable} antialiased`}>
			<body className="font-sans">{children}</body>
		</html>
	);
}
