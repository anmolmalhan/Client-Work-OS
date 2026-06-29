import { jobCategoryLabels } from "@wdsc/domain";
import { ImageResponse } from "next/og";
import { fetchJob } from "@/lib/api";
import { formatDate } from "@/lib/format";

export const alt = "Sarkari Result listing";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const job = await fetchJob(slug);

  const title = job?.title ?? "Sarkari Result 2026";
  const organization = job?.organization ?? "Latest Government Jobs";
  const category = job ? jobCategoryLabels[job.category] : "Latest Jobs";
  const lastDate = job?.applyEndDate ? `Last date: ${formatDate(job.applyEndDate)}` : "Free job alerts";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px",
          color: "white",
          fontFamily: "sans-serif",
          background:
            "radial-gradient(900px 400px at 85% -10%, rgba(99,102,241,0.55), transparent 60%), linear-gradient(135deg, #111e4a 0%, #1d3fb0 48%, #4f46e5 100%)",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              alignSelf: "flex-start",
              padding: "8px 20px",
              borderRadius: 999,
              background: "rgba(252,211,77,0.18)",
              border: "1px solid rgba(252,211,77,0.4)",
              fontSize: 26,
              fontWeight: 700,
              color: "#fcd34d",
            }}
          >
            {category} · Sarkari Result 2026
          </div>
          <div style={{ display: "flex", fontSize: 66, fontWeight: 900, lineHeight: 1.08, marginTop: 28, maxWidth: 1050 }}>
            {title.length > 90 ? `${title.slice(0, 90)}…` : title}
          </div>
          <div style={{ display: "flex", fontSize: 34, color: "#bfdbfe", marginTop: 22 }}>{organization}</div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
          <div style={{ display: "flex", fontSize: 30, fontWeight: 700, color: "#fcd34d" }}>{lastDate}</div>
          <div style={{ display: "flex", fontSize: 28, color: "#e0e7ff" }}>Apply with Swift Digital Seva</div>
        </div>
      </div>
    ),
    { ...size },
  );
}
