import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { Toaster } from "react-hot-toast";

export const metadata: Metadata = {
  title: "BATHAE — Premium Ceramics & Bathroom Fixtures",
  description:
    "BATHAE offers premium concealed shower sets, vanity fittings, and bathroom fixtures. Elevate the everyday with refined design and precision engineering.",
  keywords: "bathae, bathroom fixtures, concealed shower, premium ceramics, Pakistan",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-stone-50 text-stone-900 antialiased">
        <Header />
        <CartDrawer />
        <WhatsAppButton />
        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              borderRadius: "16px",
              background: "#1c1917",
              color: "#fff",
              fontSize: "13px",
              letterSpacing: "0.05em",
            },
          }}
        />
        {children}
        <Footer />
      </body>
    </html>
  );
}
