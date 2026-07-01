import { Suspense } from "react";
import { SignInCard } from "@/components/admin/sign-in-card";

export const dynamic = "force-dynamic";

export default function AdminLoginPage() {
  return (
    <div className="page-shell py-10">
      {/* Suspense boundary is required because SignInCard reads useSearchParams. */}
      <Suspense fallback={null}>
        <SignInCard />
      </Suspense>
    </div>
  );
}
