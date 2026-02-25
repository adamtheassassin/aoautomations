import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import { CurrencyProvider } from "@/context/CurrencyContext";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL('https://www.aoautomation.com'),
  title: "Rank Top 3 on Google Maps | Best Local Marketing Agency",
  description: "Dominate your local market. We help local businesses rank in the top 3 of Google Maps and grow their revenue.",
  alternates: {
    canonical: './',
  },
  icons: {
    icon: [
      { url: '/icons_&_images/Client%20Logos/ao-icon.png' },
      { url: '/icons_&_images/Client%20Logos/ao-icon.svg', type: 'image/svg+xml' },
    ],
    apple: [
      { url: '/icons_&_images/Client%20Logos/ao-icon.png' },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${outfit.variable} antialiased font-sans`}>
        {/* Fixed Background Layer for better performance */}
        <div
          className="fixed inset-0 z-[-1] pointer-events-none"
          style={{
            backgroundImage: `
              radial-gradient(at 0% 0%, rgba(152, 4, 4, 0.03) 0px, transparent 50%),
              radial-gradient(at 100% 100%, rgba(152, 4, 4, 0.03) 0px, transparent 50%)
            `
          }}
        />
        <CurrencyProvider>
          {children}
        </CurrencyProvider>
      </body>
    </html>
  );
}
