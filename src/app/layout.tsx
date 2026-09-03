import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import CartProvider from "../redux/CartProvider";

// self-hosted (was next/font/google's Inter) - fetching from Google at
// build time meant the build couldn't complete without reaching it.
const inter = localFont({ src: "../assets/fonts/Inter-Variable.woff2" });

export const metadata: Metadata = {
  title: "PortalFi",
  description: "Venue content portal for food, drinks, and events menus.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-slate-800">
        <CartProvider>{children}</CartProvider>
      </body>
    </html>
  );
}
