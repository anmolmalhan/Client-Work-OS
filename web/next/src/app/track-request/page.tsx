import { getBusinessWhatsappLink } from "@wdsc/domain";
import { MessageCircle } from "lucide-react";
import { TrackRequestForm } from "@/components/forms/track-request-form";
import { ActionButton } from "@/components/marketing/action-button";
import { SectionHeading } from "@/components/marketing/section-heading";

export default function TrackRequestPage() {
  return (
    <div className="page-shell py-10">
      <div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
        <SectionHeading
          eyebrow="Track request"
          title="Check current work status"
          description="Clients can check status using Request ID and WhatsApp number. Demo data is included for MVP testing."
        />
        <ActionButton href={getBusinessWhatsappLink()} icon={MessageCircle} variant="whatsapp" external>
          Ask on WhatsApp
        </ActionButton>
      </div>
      <div className="mt-8">
        <TrackRequestForm />
      </div>
    </div>
  );
}
