import { getBusinessWhatsappLink } from "@wdsc/domain";
import { MessageCircle } from "lucide-react";
import { SubmitRequestForm } from "@/components/forms/submit-request-form";
import { ActionButton } from "@/components/marketing/action-button";
import { SectionHeading } from "@/components/marketing/section-heading";

export default function SubmitRequestPage() {
  return (
    <div className="page-shell py-10">
      <div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
        <SectionHeading
          eyebrow="Submit request"
          title="Share work details and documents"
          description="Use the form for organized details, then continue on WhatsApp for document clarification, payment, and delivery."
        />
        <ActionButton href={getBusinessWhatsappLink()} icon={MessageCircle} variant="whatsapp" external>
          Send Directly on WhatsApp
        </ActionButton>
      </div>
      <div className="mt-8">
        <SubmitRequestForm />
      </div>
    </div>
  );
}
