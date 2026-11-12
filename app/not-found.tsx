import { ButtonLink } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
      <p className="text-sm font-semibold tracking-[0.18em] text-secondary uppercase">
        404
      </p>
      <h1 className="mt-3 text-3xl font-semibold tracking-tight text-foreground">
        Halaman tidak ditemukan
      </h1>
      <p className="mt-4 max-w-md text-base leading-7 text-muted">
        Halaman yang Anda cari tidak tersedia atau telah dipindahkan.
      </p>
      <div className="mt-8 flex gap-3">
        <ButtonLink href="/">Kembali ke Beranda</ButtonLink>
        <ButtonLink href="/berita" variant="outline">Lihat Berita</ButtonLink>
      </div>
    </div>
  );
}
