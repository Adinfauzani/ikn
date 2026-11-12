import { HeroSection } from "@/components/public/hero-section";
import { IntroductionSection } from "@/components/public/introduction-section";
import { HighlightsSection } from "@/components/public/highlights-section";
import { LatestNewsSection } from "@/components/public/latest-news-section";
import { ClosingSection } from "@/components/public/closing-section";
import { getPublishedArticles } from "@/src/server/articles/public-queries";

export default async function HomePage() {
  let articles: Awaited<ReturnType<typeof getPublishedArticles>> = [];
  try {
    articles = await getPublishedArticles({ limit: 4 });
  } catch {
    articles = [];
  }

  return (
    <>
      <HeroSection />
      <IntroductionSection />
      <HighlightsSection />
      <LatestNewsSection articles={articles} />
      <ClosingSection />
    </>
  );
}
