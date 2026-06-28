import { getBusinessWhatsappLink } from "@wdsc/domain";
import { MessageCircle } from "lucide-react";
import { SubmitRequestForm } from "@/components/forms/submit-request-form";
import { ActionButton } from "@/components/marketing/action-button";
import { PageHero } from "@/components/marketing/page-hero";

export default function SubmitRequestPage() {
  return (
    <div>
      <PageHero
        eyebrow="Submit request"
        title="Share your work details and"
        highlight="documents"
        description="Use the form for organized details, then continue on WhatsApp for document clarification, payment, and delivery."
      >
        <ActionButton href={getBusinessWhatsappLink()} icon={MessageCircle} variant="whatsapp" external>
          Send Directly on WhatsApp
        </ActionButton>
      </PageHero>

      <div className="page-shell py-10">
        <SubmitRequestForm />
      </div>
    </div>
  );
}
