import { ButtonLink } from "@/components/ui/button";
import { ArticleCard } from "@/components/public/article-card";
import { FeaturedArticle } from "@/components/public/featured-article";
import type { PublicArticleListItem } from "@/src/server/articles/public-queries";

export function LatestNewsSection({ articles }: { articles: PublicArticleListItem[] }) {
  const [featured, ...rest] = articles;
  const supporting = rest.slice(0, 3);

  return (
    <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-semibold tracking-[0.18em] text-secondary uppercase">
            Berita
          </p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Informasi dan Berita Terkini
          </h2>
          <p className="mt-3 max-w-2xl text-base leading-7 text-muted">
            Kumpulan informasi dan kabar terbaru yang dipublikasikan melalui portal ini.
          </p>
        </div>
        <ButtonLink href="/berita" variant="outline" className="w-fit">
          Lihat Semua Berita
        </ButtonLink>
      </div>

      {articles.length === 0 ? (
        <div className="mt-10 rounded-xl border border-dashed border-border bg-surface p-10 text-center">
          <p className="text-base font-medium text-foreground">Belum ada berita terbit</p>
          <p className="mt-2 text-sm text-muted">
            Informasi terbaru akan ditampilkan di sini setelah dipublikasikan.
          </p>
        </div>
      ) : (
        <div className="mt-10 space-y-8">
          {featured ? <FeaturedArticle {...featured} /> : null}
          {supporting.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {supporting.map((article) => (
                <ArticleCard key={article.id} {...article} />
              ))}
            </div>
          ) : null}
        </div>
      )}
    </section>
  );
}
