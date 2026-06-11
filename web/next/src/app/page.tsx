import { businessProfile, getBusinessWhatsappLink, pricing, services } from "@wdsc/domain";
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
  ShieldCheck,
  Smartphone,
  UserRoundCheck,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { ActionButton } from "@/components/marketing/action-button";
import { PricingCard } from "@/components/marketing/pricing-card";
import { SectionHeading } from "@/components/marketing/section-heading";
import { ServiceCard } from "@/components/marketing/service-card";

const heroProofItems = [
  { icon: IndianRupee, title: "Price confirmed first", text: "You see the amount before final work starts." },
  { icon: LockKeyhole, title: "Documents handled carefully", text: "Files are used only for the requested service." },
  { icon: ReceiptText, title: "Proof shared on WhatsApp", text: "Screenshots, PDFs, receipts, or status updates are sent back." },
];

const trustItems = [
  { icon: ShieldCheck, title: "No blind payment", text: "Final amount is confirmed after checking documents, portal steps, urgency, and file count." },
  { icon: ClipboardCheck, title: "Details checked before submission", text: "Important forms and uploads are reviewed with you before final submission wherever confirmation is needed." },
  { icon: Smartphone, title: "WhatsApp stays open", text: "Clients can ask questions, send missing files, receive updates, and get delivery in the same familiar chat." },
  { icon: FileCheck2, title: "Delivery proof", text: "Completed work is shared with confirmation such as a file, screenshot, receipt, status note, or download." },
  { icon: Clock3, title: "Clear next step", text: "If documents are incomplete or payment is pending, the client sees what is needed next." },
  { icon: UserRoundCheck, title: "Human support", text: "The process is built for people who do not want to struggle with portals, file sizes, or confusing forms." },
];

const steps = [
  { title: "Share work details", text: "Send the service name, deadline, and documents through the website or WhatsApp." },
  { title: "Get price and document check", text: "You receive the required documents list, price, and any missing-detail request before work starts." },
  { title: "Approve and pay", text: "Payment is requested only after scope is clear. Urgent or variable work is explained first." },
  { title: "Receive delivery proof", text: "Final file, screenshot, receipt, confirmation, or status update is shared on WhatsApp." },
];

const confidenceItems = [
  "Remote service only, so no physical visit is required.",
  "Printing, lamination, photocopying, and public PC usage are not offered.",
  "Sensitive documents are marked and handled as client files, not public samples.",
  "Each request can be tracked with a request ID and WhatsApp number.",
];

