import { ButtonLink } from "@/components/ui/button";

export function ClosingSection() {
  return (
    <section className="border-t border-border bg-primary">
      <div className="mx-auto max-w-6xl px-4 py-14 text-center sm:px-6 lg:px-8 lg:py-16">
        <h2 className="text-2xl font-semibold tracking-tight text-primary-foreground sm:text-3xl">
          Jelajahi Informasi Nusantara
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-base leading-7 text-[#dce8de]">
          Akses informasi mengenai Ibu Kota Nusantara serta informasi wilayah
          lainnya yang disajikan secara terstruktur dan mudah dipahami.
        </p>
        <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
          <ButtonLink
            href="/tentang"
            variant="outline"
            className="border-white/30 bg-white/10 text-white hover:bg-white/20"
          >
            Tentang IKN
          </ButtonLink>
          <ButtonLink
            href="/gunung-putri"
            variant="outline"
            className="border-white/30 bg-white/10 text-white hover:bg-white/20"
          >
            Gunung Putri
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
