import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import { SiteAnalytics } from "@/components/layout/SiteAnalytics";
import { getOgImageUrl, getSiteUrl, PRODUCTION_URL } from "@/lib/site-url";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl = getSiteUrl();
const ogImageUrl = getOgImageUrl();

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
  metadataBase: new URL(siteUrl),
  title: {
    default: "Salahaldin Mohamed | Full Stack + AI Developer",
    template: "%s | Salahaldin Mohamed",
  },
  description: siteDescription,
  alternates: {
    canonical: PRODUCTION_URL,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "Salahaldin Mohamed Portfolio",
    title: "Salahaldin Mohamed | Full Stack + AI Developer",
    description:
      "A cinematic, interactive portfolio with 3D, smooth scrolling, and premium motion design.",
    images: [
      {
        url: ogImageUrl,
        secureUrl: ogImageUrl,
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
      url: ogImageUrl,
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
    "og:image": ogImageUrl,
    "og:image:url": ogImageUrl,
    "og:image:secure_url": ogImageUrl,
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
        <link rel="image_src" href={ogImageUrl} />
        <meta property="og:image" content={ogImageUrl} />
        <meta property="og:image:secure_url" content={ogImageUrl} />
        <meta property="og:image:type" content="image/jpeg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <link rel="preload" href="/og.jpg" as="image" type="image/jpeg" />
      </head>
      <body className="min-h-[100dvh] flex flex-col bg-black text-white selection:bg-cyan-300/20 selection:text-cyan-100">
        <Providers>{children}</Providers>
        <SiteAnalytics />
      </body>
    </html>
  );
}
