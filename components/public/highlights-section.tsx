import { Building2, Leaf, Network, Cpu, Users } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const highlights = [
  {
    title: "Pembangunan",
    description:
      "Pengembangan kawasan pemerintahan yang direncanakan secara bertahap dan terintegrasi.",
    icon: Building2,
  },
  {
    title: "Infrastruktur",
    description:
      "Penyediaan sarana dasar dan konektivitas untuk mendukung fungsi kota secara andal.",
    icon: Network,
  },
  {
    title: "Lingkungan",
    description:
      "Pendekatan yang menekankan kelestarian alam dan keseimbangan ekosistem kawasan.",
    icon: Leaf,
  },
  {
    title: "Teknologi",
    description:
      "Pemanfaatan teknologi untuk mendukung layanan, efisiensi, dan pengelolaan kota.",
    icon: Cpu,
  },
  {
    title: "Kehidupan Masyarakat",
    description:
      "Ruang kota yang dirancang inklusif untuk aktivitas pemerintahan dan kehidupan sosial.",
    icon: Users,
  },
];

export function HighlightsSection() {
  return (
    <section className="border-y border-border bg-surface">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold tracking-[0.18em] text-secondary uppercase">
            Sorotan
          </p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Aspek Penting Nusantara
          </h2>
          <p className="mt-4 text-base leading-7 text-muted">
            Gambaran umum bidang-bidang yang menjadi perhatian dalam pengembangan
            Ibu Kota Nusantara.
          </p>
        </div>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {highlights.map((item) => {
            const Icon = item.icon;
            return (
              <Card key={item.title} className="h-full">
                <CardContent>
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-surface-muted text-primary">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <h3 className="mt-4 text-lg font-semibold text-foreground">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-muted">
                    {item.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
