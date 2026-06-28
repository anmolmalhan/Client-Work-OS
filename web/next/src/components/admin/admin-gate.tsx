"use client";

import { LockKeyhole, LogOut } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { authClient, signIn, useSession } from "@/lib/auth-client";

export function AdminGate({ children }: { children: React.ReactNode }) {
  const { data: session, isPending } = useSession();

  if (isPending) {
    return <p className="mx-auto max-w-xl rounded-lg border border-border bg-card p-6 text-sm text-muted-foreground shadow-sm">Checking access…</p>;
  }

  if (!session) {
    return <SignInCard />;
  }

  return (
    <div>
      <div className="mb-6 flex items-center justify-between rounded-lg border border-border bg-card px-4 py-3 shadow-sm">
        <p className="text-sm font-semibold">
          Signed in as <span className="text-primary">{session.user.email}</span>
        </p>
        <Button variant="outline" size="sm" onClick={() => authClient.signOut()}>
          <LogOut aria-hidden="true" /> Sign out
        </Button>
      </div>
      {children}
    </div>
  );
}

function SignInCard() {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setLoading(true);

    const form = new FormData(event.currentTarget);
    const email = String(form.get("email") ?? "").trim();
    const password = String(form.get("password") ?? "");

    const { error: authError } = await signIn.email({ email, password });

    setLoading(false);
    if (authError) {
      setError(authError.message ?? "Sign in failed. Check your email and password.");
    }
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
