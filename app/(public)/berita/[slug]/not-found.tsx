import { ButtonLink } from "@/components/ui/button";

export default function ArticleNotFound() {
  return (
    <div className="mx-auto flex max-w-2xl flex-col items-center px-4 py-20 text-center sm:px-6 lg:px-8">
      <p className="text-sm font-semibold tracking-[0.18em] text-secondary uppercase">
        Tidak Ditemukan
      </p>
      <h1 className="mt-3 text-3xl font-semibold tracking-tight text-foreground">
        Berita tidak tersedia
      </h1>
      <p className="mt-4 text-base leading-7 text-muted">
        Artikel yang Anda cari tidak ditemukan atau belum dipublikasikan.
      </p>
      <div className="mt-8 flex gap-3">
        <ButtonLink href="/berita">Kembali ke Berita</ButtonLink>
        <ButtonLink href="/" variant="outline">Beranda</ButtonLink>
      </div>
    </div>
  );
}
