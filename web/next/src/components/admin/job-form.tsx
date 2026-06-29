"use client";

import { jobCategories, jobCategoryLabels, jobPostStatuses, jobPostStatusLabels, type JobCategory, type JobPost, type JobPostStatus } from "@wdsc/domain";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Plus, Trash2 } from "lucide-react";
import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { rpc } from "@/lib/rpc";

type DateRow = { id: string; label: string; value: string };
type JobPayload = Parameters<typeof rpc.jobs.$post>[0]["json"];

const inputClass = "focus-ring min-h-11 w-full rounded-md border border-[var(--line)] bg-white px-3 text-sm";
const labelClass = "grid gap-1.5 text-sm font-semibold";

type Result = { ok: true; slug: string } | { ok: false; message: string } | null;

export function JobForm({ editing, onDone }: { editing?: JobPost | null; onDone?: () => void }) {
  const isEditing = Boolean(editing);
  const rowId = useRef(1);
  const formRef = useRef<HTMLFormElement>(null);
  const newRow = (label = ""): DateRow => ({ id: `row-${rowId.current++}`, label, value: "" });
  const [importantDates, setImportantDates] = useState<DateRow[]>(
    editing?.importantDates?.length
      ? editing.importantDates.map((date) => ({ id: `row-${rowId.current++}`, label: date.label, value: date.value }))
      : [newRow("Last Date to Apply")],
  );
  const [result, setResult] = useState<Result>(null);
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (payload: JobPayload) => {
      const response = editing
        ? await rpc.jobs[":slug"].$patch({ param: { slug: editing.slug }, json: payload })
        : await rpc.jobs.$post({ json: payload });
      if (!response.ok) {
        throw new Error("save failed");
      }
      return (await response.json()).data as JobPost;
    },
    onSuccess: (job) => {
      queryClient.invalidateQueries({ queryKey: ["jobs"] });
      setResult({ ok: true, slug: job.slug });
      if (isEditing) {
        onDone?.();
      } else {
        formRef.current?.reset();
        setImportantDates([newRow("Last Date to Apply")]);
      }
    },
    onError: () => setResult({ ok: false, message: "Could not save. Check required fields and that the API is reachable." }),
  });

  function updateDate(id: string, key: "label" | "value", value: string) {
    setImportantDates((rows) => rows.map((row) => (row.id === id ? { ...row, [key]: value } : row)));
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setResult(null);

    const form = new FormData(event.currentTarget);
    const text = (key: string) => (form.get(key) as string)?.trim() ?? "";
    const vacancies = text("vacancies");

    mutation.mutate({
      title: text("title"),
      organization: text("organization"),
      category: text("category") as JobCategory,
      status: text("status") as JobPostStatus,
      shortInfo: text("shortInfo"),
      eligibility: text("eligibility"),
      vacancies: vacancies ? Number(vacancies) : undefined,
      applicationFee: text("applicationFee") || undefined,
      ageLimit: text("ageLimit") || undefined,
      applyStartDate: text("applyStartDate") || undefined,
      applyEndDate: text("applyEndDate") || undefined,
      applyLink: text("applyLink"),
      notificationLink: text("notificationLink"),
      officialWebsite: text("officialWebsite"),
      metaTitle: text("metaTitle") || undefined,
      metaDescription: text("metaDescription") || undefined,
      isFeatured: form.get("isFeatured") === "on",
      importantDates: importantDates
        .filter((row) => row.label.trim() && row.value.trim())
        .map(({ label, value }) => ({ label, value })),
    });
  }

  const submitting = mutation.isPending;

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="rounded-lg border border-[var(--line)] bg-white p-5 shadow-sm sm:p-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className={labelClass}>
          Title*
          <input name="title" required className={inputClass} placeholder="SSC CGL 2026 Online Form" defaultValue={editing?.title ?? ""} />
        </label>
        <label className={labelClass}>
          Organization*
          <input name="organization" required className={inputClass} placeholder="Staff Selection Commission" defaultValue={editing?.organization ?? ""} />
        </label>
        <label className={labelClass}>
          Category
          <select name="category" className={inputClass} defaultValue={editing?.category ?? "latest_job"}>
            {jobCategories.map((item) => (
              <option key={item} value={item}>
                {jobCategoryLabels[item]}
              </option>
            ))}
          </select>
        </label>
        <label className={labelClass}>
          Status
          <select name="status" className={inputClass} defaultValue={editing?.status ?? "published"}>
            {jobPostStatuses.map((item) => (
              <option key={item} value={item}>
                {jobPostStatusLabels[item]}
              </option>
            ))}
          </select>
        </label>
      </div>

      <label className={`${labelClass} mt-4`}>
        Short info*
        <textarea name="shortInfo" required rows={3} className={`${inputClass} py-2`} placeholder="Brief summary shown in listings and search results." defaultValue={editing?.shortInfo ?? ""} />
      </label>

      <label className={`${labelClass} mt-4`}>
        Eligibility*
        <textarea name="eligibility" required rows={2} className={`${inputClass} py-2`} placeholder="Bachelor's degree in any stream." defaultValue={editing?.eligibility ?? ""} />
      </label>

      <div className="mt-4 grid gap-4 sm:grid-cols-3">
        <label className={labelClass}>
          Vacancies
          <input name="vacancies" type="number" min="0" className={inputClass} placeholder="17727" defaultValue={editing?.vacancies ?? ""} />
        </label>
        <label className={labelClass}>
          Age limit
          <input name="ageLimit" className={inputClass} placeholder="18 to 32 years" defaultValue={editing?.ageLimit ?? ""} />
        </label>
        <label className={labelClass}>
          Application fee
          <input name="applicationFee" className={inputClass} placeholder="Gen Rs 100, SC/ST Nil" defaultValue={editing?.applicationFee ?? ""} />
        </label>
        <label className={labelClass}>
          Apply start date
          <input name="applyStartDate" type="date" className={inputClass} defaultValue={editing?.applyStartDate ?? ""} />
        </label>
        <label className={labelClass}>
          Apply end date
          <input name="applyEndDate" type="date" className={inputClass} defaultValue={editing?.applyEndDate ?? ""} />
        </label>
      </div>

      <fieldset className="mt-5 rounded-md border border-[var(--line)] p-4">
        <legend className="px-1 text-sm font-bold">Important dates</legend>
        <div className="grid gap-2">
          {importantDates.map((row) => (
            <div className="grid grid-cols-[1fr_1fr_auto] gap-2" key={row.id}>
              <input
                className={inputClass}
                placeholder="Label (e.g. Exam Date)"
                value={row.label}
                onChange={(event) => updateDate(row.id, "label", event.target.value)}
              />
              <input
                className={inputClass}
                placeholder="Value (YYYY-MM-DD or text)"
                value={row.value}
                onChange={(event) => updateDate(row.id, "value", event.target.value)}
              />
              <Button
                type="button"
                variant="outline"
                size="icon"
                aria-label="Remove date"
                className="text-muted-foreground hover:text-red-600"
                onClick={() => setImportantDates((rows) => rows.filter((item) => item.id !== row.id))}
              >
                <Trash2 aria-hidden="true" />
              </Button>
            </div>
          ))}
        </div>
        <Button type="button" variant="ghost" size="sm" className="mt-2" onClick={() => setImportantDates((rows) => [...rows, newRow()])}>
          <Plus aria-hidden="true" /> Add date
        </Button>
      </fieldset>

      <div className="mt-4 grid gap-4 sm:grid-cols-3">
        <label className={labelClass}>
          Apply link
          <input name="applyLink" type="url" className={inputClass} placeholder="https://" defaultValue={editing?.applyLink ?? ""} />
        </label>
        <label className={labelClass}>
          Notification link
          <input name="notificationLink" type="url" className={inputClass} placeholder="https://" defaultValue={editing?.notificationLink ?? ""} />
        </label>
        <label className={labelClass}>
          Official website
          <input name="officialWebsite" type="url" className={inputClass} placeholder="https://" defaultValue={editing?.officialWebsite ?? ""} />
        </label>
      </div>

      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <label className={labelClass}>
          Meta title (SEO)
          <input name="metaTitle" className={inputClass} placeholder="Optional custom <title>" defaultValue={editing?.metaTitle ?? ""} />
        </label>
        <label className={labelClass}>
          Meta description (SEO)
          <input name="metaDescription" className={inputClass} placeholder="Optional search snippet" defaultValue={editing?.metaDescription ?? ""} />
        </label>
      </div>

      <label className="mt-4 inline-flex items-center gap-2 text-sm font-semibold">
        <input name="isFeatured" type="checkbox" className="size-4" defaultChecked={editing?.isFeatured ?? false} />
        Feature on top of listings
      </label>

      <div className="mt-6 flex flex-wrap items-center gap-4">
        <Button type="submit" variant="navy" disabled={submitting}>
          {submitting ? "Saving…" : isEditing ? "Save changes" : "Publish Listing"}
        </Button>
        {isEditing ? (
          <Button type="button" variant="outline" onClick={() => onDone?.()}>
            Cancel
          </Button>
        ) : null}
        {result?.ok ? (
          <p className="text-sm font-semibold text-emerald-700">
            Saved.{" "}
            <a href={`/sarkari-result/${result.slug}`} className="underline" target="_blank" rel="noreferrer">
              View listing
            </a>
          </p>
        ) : null}
        {result && !result.ok ? <p className="text-sm font-semibold text-red-600">{result.message}</p> : null}
      </div>
    </form>
  );
}
