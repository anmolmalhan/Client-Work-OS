import { businessProfile } from "@wdsc/domain";
import type { Metadata } from "next";
import { LegalPage, LegalSection } from "@/components/legal/legal-page";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `How ${businessProfile.name} collects, uses, protects, and deletes your documents and personal information.`,
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <LegalPage
      eyebrow="Privacy"
      title="Your documents are handled with"
      highlight="care"
      description="We only ask for what a task needs, use it solely to complete that task, and delete it afterwards."
      updated="30 June 2026"
    >
      <LegalSection title="What we collect">
        <p>
          To complete a requested task we may collect: your name and WhatsApp number, the documents you share for the task
          (for example a photo, signature, ID proof, or certificate), and the details needed to fill a form or check a
          status. We collect this only when you choose to send it to us.
        </p>
      </LegalSection>

      <LegalSection title="How we use your information">
        <p>
          Your documents and details are used <strong>only</strong> to complete the specific task you requested — such as
          filling a form, uploading a document, resizing a photo, or checking a result. We do not use them for any other
          purpose, and we do not sell or share them with advertisers.
        </p>
      </LegalSection>

      <LegalSection title="Document deletion">
        <p>
          We delete the documents and files you share <strong>within 24 hours of completing your task</strong>. Sensitive
          documents (such as Aadhaar or other ID proofs) are never stored longer than needed to finish the work. After
          deletion we keep only a basic record of the task (request ID, service, and status) so you can track it.
        </p>
      </LegalSection>

      <LegalSection title="Data security">
        <p>
          Files are shared and returned over WhatsApp and our secure website. We limit who can access your documents to the
          staff completing your task, and we ask you to send only the files a task actually requires.
        </p>
      </LegalSection>

      <LegalSection title="Your choices">
        <p>
          You can ask us to delete your information at any time by messaging us on WhatsApp. You can also choose not to
          share a document — though some tasks cannot be completed without the required files.
        </p>
      </LegalSection>

      <LegalSection title="Contact">
        <p>
          Questions about your privacy? Reach us on WhatsApp or call {businessProfile.phone}, or email {businessProfile.email}.
        </p>
      </LegalSection>
    </LegalPage>
  );
}