export default function HomePage() {
  return (
    <div>
      <section className="sunny-panel border-b border-[var(--line)]">
        <div className="page-shell grid items-center gap-8 py-10 lg:grid-cols-[0.9fr_1.1fr] lg:py-14">
          <div>
            <p className="inline-flex rounded-full bg-white px-3 py-1 text-sm font-bold text-[var(--action-dark)] shadow-sm ring-1 ring-[#b8f3df]">
              Trusted WhatsApp-first digital service center
            </p>
            <h1 className="mt-5 text-4xl font-bold leading-tight text-[var(--foreground)] sm:text-5xl">
              Send documents with confidence. Know the price, process, and proof.
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-[var(--muted)]">
              {businessProfile.name} helps clients complete online forms, document uploads, PDF work, file conversion, applications, and status checks remotely. Every request starts with clear document checks, price confirmation, and WhatsApp updates.
            </p>
            <div className="mt-6 grid gap-3 sm:grid-cols-3">
              {heroProofItems.map((item) => (
                <div className="rounded-lg border border-[#c9eadc] bg-white/90 p-3 shadow-sm" key={item.title}>
                  <item.icon className="size-5 text-[var(--action-dark)]" aria-hidden="true" />
                  <p className="mt-2 text-sm font-bold">{item.title}</p>
                  <p className="mt-1 text-xs leading-5 text-[var(--muted)]">{item.text}</p>
                </div>
              ))}
            </div>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <ActionButton href={getBusinessWhatsappLink()} icon={MessageCircle} external>
                Send Request on WhatsApp
              </ActionButton>
              <ActionButton href="/track-request" icon={BadgeCheck} variant="secondary">
                Track a Request
              </ActionButton>
            </div>
          </div>
          <div className="overflow-hidden rounded-lg border border-white bg-[#f5f8f6] shadow-[0_24px_60px_rgba(8,116,99,0.2)] ring-1 ring-[#d3efe2]">
            <Image
              src="/images/digital-service-hero.png"
              alt="Remote digital document support through a smartphone and online files"
              width={1280}
              height={720}
              className="aspect-[16/10] h-full w-full object-cover object-[70%_center]"
              priority
            />
            <div className="grid gap-3 border-t border-[#d7ebe1] bg-white p-4 sm:grid-cols-3">
              {["Document received", "Price confirmed", "Work delivered"].map((label) => (
                <div className="flex items-center gap-2 text-sm font-bold text-[var(--foreground)]" key={label}>
                  <CheckCircle2 className="size-4 shrink-0 text-[var(--action)]" aria-hidden="true" />
                  {label}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="page-shell py-12">
        <div className="mb-8 flex flex-col justify-between gap-4 lg:flex-row lg:items-end">
          <SectionHeading
            eyebrow="Trust built in"
            title="The client always knows what is happening"
            description="The homepage now explains the safeguards upfront: documents, price, payment, status, and final delivery are all made clear before the client commits."
          />
          <ActionButton href="/submit-request" variant="secondary">
            Start with Clear Details
          </ActionButton>
        </div>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {trustItems.map((item, index) => (
            <article
              className="rounded-lg border border-[var(--line)] bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-[0_18px_38px_rgba(8,116,99,0.12)]"
              key={item.title}
              style={{ borderTop: `4px solid ${["var(--action)", "var(--sky)", "var(--sun)", "var(--coral)", "var(--action-dark)", "var(--highlight)"][index]}` }}
            >
              <item.icon className="size-6 text-[var(--action-dark)]" aria-hidden="true" />
              <h2 className="mt-4 text-lg font-bold">{item.title}</h2>
              <p className="mt-2 text-sm leading-6 text-[var(--muted)]">{item.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="border-y border-[var(--line)] bg-white py-12">
        <div className="page-shell">
          <SectionHeading
            eyebrow="Clear process"
            title="No confusion between document and delivery"
            description="The client can see how the work moves forward, what is checked, when payment is requested, and what proof they receive at the end."
          />
          <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {steps.map((step, index) => (
              <article className="rounded-lg border border-[var(--line)] bg-[#fffdf7] p-5 shadow-sm" key={step.title}>
                <span className="inline-flex size-9 items-center justify-center rounded-md bg-[var(--coral)] text-sm font-bold text-white">
                  {index + 1}
                </span>
                <h3 className="mt-4 text-lg font-bold">{step.title}</h3>
                <p className="mt-2 text-sm leading-6 text-[var(--muted)]">{step.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="page-shell py-12">
        <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <div>
            <SectionHeading
              eyebrow="Client confidence"
              title="Trust is not hidden in fine print"
              description="Before a client sends sensitive files or pays, the page makes the service boundaries visible. That reduces doubt and makes the business feel organized."
            />
            <div className="mt-6 grid gap-3">
              {confidenceItems.map((item) => (
                <div className="flex gap-3 rounded-lg border border-[var(--line)] bg-white p-4 shadow-sm" key={item}>
                  <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-[var(--action)]" aria-hidden="true" />
                  <p className="text-sm font-semibold leading-6 text-[var(--foreground)]">{item}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-lg border border-[#184f42] bg-[#0d2b23] p-6 text-white shadow-[0_22px_52px_rgba(13,43,35,0.22)]">
            <ShieldCheck className="size-8 text-[var(--highlight)]" aria-hidden="true" />
            <h2 className="mt-4 text-2xl font-bold">The promise clients should feel immediately</h2>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {[
                "I know what documents are needed.",
                "I know when payment is required.",
                "I know how to get updates.",
                "I know what proof I will receive.",
              ].map((item) => (
                <p className="rounded-md border border-white/15 bg-white/10 p-3 text-sm font-semibold leading-6 text-[#e8f6f1]" key={item}>
                  {item}
                </p>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="page-shell py-12">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <SectionHeading title="Popular digital services" description="Remote-first services focused on forms, files, documents, and online support." />
          <Link className="focus-ring inline-flex items-center gap-2 rounded-md px-3 py-2 text-sm font-bold text-[var(--action-dark)] hover:bg-[#e6f5f1]" href="/services">
            All services
            <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
        </div>
        <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {services.slice(0, 6).map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
      </section>

      <section className="vibrant-panel border-y border-[var(--line)] py-12">
        <div className="page-shell">
          <SectionHeading title="Clear pricing before final work" description="Fixed services are listed. Variable services are confirmed after checking documents and portal steps." />
          <div className="mt-8 grid gap-4 lg:grid-cols-3">
            {pricing.map((category) => (
              <PricingCard category={category} key={category.title} />
            ))}
          </div>
        </div>
      </section>

      <section className="page-shell py-12">
        <div className="rounded-lg border border-[#184f42] bg-[#0d2b23] p-6 text-white shadow-[0_22px_52px_rgba(13,43,35,0.24)] sm:p-8">
          <CheckCircle2 className="size-8 text-[var(--highlight)]" aria-hidden="true" />
          <h2 className="mt-4 text-2xl font-bold">Ready to send work without second-guessing?</h2>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-[#d7e9e2]">
            Submit a request from the website or send details directly on WhatsApp. Documents are checked, final price is confirmed, and delivery proof is shared clearly.
          </p>
          <div className="mt-5 flex flex-col gap-3 sm:flex-row">
            <ActionButton href="/submit-request" variant="secondary">
              Submit Request
            </ActionButton>
            <ActionButton href={getBusinessWhatsappLink()} icon={MessageCircle} external>
              WhatsApp Now
            </ActionButton>
          </div>
        </div>
      </section>
    </div>
  );
}
