"use client";

import { businessProfile, buildNewRequestMessage, buildWhatsappLink, services } from "@wdsc/domain";
import { ArrowRight, CalendarClock, CheckCircle2, FileCheck2, MessageCircle, ShieldCheck, Upload } from "lucide-react";
import { useMemo, useState } from "react";

const steps = ["Work Details", "Documents", "Review", "WhatsApp"];

export function SubmitRequestForm() {
  const [step, setStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [serviceId, setServiceId] = useState(services[0]?.id ?? "");
  const [description, setDescription] = useState("");
  const [deadline, setDeadline] = useState("");
  const [fileCount, setFileCount] = useState(0);
  const selectedService = services.find((service) => service.id === serviceId);

  const whatsappLink = useMemo(() => {
    const message = [
      buildNewRequestMessage(businessProfile),
      name ? `Client name: ${name}` : "",
      phone ? `WhatsApp: ${phone}` : "",
      selectedService ? `Selected service: ${selectedService.name}` : "",
      description ? `Work details: ${description}` : "",
      deadline ? `Deadline: ${deadline}` : "",
      fileCount ? `Documents selected: ${fileCount}` : "",
    ]
      .filter(Boolean)
      .join("\n");

    return buildWhatsappLink(businessProfile.whatsappNumber, message);
  }, [deadline, description, fileCount, name, phone, selectedService]);

  function nextStep() {
    setStep((current) => Math.min(current + 1, steps.length - 1));
  }

  function previousStep() {
    setStep((current) => Math.max(current - 1, 0));
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
      <form
        className="rounded-lg border border-[var(--line)] bg-white p-5 shadow-sm"
        onSubmit={(event) => {
          event.preventDefault();
          if (step < 2) {
            nextStep();
            return;
          }
          setSubmitted(true);
          setStep(3);
        }}
      >
        <div className="grid gap-2 sm:grid-cols-4">
          {steps.map((item, index) => (
            <div className={`rounded-md border px-3 py-2 text-sm font-bold ${index <= step ? "border-blue-100 bg-blue-50 text-[var(--trust-dark)]" : "border-[var(--line)] bg-slate-50 text-[var(--muted)]"}`} key={item}>
              <span className="text-xs">Step {index + 1}</span>
              <p>{item}</p>
            </div>
          ))}
        </div>

        <div className="mt-6">
          {step === 0 ? (
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="grid gap-2 text-sm font-semibold">
                Full name
                <input className="focus-ring min-h-11 rounded-md border border-[var(--line)] px-3" onChange={(event) => setName(event.target.value)} required value={name} />
              </label>
              <label className="grid gap-2 text-sm font-semibold">
                WhatsApp number
                <input className="focus-ring min-h-11 rounded-md border border-[var(--line)] px-3" inputMode="tel" onChange={(event) => setPhone(event.target.value)} required value={phone} />
              </label>
              <label className="grid gap-2 text-sm font-semibold">
                Email ID optional
                <input className="focus-ring min-h-11 rounded-md border border-[var(--line)] px-3" type="email" />
              </label>
              <label className="grid gap-2 text-sm font-semibold">
                Service type
                <select className="focus-ring min-h-11 rounded-md border border-[var(--line)] px-3" onChange={(event) => setServiceId(event.target.value)} value={serviceId}>
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
                  onChange={(event) => setDescription(event.target.value)}
                  placeholder="Example: I need HSSC form filling with photo, signature and Aadhaar upload."
                  required
                  value={description}
                />
              </label>
              <label className="grid gap-2 text-sm font-semibold">
                Deadline
                <span className="relative">
                  <CalendarClock className="pointer-events-none absolute left-3 top-3 size-5 text-[var(--muted)]" aria-hidden="true" />
                  <input className="focus-ring min-h-11 w-full rounded-md border border-[var(--line)] px-3 pl-10" onChange={(event) => setDeadline(event.target.value)} required type="date" value={deadline} />
                </span>
              </label>
            </div>
          ) : null}

          {step === 1 ? (
            <div className="grid gap-4">
              <label className="grid gap-2 text-sm font-semibold">
                Upload documents
                <span className="flex min-h-24 items-center gap-3 rounded-md border border-dashed border-blue-200 bg-blue-50 px-4 text-sm text-[var(--muted)]">
                  <Upload className="size-5 shrink-0 text-[var(--trust)]" aria-hidden="true" />
                  <input className="w-full text-sm" multiple onChange={(event) => setFileCount(event.target.files?.length ?? 0)} type="file" accept=".pdf,image/*" />
                </span>
              </label>
              <div className="grid gap-3 sm:grid-cols-3">
                {["Send only required files.", "Documents are used only for this work.", "Old files are not kept longer than needed."].map((note) => (
                  <p className="rounded-md border border-[var(--line)] bg-white p-3 text-sm font-semibold leading-6 text-[var(--foreground)]" key={note}>
                    <ShieldCheck className="mb-2 size-5 text-[var(--trust)]" aria-hidden="true" />
                    {note}
                  </p>
                ))}
              </div>
              <label className="flex gap-3 rounded-md bg-slate-50 p-3 text-sm font-semibold">
                <input className="mt-1 size-4 accent-[var(--trust)]" required type="checkbox" />
                I agree that my documents will be used only to complete this requested digital work.
              </label>
            </div>
          ) : null}

          {step === 2 ? (
            <div className="grid gap-4">
              <ReviewRow label="Name" value={name || "Not added"} />
              <ReviewRow label="WhatsApp" value={phone || "Not added"} />
              <ReviewRow label="Service" value={selectedService?.name ?? "Not selected"} />
              <ReviewRow label="Deadline" value={deadline || "Not added"} />
              <ReviewRow label="Documents selected" value={fileCount ? `${fileCount} file(s)` : "You can also send files on WhatsApp"} />
              <div className="rounded-md border border-amber-100 bg-amber-50 p-4 text-sm leading-6 text-amber-950">
                Final price is confirmed after document and portal check. Payment is requested only after the scope is clear.
              </div>
            </div>
          ) : null}

          {step === 3 ? (
            <div className="rounded-lg border border-green-100 bg-green-50 p-5">
              <CheckCircle2 className="size-7 text-[var(--whatsapp)]" aria-hidden="true" />
              <h2 className="mt-3 text-xl font-bold">Request draft is ready</h2>
              <p className="mt-2 text-sm leading-6 text-[var(--muted)]">Continue on WhatsApp so documents, payment confirmation, and delivery proof stay in one chat.</p>
              <a className="focus-ring mt-5 inline-flex min-h-11 items-center justify-center gap-2 rounded-md bg-[var(--whatsapp)] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[var(--whatsapp-dark)]" href={whatsappLink} target="_blank" rel="noreferrer">
                <MessageCircle className="size-4" aria-hidden="true" />
                Continue on WhatsApp
              </a>
            </div>
          ) : null}
        </div>

        {step < 3 ? (
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            {step > 0 ? (
              <button className="focus-ring inline-flex min-h-11 items-center justify-center rounded-md border border-[var(--line)] bg-white px-4 py-2.5 text-sm font-semibold" type="button" onClick={previousStep}>
                Back
              </button>
            ) : null}
            <button className="focus-ring inline-flex min-h-11 items-center justify-center gap-2 rounded-md bg-[var(--trust)] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[var(--trust-dark)]" type="submit">
              {step === 2 ? "Create Request Draft" : "Continue"}
              <ArrowRight className="size-4" aria-hidden="true" />
            </button>
          </div>
        ) : null}
        {submitted ? <p className="mt-4 text-xs font-semibold text-[var(--muted)]">Demo Request ID: SDS-2026-DEMO. Real request IDs will be generated after backend connection.</p> : null}
      </form>

      <aside className="rounded-lg border border-[var(--line)] bg-white p-5 shadow-sm">
        <h2 className="text-lg font-bold">Before submitting</h2>
        <div className="mt-4 grid gap-3 text-sm leading-6 text-[var(--muted)]">
          <p>Final price is confirmed only after checking documents, portal steps, and deadline.</p>
          <p>For sensitive work, send only clear required documents and avoid unnecessary personal files.</p>
          <p>WhatsApp remains the main channel for clarification, payment confirmation, and delivery proof.</p>
        </div>
        {selectedService ? (
          <div className="mt-5 rounded-md border border-[var(--line)] bg-slate-50 p-4">
            <p className="flex items-center gap-2 text-sm font-bold">
              <FileCheck2 className="size-4 text-[var(--trust)]" aria-hidden="true" />
              {selectedService.name}
            </p>
            <p className="mt-2 text-xs font-semibold text-[var(--muted)]">Required: {selectedService.requiredDocuments.join(", ")}</p>
          </div>
        ) : null}
      </aside>
    </div>
  );
}

function ReviewRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3 rounded-md border border-[var(--line)] bg-slate-50 p-3">
      <p className="text-xs font-bold uppercase text-[var(--muted)]">{label}</p>
      <p className="text-sm font-semibold text-[var(--foreground)]">{value}</p>
    </div>
  );
}
