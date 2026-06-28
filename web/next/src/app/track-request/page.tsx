import { getBusinessWhatsappLink } from "@wdsc/domain";
import { MessageCircle } from "lucide-react";
import { TrackRequestForm } from "@/components/forms/track-request-form";
import { ActionButton } from "@/components/marketing/action-button";
import { PageHero } from "@/components/marketing/page-hero";

export default function TrackRequestPage() {
  return (
    <div>
      <PageHero
        eyebrow="Track request"
        title="Check your current work"
        highlight="status"
        description="Clients can check status using Request ID and WhatsApp number. Demo data is included for MVP testing."
      >
        <ActionButton href={getBusinessWhatsappLink()} icon={MessageCircle} variant="whatsapp" external>
          Ask on WhatsApp
        </ActionButton>
      </PageHero>

      <div className="page-shell py-10">
        <TrackRequestForm />
      </div>
    </div>
  );
}
