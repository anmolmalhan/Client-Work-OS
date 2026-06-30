import { businessProfile } from "@wdsc/domain";
import { Analytics } from "@vercel/analytics/next";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Footer } from "@/components/layout/footer";
import { Header, MobileBottomBar } from "@/components/layout/header";
import { Providers } from "@/components/providers";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3100";
const siteName = "Swift Digital Seva";
const siteDescription =
  "Remote-first digital service center for online forms, PDF work, document upload, Sarkari Result updates, and WhatsApp support.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${siteName} | WhatsApp Digital Service Center`,
    template: `%s | ${siteName}`,
  },
  description: siteDescription,
  applicationName: siteName,
  openGraph: {
    type: "website",
    siteName,
    url: siteUrl,
    title: `${siteName} | WhatsApp Digital Service Center`,
    description: siteDescription,
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteName} | WhatsApp Digital Service Center`,
    description: siteDescription,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
  },
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: siteName,
  description: siteDescription,
  url: siteUrl,
  email: businessProfile.email,
  telephone: businessProfile.phone,
  areaServed: "IN",
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "customer support",
    telephone: businessProfile.phone,
    email: businessProfile.email,
    areaServed: "IN",
    availableLanguage: ["en", "hi"],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />
        <Providers>
          <Header />
          <main>{children}</main>
          <Footer />
          <MobileBottomBar />
        </Providers>
        <Analytics />
      </body>
    </html>
  );
}
