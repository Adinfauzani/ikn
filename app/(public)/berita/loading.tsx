export default function LoadingBerita() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
      <div className="h-8 w-48 animate-pulse rounded bg-surface-muted" />
      <div className="mt-4 h-4 w-full max-w-xl animate-pulse rounded bg-surface-muted" />
      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="overflow-hidden rounded-xl border border-border bg-surface">
            <div className="aspect-[16/10] animate-pulse bg-surface-muted" />
            <div className="space-y-3 p-5">
              <div className="h-4 w-24 animate-pulse rounded bg-surface-muted" />
              <div className="h-5 w-full animate-pulse rounded bg-surface-muted" />
              <div className="h-4 w-5/6 animate-pulse rounded bg-surface-muted" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
