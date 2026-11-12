import type { Metadata } from "next";
import { Mail, MapPin, Globe } from "lucide-react";
import { PageHeader } from "@/components/public/page-header";
import { Card, CardContent } from "@/components/ui/card";
import { getAllSettings } from "@/src/server/settings/queries";

export const metadata: Metadata = {
  title: "Kontak",
  description: "Informasi kontak dan saluran komunikasi portal Nusantara.",
};

export default async function KontakPage() {
  let settings: Record<string, string | null> = {};
  try {
    settings = await getAllSettings();
  } catch {
    settings = {};
  }

  const email = settings.contact_email;
  const address = settings.contact_address;
  const phone = settings.contact_phone;
  const website = settings.contact_website;

  return (
    <>
      <PageHeader
        eyebrow="Kontak"
        title="Informasi Kontak"
        description="Saluran komunikasi dan informasi kontak yang tersedia untuk portal Nusantara."
      />
      <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8 lg:py-16">
        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardContent>
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-surface-muted text-primary">
                <Mail className="h-5 w-5" aria-hidden="true" />
              </div>
              <h2 className="mt-4 text-lg font-semibold text-foreground">Email</h2>
              <p className="mt-2 text-sm leading-6 text-muted">
                {email ?? "Informasi email belum tersedia."}
              </p>
              {phone ? <p className="mt-1 text-sm text-muted">Telepon: {phone}</p> : null}
            </CardContent>
          </Card>
          <Card>
            <CardContent>
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-surface-muted text-primary">
                <MapPin className="h-5 w-5" aria-hidden="true" />
              </div>
              <h2 className="mt-4 text-lg font-semibold text-foreground">Alamat</h2>
              <p className="mt-2 text-sm leading-6 text-muted">
                {address ?? "Informasi alamat belum tersedia."}
              </p>
            </CardContent>
          </Card>
          <Card className="md:col-span-2">
            <CardContent>
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-surface-muted text-primary">
                <Globe className="h-5 w-5" aria-hidden="true" />
              </div>
              <h2 className="mt-4 text-lg font-semibold text-foreground">
                Saluran Resmi
              </h2>
              <p className="mt-2 text-sm leading-6 text-muted">
                {website
                  ? "Tautan informasi resmi yang tersedia:"
                  : "Tautan dan saluran komunikasi resmi akan ditampilkan ketika tersedia."}
              </p>
              {website ? (
                <p className="mt-2">
                  <a
                    href={website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-medium text-primary hover:underline underline-offset-4"
                  >
                    {website}
                  </a>
                </p>
              ) : null}
            </CardContent>
          </Card>
        </div>
      </section>
    </>
  );
}
