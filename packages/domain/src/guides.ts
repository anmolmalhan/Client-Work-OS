// SEO guides / blog — evergreen how-to content that ranks for high-intent
// long-tail keywords and funnels readers into the paid form-filling service.

export type GuideSection = {
  heading: string;
  body: string[];
};

export type Guide = {
  slug: string;
  title: string;
  description: string;
  keyword: string;
  category: string;
  readMinutes: number;
  updatedAt: string;
  intro: string;
  sections: GuideSection[];
  faq?: Array<{ question: string; answer: string }>;
};

export const guides: Guide[] = [
  {
    slug: "how-to-fill-ssc-gd-form-2026",
    title: "How to Fill SSC GD Form 2026 — Step by Step",
    description: "A simple step-by-step guide to filling the SSC GD Constable 2026 online form, including the correct photo and signature size.",
    keyword: "ssc gd form kaise bhare",
    category: "Form filling",
    readMinutes: 5,
    updatedAt: "2026-06-30",
    intro:
      "Filling the SSC GD Constable form online is easy once you know the steps and keep your documents ready. This guide walks you through the full process, with the exact photo and signature sizes the portal accepts.",
    sections: [
      {
        heading: "Documents you need ready",
        body: [
          "A valid photo ID (Aadhaar, PAN, or Voter ID).",
          "A recent passport-size photo (20 kb to 50 kb, JPG).",
          "Your signature on white paper, scanned (10 kb to 20 kb, JPG).",
          "Your 10th/12th marksheet details for qualification and date of birth.",
        ],
      },
      {
        heading: "Step-by-step process",
        body: [
          "1. Register on the SSC portal with your name, date of birth, and a valid mobile number and email.",
          "2. Note down your Registration ID and password carefully.",
          "3. Log in and fill the application form — personal details, category, education, and exam centre choices.",
          "4. Upload your photo and signature in the required size and format.",
          "5. Pay the application fee (if applicable) using UPI, card, or net banking.",
          "6. Submit and download the final confirmation page for your records.",
        ],
      },
      {
        heading: "Common mistakes to avoid",
        body: [
          "Wrong photo or signature size — the most common reason forms get rejected.",
          "Mismatched name or date of birth versus your documents.",
          "Choosing the wrong category, which affects the fee and cut-off.",
          "Not saving the final confirmation page after payment.",
        ],
      },
    ],
    faq: [
      { question: "What is the photo size for the SSC GD form?", answer: "A recent passport-size colour photo, usually 20 kb to 50 kb in JPG format." },
      { question: "Can someone fill the form for me?", answer: "Yes. Share your details and documents on WhatsApp and we fill, upload, and submit the form for you, then send the proof." },
    ],
  },
  {
    slug: "resize-photo-signature-for-government-forms",
    title: "How to Resize Photo & Signature for Government Forms",
    description: "Government portals reject wrong-sized photos and signatures. Here's how to resize your photo and signature to the exact kb and pixel size required.",
    keyword: "photo signature resize for form",
    category: "Documents",
    readMinutes: 4,
    updatedAt: "2026-06-30",
    intro:
      "Almost every government form has strict photo and signature size rules. If the file is too big or too small, the upload fails. This guide explains the common sizes and how to fix them.",
    sections: [
      {
        heading: "Typical size requirements",
        body: [
          "Photo: 20 kb to 50 kb, JPG, passport-size, light background.",
          "Signature: 10 kb to 20 kb, JPG, signed on white paper with a black or blue pen.",
          "Some forms ask for specific pixel dimensions (e.g. 200×230 for photo).",
        ],
      },
      {
        heading: "How to resize",
        body: [
          "Crop the photo or signature so there is no extra white space around it.",
          "Reduce the dimensions and JPG quality until the file fits the kb range.",
          "Check the final file size before uploading — re-do if it is outside the range.",
        ],
      },
    ],
    faq: [
      { question: "My signature file is above 20 kb — what do I do?", answer: "Crop it tighter and lower the image quality, or send it to us and we will resize it correctly for your form." },
    ],
  },
  {
    slug: "documents-required-for-sarkari-job-forms",
    title: "Documents Required for Sarkari Job Forms (Checklist)",
    description: "A ready checklist of the documents you need before filling any Sarkari (government) job form online.",
    keyword: "documents for sarkari form",
    category: "Form filling",
    readMinutes: 3,
    updatedAt: "2026-06-30",
    intro: "Keeping your documents ready before you start saves time and avoids last-minute mistakes. Use this checklist for most Sarkari job applications.",
    sections: [
      {
        heading: "The standard checklist",
        body: [
          "Photo ID — Aadhaar card, PAN card, or Voter ID.",
          "Passport-size photo and scanned signature in the required size.",
          "10th and 12th marksheets (for date of birth and qualification).",
          "Graduation or diploma certificate, if the post requires it.",
          "Category certificate (SC/ST/OBC/EWS), if you are claiming reservation.",
          "A working mobile number and email for OTP and updates.",
        ],
      },
    ],
  },
];

export function getGuideBySlug(slug: string): Guide | undefined {
  return guides.find((guide) => guide.slug === slug);
}
