import { ButtonLink } from "@/components/ui/button";

export function ClosingSection() {
  return (
    <section className="border-t border-border bg-primary">
      <div className="mx-auto max-w-6xl px-4 py-14 text-center sm:px-6 lg:px-8 lg:py-16">
        <h2 className="text-2xl font-semibold tracking-tight text-primary-foreground sm:text-3xl">
          Kenali Lebih Dekat Nusantara
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-base leading-7 text-[#dce8de]">
          Jelajahi informasi, perkembangan, dan berita seputar Ibu Kota Nusantara
          dalam satu portal yang informatif dan mudah diakses.
        </p>
        <div className="mt-7 flex justify-center">
          <ButtonLink
            href="/tentang"
            variant="outline"
            className="border-white/30 bg-white/10 text-white hover:bg-white/20"
          >
            Jelajahi Informasi
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
