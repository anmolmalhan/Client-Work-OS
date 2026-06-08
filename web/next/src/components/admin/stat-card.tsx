type StatCardProps = {
  label: string;
  value: string | number;
  helper?: string;
  tone?: "mint" | "sun" | "sky" | "coral";
};

const toneStyles = {
  mint: "border-[#b8f3df] bg-[#effff9]",
  sun: "border-[#f3df9b] bg-[#fff7dc]",
  sky: "border-[#bde8ff] bg-[#eef9ff]",
  coral: "border-[#ffc3b5] bg-[#fff0eb]",
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
