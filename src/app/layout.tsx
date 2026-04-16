import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import BackgroundEffect from "@/components/shared/BackgroundEffect";
import "./globals.css";

// Шрифт Roboto — основной шрифт портфолио
const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

// SEO мета-теги
export const metadata: Metadata = {
  title: "Hayk Manukyan — UX / Product Designer",
  description:
    "Portfolio of Hayk Manukyan — UX / Product Designer with 7+ years of experience. Specializing in user research, design systems, and AI-driven solutions.",
  keywords: [
    "UX Designer",
    "Product Designer",
    "Hayk Manukyan",
    "Portfolio",
    "Figma",
    "Design Systems",
  ],
  authors: [{ name: "Hayk Manukyan" }],
  openGraph: {
    title: "Hayk Manukyan — UX / Product Designer",
    description:
      "Portfolio of Hayk Manukyan — UX / Product Designer with 7+ years of experience.",
    type: "website",
    locale: "en_US",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${roboto.variable} h-full antialiased`}>
      <head>
        {/* Flaticon uicons — библиотека иконок (regular + solid) */}
        <link
          rel="stylesheet"
          href="https://cdn-uicons.flaticon.com/2.6.0/uicons-regular-rounded/css/uicons-regular-rounded.css"
        />
        <link
          rel="stylesheet"
          href="https://cdn-uicons.flaticon.com/2.6.0/uicons-solid-rounded/css/uicons-solid-rounded.css"
        />
      </head>
      <body className="min-h-full flex flex-col relative">
        <BackgroundEffect />
        <div className="relative z-10 flex flex-col min-h-full">{children}</div>
      </body>
    </html>
  );
}
