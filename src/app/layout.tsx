import type { Metadata, Viewport } from "next";
import Providers from "@/components/Providers";
import "./globals.css";

export const metadata: Metadata = {
  title: "NexWalk - Premium Sneakers & Footwear",
  description: "Premium sneakers and footwear for those who dare to stand out. Discover the latest collections and exclusive drops at NexWalk.",
  icons: {
    icon: "/favicon.ico",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-[#0a0a0a] text-white antialiased font-sans">
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}