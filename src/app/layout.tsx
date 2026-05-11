import type { Metadata } from "next";
import { EB_Garamond, Montserrat } from "next/font/google";
import "./globals.css";
import { headers } from "next/headers";
import { SmoothScrollProvider } from "@/components/providers/SmoothScrollProvider";
import { CustomCursor } from "@/components/CustomCursor";
import { Header } from "@/components/ui/header";
import { Footer } from "@/components/ui/footer";
import { WhatsAppFloat } from "@/components/WhatsAppFloat";

const ebGaramond = EB_Garamond({
  variable: "--font-eb-garamond",
  subsets: ["latin"],
  display: "swap",
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://initio2-0.vercel.app"),
  title: "INITIO | A Foundation of Distinction",
  description: "Experience the ultra-premium digital readiness of Initio. High-end web design and immersive experiences.",
  openGraph: {
    title: "INITIO | A Foundation of Distinction",
    description: "Experience the ultra-premium digital readiness of Initio.",
    type: "website",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "INITIO – We plan and you shine.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "INITIO | A Foundation of Distinction",
    description: "Experience the ultra-premium digital readiness of Initio.",
    images: ["/og-image.jpg"],
  },
};

export default async function RootLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  const h = await headers();
  const isAdmin = h.get('x-admin-route') === '1';

  return (
    <html
      lang="en"
      className={`${ebGaramond.variable} ${montserrat.variable} antialiased${isAdmin ? '' : ' selection:bg-accent selection:text-primary cursor-none'}`}
    >
      <head>
        <link rel="preload" href="/videos/initio-hero-v1.7.mp4" as="video" type="video/mp4" />
      </head>
      <body className={`bg-primary text-light min-h-screen${isAdmin ? '' : ' cursor-none'}`}>
        {isAdmin ? (
          <>{children}</>
        ) : (
          <SmoothScrollProvider>
            <CustomCursor />
            <Header />
            <main className="flex-grow">
              {children}
              {modal}
            </main>
            <Footer />
            <WhatsAppFloat />
          </SmoothScrollProvider>
        )}
      </body>
    </html>
  );
}
