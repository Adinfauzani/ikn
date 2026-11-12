import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/public/page-header";
import { FeaturedArticle } from "@/components/public/featured-article";
import { ArticleCard } from "@/components/public/article-card";
import { Input } from "@/components/ui/input";
import { cn } from "@/src/lib/utils/cn";
import {
  countPublishedArticles,
  getPublishedArticles,
  getPublishedCategories,
} from "@/src/server/articles/public-queries";

export const metadata: Metadata = {
  title: "Berita",
  description:
    "Informasi dan berita terkini seputar Ibu Kota Nusantara.",
};

const PAGE_SIZE = 7;

type Props = {
  searchParams: Promise<{ q?: string; category?: string; page?: string }>;
};

export default async function BeritaPage({ searchParams }: Props) {
  const sp = await searchParams;
  const q = (sp.q ?? "").trim();
  const category = (sp.category ?? "").trim();
  const page = Math.max(1, Number.parseInt(sp.page ?? "1", 10) || 1);
  const offset = (page - 1) * PAGE_SIZE;

  let articles: Awaited<ReturnType<typeof getPublishedArticles>> = [];
  let total = 0;
  let categories: Awaited<ReturnType<typeof getPublishedCategories>> = [];
  try {
    [articles, total, categories] = await Promise.all([
      getPublishedArticles({
        limit: PAGE_SIZE,
        offset,
        q: q || undefined,
        categorySlug: category || undefined,
      }),
      countPublishedArticles({
        q: q || undefined,
        categorySlug: category || undefined,
      }),
      getPublishedCategories(),
    ]);
  } catch {
    articles = [];
    total = 0;
    categories = [];
  }

  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));
  const isFirstPage = page === 1;
  const featured = isFirstPage ? articles[0] : undefined;
  const gridArticles = isFirstPage ? articles.slice(1) : articles;

  const makeHref = (next: { q?: string; category?: string; page?: number }) => {
    const params = new URLSearchParams();
    const nq = next.q ?? q;
    const nc = next.category ?? category;
    const np = next.page ?? 1;
    if (nq) params.set("q", nq);
    if (nc) params.set("category", nc);
    if (np > 1) params.set("page", String(np));
    const qs = params.toString();
    return qs ? `/berita?${qs}` : "/berita";
  };

  return (
    <>
      <PageHeader
        eyebrow="Berita"
        title="Informasi dan Berita"
        description="Kumpulan informasi, kabar, dan artikel seputar perkembangan Ibu Kota Nusantara."
      />

      <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <form action="/berita" method="get" className="flex w-full max-w-md gap-2">
            {category ? <input type="hidden" name="category" value={category} /> : null}
            <label htmlFor="q" className="sr-only">
              Cari berita
            </label>
            <Input
              id="q"
              name="q"
              type="search"
              defaultValue={q}
              placeholder="Cari berita..."
            />
            <button
              type="submit"
              className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground hover:bg-[#183d2e]"
            >
              Cari
            </button>
          </form>

          <div className="flex flex-wrap gap-2" aria-label="Filter kategori">
            <Link
              href={makeHref({ category: "", page: 1 })}
              className={cn(
                "rounded-full border px-3 py-1.5 text-sm transition-colors",
                !category
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border bg-surface text-muted hover:text-foreground",
              )}
            >
              Semua
            </Link>
            {categories.map((c) => (
              <Link
                key={c.id}
                href={makeHref({ category: c.slug, page: 1 })}
                className={cn(
                  "rounded-full border px-3 py-1.5 text-sm transition-colors",
                  category === c.slug
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border bg-surface text-muted hover:text-foreground",
                )}
              >
                {c.name}
              </Link>
            ))}
          </div>
        </div>

        {articles.length === 0 ? (
          <div className="mt-12 rounded-xl border border-dashed border-border bg-surface p-12 text-center">
            <p className="text-lg font-medium text-foreground">
              {q || category ? "Tidak ada berita yang sesuai" : "Belum ada berita terbit"}
            </p>
            <p className="mt-2 text-sm text-muted">
              {q || category
                ? "Coba ubah kata kunci pencarian atau pilih kategori lain."
                : "Informasi terbaru akan ditampilkan di sini setelah dipublikasikan."}
            </p>
            {q || category ? (
              <div className="mt-5">
                <Link href="/berita" className="text-sm font-medium text-primary hover:underline underline-offset-4">
                  Hapus filter
                </Link>
              </div>
            ) : null}
          </div>
        ) : (
          <div className="mt-10 space-y-8">
            {featured ? <FeaturedArticle {...featured} /> : null}
            {gridArticles.length > 0 ? (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {gridArticles.map((article) => (
                  <ArticleCard key={article.id} {...article} />
                ))}
              </div>
            ) : null}
          </div>
        )}

        {totalPages > 1 ? (
          <nav
            className="mt-12 flex items-center justify-center gap-2"
            aria-label="Paginasi berita"
          >
            <Link
              href={makeHref({ page: Math.max(1, page - 1) })}
              aria-disabled={page <= 1}
              className={cn(
                "rounded-md border border-border px-3 py-2 text-sm",
                page <= 1
                  ? "pointer-events-none text-muted/50"
                  : "text-foreground hover:bg-surface-muted",
              )}
            >
              Sebelumnya
            </Link>
            <span className="px-2 text-sm text-muted">
              Halaman {page} dari {totalPages}
            </span>
            <Link
              href={makeHref({ page: Math.min(totalPages, page + 1) })}
              aria-disabled={page >= totalPages}
              className={cn(
                "rounded-md border border-border px-3 py-2 text-sm",
                page >= totalPages
                  ? "pointer-events-none text-muted/50"
                  : "text-foreground hover:bg-surface-muted",
              )}
            >
              Berikutnya
            </Link>
          </nav>
        ) : null}
      </section>
    </>
  );
}
