import type { Metadata, Viewport } from "next";
import { Assistant } from "next/font/google";
import "./globals.css";

const assistant = Assistant({
  variable: "--font-assistant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export const metadata: Metadata = {
  title: {
    default: "DuaLat | Premium Kids' & Baby Wear in Kerala",
    template: "%s | DuaLat Kerala"
  },
  description: "Shop premium, organic baby and toddler clothes (0-5 years) in Kerala. DuaLat offers ultra-soft, hypoallergenic, and comfortable kids' fashion. Order online today!",
  keywords: ["kids wear Kerala", "baby clothes online Kerala", "toddler fashion", "organic baby clothes", "6 months to 5 years clothing", "DuaLat", "Asna DuaLat"],
  openGraph: {
    title: "DuaLat | Premium Kids' Wear in Kerala",
    description: "Ultra-soft, stylish, and comfortable clothing for babies and toddlers (0-5 years). Proudly based in Kerala.",
    url: "https://dua-lat.vercel.app",
    siteName: "DuaLat",
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "DuaLat | Premium Kids' Wear in Kerala",
    description: "Ultra-soft, stylish, and comfortable clothing for babies and toddlers (0-5 years). Proudly based in Kerala.",
  },
  alternates: {
    canonical: "https://dua-lat.vercel.app"
  }
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "DuaLat Kids Wear",
  "image": "https://dua-lat.vercel.app/logo.png",
  "description": "Premium organic kids and baby wear brand in Kerala, catering to children aged 6 months to 5 years.",
  "address": {
    "@type": "PostalAddress",
    "addressRegion": "Kerala",
    "addressCountry": "IN"
  },
  "founder": {
    "@type": "Person",
    "name": "Asna"
  },
  "url": "https://dua-lat.vercel.app",
  "priceRange": "$$"
};

const faqLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Where is DuaLat located?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "DuaLat is proudly based in Kerala, India, providing premium kids wear locally."
      }
    },
    {
      "@type": "Question",
      "name": "What age group does DuaLat cater to?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "We specialize in ultra-soft, frictionless clothing designed specifically for babies and toddlers aged 6 months to 5 years old."
      }
    },
    {
      "@type": "Question",
      "name": "Are DuaLat clothes organic?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, our clothes are made from GOTS certified organic cotton, which is grown chemical-free and extremely gentle on baby skin."
      }
    },
    {
      "@type": "Question",
      "name": "Who is the founder of DuaLat?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "DuaLat was founded by Asna, a young entrepreneur and mother of a 1-year-old girl in Kerala, with a mission to create safe, hypoallergenic clothes."
      }
    }
  ]
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${assistant.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-white text-charcoal">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
        />
        {children}
      </body>
    </html>
  );
}
