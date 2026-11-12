import type { Metadata } from "next";
import Link from "next/link";
import {
  Building2,
  Leaf,
  MapPin,
  Network,
  Newspaper,
  Sprout,
  Landmark,
} from "lucide-react";
import { PageHeader } from "@/components/public/page-header";
import { SourceList } from "@/components/public/gunung-putri/source-list";
import { ArticleCard } from "@/components/public/article-card";
import { ButtonLink } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  gunungPutriProfile,
  gunungPutriSections,
  gunungPutriSources,
} from "@/src/lib/content/gunung-putri";
import { getPublishedArticles } from "@/src/server/articles/public-queries";

export const metadata: Metadata = {
  title: "IKN Gunung Putri",
  description:
    "Informasi terstruktur mengenai Kecamatan Gunung Putri, Kabupaten Bogor, Jawa Barat: profil wilayah, infrastruktur, pembangunan, potensi, lingkungan, dan berita terkait.",
  openGraph: {
    title: "IKN Gunung Putri | Nusantara",
    description:
      "Informasi mengenai Kecamatan Gunung Putri, Kabupaten Bogor, Jawa Barat.",
  },
};

export default async function GunungPutriPage() {
  let relatedNews: Awaited<ReturnType<typeof getPublishedArticles>> = [];
  try {
    relatedNews = await getPublishedArticles({ limit: 3, q: "Gunung Putri" });
  } catch {
    relatedNews = [];
  }

  const subpages = [
    { href: "/gunung-putri/profil", label: "Profil Wilayah", icon: MapPin },
    { href: "/gunung-putri/infrastruktur", label: "Infrastruktur & Fasilitas", icon: Network },
    { href: "/gunung-putri/pembangunan", label: "Pembangunan", icon: Building2 },
    { href: "/gunung-putri/potensi", label: "Potensi & Ekonomi", icon: Sprout },
    { href: "/gunung-putri/berita", label: "Berita Terkait", icon: Newspaper },
  ];

  return (
    <>
      <PageHeader
        eyebrow="Informasi Wilayah"
        title="IKN Gunung Putri"
        description="Bagian informasi ini menyajikan gambaran mengenai Kecamatan Gunung Putri, Kabupaten Bogor, Provinsi Jawa Barat. Istilah “IKN Gunung Putri” digunakan sebagai nama inisiatif/informasi lokal pada portal ini dan berbeda dari Ibu Kota Nusantara (IKN) yang berlokasi di Kalimantan Timur."
      />

      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8 lg:py-14">
        <div className="rounded-xl border border-border bg-surface-muted/50 p-5 text-sm leading-6 text-muted sm:p-6">
          <p>
            <span className="font-medium text-foreground">Catatan konteks:</span>{" "}
            Gunung Putri adalah kecamatan di Kabupaten Bogor, Jawa Barat, dan{" "}
            <strong className="font-medium text-foreground">bukan</strong> bagian
            geografis dari Ibu Kota Nusantara di Kalimantan Timur. Informasi faktual
            disajikan berdasarkan sumber yang dapat diatribusikan; rincian yang belum
            terverifikasi ditandai “Belum tersedia”.
          </p>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {subpages.map((item) => {
            const Icon = item.icon;
            return (
              <Link key={item.href} href={item.href} className="group block h-full">
                <Card className="h-full transition-shadow group-hover:shadow-md">
                  <CardContent>
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-surface-muted text-primary">
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </div>
                    <h2 className="mt-4 text-base font-semibold text-foreground group-hover:text-primary">
                      {item.label}
                    </h2>
                    <p className="mt-1 text-sm text-muted">Lihat informasi</p>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
      </section>

      <section className="border-y border-border bg-surface">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
          <p className="text-xs font-semibold tracking-[0.18em] text-secondary uppercase">
            Gambaran Umum
          </p>
          <h2 className="mt-3 text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
            Sekilas Gunung Putri
          </h2>
          <div className="mt-5 max-w-3xl space-y-4 text-base leading-7 text-muted">
            {gunungPutriSections.overview.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-2">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight text-foreground">
              Informasi Wilayah Penting
            </h2>
            <dl className="mt-6 space-y-4 text-sm">
              <div>
                <dt className="font-medium text-foreground">Wilayah</dt>
                <dd className="mt-1 text-muted">
                  {gunungPutriProfile.level} {gunungPutriProfile.name},{" "}
                  {gunungPutriProfile.regency}, {gunungPutriProfile.province}
                </dd>
              </div>
              <div>
                <dt className="font-medium text-foreground">Desa (10)</dt>
                <dd className="mt-1 text-muted">
                  {gunungPutriProfile.villages.join(", ")}.
                </dd>
              </div>
              <div>
                <dt className="font-medium text-foreground">Kantor Kecamatan</dt>
                <dd className="mt-1 text-muted">{gunungPutriProfile.office.address}</dd>
              </div>
              <div>
                <dt className="font-medium text-foreground">Kontak</dt>
                <dd className="mt-1 text-muted">
                  {gunungPutriProfile.office.phone}
                  <br />
                  {gunungPutriProfile.office.email}
                  <br />
                  {gunungPutriProfile.office.hours}
                </dd>
              </div>
              <div>
                <dt className="font-medium text-foreground">Luas wilayah / data geografis rinci</dt>
                <dd className="mt-1 text-muted">
                  Belum tersedia dalam ringkasan ini — lihat publikasi BPS Kecamatan Gunung Putri Dalam Angka.
                </dd>
              </div>
            </dl>
          </div>
          <div className="rounded-xl border border-border bg-surface p-6">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-surface-muted text-primary">
              <Landmark className="h-5 w-5" aria-hidden="true" />
            </div>
            <h3 className="mt-4 text-lg font-semibold text-foreground">
              Profil & Administrasi
            </h3>
            <p className="mt-2 text-sm leading-6 text-muted">
              Informasi profil wilayah, kondisi umum, dan aspek administratif disajikan
              berdasarkan sumber resmi yang tersedia.
            </p>
            <div className="mt-5">
              <ButtonLink href="/gunung-putri/profil" variant="outline" size="sm">
                Buka Profil Wilayah
              </ButtonLink>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-border bg-surface">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-2">
            <div>
              <h2 className="text-2xl font-semibold tracking-tight text-foreground">
                Infrastruktur dan Fasilitas Publik
              </h2>
              <ul className="mt-5 space-y-3 text-base leading-7 text-muted">
                {gunungPutriSections.infrastructure.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <div className="mt-6">
                <ButtonLink href="/gunung-putri/infrastruktur" variant="outline" size="sm">
                  Selengkapnya
                </ButtonLink>
              </div>
            </div>
            <div>
              <h2 className="text-2xl font-semibold tracking-tight text-foreground">
                Pembangunan dan Perkembangan Wilayah
              </h2>
              <ul className="mt-5 space-y-3 text-base leading-7 text-muted">
                {gunungPutriSections.development.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <div className="mt-6">
                <ButtonLink href="/gunung-putri/pembangunan" variant="outline" size="sm">
                  Selengkapnya
                </ButtonLink>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-2">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight text-foreground">
              Potensi dan Ekonomi Lokal
            </h2>
            <ul className="mt-5 space-y-3 text-base leading-7 text-muted">
              {gunungPutriSections.potential.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <div className="mt-6">
              <ButtonLink href="/gunung-putri/potensi" variant="outline" size="sm">
                Selengkapnya
              </ButtonLink>
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <Leaf className="h-5 w-5 text-primary" aria-hidden="true" />
              <h2 className="text-2xl font-semibold tracking-tight text-foreground">
                Lingkungan dan Keberlanjutan
              </h2>
            </div>
            <ul className="mt-5 space-y-3 text-base leading-7 text-muted">
              {gunungPutriSections.environment.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="border-t border-border bg-surface">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-semibold tracking-[0.18em] text-secondary uppercase">
                Berita
              </p>
              <h2 className="mt-2 text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
                Berita dan Informasi Terkini
              </h2>
              <p className="mt-2 max-w-2xl text-base leading-7 text-muted">
                Artikel terbit yang relevan dengan Gunung Putri ditampilkan dari sistem berita (jika tersedia).
              </p>
            </div>
            <ButtonLink href="/gunung-putri/berita" variant="outline" className="w-fit">
              Lihat Berita Terkait
            </ButtonLink>
          </div>

          {relatedNews.length === 0 ? (
            <div className="mt-8 rounded-xl border border-dashed border-border bg-background p-10 text-center">
              <p className="text-base font-medium text-foreground">Belum ada berita terkait terbit</p>
              <p className="mt-2 text-sm text-muted">
                Publikasikan artikel dengan kata kunci atau kategori yang relevan untuk menampilkannya di sini.
              </p>
            </div>
          ) : (
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {relatedNews.map((article) => (
                <ArticleCard key={article.id} {...article} />
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-14 sm:px-6 lg:px-8">
        <SourceList sources={gunungPutriSources} />
      </section>
    </>
  );
}
