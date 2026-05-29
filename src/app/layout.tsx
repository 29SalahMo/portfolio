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

const SITE_URL = "https://salahaldin-portfolio.vercel.app";

/** Static JPEG in /public — works reliably on WhatsApp, iMessage, LinkedIn */
const OG_IMAGE = `${SITE_URL}/og.jpg`;

const siteDescription =
  "Cyberpunk-luxury portfolio of Salahaldin Mohamed - Computer Science Engineer, Full Stack Developer, AI Developer, and Creative Technologist.";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  viewportFit: "cover",
  themeColor: "#05060a",
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Salahaldin Mohamed | Full Stack + AI Developer",
    template: "%s | Salahaldin Mohamed",
  },
  description: siteDescription,
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: "Salahaldin Mohamed Portfolio",
    title: "Salahaldin Mohamed | Full Stack + AI Developer",
    description:
      "A cinematic, interactive portfolio with 3D, smooth scrolling, and premium motion design.",
    images: [
      {
        url: OG_IMAGE,
        secureUrl: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: "Salahaldin Mohamed - Full Stack and AI Developer portfolio",
        type: "image/jpeg",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Salahaldin Mohamed | Full Stack + AI Developer",
    description:
      "A cinematic, interactive portfolio with 3D, smooth scrolling, and premium motion design.",
    images: {
      url: OG_IMAGE,
      width: 1200,
      height: 630,
      alt: "Salahaldin Mohamed portfolio preview",
    },
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  other: {
    "og:image": OG_IMAGE,
    "og:image:url": OG_IMAGE,
    "og:image:secure_url": OG_IMAGE,
    "og:image:width": "1200",
    "og:image:height": "630",
    "og:image:type": "image/jpeg",
    "og:image:alt": "Salahaldin Mohamed portfolio hero preview",
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
      <head>
        <link rel="image_src" href={OG_IMAGE} />
        <meta property="og:image" content={OG_IMAGE} />
        <meta property="og:image:secure_url" content={OG_IMAGE} />
        <meta property="og:image:type" content="image/jpeg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
      </head>
      <body className="min-h-[100dvh] flex flex-col bg-black text-white selection:bg-cyan-300/20 selection:text-cyan-100">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
