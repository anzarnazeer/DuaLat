import type { Metadata, Viewport } from "next";
import { Quicksand, Nunito } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import { ShopProvider } from "@/context/ShopContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MiniCart from "@/components/MiniCart";
import StickyMobileBar from "@/components/StickyMobileBar";

const quicksand = Quicksand({
  variable: "--font-quicksand",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const nunito = Nunito({
  variable: "--font-nunito",
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
  title: "SproutWear | Parent-Friendly Organic Kids' Wear",
  description: "Frictionless, ultra-soft, hypoallergenic clothing for ages 0-5. Designed for quick diaper changes and active play.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${quicksand.variable} ${nunito.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-cream-100/40 text-charcoal">
        <ShopProvider>
          <CartProvider>
            {/* Top Navigation */}
            <Navbar />
            
            {/* Main Page Area */}
            <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 pb-24 sm:pb-8">
              {children}
            </main>

            {/* Slide-out Cart Drawer */}
            <MiniCart />

            {/* Reassuring Footer */}
            <Footer />

            {/* Mobile-Friendly Sticky Bottom Bar */}
            <StickyMobileBar />
          </CartProvider>
        </ShopProvider>
      </body>
    </html>
  );
}
