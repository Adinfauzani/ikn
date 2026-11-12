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

export function ArticleCard({
  title,
  slug,
  excerpt,
  publishedAt,
  coverUrl,
  coverAlt,
  categoryName,
}: Props) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-xl border border-border bg-surface shadow-sm transition-shadow hover:shadow-md">
      <Link href={`/berita/${slug}`} className="relative block aspect-[16/10] bg-surface-muted">
        {coverUrl ? (
          <Image
            src={coverUrl}
            alt={coverAlt || title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className="flex h-full items-center justify-center bg-gradient-to-br from-[#dfe7dc] to-[#c9d6c8] p-6 text-center">
            <span className="text-sm font-medium text-secondary">Nusantara</span>
          </div>
        )}
      </Link>
      <div className="flex flex-1 flex-col p-5">
        <div className="flex flex-wrap items-center gap-2 text-xs text-muted">
          {categoryName ? <Badge>{categoryName}</Badge> : null}
          {publishedAt ? <time dateTime={publishedAt.toISOString()}>{formatDateId(publishedAt)}</time> : null}
        </div>
        <h3 className="mt-3 text-lg font-semibold leading-snug tracking-tight text-foreground">
          <Link href={`/berita/${slug}`} className="hover:text-primary">
            {title}
          </Link>
        </h3>
        {excerpt ? (
          <p className="mt-2 line-clamp-3 text-sm leading-6 text-muted">{excerpt}</p>
        ) : null}
        <div className="mt-4 pt-2">
          <Link
            href={`/berita/${slug}`}
            className="text-sm font-medium text-primary hover:underline underline-offset-4"
          >
            Baca selengkapnya
          </Link>
        </div>
      </div>
    </article>
  );
}
