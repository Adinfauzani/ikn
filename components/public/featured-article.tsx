import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { formatDateId } from "@/src/lib/utils/format";

type Props = {
  title: string;
  slug: string;
  excerpt: string | null;
  publishedAt: Date | null;
  coverUrl: string | null;
  coverAlt: string | null;
  categoryName: string | null;
};

export function FeaturedArticle(props: Props) {
  const { title, slug, excerpt, publishedAt, coverUrl, coverAlt, categoryName } = props;
  return (
    <article className="grid overflow-hidden rounded-2xl border border-border bg-surface shadow-sm lg:grid-cols-2">
      <Link href={`/berita/${slug}`} className="relative block min-h-[260px] bg-surface-muted lg:min-h-full">
        {coverUrl ? (
          <Image
            src={coverUrl}
            alt={coverAlt || title}
            fill
            priority
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        ) : (
          <div className="flex h-full min-h-[260px] items-center justify-center bg-gradient-to-br from-[#dfe7dc] via-[#d4dfd2] to-[#c3d1c1]">
            <span className="text-sm font-medium tracking-wide text-secondary">Liputan Nusantara</span>
          </div>
        )}
      </Link>
      <div className="flex flex-col justify-center p-6 sm:p-8 lg:p-10">
        <div className="flex flex-wrap items-center gap-2 text-xs text-muted">
          {categoryName ? <Badge>{categoryName}</Badge> : null}
          {publishedAt ? <time dateTime={publishedAt.toISOString()}>{formatDateId(publishedAt)}</time> : null}
        </div>
        <h2 className="mt-4 text-2xl font-semibold leading-tight tracking-tight text-foreground sm:text-3xl">
          <Link href={`/berita/${slug}`} className="hover:text-primary">
            {title}
          </Link>
        </h2>
        {excerpt ? (
          <p className="mt-4 max-w-xl text-base leading-7 text-muted">{excerpt}</p>
        ) : null}
        <div className="mt-6">
          <Link
            href={`/berita/${slug}`}
            className="inline-flex items-center text-sm font-medium text-primary hover:underline underline-offset-4"
          >
            Baca selengkapnya
          </Link>
        </div>
      </div>
    </article>
  );
}
