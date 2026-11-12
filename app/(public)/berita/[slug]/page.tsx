import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { ArticleCard } from "@/components/public/article-card";
import { ArticleContent } from "@/components/public/article-content";
import { formatDateId } from "@/src/lib/utils/format";
import {
  getPublishedArticleBySlug,
  getRelatedArticles,
} from "@/src/server/articles/public-queries";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = await getPublishedArticleBySlug(slug).catch(() => null);
  if (!article) {
    return { title: "Berita tidak ditemukan" };
  }
  const title = article.seoTitle || article.title;
  const description = article.seoDescription || article.excerpt || undefined;
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "article",
      publishedTime: article.publishedAt?.toISOString(),
      images: article.coverUrl ? [{ url: article.coverUrl }] : undefined,
    },
  };
}

export default async function ArticleDetailPage({ params }: Props) {
  const { slug } = await params;
  const article = await getPublishedArticleBySlug(slug).catch(() => null);
  if (!article) notFound();

  const related = await getRelatedArticles(
    article.categoryId,
    article.id,
    3,
  ).catch(() => []);

  return (
    <article>
      <header className="border-b border-border bg-surface">
        <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex flex-wrap items-center gap-1 text-sm text-muted">
              <li>
                <Link href="/" className="hover:text-foreground">Beranda</Link>
              </li>
              <li aria-hidden="true"><ChevronRight className="h-4 w-4" /></li>
              <li>
                <Link href="/berita" className="hover:text-foreground">Berita</Link>
              </li>
              {article.categoryName ? (
                <>
                  <li aria-hidden="true"><ChevronRight className="h-4 w-4" /></li>
                  <li className="text-foreground">{article.categoryName}</li>
                </>
              ) : null}
            </ol>
          </nav>

          <div className="flex flex-wrap items-center gap-3 text-sm text-muted">
            {article.categoryName ? <Badge>{article.categoryName}</Badge> : null}
            {article.publishedAt ? (
              <time dateTime={article.publishedAt.toISOString()}>
                {formatDateId(article.publishedAt)}
              </time>
            ) : null}
            {article.authorName ? <span>Oleh {article.authorName}</span> : null}
          </div>

          <h1 className="mt-4 text-3xl font-semibold leading-tight tracking-tight text-foreground sm:text-4xl">
            {article.title}
          </h1>
          {article.excerpt ? (
            <p className="mt-4 text-lg leading-7 text-muted">{article.excerpt}</p>
          ) : null}
        </div>
      </header>

      {article.coverUrl ? (
        <div className="mx-auto max-w-5xl px-4 pt-8 sm:px-6 lg:px-8">
          <div className="relative aspect-[16/9] overflow-hidden rounded-2xl border border-border bg-surface-muted">
            <Image
              src={article.coverUrl}
              alt={article.coverAlt || article.title}
              fill
              priority
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 1024px"
            />
          </div>
        </div>
      ) : null}

      <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
        <ArticleContent html={article.content} />

        <div className="mt-12 border-t border-border pt-8">
          <Link
            href="/berita"
            className="text-sm font-medium text-primary hover:underline underline-offset-4"
          >
            &larr; Kembali ke Berita
          </Link>
        </div>
      </div>

      {related.length > 0 ? (
        <section className="border-t border-border bg-surface">
          <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-semibold tracking-tight text-foreground">
              Berita Terkait
            </h2>
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((item) => (
                <ArticleCard key={item.id} {...item} />
              ))}
            </div>
          </div>
        </section>
      ) : null}
    </article>
  );
}
