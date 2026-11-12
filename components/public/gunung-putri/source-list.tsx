import type { SourceRef } from "@/src/lib/content/gunung-putri";

export function SourceList({ sources }: { sources: SourceRef[] }) {
  return (
    <section className="mt-12 rounded-xl border border-border bg-surface p-6 sm:p-8">
      <h2 className="text-xl font-semibold tracking-tight text-foreground">
        Sumber dan Referensi Informasi
      </h2>
      <p className="mt-2 text-sm leading-6 text-muted">
        Informasi faktual pada bagian ini disusun berdasarkan sumber yang dapat
        diatribusikan. Rincian yang belum tersedia dari sumber terverifikasi
        ditandai sebagai “Belum tersedia”.
      </p>
      <ul className="mt-5 space-y-4">
        {sources.map((s) => (
          <li key={s.url} className="text-sm leading-6 text-muted">
            <a
              href={s.url}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-primary hover:underline underline-offset-4"
            >
              {s.label}
            </a>
            {s.note ? <span className="block mt-0.5">{s.note}</span> : null}
            {s.accessed ? (
              <span className="block text-xs text-muted/80">
                Diakses: {s.accessed}
              </span>
            ) : null}
          </li>
        ))}
      </ul>
    </section>
  );
}
