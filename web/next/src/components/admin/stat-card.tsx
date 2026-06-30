type StatCardProps = {
  label: string;
  value: string | number;
  helper?: string;
  tone?: "mint" | "sun" | "sky" | "coral";
};

const toneStyles = {
  mint: "border-emerald-100 bg-emerald-50",
  sun: "border-amber-100 bg-amber-50",
  sky: "border-blue-100 bg-blue-50",
  coral: "border-rose-100 bg-rose-50",
};

export function StatCard({ label, value, helper, tone = "mint" }: StatCardProps) {
  return (
    <article className={`rounded-lg border p-4 shadow-sm ${toneStyles[tone]}`}>
      <p className="text-sm font-semibold text-[var(--muted)]">{label}</p>
      <p className="mt-2 text-2xl font-bold">{value}</p>
      {helper ? <p className="mt-1 text-xs font-semibold text-[var(--muted)]">{helper}</p> : null}
    </article>
  );
}
