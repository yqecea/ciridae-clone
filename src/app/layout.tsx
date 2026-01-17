import type { Metadata } from "next";
import { Roboto_Mono, Roboto_Condensed } from "next/font/google";
import "./globals.css";

// Roboto Condensed as approximation for Pragmatica Cond
const robotoCondensed = Roboto_Condensed({
  subsets: ["latin"],
  variable: "--font-pragmatica",
  display: "swap",
  weight: ["300", "400", "700"],
});

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
    <html lang="en" className={`${robotoCondensed.variable} ${robotoMono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
