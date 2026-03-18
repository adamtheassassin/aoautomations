import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import { CurrencyProvider } from "@/context/CurrencyContext";
import Script from "next/script";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL('https://ao-automations.com'),
  title: "Rank Top 3 on Google Maps | Best Local Marketing Agency",
  description: "Dominate your local market. We help local businesses rank in the top 3 of Google Maps and grow their revenue.",
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
      <head>
        {/* Google Tag Manager */}
        <Script
          id="gtm-script"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-N679F6ZZ');`,
          }}
        />
        {/* End Google Tag Manager */}
      </head>
      <body className={`${outfit.variable} antialiased font-sans`}>
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-N679F6ZZ"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        {/* End Google Tag Manager (noscript) */}
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

