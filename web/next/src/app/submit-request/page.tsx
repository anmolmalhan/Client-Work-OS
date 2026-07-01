import { getBusinessWhatsappLink } from "@wdsc/domain";
import { MessageCircle } from "lucide-react";
import type { Metadata } from "next";
import { SubmitRequestForm } from "@/components/forms/submit-request-form";
import { ActionButton } from "@/components/marketing/action-button";
import { PageHero } from "@/components/marketing/page-hero";

export const metadata: Metadata = {
  title: "Submit a Request — Get Your Form or Document Done",
  description:
    "Share your work details to get an online form filled, documents handled, or PDFs processed. Price confirmed first, then continue on WhatsApp. Same-day help available.",
  alternates: { canonical: "/submit-request" },
};

export default function SubmitRequestPage() {
  return (
    <div>
      <PageHero
        eyebrow="Submit request"
        title="Send your work once —"
        highlight="get proof on delivery"
        description="Use the form for organized details, then continue on WhatsApp for document clarification, payment, and delivery."
        trustSignals={["Price confirmed before work", "Documents kept private", "Proof on delivery"]}
      >
        <ActionButton href={getBusinessWhatsappLink()} icon={MessageCircle} variant="whatsapp" size="lg" className="w-full text-base sm:w-auto" external>
          Send Directly on WhatsApp
        </ActionButton>
      </PageHero>

      <div className="page-shell py-10">
        <SubmitRequestForm />
      </div>
    </div>
  );
}
