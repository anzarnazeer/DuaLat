import { CartProvider } from "@/context/CartContext";
import { ShopProvider } from "@/context/ShopContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MiniCart from "@/components/MiniCart";
import StickyMobileBar from "@/components/StickyMobileBar";

export default function StorefrontLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
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
  );
}
