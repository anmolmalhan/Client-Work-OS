import { getBusinessWhatsappLink, services } from "@wdsc/domain";
import { MessageCircle } from "lucide-react";
import { ActionButton } from "@/components/marketing/action-button";
import { PageHero } from "@/components/marketing/page-hero";
import { ServiceCard } from "@/components/marketing/service-card";

export default function ServicesPage() {
  return (
    <div>
      <PageHero
        eyebrow="Digital services"
        title="Everything clients can request"
        highlight="remotely"
        description="Only digital and online support services are offered. Printing, lamination, photocopying, and public PC usage are intentionally excluded."
      >
        <ActionButton href={getBusinessWhatsappLink()} icon={MessageCircle} variant="whatsapp" external>
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
