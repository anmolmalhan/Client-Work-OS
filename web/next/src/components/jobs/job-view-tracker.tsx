"use client";

import { useEffect, useRef } from "react";
import { rpc } from "@/lib/rpc";

// Records a real page view from the browser. The detail page is ISR-cached, so
// a server-side increment would barely ever run; this fires once per mount
// against the uncached POST endpoint instead.
export function JobViewTracker({ slug }: { slug: string }) {
  const recorded = useRef(false);

  useEffect(() => {
    if (recorded.current) {
      return;
    }
    recorded.current = true;
    rpc.jobs[":slug"].view.$post({ param: { slug } }).catch(() => {
      // View counts are best-effort; ignore network/API errors.
    });
  }, [slug]);

  return null;
}
