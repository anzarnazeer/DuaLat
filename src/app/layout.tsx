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
    default: "Baby Girl Dresses & Modest Kidswear Online in India | Dualat",
    template: "%s | Dualat"
  },
  description: "Shop comfortable, modest and beautiful dresses for baby girls and little girls at Dualat. Explore everyday, festive and special occasion styles with delivery across India.",
  keywords: ["baby girl dresses online", "kids wear India", "modest girls clothing", "cotton frock baby girl", "girls two piece set", "Dualat", "Dualat kidswear"],
  openGraph: {
    title: "Dualat | Modest, Comfortable & Beautiful Kidswear for Little Girls",
    description: "Thoughtfully designed outfits for baby girls and little girls aged 0–9 years. Delivering across India from Kerala.",
    url: "https://www.dualat.in",
    siteName: "Dualat",
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Dualat | Modest, Comfortable & Beautiful Kidswear for Little Girls",
    description: "Thoughtfully designed outfits for baby girls and little girls aged 0–9 years. Delivering across India from Kerala.",
  },
  alternates: {
    canonical: "https://www.dualat.in"
  }
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Dualat",
  "image": "https://www.dualat.in/icon.png",
  "description": "Modest, comfortable and beautiful kidswear for little girls aged 0–9 years.",
  "telephone": "+91-88487-22023",
  "address": {
    "@type": "PostalAddress",
    "addressRegion": "Kerala",
    "addressCountry": "IN"
  },
  "founder": {
    "@type": "Person",
    "name": "Asna"
  },
  "url": "https://www.dualat.in"
};

const faqLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Where is Dualat located?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Dualat is an Indian boutique kidswear brand originating from Kerala, delivering across India."
      }
    },
    {
      "@type": "Question",
      "name": "What age group does Dualat cater to?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Dualat specializes in modest, comfortable and beautiful clothing for baby girls and little girls aged 0 to 9 years."
      }
    },
    {
      "@type": "Question",
      "name": "What fabrics are used in Dualat outfits?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "We select breathable natural cottons, soft cotton blends, and gentle textures crafted for active comfort and everyday ease."
      }
    },
    {
      "@type": "Question",
      "name": "Who is the founder of Dualat?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Dualat was founded by Asna, a mother in Kerala, inspired by her search for comfortable, modest, and elegant outfits for her own daughter."
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
