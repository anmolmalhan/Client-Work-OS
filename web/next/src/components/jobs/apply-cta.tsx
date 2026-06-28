import { businessProfile, getBusinessWhatsappLink, type JobPost } from "@wdsc/domain";
import { ClipboardCheck, MessageCircle } from "lucide-react";
import { ActionButton } from "@/components/marketing/action-button";

function helpMessage(job: JobPost) {
  return [
    `Hello ${businessProfile.name},`,
    `I need help applying for: ${job.title}`,
    `Organization: ${job.organization}`,
    "Please help me fill and submit this form online.",
  ].join("\n");
}

// The traffic -> product bridge. Every Sarkari listing offers paid help with
// the application, funnelling SEO visitors into the Client Work OS pipeline.
export function ApplyHelpCta({ job }: { job: JobPost }) {
  return (
    <aside className="rounded-lg border border-[var(--line)] bg-[var(--navy)] p-5 text-white shadow-sm sm:p-6">
      <p className="inline-flex rounded-full bg-white/10 px-3 py-1 text-xs font-bold uppercase tracking-wide text-[var(--amber)]">
        Need help applying?
      </p>
      <h2 className="mt-3 text-xl font-bold">We can fill and submit this form for you</h2>
      <p className="mt-2 text-sm leading-6 text-slate-300">
        Confused about documents, photo size, or the last date? {businessProfile.name} fills the form, uploads your
        documents, confirms the price first, and shares the submission proof on WhatsApp.
      </p>
      <div className="mt-5 flex flex-col gap-3 sm:flex-row">
        <ActionButton href={getBusinessWhatsappLink(helpMessage(job))} icon={MessageCircle} variant="whatsapp" external>
          Get Help on WhatsApp
        </ActionButton>
        <ActionButton href="/submit-request" icon={ClipboardCheck} variant="secondary">
          Submit Request
        </ActionButton>
      </div>
    </aside>
  );
}
