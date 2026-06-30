import { faqs, getBusinessWhatsappLink } from "@wdsc/domain";
import { MessageCircle } from "lucide-react";
import { ActionButton } from "@/components/marketing/action-button";
import { FaqList } from "@/components/marketing/faq-list";
import { PageHero } from "@/components/marketing/page-hero";

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: { "@type": "Answer", text: item.answer },
  })),
};

export default function FaqPage() {
  return (
    <div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <PageHero
        eyebrow="FAQ"
        title="Common questions before sending"
        highlight="documents"
        description="Clear answers for non-technical clients who want remote digital service support."
      >
        <ActionButton href={getBusinessWhatsappLink()} icon={MessageCircle} variant="whatsapp" external>
          Ask on WhatsApp
        </ActionButton>
      </PageHero>

      <div className="page-shell py-10">
        <FaqList items={faqs} />
      </div>
    </div>
  );
}
