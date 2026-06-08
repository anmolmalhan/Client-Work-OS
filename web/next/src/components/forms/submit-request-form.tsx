"use client";

import { businessProfile, buildNewRequestMessage, buildWhatsappLink, services } from "@wdsc/domain";
import { CalendarClock, MessageCircle, Send, Upload } from "lucide-react";
import { useMemo, useState } from "react";

export function SubmitRequestForm() {
  const [submitted, setSubmitted] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [serviceId, setServiceId] = useState(services[0]?.id ?? "");
  const selectedService = services.find((service) => service.id === serviceId);

  const whatsappLink = useMemo(() => {
    const message = [
      buildNewRequestMessage(businessProfile),
      name ? `Client name: ${name}` : "",
      phone ? `WhatsApp: ${phone}` : "",
      selectedService ? `Selected service: ${selectedService.name}` : "",
    ]
      .filter(Boolean)
      .join("\n");

    return buildWhatsappLink(businessProfile.whatsappNumber, message);
  }, [name, phone, selectedService]);

  return (
    <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
      <form
        className="rounded-lg border border-[var(--line)] bg-white p-5 shadow-sm"
        onSubmit={(event) => {
          event.preventDefault();
          setSubmitted(true);
        }}
      >
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="grid gap-2 text-sm font-semibold">
            Full name
            <input
              className="focus-ring min-h-11 rounded-md border border-[var(--line)] px-3"
              name="fullName"
              onChange={(event) => setName(event.target.value)}
              required
              value={name}
            />
          </label>
          <label className="grid gap-2 text-sm font-semibold">
            WhatsApp number
            <input
              className="focus-ring min-h-11 rounded-md border border-[var(--line)] px-3"
              inputMode="tel"
              name="whatsappNumber"
              onChange={(event) => setPhone(event.target.value)}
              required
              value={phone}
            />
          </label>
          <label className="grid gap-2 text-sm font-semibold">
            Email ID optional
            <input className="focus-ring min-h-11 rounded-md border border-[var(--line)] px-3" name="email" type="email" />
          </label>
          <label className="grid gap-2 text-sm font-semibold">
            Service type
            <select
              className="focus-ring min-h-11 rounded-md border border-[var(--line)] px-3"
              name="serviceType"
              onChange={(event) => setServiceId(event.target.value)}
              value={serviceId}
            >
              {services.map((service) => (
                <option key={service.id} value={service.id}>
                  {service.name}
                </option>
              ))}
            </select>
          </label>
          <label className="grid gap-2 text-sm font-semibold sm:col-span-2">
            Work description
            <textarea
              className="focus-ring min-h-32 rounded-md border border-[var(--line)] px-3 py-3"
              name="description"
              placeholder="Tell us portal name, document count, deadline, and any special instructions."
              required
            />
          </label>
          <label className="grid gap-2 text-sm font-semibold">
            Deadline
            <span className="relative">
              <CalendarClock className="pointer-events-none absolute left-3 top-3 size-5 text-[var(--muted)]" aria-hidden="true" />
              <input className="focus-ring min-h-11 w-full rounded-md border border-[var(--line)] px-3 pl-10" name="deadline" type="date" required />
            </span>
          </label>
          <label className="grid gap-2 text-sm font-semibold">
            Upload documents
            <span className="flex min-h-11 items-center gap-2 rounded-md border border-dashed border-[var(--line)] px-3 text-sm text-[var(--muted)]">
              <Upload className="size-5" aria-hidden="true" />
              <input className="w-full text-sm" multiple name="documents" type="file" accept=".pdf,image/*" />
            </span>
          </label>
          <label className="flex gap-3 rounded-md bg-[#f5f8f6] p-3 text-sm font-semibold sm:col-span-2">
            <input className="mt-1 size-4 accent-[var(--action)]" name="consent" type="checkbox" required />
            I agree that my documents will be used only to complete this requested digital work.
          </label>
        </div>
        <div className="mt-5 flex flex-col gap-3 sm:flex-row">
          <button className="focus-ring inline-flex min-h-11 items-center justify-center gap-2 rounded-md bg-[var(--action)] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[var(--action-dark)]" type="submit">
            <Send className="size-4" aria-hidden="true" />
            Submit Request
          </button>
          <a className="focus-ring inline-flex min-h-11 items-center justify-center gap-2 rounded-md border border-[var(--line)] bg-white px-4 py-2.5 text-sm font-semibold transition hover:border-[var(--action)]" href={whatsappLink} target="_blank" rel="noreferrer">
            <MessageCircle className="size-4" aria-hidden="true" />
            Redirect to WhatsApp
          </a>
        </div>
        {submitted ? (
          <p className="mt-4 rounded-md border border-emerald-200 bg-emerald-50 p-3 text-sm font-semibold text-emerald-900">
            Request draft created. Demo Request ID: SDS-2026-DEMO. Send documents on WhatsApp for final confirmation.
          </p>
        ) : null}
      </form>
      <aside className="rounded-lg border border-[var(--line)] bg-white p-5 shadow-sm">
        <h2 className="text-lg font-bold">Before submitting</h2>
        <div className="mt-4 grid gap-3 text-sm leading-6 text-[var(--muted)]">
          <p>Final price is confirmed only after checking documents, portal steps, and deadline.</p>
          <p>For sensitive work, send only clear required documents and avoid sharing unnecessary personal files.</p>
          <p>WhatsApp remains the primary channel for document clarification, payment confirmation, and delivery.</p>
        </div>
        {selectedService ? (
          <div className="mt-5 rounded-md bg-[#f5f8f6] p-4">
            <p className="text-sm font-bold">{selectedService.name}</p>
            <p className="mt-2 text-xs font-semibold text-[var(--muted)]">Required: {selectedService.requiredDocuments.join(", ")}</p>
          </div>
        ) : null}
      </aside>
    </div>
  );
}
