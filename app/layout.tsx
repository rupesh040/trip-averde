import type { Metadata } from "next";
import { Playfair_Display, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "TripAverde - Explore Amazing Asia & Handpicked Global Tours",
  description:
    "TripAverde is a premium travel company committed to delivering memorable journeys across Asia, Europe, and beyond.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${jakarta.variable}`}
    >
      <body className="min-h-full flex flex-col font-sans bg-white text-gray-900 antialiased selection:bg-[#0b463a] selection:text-white">
        {children}
      </body>
    </html>
  );
}
