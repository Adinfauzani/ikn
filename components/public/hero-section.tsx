import Image from "next/image";
import { ButtonLink } from "@/components/ui/button";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden border-b border-border">
      <div className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=2000&q=80"
          alt="Lanskap hijau yang merepresentasikan visi pembangunan berkelanjutan"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#10281d]/85 via-[#10281d]/65 to-[#10281d]/30" />
      </div>
      <div className="relative mx-auto flex min-h-[70vh] max-w-6xl items-center px-4 py-20 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold tracking-[0.2em] text-[#e7efe8] uppercase">
            Ibu Kota Nusantara
          </p>
          <h1 className="mt-4 text-4xl font-semibold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
            Ibu Kota Masa Depan Indonesia
          </h1>
          <p className="mt-5 max-w-xl text-base leading-7 text-[#e6ece6] sm:text-lg">
            Menjelajahi pembangunan Nusantara sebagai pusat pemerintahan yang
            modern, inklusif, dan berkelanjutan.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href="/tentang" size="lg">
              Jelajahi Nusantara
            </ButtonLink>
            <ButtonLink
              href="/berita"
              size="lg"
              variant="outline"
              className="border-white/30 bg-white/10 text-white hover:bg-white/20"
            >
              Baca Berita
            </ButtonLink>
          </div>
        </div>
      </div>
    </section>
  );
}
