"use client";

import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { authClient, useSession } from "@/lib/auth-client";

// Client wrapper for the protected admin pages. Middleware already blocks
// logged-out visitors server-side (redirecting them to /admin/login), so this is
// defense-in-depth: it also covers the case where the session cookie is present
// but expired/invalid (middleware only checks the cookie exists, not that it is
// still valid). In that case we bounce to the sign-in screen rather than render
// the shell.
export function AdminGate({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { data: session, isPending } = useSession();

  useEffect(() => {
    if (!isPending && !session) {
      router.replace("/admin/login");
    }
  }, [isPending, session, router]);

  if (isPending || !session) {
    return <p className="mx-auto max-w-xl rounded-lg border border-border bg-card p-6 text-sm text-muted-foreground shadow-sm">Checking access…</p>;
  }

  return (
    <div>
      <div className="mb-6 flex items-center justify-between rounded-lg border border-border bg-card px-4 py-3 shadow-sm">
        <p className="text-sm font-semibold">
          Signed in as <span className="text-primary">{session.user.email}</span>
        </p>
        <Button variant="outline" size="sm" onClick={() => authClient.signOut().then(() => router.replace("/admin/login"))}>
          <LogOut aria-hidden="true" /> Sign out
        </Button>
      </div>
      {children}
    </div>
  );
}
