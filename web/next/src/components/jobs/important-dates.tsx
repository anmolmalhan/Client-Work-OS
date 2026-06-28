import type { JobImportantDate } from "@wdsc/domain";
import { formatDate } from "@/lib/format";

function displayValue(value: string) {
  // Render ISO dates nicely; pass through free-text values untouched.
  return /^\d{4}-\d{2}-\d{2}$/.test(value) ? formatDate(value) : value;
}

export function ImportantDates({ dates }: { dates: JobImportantDate[] }) {
  if (dates.length === 0) {
    return null;
  }

  return (
    <table className="w-full border-collapse overflow-hidden rounded-md text-left text-sm">
      <tbody className="divide-y divide-[var(--line)]">
        {dates.map((date) => (
          <tr key={date.label} className="even:bg-slate-50">
            <th scope="row" className="px-3 py-2.5 font-semibold text-[var(--foreground)]">
              {date.label}
            </th>
            <td className="px-3 py-2.5 text-right font-bold text-[var(--trust-dark)]">{displayValue(date.value)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
