import type { Metadata } from "next";
import Image from "next/image";
import { PageHeader } from "@/components/public/page-header";
import { ButtonLink } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Tentang IKN",
  description:
    "Informasi umum mengenai Ibu Kota Nusantara, arah pengembangan, dan konteks keberlanjutan.",
};

export default function TentangPage() {
  return (
    <>
      <PageHeader
        eyebrow="Tentang IKN"
        title="Mengenal Ibu Kota Nusantara"
        description="Gambaran umum mengenai Ibu Kota Nusantara sebagai pusat pemerintahan Indonesia yang direncanakan dengan pendekatan modern dan berkelanjutan."
      />

      <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8 lg:py-16">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:gap-14">
          <div className="space-y-5 text-base leading-7 text-muted">
            <p>
              Ibu Kota Nusantara (IKN) merupakan kawasan yang dipersiapkan sebagai
              pusat pemerintahan Indonesia. Pengembangannya diarahkan untuk
              mendukung penyelenggaraan pemerintahan yang efektif sekaligus
              menghadirkan lingkungan kota yang tertata, adaptif, dan berorientasi
              pada jangka panjang.
            </p>
            <p>
              Informasi pada halaman ini bersifat umum dan akan diperbarui sesuai
              dengan data serta keterangan resmi yang tersedia. Konten rinci
              mengenai visi, misi, dan capaian pembangunan dapat ditambahkan ketika
              sumber resmi telah disediakan.
            </p>
          </div>
          <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-border bg-surface-muted">
            <Image
              src="https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=1200&q=80"
              alt="Bentang alam hijau yang merepresentasikan konteks lingkungan Nusantara"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 40vw"
            />
          </div>
        </div>
      </section>

      <section className="border-y border-border bg-surface">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 py-14 sm:px-6 lg:grid-cols-2 lg:px-8 lg:py-16">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight text-foreground">
              Visi dan Misi
            </h2>
            <p className="mt-4 text-base leading-7 text-muted">
              Pernyataan visi dan misi resmi Ibu Kota Nusantara akan ditampilkan
              pada bagian ini setelah informasi yang disahkan tersedia. Pendekatan
              perencanaan kawasan secara umum diarahkan pada tata kelola yang baik,
              keberlanjutan, dan pelayanan publik yang berkualitas.
            </p>
          </div>
          <div>
            <h2 className="text-2xl font-semibold tracking-tight text-foreground">
              Arah Pengembangan
            </h2>
            <p className="mt-4 text-base leading-7 text-muted">
              Pengembangan Nusantara mencakup penataan fungsi pemerintahan,
              penyediaan infrastruktur pendukung, serta pengelolaan lingkungan.
              Rincian tahapan dan informasi teknis akan disajikan berdasarkan
              rujukan resmi yang relevan.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8 lg:py-16">
        <div className="grid items-start gap-10 lg:grid-cols-2">
          <div className="relative aspect-[16/10] overflow-hidden rounded-2xl border border-border bg-surface-muted">
            <Image
              src="https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1400&q=80"
              alt="Kawasan hijau sebagai konteks keberlanjutan lingkungan"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
          <div>
            <h2 className="text-2xl font-semibold tracking-tight text-foreground">
              Keberlanjutan dan Lingkungan
            </h2>
            <p className="mt-4 text-base leading-7 text-muted">
              Aspek lingkungan menjadi bagian penting dalam perencanaan kawasan.
              Upaya menjaga keseimbangan ekosistem, ruang hijau, dan kualitas
              lingkungan hidup diposisikan sebagai pertimbangan dalam pengembangan
              Nusantara.
            </p>
            <p className="mt-4 text-base leading-7 text-muted">
              Informasi lebih lanjut mengenai kebijakan dan program lingkungan akan
              diperbarui seiring ketersediaan data resmi.
            </p>
            <div className="mt-7">
              <ButtonLink href="/berita" variant="outline">
                Lihat Berita Terkait
              </ButtonLink>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
