import type { Metadata } from "next";
import { Roboto_Mono } from "next/font/google";
import "@fontsource-variable/fraunces";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { Preloader } from "@/components/Preloader";
import { ScrollProgress } from "@/components/ui/ScrollProgress";

// Roboto Mono for monospace elements
const robotoMono = Roboto_Mono({
  subsets: ["latin"],
  variable: "--font-roboto-mono",
  display: "swap",
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: "Ciridae | The New Intelligence",
  description:
    "We redesign complex workflows around AI, build the systems that execute them, and operate those systems in production.",
  keywords: ["AI", "automation", "workflow", "consulting", "enterprise"],
  authors: [{ name: "Ciridae" }],
  openGraph: {
    title: "Ciridae | The New Intelligence",
    description: "Automate the mundane. Unleash the remarkable.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={robotoMono.variable}
      suppressHydrationWarning
    >
      <head>
        {/* Syne (Display) & Space Mono (System) & Fraunces (Accent) */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Space+Mono:ital,wght@0,400;0,700;1,400&family=Syne:wght@400..800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body suppressHydrationWarning>
        <Preloader minDuration={2500} />
        <CustomCursor />
        <ScrollProgress />
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}

