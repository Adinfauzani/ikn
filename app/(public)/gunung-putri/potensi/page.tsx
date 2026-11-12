import type { Metadata } from "next";
import { PageHeader } from "@/components/public/page-header";
import { SourceList } from "@/components/public/gunung-putri/source-list";
import { gunungPutriSections, gunungPutriSources } from "@/src/lib/content/gunung-putri";

export const metadata: Metadata = {
  title: "Potensi dan Ekonomi Lokal Gunung Putri",
  description:
    "Informasi potensi wilayah, kegiatan ekonomi, dan lingkungan di Kecamatan Gunung Putri berdasarkan sumber terverifikasi.",
};

export default function GunungPutriPotensiPage() {
  return (
    <>
      <PageHeader
        eyebrow="Gunung Putri"
        title="Potensi, Ekonomi Lokal, dan Lingkungan"
        description="Gambaran potensi wilayah, aktivitas ekonomi, serta aspek lingkungan dan keberlanjutan di Kecamatan Gunung Putri."
      />
      <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-2">
          <div>
            <h2 className="text-xl font-semibold tracking-tight text-foreground">Potensi dan Ekonomi Lokal</h2>
            <div className="mt-4 space-y-4 text-base leading-7 text-muted">
              {gunungPutriSections.potential.map((p) => <p key={p}>{p}</p>)}
            </div>
          </div>
          <div>
            <h2 className="text-xl font-semibold tracking-tight text-foreground">Lingkungan dan Keberlanjutan</h2>
            <div className="mt-4 space-y-4 text-base leading-7 text-muted">
              {gunungPutriSections.environment.map((p) => <p key={p}>{p}</p>)}
            </div>
          </div>
        </div>
        <SourceList sources={gunungPutriSources} />
      </section>
    </>
  );
}
