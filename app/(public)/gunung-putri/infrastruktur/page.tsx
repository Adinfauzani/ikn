import type { Metadata } from "next";
import { PageHeader } from "@/components/public/page-header";
import { SourceList } from "@/components/public/gunung-putri/source-list";
import { gunungPutriSections, gunungPutriSources } from "@/src/lib/content/gunung-putri";

export const metadata: Metadata = {
  title: "Infrastruktur dan Fasilitas Publik Gunung Putri",
  description:
    "Informasi infrastruktur, aksesibilitas, pendidikan, kesehatan, dan fasilitas publik di Kecamatan Gunung Putri berdasarkan sumber terverifikasi.",
};

const topics = [
  "Infrastruktur jalan",
  "Transportasi dan aksesibilitas",
  "Pendidikan",
  "Kesehatan",
  "Fasilitas umum",
  "Sarana dan prasarana masyarakat",
];

export default function GunungPutriInfrastrukturPage() {
  return (
    <>
      <PageHeader
        eyebrow="Gunung Putri"
        title="Infrastruktur dan Fasilitas Publik"
        description="Gambaran sektor infrastruktur dan fasilitas publik di Kecamatan Gunung Putri. Rincian terverifikasi per fasilitas mengacu pada sumber resmi dan publikasi statistik."
      />
      <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {topics.map((t) => (
            <div key={t} className="rounded-xl border border-border bg-surface p-5">
              <h2 className="font-semibold text-foreground">{t}</h2>
              <p className="mt-2 text-sm leading-6 text-muted">
                Rincian data terverifikasi: Belum tersedia dalam ringkasan ini. Lihat sumber resmi/BPS untuk informasi per sektor.
              </p>
            </div>
          ))}
        </div>
        <div className="mt-10 max-w-3xl space-y-4 text-base leading-7 text-muted">
          {gunungPutriSections.infrastructure.map((p) => <p key={p}>{p}</p>)}
        </div>
        <SourceList sources={gunungPutriSources} />
      </section>
    </>
  );
}
