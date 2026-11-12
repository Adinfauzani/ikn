import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/public/page-header";
import { ArticleCard } from "@/components/public/article-card";
import { SourceList } from "@/components/public/gunung-putri/source-list";
import { gunungPutriSources } from "@/src/lib/content/gunung-putri";
import { getPublishedArticles } from "@/src/server/articles/public-queries";

export const metadata: Metadata = {
  title: "Berita Terkait Gunung Putri",
  description:
    "Informasi dan berita terbit yang relevan dengan Gunung Putri, Kabupaten Bogor.",
};

export default async function GunungPutriBeritaPage() {
  let articles: Awaited<ReturnType<typeof getPublishedArticles>> = [];
  try {
    articles = await getPublishedArticles({ limit: 12, q: "Gunung Putri" });
  } catch {
    articles = [];
  }

  return (
    <>
      <PageHeader
        eyebrow="Gunung Putri"
        title="Berita dan Informasi Terkini"
        description="Artikel terbit yang relevan dengan Gunung Putri ditampilkan dari sistem manajemen konten situs ini."
      />
      <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
        {articles.length === 0 ? (
          <div className="rounded-xl border border-dashed border-border bg-surface p-12 text-center">
            <p className="text-lg font-medium text-foreground">Belum ada berita terkait terbit</p>
            <p className="mt-2 text-sm text-muted">
              Publikasikan artikel yang memuat informasi relevan tentang Gunung Putri melalui dasbor untuk menampilkannya di sini.
            </p>
            <div className="mt-5">
              <Link href="/berita" className="text-sm font-medium text-primary hover:underline underline-offset-4">
                Lihat semua berita
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {articles.map((article) => (
              <ArticleCard key={article.id} {...article} />
            ))}
          </div>
        )}
        <div className="mt-10 rounded-xl border border-border bg-surface-muted/50 p-5 text-sm leading-6 text-muted">
          <p>
            <span className="font-medium text-foreground">Catatan:</span> Konten berita
            dikelola melalui CMS. Pastikan setiap artikel mencantumkan sumber rujukan
            yang dapat diverifikasi bila menyajikan informasi faktual.
          </p>
        </div>
        <SourceList sources={gunungPutriSources} />
      </section>
    </>
  );
}
