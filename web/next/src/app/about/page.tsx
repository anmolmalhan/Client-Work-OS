import { businessProfile, getBusinessWhatsappLink } from "@wdsc/domain";
import { CheckCircle2, FileCheck2, IndianRupee, MessageCircle, ShieldCheck } from "lucide-react";
import type { Metadata } from "next";
import { ActionButton } from "@/components/marketing/action-button";
import { ApplyDeliveryProof } from "@/components/marketing/delivery-proof";
import { PageHero } from "@/components/marketing/page-hero";
import { SectionHeading } from "@/components/marketing/section-heading";

export const metadata: Metadata = {
  title: "About Us",
  description: `${businessProfile.name} helps people across India complete online government forms, documents and PDF work simply — on WhatsApp.`,
  alternates: { canonical: "/about" },
};

const promises = [
  { icon: IndianRupee, title: "Price clear first", text: "We confirm the final price before any work starts. No surprises, no hidden charges." },
  { icon: ShieldCheck, title: "Documents kept safe", text: "Your files are used only for your task and deleted within 24 hours of completion." },
  { icon: FileCheck2, title: "Proof every time", text: "You receive a confirmation screenshot, application number, completed file, or receipt." },
];

export default function AboutPage() {
  return (
    <div>
      <PageHero
        eyebrow="About us"
        title="Real people, getting your digital work"
        highlight="done"
        description={`${businessProfile.name} helps people who find online government forms, photo sizes, and portal steps confusing — and gets the work done for them on WhatsApp.`}
      >
        <ActionButton href={getBusinessWhatsappLink()} icon={MessageCircle} variant="whatsapp" external>
          Talk to us
        </ActionButton>
      </PageHero>

      <div className="page-shell py-10">
        <div className="mx-auto max-w-3xl space-y-5 text-sm leading-7 text-[var(--foreground)]">
          <SectionHeading eyebrow="Our story" title="Online forms shouldn't be this hard" />
          <p>
            Every year, millions of people in India have to fill online forms for government jobs, exams, and services. The
            portals are confusing, the photo and signature sizes are strict, and one small mistake can cost a whole
            application. Many give up, pay a shop, or miss the last date.
          </p>
          <p>
            We started {businessProfile.name} to make this simple. Send us your details on WhatsApp, and we carefully fill
            the form, resize your photo and signature, upload your documents, and share the proof back — at a price we
            confirm before we start. No travelling, no queues, no guesswork.
          </p>
        </div>
      </div>

      <section className="border-y border-[var(--line)] bg-white py-12">
        <div className="page-shell">
          <SectionHeading eyebrow="Our promises" title="Why people trust us with their documents" />
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {promises.map((item) => (
              <article className="soft-card rounded-2xl border border-[var(--line)] bg-white p-5 shadow-sm" key={item.title}>
                <item.icon className="size-7 text-[var(--trust)]" aria-hidden="true" />
                <h3 className="mt-4 text-lg font-bold">{item.title}</h3>
                <p className="mt-2 text-sm leading-6 text-[var(--muted)]">{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="page-shell py-12">
        <div className="grid gap-8 lg:grid-cols-[1fr_1fr] lg:items-center">
          <div>
            <SectionHeading eyebrow="Delivery proof" title="Exactly what you get when a task is done" description="Every completed task ends with clear proof on WhatsApp — so you always know it's handled." />
            <ul className="mt-5 space-y-3 text-sm font-semibold">
              {["Confirmation screenshot of the submission", "Your application / registration number", "Completed file or download", "Payment receipt"].map((line) => (
                <li className="flex items-center gap-2" key={line}>
                  <CheckCircle2 className="size-5 shrink-0 text-[var(--whatsapp)]" aria-hidden="true" />
                  {line}
                </li>
              ))}
            </ul>
          </div>
          <ApplyDeliveryProof />
        </div>
      </section>

      <section className="page-shell pb-14">
        <div className="gradient-hero relative overflow-hidden rounded-3xl p-7 text-white shadow-[0_30px_70px_rgba(29,63,176,0.35)] sm:p-10">
          <h2 className="text-2xl font-black sm:text-3xl">Have a form or document to handle?</h2>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-blue-100/90">Send the details on WhatsApp. We confirm the price first, do the work, and share the proof.</p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <ActionButton href={getBusinessWhatsappLink()} icon={MessageCircle} variant="whatsapp" external>
              Start on WhatsApp
            </ActionButton>
            <ActionButton href="/submit-request" variant="secondary">
              Submit a request
            </ActionButton>
          </div>
        </div>
      </section>
    </div>
  );
}
