import { businessProfile, getBusinessWhatsappLink, services } from "@wdsc/domain";
import { MessageCircle } from "lucide-react";
import type { Metadata } from "next";
import { ActionButton } from "@/components/marketing/action-button";
import { PageHero } from "@/components/marketing/page-hero";
import { ServiceCard } from "@/components/marketing/service-card";

export const metadata: Metadata = {
  title: "Digital Services — Online Form Filling, PDF & Document Help",
  description:
    "Online form filling, document upload, PDF merge & compression, photo and signature resizing, and application submission — done remotely on WhatsApp. Price confirmed first.",
  alternates: { canonical: "/services" },
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  serviceType: "Online form filling and document services",
  provider: { "@type": "Organization", name: businessProfile.name },
  areaServed: "IN",
  availableChannel: { "@type": "ServiceChannel", serviceUrl: "https://wa.me/" + businessProfile.whatsappNumber },
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Digital services",
    itemListElement: services.map((service) => ({
      "@type": "Offer",
      itemOffered: { "@type": "Service", name: service.name, description: service.description },
    })),
  },
};

export default function ServicesPage() {
  return (
    <div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <PageHero
        eyebrow="Digital services"
        title="Every digital task, done on WhatsApp —"
        highlight="from ₹49"
        description="Only digital and online support services are offered. Printing, lamination, photocopying, and public PC usage are intentionally excluded."
        trustSignals={["From ₹49", "Done remotely on WhatsApp", "Proof on delivery"]}
      >
        <ActionButton href={getBusinessWhatsappLink()} icon={MessageCircle} variant="whatsapp" size="lg" className="w-full text-base sm:w-auto" external>
          Send on WhatsApp
        </ActionButton>
      </PageHero>

      <div className="page-shell py-10">
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {services.map((service, index) => (
            <ServiceCard key={service.id} service={service} index={index} />
          ))}
        </div>
      </div>
    </div>
  );
}
