import type { Metadata } from "next";
import { PageHeader } from "@/components/public/page-header";
import { SourceList } from "@/components/public/gunung-putri/source-list";
import { gunungPutriSections, gunungPutriSources } from "@/src/lib/content/gunung-putri";

export const metadata: Metadata = {
  title: "Pembangunan dan Perkembangan Wilayah Gunung Putri",
  description:
    "Informasi pembangunan, perkembangan kawasan, dan program pelayanan di Kecamatan Gunung Putri berdasarkan sumber terverifikasi.",
};

export default function GunungPutriPembangunanPage() {
  return (
    <>
      <PageHeader
        eyebrow="Gunung Putri"
        title="Pembangunan dan Perkembangan Wilayah"
        description="Informasi mengenai arah pengembangan, penataan, dan pelayanan di Kecamatan Gunung Putri berdasarkan sumber yang dapat diatribusikan."
      />
      <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="max-w-3xl space-y-4 text-base leading-7 text-muted">
          {gunungPutriSections.development.map((p) => <p key={p}>{p}</p>)}
          <p>
            Informasi mengenai tanggal, lokasi spesifik, dan institusi penanggung jawab
            untuk program tertentu: Belum tersedia pada ringkasan ini kecuali tercantum
            dalam sumber resmi yang dirujuk.
          </p>
        </div>
        <SourceList sources={gunungPutriSources} />
      </section>
    </>
  );
}
