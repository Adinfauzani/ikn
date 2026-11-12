import type { Metadata } from "next";
import { PageHeader } from "@/components/public/page-header";
import { SourceList } from "@/components/public/gunung-putri/source-list";
import { Card, CardContent } from "@/components/ui/card";
import { gunungPutriProfile, gunungPutriSections, gunungPutriSources } from "@/src/lib/content/gunung-putri";

export const metadata: Metadata = {
  title: "Profil Wilayah Gunung Putri",
  description:
    "Profil wilayah Kecamatan Gunung Putri, Kabupaten Bogor, Jawa Barat: informasi administratif, gambaran umum, dan kondisi wilayah berdasarkan sumber terverifikasi.",
};

export default function GunungPutriProfilPage() {
  return (
    <>
      <PageHeader
        eyebrow="Gunung Putri"
        title="Profil Wilayah"
        description="Informasi administratif dan gambaran umum Kecamatan Gunung Putri, Kabupaten Bogor, Provinsi Jawa Barat."
      />
      <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-2">
          <Card>
            <CardContent>
              <h2 className="text-lg font-semibold text-foreground">Identitas Wilayah</h2>
              <dl className="mt-4 space-y-3 text-sm">
                <div><dt className="font-medium text-foreground">Nama wilayah</dt><dd className="text-muted">{gunungPutriProfile.name}</dd></div>
                <div><dt className="font-medium text-foreground">Tingkat</dt><dd className="text-muted">{gunungPutriProfile.level}</dd></div>
                <div><dt className="font-medium text-foreground">Kabupaten</dt><dd className="text-muted">{gunungPutriProfile.regency}</dd></div>
                <div><dt className="font-medium text-foreground">Provinsi</dt><dd className="text-muted">{gunungPutriProfile.province}</dd></div>
              </dl>
            </CardContent>
          </Card>
          <Card>
            <CardContent>
              <h2 className="text-lg font-semibold text-foreground">Informasi Administratif</h2>
              <dl className="mt-4 space-y-3 text-sm">
                <div><dt className="font-medium text-foreground">Jumlah desa</dt><dd className="text-muted">10 desa (sesuai sumber resmi kecamatan)</dd></div>
                <div><dt className="font-medium text-foreground">Alamat kantor</dt><dd className="text-muted">{gunungPutriProfile.office.address}</dd></div>
                <div><dt className="font-medium text-foreground">Kontak</dt><dd className="text-muted">{gunungPutriProfile.office.phone} · {gunungPutriProfile.office.email}</dd></div>
                <div><dt className="font-medium text-foreground">Jam layanan</dt><dd className="text-muted">{gunungPutriProfile.office.hours}</dd></div>
              </dl>
            </CardContent>
          </Card>
        </div>

        <div className="mt-10 rounded-xl border border-border bg-surface p-6 sm:p-8">
          <h2 className="text-xl font-semibold tracking-tight text-foreground">Desa di Kecamatan Gunung Putri</h2>
          <ul className="mt-4 grid gap-2 text-sm text-muted sm:grid-cols-2 lg:grid-cols-3">
            {gunungPutriProfile.villages.map((v) => (
              <li key={v} className="rounded-md border border-border bg-background px-3 py-2">{v}</li>
            ))}
          </ul>
        </div>

        <div className="mt-10 max-w-3xl">
          <h2 className="text-xl font-semibold tracking-tight text-foreground">Gambaran Umum dan Kondisi Wilayah</h2>
          <div className="mt-4 space-y-4 text-base leading-7 text-muted">
            {gunungPutriSections.overview.map((p) => <p key={p}>{p}</p>)}
            {gunungPutriSections.profile.map((p) => <p key={p}>{p}</p>)}
          </div>
        </div>

        <SourceList sources={gunungPutriSources} />
      </section>
    </>
  );
}
