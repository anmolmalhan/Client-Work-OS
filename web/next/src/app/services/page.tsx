import { services } from "@wdsc/domain";
import { MessageCircle } from "lucide-react";
import { ActionButton } from "@/components/marketing/action-button";
import { SectionHeading } from "@/components/marketing/section-heading";
import { ServiceCard } from "@/components/marketing/service-card";
import { getBusinessWhatsappLink } from "@wdsc/domain";

export default function ServicesPage() {
  return (
    <div className="page-shell py-10">
      <div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
        <SectionHeading
          eyebrow="Digital services"
          title="Everything clients can request remotely"
          description="Only digital and online support services are offered. Printing, lamination, photocopying, and public PC usage are intentionally excluded."
        />
        <ActionButton href={getBusinessWhatsappLink()} icon={MessageCircle} external>
          Send on WhatsApp
        </ActionButton>
      </div>
      <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {services.map((service) => (
          <ServiceCard key={service.id} service={service} />
        ))}
      </div>
    </div>
  );
}
