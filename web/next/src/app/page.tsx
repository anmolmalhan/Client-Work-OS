import { businessProfile, getBusinessWhatsappLink, pricing, services } from "@wdsc/domain";
import { ArrowRight, CheckCircle2, Clock3, MessageCircle, ShieldCheck, Smartphone } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { ActionButton } from "@/components/marketing/action-button";
import { PricingCard } from "@/components/marketing/pricing-card";
import { SectionHeading } from "@/components/marketing/section-heading";
import { ServiceCard } from "@/components/marketing/service-card";

const trustItems = [
  { icon: Clock3, title: "Fast service", text: "Small file work and simple status checks can be handled quickly when details are ready." },
  { icon: ShieldCheck, title: "Secure handling", text: "Documents are used only for the requested work and sensitive files are treated carefully." },
  { icon: Smartphone, title: "Easy process", text: "Clients can send documents, confirm details, pay, and receive delivery on WhatsApp." },
];

const steps = [
  { title: "Send Documents", text: "Upload documents or send PDF/images directly on WhatsApp." },
  { title: "Work Completed", text: "The service provider fills, edits, uploads, checks, or converts files." },
  { title: "Receive Confirmation", text: "Final file, screenshot, receipt, or status update is shared back." },
];

export default function HomePage() {
  return (
    <div>
      <section className="sunny-panel border-b border-[var(--line)]">
        <div className="page-shell grid min-h-[calc(100svh-132px)] items-center gap-8 py-10 lg:grid-cols-[0.92fr_1.08fr] lg:py-14">
          <div>
            <p className="inline-flex rounded-full bg-white px-3 py-1 text-sm font-bold text-[var(--action-dark)] shadow-sm ring-1 ring-[#b8f3df]">
              WhatsApp-first remote digital service center
            </p>
            <h1 className="mt-5 text-4xl font-bold leading-tight text-[var(--foreground)] sm:text-5xl">
              Send documents on WhatsApp. Get online work completed remotely.
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-[var(--muted)]">
              {businessProfile.name} helps clients with online form filling, document uploads, PDF work, file conversion, application submission, and digital support without requiring a physical visit.
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <ActionButton href={getBusinessWhatsappLink()} icon={MessageCircle} external>
                Send Request on WhatsApp
              </ActionButton>
              <ActionButton href="/services" icon={ArrowRight} variant="secondary">
                View Services
              </ActionButton>
            </div>
          </div>
          <div className="relative overflow-hidden rounded-lg border border-white bg-[#f5f8f6] shadow-[0_24px_60px_rgba(8,116,99,0.2)] ring-1 ring-[#d3efe2]">
            <Image
              src="/images/digital-service-hero.png"
              alt="Remote digital document support through a smartphone and online files"
              width={1280}
              height={720}
              className="aspect-[16/10] h-full w-full object-cover"
              priority
            />
          </div>
        </div>
      </section>

      <section className="page-shell py-12">
        <div className="grid gap-4 md:grid-cols-3">
          {trustItems.map((item, index) => (
            <article
              className="rounded-lg border border-[var(--line)] bg-white p-5 shadow-sm"
              key={item.title}
              style={{ borderTop: `4px solid ${["var(--action)", "var(--sky)", "var(--sun)"][index]}` }}
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
            eyebrow="Simple process"
            title="Three steps from document to delivery"
            description="The website collects clear details, while WhatsApp remains the main channel for quick communication and delivery."
          />
          <div className="mt-8 grid gap-4 md:grid-cols-3">
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
          <h2 className="mt-4 text-2xl font-bold">Ready to start client work?</h2>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-[#d7e9e2]">
            Submit a request from the website or send details directly on WhatsApp. Final price is confirmed after document checking.
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
