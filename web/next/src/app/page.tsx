import { businessProfile, faqs, getBusinessWhatsappLink, getPublishedJobPosts, pricing, services } from "@wdsc/domain";
import {
  ArrowRight,
  BadgeCheck,
  CheckCircle2,
  ClipboardCheck,
  Clock3,
  FileCheck2,
  IndianRupee,
  LockKeyhole,
  MessageCircle,
  ReceiptText,
  SearchCheck,
  ShieldCheck,
  UploadCloud,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { JobCard } from "@/components/jobs/job-card";
import { ActionButton } from "@/components/marketing/action-button";
import { FaqList } from "@/components/marketing/faq-list";
import { PricingCard } from "@/components/marketing/pricing-card";
import type { Metadata } from "next";
import { SectionHeading } from "@/components/marketing/section-heading";
import { ServiceCard } from "@/components/marketing/service-card";
import { Testimonials, TrustStats } from "@/components/marketing/trust-block";

export const metadata: Metadata = {
  description:
    "Swift Digital Seva fills online forms, handles documents and PDFs, and tracks Sarkari Result updates — all on WhatsApp. Price confirmed first, proof on delivery.",
  alternates: { canonical: "/" },
};

const trustBadges = [
  { icon: IndianRupee, title: "Price clear first", text: "Amount is confirmed before final work starts." },
  { icon: LockKeyhole, title: "Documents kept safe", text: "Files are used only for your requested work." },
  { icon: ReceiptText, title: "Delivery proof", text: "PDF, receipt, screenshot, or status proof is shared." },
];

const steps = [
  { icon: MessageCircle, title: "Send details", text: "Choose service, deadline, and share basic work details." },
  { icon: UploadCloud, title: "Share documents", text: "Upload files or continue on WhatsApp for document sharing." },
  { icon: IndianRupee, title: "Confirm price", text: "We check documents and confirm final price before work." },
  { icon: BadgeCheck, title: "Get proof", text: "Completed file or submission proof is sent on WhatsApp." },
];

const progressItems = ["Received", "Checked", "In progress", "Delivered"];
const popularServices = services.slice(0, 6);
const homeFaqs = faqs.slice(0, 5);
const latestForms = getPublishedJobPosts()
  .filter((job) => job.category === "latest_job")
  .slice(0, 3);

// FAQPage schema for the homepage FAQ section (matches the questions shown).
const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: homeFaqs.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: { "@type": "Answer", text: item.answer },
  })),
};

