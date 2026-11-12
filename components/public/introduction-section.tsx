import Image from "next/image";
import { ButtonLink } from "@/components/ui/button";

export function IntroductionSection() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
      <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
        <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-border bg-surface-muted">
          <Image
            src="https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=1400&q=80"
            alt="Hutan tropis sebagai ilustrasi visi lingkungan Nusantara"
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </div>
        <div>
          <p className="text-xs font-semibold tracking-[0.18em] text-secondary uppercase">
            Tentang
          </p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Mengenal Ibu Kota Nusantara
          </h2>
          <p className="mt-4 text-base leading-7 text-muted">
            Ibu Kota Nusantara (IKN) adalah pusat pemerintahan Indonesia yang
            berlokasi di Kalimantan Timur. Pengembangannya diarahkan untuk
            mendukung fungsi pemerintahan dengan tata kelola yang modern,
            memperhatikan kualitas lingkungan, serta konektivitas yang inklusif.
          </p>
          <p className="mt-4 text-base leading-7 text-muted">
            Portal ini menyajikan informasi umum dan pembaruan terkait Nusantara.
            Rincian resmi, data, dan capaian akan ditampilkan berdasarkan sumber
            yang dapat diverifikasi.
          </p>
          <div className="mt-7">
            <ButtonLink href="/tentang" variant="outline">
              Pelajari Lebih Lanjut
            </ButtonLink>
          </div>
        </div>
      </div>
    </section>
  );
}
