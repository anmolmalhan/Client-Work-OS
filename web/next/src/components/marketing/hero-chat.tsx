import { CheckCheck, FileCheck2, MessageCircle } from "lucide-react";

// Phone-first hero visual: an anonymized WhatsApp-style conversation showing a
// real form completion end-to-end (send details -> price confirmed -> proof
// delivered). Built in markup so it stays crisp on mobile and is easy to swap
// for a short screen-recording of an actual completion before launch.
//
// ⚠️ SAMPLE conversation for layout only — replace with a genuine anonymized
// chat/recording (with client permission) before launch.
export function HeroChat() {
  return (
    <div className="mx-auto w-full max-w-[320px]">
      <div className="rounded-[2.25rem] border border-[var(--line)] bg-[var(--navy)] p-2 shadow-[0_28px_70px_rgba(15,23,42,0.28)]">
        <div className="overflow-hidden rounded-[1.85rem] bg-[#e6ddd4]">
          {/* WhatsApp-style header */}
          <div className="flex items-center gap-3 bg-[var(--accent-600)] px-4 py-3 text-white">
            <span className="inline-flex size-9 items-center justify-center rounded-full bg-white/20">
              <MessageCircle className="size-5" aria-hidden="true" />
            </span>
            <div className="leading-tight">
              <p className="text-sm font-bold">Swift Digital Seva</p>
              <p className="text-[11px] text-white/80">online · replies in ~10 min</p>
            </div>
          </div>

          {/* Conversation */}
          <div className="space-y-2.5 px-3 py-4 text-[13px] leading-5">
            <ChatBubble side="in" time="10:02">
              Hi, need help filling my SSC GD form 🙏
            </ChatBubble>
            <ChatBubble side="out" time="10:03">
              Sure! Share your photo, signature &amp; ID. Fixed price ₹149, confirmed before we submit.
            </ChatBubble>
            <ChatBubble side="in" time="10:05">
              Sent ✅ Photo size was the problem earlier.
            </ChatBubble>
            <ChatBubble side="out" time="10:07">
              Resized to spec and form submitted. Proof attached 👇
            </ChatBubble>

            {/* Delivery-proof card bubble */}
            <div className="flex justify-end">
              <div className="max-w-[85%] rounded-xl rounded-br-sm bg-[#d9fdd3] p-2.5 shadow-sm">
                <div className="flex items-center gap-2 rounded-lg bg-white/70 p-2">
                  <span className="inline-flex size-9 items-center justify-center rounded-md bg-[var(--accent-500)] text-white">
                    <FileCheck2 className="size-5" aria-hidden="true" />
                  </span>
                  <div className="leading-tight">
                    <p className="text-[12px] font-bold text-[var(--navy)]">SSC-GD-2026_confirmation.pdf</p>
                    <p className="text-[11px] text-[var(--muted)]">Submission proof · 148 KB</p>
                  </div>
                </div>
                <p className="mt-1.5 flex items-center justify-end gap-1 text-[10px] font-semibold text-[var(--muted)]">
                  Delivered in 15 min
                  <CheckCheck className="size-3.5 text-[var(--accent-600)]" aria-hidden="true" />
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ChatBubble({ side, time, children }: { side: "in" | "out"; time: string; children: React.ReactNode }) {
  const isOut = side === "out";
  return (
    <div className={`flex ${isOut ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[85%] rounded-xl px-3 py-2 shadow-sm ${
          isOut ? "rounded-br-sm bg-[#d9fdd3] text-[var(--navy)]" : "rounded-bl-sm bg-white text-[var(--foreground)]"
        }`}
      >
        <p>{children}</p>
        <p className="mt-1 flex items-center justify-end gap-1 text-[10px] text-[var(--muted)]">
          {time}
          {isOut ? <CheckCheck className="size-3 text-[var(--accent-600)]" aria-hidden="true" /> : null}
        </p>
      </div>
    </div>
  );
}
