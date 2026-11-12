import Link from "next/link";

type Settings = Record<string, string | null>;

const navLinks = [
  { href: "/", label: "Beranda" },
  { href: "/tentang", label: "Tentang IKN" },
  { href: "/gunung-putri", label: "Gunung Putri" },
  { href: "/berita", label: "Berita" },
  { href: "/kontak", label: "Kontak" },
];

export function SiteFooter({ settings }: { settings: Settings }) {
  const siteTitle = settings.site_title ?? "Nusantara";
  const description =
    settings.site_description ??
    "Portal informasi mengenai perkembangan Ibu Kota Nusantara.";
  const contactEmail = settings.contact_email;
  const contactAddress = settings.contact_address;
  const socials = [
    { label: "Instagram", url: settings.social_instagram },
    { label: "X", url: settings.social_x },
    { label: "YouTube", url: settings.social_youtube },
  ].filter((s): s is { label: string; url: string } => Boolean(s.url));
  const year = 2026;

  return (
    <footer className="border-t border-border bg-surface">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-3 lg:px-8">
        <div>
          <p className="text-lg font-semibold text-foreground">{siteTitle}</p>
          <p className="mt-3 max-w-sm text-sm leading-6 text-muted">{description}</p>
        </div>
        <div>
          <p className="text-sm font-semibold text-foreground">Navigasi</p>
          <ul className="mt-3 space-y-2">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-sm text-muted hover:text-foreground"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="text-sm font-semibold text-foreground">Kontak</p>
          <div className="mt-3 space-y-2 text-sm text-muted">
            {contactEmail ? <p>{contactEmail}</p> : <p>Informasi kontak belum tersedia.</p>}
            {contactAddress ? <p>{contactAddress}</p> : null}
          </div>
          {socials.length > 0 ? (
            <div className="mt-4">
              <p className="text-sm font-semibold text-foreground">Media Sosial</p>
              <ul className="mt-2 flex flex-wrap gap-x-4 gap-y-2">
                {socials.map((s) => (
                  <li key={s.label}>
                    <a
                      href={s.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-muted hover:text-foreground"
                    >
                      {s.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </div>
      </div>
      <div className="border-t border-border">
        <div className="mx-auto max-w-6xl px-4 py-4 text-sm text-muted sm:px-6 lg:px-8">
          &copy; {year} {siteTitle}. Seluruh hak cipta dilindungi.
        </div>
      </div>
    </footer>
  );
}
