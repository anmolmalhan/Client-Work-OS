"use client";

import { LockKeyhole } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signIn, useSession } from "@/lib/auth-client";

// Public sign-in screen behind /admin/login. The protected /admin routes are
// server-guarded by middleware, which sends logged-out visitors here (with a
// ?redirect back to the page they wanted). On success we bounce to that page.
export function SignInCard() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectParam = searchParams.get("redirect");
  // Only honour same-app admin paths to avoid an open-redirect via ?redirect=.
  const redirectTo = redirectParam?.startsWith("/admin") ? redirectParam : "/admin";
  const { data: session } = useSession();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Already signed in (e.g. cookie set in another tab): leave the login screen.
  useEffect(() => {
    if (session) {
      router.replace(redirectTo);
    }
  }, [session, redirectTo, router]);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setLoading(true);

    const form = new FormData(event.currentTarget);
    const email = String(form.get("email") ?? "").trim();
    const password = String(form.get("password") ?? "");

    const { error: authError } = await signIn.email({ email, password });

    if (authError) {
      setLoading(false);
      setError(authError.message ?? "Sign in failed. Check your email and password.");
      return;
    }

    // The session cookie is now set, so middleware will admit the admin routes.
    router.replace(redirectTo);
    router.refresh();
  }

  return (
    <div className="mx-auto max-w-xl rounded-lg border border-border bg-card p-6 shadow-sm">
      <span className="inline-flex size-11 items-center justify-center rounded-md bg-secondary text-primary">
        <LockKeyhole className="size-5" aria-hidden="true" />
      </span>
      <h1 className="mt-4 text-2xl font-bold">Admin sign in</h1>
      <p className="mt-2 text-sm leading-6 text-muted-foreground">Staff access only, secured by Better Auth.</p>

      <form className="mt-5 grid gap-3" onSubmit={handleSubmit}>
        <Label>
          Email
          <Input name="email" type="email" required placeholder="admin@example.com" autoComplete="email" />
        </Label>
        <Label>
          Password
          <Input name="password" type="password" required placeholder="Your password" autoComplete="current-password" />
        </Label>
        <Button type="submit" variant="navy" disabled={loading}>
          {loading ? "Signing in…" : "Sign in"}
        </Button>
        {error ? <p className="rounded-md bg-amber-50 p-3 text-sm font-semibold text-amber-900">{error}</p> : null}
      </form>
    </div>
  );
}
