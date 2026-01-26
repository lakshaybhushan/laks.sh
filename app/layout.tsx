import type { Metadata } from "next";
import localFont from "next/font/local";
import { Agentation } from "agentation";
import "./globals.css";

const ppMori = localFont({
  src: "../public/PPMori.otf",
  variable: "--font-pp-mori",
  display: "swap",
});


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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${ppMori.variable} antialiased`}
      >
        {children}
        {process.env.NODE_ENV === "development" && <Agentation />}
      </body>
    </html>
  );
}
