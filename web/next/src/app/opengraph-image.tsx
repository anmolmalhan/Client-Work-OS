import { ImageResponse } from "next/og";

export const alt = "Swift Digital Seva — WhatsApp Digital Service Center";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          color: "white",
          fontFamily: "sans-serif",
          background:
            "radial-gradient(900px 400px at 85% -10%, rgba(99,102,241,0.55), transparent 60%), linear-gradient(135deg, #111e4a 0%, #1d3fb0 48%, #4f46e5 100%)",
        }}
      >
        <div
          style={{
            display: "flex",
            alignSelf: "flex-start",
            padding: "10px 22px",
            borderRadius: 999,
            background: "rgba(255,255,255,0.12)",
            border: "1px solid rgba(255,255,255,0.25)",
            fontSize: 28,
            fontWeight: 700,
            color: "#fcd34d",
          }}
        >
          WhatsApp-first digital service center
        </div>
        <div style={{ display: "flex", fontSize: 84, fontWeight: 900, lineHeight: 1.05, marginTop: 36 }}>Swift Digital Seva</div>
        <div style={{ display: "flex", fontSize: 38, color: "#bfdbfe", marginTop: 28, maxWidth: 920, lineHeight: 1.3 }}>
          Online forms, PDF work, document upload &amp; the latest Sarkari Result — done for you on WhatsApp.
        </div>
      </div>
    ),
    { ...size },
  );
}
