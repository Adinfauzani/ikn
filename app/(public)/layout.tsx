import type { ReactNode } from "react";
import { SiteHeader } from "@/components/public/site-header";
import { SiteFooter } from "@/components/public/site-footer";
import { getAllSettings } from "@/src/server/settings/queries";

export default async function PublicLayout({
  children,
}: {
  children: ReactNode;
}) {
  let settings: Record<string, string | null> = {};
  try {
    settings = await getAllSettings();
  } catch {
    settings = {};
  }

  return (
    <>
      <SiteHeader siteTitle={settings.site_title ?? "Nusantara"} />
      <main className="flex-1">{children}</main>
      <SiteFooter settings={settings} />
    </>
  );
}