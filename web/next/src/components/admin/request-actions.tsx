"use client";

import { requestStatusLabels, requestStatuses, type ClientRequest, type RequestStatus } from "@wdsc/domain";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Check, Loader2 } from "lucide-react";
import { useState } from "react";
import { rpc } from "@/lib/rpc";

export function RequestActions({ request }: { request: ClientRequest }) {
  const queryClient = useQueryClient();
  const [status, setStatus] = useState<RequestStatus>(request.status);
  const [note, setNote] = useState("");

  const mutation = useMutation({
    mutationFn: async () => {
      const response = await rpc.requests[":requestId"].status.$patch({
        param: { requestId: request.requestId },
        json: { status, note: note.trim() ? note.trim() : undefined },
      });
      if (!response.ok) {
        throw new Error("Could not update the request. Please try again.");
      }
      return (await response.json()).data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["request", request.requestId] });
      queryClient.invalidateQueries({ queryKey: ["dashboard"] });
      setNote("");
    },
  });

  const dirty = status !== request.status || note.trim().length > 0;

  return (
    <div className="mt-4 grid gap-3">
      <label className="grid gap-2 text-sm font-semibold">
        Update request status
        <select
          className="focus-ring min-h-11 rounded-md border border-[var(--line)] bg-white px-3"
          value={status}
          onChange={(event) => setStatus(event.target.value as RequestStatus)}
        >
          {requestStatuses.map((value) => (
            <option key={value} value={value}>
              {requestStatusLabels[value]}
            </option>
          ))}
        </select>
      </label>

      <label className="grid gap-2 text-sm font-semibold">
        Note for client (saved as the latest update)
        <textarea
          className="focus-ring min-h-20 rounded-md border border-[var(--line)] bg-white px-3 py-2 text-sm"
          value={note}
          onChange={(event) => setNote(event.target.value)}
          placeholder="e.g. Form submitted, confirmation shared on WhatsApp."
        />
      </label>

      <button
        type="button"
        onClick={() => mutation.mutate()}
        disabled={!dirty || mutation.isPending}
        className="focus-ring inline-flex min-h-11 items-center justify-center gap-2 rounded-md bg-[var(--trust)] px-4 text-sm font-semibold text-white transition hover:bg-[var(--trust-dark)] disabled:opacity-50"
      >
        {mutation.isPending ? <Loader2 className="size-4 animate-spin" aria-hidden="true" /> : <Check className="size-4" aria-hidden="true" />}
        {mutation.isPending ? "Saving…" : "Save update"}
      </button>

      {mutation.isError ? (
        <p className="text-sm font-semibold text-amber-900">{mutation.error instanceof Error ? mutation.error.message : "Update failed."}</p>
      ) : null}
      {mutation.isSuccess && !dirty ? <p className="text-sm font-semibold text-[var(--whatsapp-dark)]">Saved ✓</p> : null}
    </div>
  );
}
