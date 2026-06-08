import { faqs, getBusinessWhatsappLink } from "@wdsc/domain";
import { MessageCircle } from "lucide-react";
import { ActionButton } from "@/components/marketing/action-button";
import { FaqList } from "@/components/marketing/faq-list";
import { SectionHeading } from "@/components/marketing/section-heading";

export default function FaqPage() {
  return (
    <div className="page-shell py-10">
      <div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
        <SectionHeading
          eyebrow="FAQ"
          title="Common questions before sending documents"
          description="Clear answers for non-technical clients who want remote digital service support."
        />
        <ActionButton href={getBusinessWhatsappLink()} icon={MessageCircle} external>
          Ask on WhatsApp
        </ActionButton>
      </div>
      <div className="mt-8">
        <FaqList items={faqs} />
      </div>
    </div>
  );
}
