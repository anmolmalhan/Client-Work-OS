"use client";

import { LockKeyhole, LogOut } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { authClient, signIn, signUp, useSession } from "@/lib/auth-client";

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
  const [mode, setMode] = useState<"sign-in" | "sign-up">("sign-in");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setLoading(true);

    const form = new FormData(event.currentTarget);
    const email = String(form.get("email") ?? "").trim();
    const password = String(form.get("password") ?? "");
    const name = String(form.get("name") ?? "").trim();

    const { error: authError } =
      mode === "sign-in"
        ? await signIn.email({ email, password })
        : await signUp.email({ email, password, name: name || email });

    setLoading(false);
    if (authError) {
      setError(authError.message ?? "Authentication failed. Check your details and try again.");
    }
  }

  return (
    <div className="mx-auto max-w-xl rounded-lg border border-border bg-card p-6 shadow-sm">
      <span className="inline-flex size-11 items-center justify-center rounded-md bg-secondary text-primary">
        <LockKeyhole className="size-5" aria-hidden="true" />
      </span>
      <h1 className="mt-4 text-2xl font-bold">{mode === "sign-in" ? "Admin sign in" : "Create admin account"}</h1>
      <p className="mt-2 text-sm leading-6 text-muted-foreground">
        Staff access only, secured by Better Auth. {mode === "sign-in" ? "No account yet?" : "Already have an account?"}{" "}
        <button
          type="button"
          className="font-bold text-primary hover:underline"
          onClick={() => {
            setMode(mode === "sign-in" ? "sign-up" : "sign-in");
            setError("");
          }}
        >
          {mode === "sign-in" ? "Create the first admin" : "Sign in instead"}
        </button>
      </p>

      <form className="mt-5 grid gap-3" onSubmit={handleSubmit}>
        {mode === "sign-up" ? (
          <Label>
            Name
            <Input name="name" placeholder="Admin name" autoComplete="name" />
          </Label>
        ) : null}
        <Label>
          Email
          <Input name="email" type="email" required placeholder="admin@example.com" autoComplete="email" />
        </Label>
        <Label>
          Password
          <Input name="password" type="password" required minLength={8} placeholder="At least 8 characters" autoComplete={mode === "sign-in" ? "current-password" : "new-password"} />
        </Label>
        <Button type="submit" variant="navy" disabled={loading}>
          {loading ? "Please wait…" : mode === "sign-in" ? "Sign in" : "Create account"}
        </Button>
        {error ? <p className="rounded-md bg-amber-50 p-3 text-sm font-semibold text-amber-900">{error}</p> : null}
      </form>
    </div>
  );
}
