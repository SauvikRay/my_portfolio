import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Sauvik Ray | Senior Flutter Developer & Mobile Architect",
  description: "Portfolio of Sauvik Ray, a Senior Flutter & Mobile Application Developer. Discover cross-platform, high-performance mobile apps built with Clean Architecture, BLoC, and state-of-the-art interactive designs.",
  keywords: [
    "Sauvik Ray",
    "Flutter Developer",
    "Mobile Architect",
    "Senior Flutter Developer",
    "Cross-Platform Developer",
    "iOS Developer",
    "Android Developer",
    "React Native",
    "App Development Portfolio",
    "GSAP Animations"
  ],
  authors: [{ name: "Sauvik Ray", url: "https://sauvikray.dev" }],
  creator: "Sauvik Ray",
  openGraph: {
    title: "Sauvik Ray | Senior Flutter Developer & Mobile Architect",
    description: "Discover high-performance mobile apps built with Clean Architecture, BLoC, and state-of-the-art interactive designs.",
    url: "https://sauvikray.dev",
    siteName: "Sauvik Ray Portfolio",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sauvik Ray | Senior Flutter Developer & Mobile Architect",
    description: "Discover high-performance mobile apps built with Clean Architecture, BLoC, and state-of-the-art interactive designs.",
    creator: "@sauvikray",
  },
  alternates: {
    canonical: "https://sauvikray.dev",
  },
  manifest: "/site.webmanifest",
  icons: {
    icon: [
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon.ico", sizes: "any" }
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }
    ]
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Structured Data (JSON-LD) for SEO
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Sauvik Ray",
    "jobTitle": "Senior Flutter Developer & Mobile Architect",
    "url": "https://sauvikray.dev",
    "sameAs": [
      "https://github.com/sauvikray",
      "https://linkedin.com/in/sauvik-ray-634555289/"
    ],
    "knowsAbout": [
      "Flutter",
      "Dart",
      "Mobile Architecture",
      "iOS Development",
      "Android Development",
      "React Native",
      "NodeJS",
      "Clean Architecture",
      "GSAP Animations"
    ]
  };

  return (
    <html lang="en" className="h-full antialiased dark">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {/* Lucide/Material symbols and icons link */}
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0..1,0&display=swap" rel="stylesheet" />
      </head>
      <body className="min-h-full bg-bg-dark text-text-primary selection:bg-brand-primary/30 selection:text-white font-inter">
        {children}
      </body>
    </html>
  );
}
