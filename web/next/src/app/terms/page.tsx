import { businessProfile, excludedServices } from "@wdsc/domain";
import type { Metadata } from "next";
import { LegalPage, LegalSection } from "@/components/legal/legal-page";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: `The terms for using ${businessProfile.name}'s WhatsApp-first digital service for forms, documents, and PDF work.`,
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return (
    <LegalPage
      eyebrow="Terms"
      title="Simple terms for using our"
      highlight="service"
      description="What we do, what we ask of you, and the basics of how we work together."
      updated="30 June 2026"
    >
      <LegalSection title="Our service">
        <p>
          {businessProfile.name} provides remote, digital assistance — filling online forms, uploading documents,
          converting and resizing files, downloading admit cards, and checking results and application status — using the
          details you share over WhatsApp and this website.
        </p>
        <p>We do not provide: {excludedServices.join(", ")}.</p>
      </LegalSection>

      <LegalSection title="Your responsibilities">
        <p>
          You agree to provide accurate, complete, and lawful details and documents, and confirm you are authorised to
          share them. We are not responsible for issues caused by wrong, missing, or fraudulent information provided to us.
        </p>
      </LegalSection>

      <LegalSection title="Pricing and payment">
        <p>
          Prices are confirmed before work begins. Payment is requested only after the scope and price are clear. Final
          pricing depends on the documents, portal steps, and deadline involved.
        </p>
      </LegalSection>

      <LegalSection title="Delivery and proof">
        <p>
          On completion we share proof of delivery — such as a confirmation screenshot, application or registration
          number, completed file, or receipt — over WhatsApp.
        </p>
      </LegalSection>

      <LegalSection title="Limitation of liability">
        <p>
          We act as an assistant completing tasks on your instructions. We are not a government body and are not affiliated
          with any government department. Official decisions, eligibility, and outcomes rest with the relevant authority.
        </p>
      </LegalSection>

      <LegalSection title="Governing law">
        <p>These terms are governed by the laws of India. Questions? Contact us at {businessProfile.email}.</p>
      </LegalSection>
    </LegalPage>
  );
}
