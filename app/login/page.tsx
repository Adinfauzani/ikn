import type { Metadata } from "next";
import { Suspense } from "react";
import { LoginForm } from "./login-form";

export const metadata: Metadata = {
  title: "Masuk | Nusantara",
  description: "Masuk ke dasbor administrator.",
};

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 px-4">
      <div className="w-full max-w-sm rounded-xl border border-zinc-200 bg-white p-6 shadow-sm">
        <div className="mb-6">
          <h1 className="text-xl font-semibold text-zinc-900">Masuk Dasbor</h1>
          <p className="mt-1 text-sm text-zinc-600">
            Akses khusus administrator.
          </p>
        </div>
        <Suspense fallback={<div className="text-sm text-zinc-500">Memuat...</div>}>
          <LoginForm />
        </Suspense>
      </div>
    </div>
  );
}
