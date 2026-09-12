import "./globals.css";
import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Shivam Developers — Building Spaces. Creating Landmarks.",
  description:
    "Premium residential spaces shaped by architecture, quality and thoughtful living. Explore Shivam Developers' landmark projects.",
  keywords: "real estate, residential, Shivam Developers, premium homes, bungalows",
  icons: {
    icon: "/logo.svg",
    shortcut: "/logo.svg",
    apple: "/logo.svg",
  },
  openGraph: {
    title: "Shivam Developers — Building Spaces. Creating Landmarks.",
    description:
      "Premium residential spaces shaped by architecture, quality and thoughtful living.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${cormorant.variable} ${inter.variable}`} suppressHydrationWarning>
      <body className="bg-warm-white text-charcoal font-body antialiased" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
