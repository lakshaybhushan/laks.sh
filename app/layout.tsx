import type { Metadata } from "next";
import { Agentation } from "agentation";
import { Analytics } from '@vercel/analytics/next';
import { GeistPixelSquare, GeistPixelGrid, GeistPixelCircle, GeistPixelTriangle, GeistPixelLine } from 'geist/font/pixel';
import "./globals.css";


export const metadata: Metadata = {
  title: "Lakshay Bhushan",
  description: "Personal website of Lakshay Bhushan",
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title: "Lakshay Bhushan",
    description: "Personal website of Lakshay Bhushan",
    url: "https://laks.sh",
  },
};

const pixelFonts = [
  GeistPixelSquare,
  GeistPixelGrid,
  GeistPixelCircle,
  GeistPixelTriangle,
  GeistPixelLine,
];

const fontVariables = pixelFonts.map(font => font.variable).join(" ");

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${fontVariables} antialiased`}
      >
        {children}
        {process.env.NODE_ENV === "development" && <Agentation />}
        <Analytics />
      </body>
    </html>
  );
}
