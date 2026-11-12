export function ArticleContent({ html }: { html: string }) {
  return (
    <div
      className="prose-content text-base"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
