import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Marketing Business",
  description: "Professional Marketing Services",
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
        {children}
      </body>
    </html>
  );
}
