import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  viewportFit: "cover",
  themeColor: "#05060a",
};

export const metadata: Metadata = {
  title: {
    default: "Salahaldin Mohamed | Full Stack + AI Developer",
    template: "%s | Salahaldin Mohamed",
  },
  description:
    "Cyberpunk-luxury portfolio of Salahaldin Mohamed - Computer Science Engineer, Full Stack Developer, AI Developer, and Creative Technologist.",
  metadataBase: new URL("https://salahaldin.dev"),
  openGraph: {
    title: "Salahaldin Mohamed | Full Stack + AI Developer",
    description:
      "A cinematic, interactive portfolio with 3D, smooth scrolling, and premium motion design.",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
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
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-[100dvh] flex flex-col bg-black text-white selection:bg-cyan-300/20 selection:text-cyan-100">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
