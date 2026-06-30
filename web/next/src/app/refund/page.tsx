import { businessProfile } from "@wdsc/domain";
import type { Metadata } from "next";
import { LegalPage, LegalSection } from "@/components/legal/legal-page";

export const metadata: Metadata = {
  title: "Refund Policy",
  description: `${businessProfile.name} confirms the price before any work starts and offers a full refund if a task cannot be completed.`,
  alternates: { canonical: "/refund" },
};

export default function RefundPage() {
  return (
    <LegalPage
      eyebrow="Refunds"
      title="Price confirmed first, refund if we can't"
      highlight="complete it"
      description="No surprises. We agree the price before starting, and you are protected if the work can't be done."
      updated="30 June 2026"
    >
      <LegalSection title="Price is confirmed before work">
        <p>
          We check your documents and the task first, then confirm the final price on WhatsApp. Work only begins after you
          agree to that price — so there are no hidden or surprise charges.
        </p>
      </LegalSection>

      <LegalSection title="Full refund if we cannot complete">
        <p>
          If we accept a task, take payment, and then cannot complete it (for example a portal is closed, a date has
          passed, or the task is not possible), you receive a <strong>full refund</strong>. You only pay for work that is
          actually delivered.
        </p>
      </LegalSection>

      <LegalSection title="First-time users pay after confirmation">
        <p>
          New customers do not need to pay any advance. We confirm we can do the task first; you pay only once we are ready
          to deliver.
        </p>
      </LegalSection>

      <LegalSection title="When refunds may not apply">
        <p>
          Refunds do not apply once a task is correctly completed and proof has been delivered, or where a delay or error
          was caused by wrong or incomplete details provided by you. If something went wrong on our side, tell us — we will
          fix it or refund.
        </p>
      </LegalSection>

      <LegalSection title="How to request a refund">
        <p>
          Message us on WhatsApp or call {businessProfile.phone} with your request ID. Approved refunds are returned to your
          original payment method (usually UPI) within a few working days.
        </p>
      </LegalSection>
    </LegalPage>
  );
}