export default function HomePage() {
  return (
    <div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <section className="sunny-panel border-b border-[var(--line)]">
        <div className="page-shell grid items-center gap-8 py-8 lg:grid-cols-[0.92fr_1.08fr] lg:gap-10 lg:py-14">
          <div className="section-fade">
            <p className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-white px-3 py-1 text-sm font-bold text-[var(--trust-dark)] shadow-sm">
              <span className="inline-block size-2 animate-pulse rounded-full bg-[var(--whatsapp)]" aria-hidden="true" />
              WhatsApp-first digital service center
            </p>
            <h1 className="mt-5 text-4xl font-black leading-[1.08] tracking-tight text-[var(--navy)] sm:text-5xl">
              Online form, document and PDF work <span className="gradient-text">without confusion.</span>
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-7 text-[var(--muted)] sm:mt-5 sm:text-lg sm:leading-8">
              {businessProfile.name} helps clients submit forms, upload documents, convert PDFs, check application status, and receive clear proof through WhatsApp.
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <ActionButton href={getBusinessWhatsappLink()} icon={MessageCircle} variant="whatsapp" external>
                Start on WhatsApp
              </ActionButton>
              <div className="hidden sm:block">
                <ActionButton href="/submit-request" icon={ClipboardCheck}>
                  Submit Request
                </ActionButton>
              </div>
              <ActionButton href="/track-request" icon={SearchCheck} variant="secondary">
                Track Request
              </ActionButton>
            </div>
            <div className="mt-6 grid grid-cols-3 gap-2 sm:gap-3">
              {trustBadges.map((item) => (
                <div className="rounded-lg border border-[var(--line)] bg-white p-2 shadow-sm sm:p-3" key={item.title}>
                  <item.icon className="size-5 text-[var(--trust)]" aria-hidden="true" />
                  <p className="mt-2 text-xs font-bold leading-4 sm:text-sm sm:leading-5">{item.title}</p>
                  <p className="mt-1 hidden text-xs leading-5 text-[var(--muted)] sm:block">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="section-fade overflow-hidden rounded-lg border border-[var(--line)] bg-white shadow-[0_24px_60px_rgba(15,23,42,0.12)]" style={{ animationDelay: "90ms" }}>
            <Image
              src="/images/digital-service-hero.png"
              alt="Remote digital document support through a phone and laptop"
              width={1280}
              height={720}
              className="aspect-[16/10] h-full w-full object-cover object-[70%_center]"
              priority
            />
            <div className="grid gap-3 border-t border-[var(--line)] p-4 sm:grid-cols-3">
              {["Documents checked", "Price confirmed", "Proof delivered"].map((label) => (
                <div className="flex items-center gap-2 text-sm font-bold text-[var(--foreground)]" key={label}>
                  <CheckCircle2 className="size-4 shrink-0 text-[var(--trust)]" aria-hidden="true" />
                  {label}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="page-shell section-fade -mt-6 pb-2">
        <TrustStats />
      </section>

      <section className="page-shell section-fade py-12">
        <SectionHeading
          eyebrow="Trust first"
          title="Clients should not worry before sending documents"
          description="The first screen explains price clarity, document safety, and delivery proof in simple language."
        />
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {[
            { icon: ShieldCheck, title: "Safe document handling", text: "Only required files are asked for. Sensitive documents are marked and handled as client files." },
            { icon: IndianRupee, title: "No surprise price", text: "Fixed work shows price. Variable work is quoted after checking documents and portal steps." },
            { icon: FileCheck2, title: "Proof after work", text: "You receive a completed file, receipt, screenshot, status note, or download proof." },
          ].map((item) => (
            <article className="soft-card rounded-lg border border-[var(--line)] bg-white p-5 shadow-sm" key={item.title}>
              <item.icon className="size-7 text-[var(--trust)]" aria-hidden="true" />
              <h2 className="mt-4 text-lg font-bold">{item.title}</h2>
              <p className="mt-2 text-sm leading-6 text-[var(--muted)]">{item.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="border-y border-[var(--line)] bg-white py-12">
        <div className="page-shell section-fade">
          <SectionHeading
            eyebrow="How it works"
            title="Simple process for non-technical clients"
            description="Every request follows a clear path from WhatsApp or form submission to final delivery proof."
          />
          <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {steps.map((step, index) => (
              <article className="soft-card rounded-lg border border-[var(--line)] bg-white p-5 shadow-sm" key={step.title}>
                <span className="inline-flex size-10 items-center justify-center rounded-md bg-blue-50 text-[var(--trust)]">
                  <step.icon className="size-5" aria-hidden="true" />
                </span>
                <p className="mt-4 text-xs font-bold uppercase text-[var(--muted)]">Step {index + 1}</p>
                <h3 className="mt-1 text-lg font-bold">{step.title}</h3>
                <p className="mt-2 text-sm leading-6 text-[var(--muted)]">{step.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="page-shell section-fade py-12">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <SectionHeading title="Popular digital services" description="Start with the common work clients usually need on WhatsApp." />
          <Link className="focus-ring inline-flex items-center gap-2 rounded-md px-3 py-2 text-sm font-bold text-[var(--trust-dark)] hover:bg-blue-50" href="/services">
            View All Services
            <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
        </div>
        <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {popularServices.map((service, index) => (
            <div className={index > 3 ? "hidden md:block" : ""} key={service.id}>
              <ServiceCard service={service} index={index} />
            </div>
          ))}
        </div>
        <div className="mt-5 md:hidden">
          <ActionButton href="/services" variant="secondary">
            View All Services
          </ActionButton>
        </div>
      </section>

      <section className="border-y border-[var(--line)] bg-white py-12">
        <div className="page-shell section-fade">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <SectionHeading
              eyebrow="Sarkari Result"
              title="Latest government forms open now"
              description="Track new Sarkari Naukri vacancies and apply on time. Need help filling a form? We do it for you on WhatsApp."
            />
            <Link className="focus-ring inline-flex items-center gap-2 rounded-md px-3 py-2 text-sm font-bold text-[var(--trust-dark)] hover:bg-blue-50" href="/sarkari-result">
              View All Forms
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          </div>
          <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {latestForms.map((job, index) => (
              <JobCard job={job} index={index} key={job.id} />
            ))}
          </div>
          <div className="mt-5 md:hidden">
            <ActionButton href="/sarkari-result" variant="secondary">
              View All Forms
            </ActionButton>
          </div>
        </div>
      </section>

      <section className="vibrant-panel border-y border-[var(--line)] py-12">
        <div className="page-shell section-fade">
          <SectionHeading
            eyebrow="Pricing preview"
            title="Clear price types before the client asks"
            description="Small PDF work has direct pricing. Forms and portal work are checked first, then final price is confirmed."
          />
          <div className="mt-8 grid gap-4 lg:grid-cols-3">
            {pricing.map((category) => (
              <PricingCard category={category} key={category.title} />
            ))}
          </div>
        </div>
      </section>

      <section className="page-shell section-fade py-12">
        <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <SectionHeading
            eyebrow="Tracking preview"
            title="Request status should feel visible"
            description="Clients can check current update, payment, deadline, and next step without asking again and again."
          />
          <div className="rounded-lg border border-[var(--line)] bg-white p-5 shadow-sm">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <p className="text-sm font-bold text-[var(--muted)]">SDS-2026-0001</p>
                <h2 className="mt-1 text-xl font-bold">Online form filling</h2>
              </div>
              <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-[var(--trust-dark)] ring-1 ring-blue-100">In Progress</span>
            </div>
            <div className="mt-5 h-2 overflow-hidden rounded-full bg-slate-100">
              <div className="status-fill h-full w-[68%] rounded-full bg-[var(--trust)]" />
            </div>
            <div className="mt-3 grid grid-cols-4 gap-2 text-center text-[10px] font-bold uppercase text-[var(--muted)]">
              {progressItems.map((item) => (
                <span key={item}>{item}</span>
              ))}
            </div>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              <MiniInfo label="Current update" value="Form details are being verified." />
              <MiniInfo label="Payment" value="Partial paid" />
              <MiniInfo label="Deadline" value="Today, 6:00 PM" />
              <MiniInfo label="Next step" value="Final confirmation on WhatsApp" />
            </div>
          </div>
        </div>
      </section>

      <section className="page-shell section-fade py-12">
        <Testimonials />
      </section>

      <section className="border-y border-[var(--line)] bg-white py-12">
        <div className="page-shell section-fade">
          <SectionHeading title="Questions before sending documents" description="Short answers for clients who want the process to feel safe and clear." />
          <div className="mt-8">
            <FaqList items={homeFaqs} />
          </div>
        </div>
      </section>

      <section className="page-shell section-fade py-12">
        <div className="rounded-lg bg-[var(--navy)] p-6 text-white shadow-[0_22px_52px_rgba(15,23,42,0.2)] sm:p-8">
          <Clock3 className="size-8 text-[var(--amber)]" aria-hidden="true" />
          <h2 className="mt-4 text-2xl font-bold">Send the work once. Get clear updates till delivery.</h2>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-300">
            Share details through the form or WhatsApp. Documents are checked, price is confirmed, and delivery proof is sent back clearly.
          </p>
          <div className="mt-5 flex flex-col gap-3 sm:flex-row">
            <ActionButton href={getBusinessWhatsappLink()} icon={MessageCircle} variant="whatsapp" external>
              WhatsApp Now
            </ActionButton>
            <ActionButton href="/submit-request" variant="secondary">
              Submit Request
            </ActionButton>
          </div>
        </div>
      </section>
    </div>
  );
}

function MiniInfo({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-md border border-[var(--line)] bg-slate-50 p-3">
      <p className="text-xs font-bold uppercase text-[var(--muted)]">{label}</p>
      <p className="mt-1 text-sm font-semibold">{value}</p>
    </div>
  );
}
