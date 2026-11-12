"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { cn } from "@/src/lib/utils/cn";
import { buttonClasses } from "@/components/ui/button";

const navItems = [
  { href: "/", label: "Beranda" },
  { href: "/berita", label: "Berita" },
  { href: "/kontak", label: "Kontak" },
];

export function SiteHeader({ siteTitle }: { siteTitle: string }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  return (
    <header className="sticky top-0 z-40 border-b border-border/70 bg-background/90 backdrop-blur supports-[backdrop-filter]:bg-background/75">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="font-semibold tracking-tight text-foreground">
          <span className="text-lg">{siteTitle}</span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex" aria-label="Navigasi utama">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "rounded-md px-3 py-2 text-sm font-medium transition-colors",
                isActive(item.href)
                  ? "bg-surface-muted text-foreground"
                  : "text-muted hover:text-foreground hover:bg-surface-muted/70",
              )}
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/tentang"
            className={cn(buttonClasses({ size: "sm" }), "ml-2")}
          >
            Jelajahi Nusantara
          </Link>
        </nav>

        <button
          type="button"
          className="inline-flex items-center justify-center rounded-md p-2 text-foreground hover:bg-surface-muted md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? "Tutup menu" : "Buka menu"}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open ? (
        <nav
          id="mobile-nav"
          className="border-t border-border bg-background px-4 py-3 md:hidden"
          aria-label="Navigasi seluler"
        >
          <div className="mx-auto flex max-w-6xl flex-col gap-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={cn(
                  "rounded-md px-3 py-2.5 text-sm font-medium",
                  isActive(item.href)
                    ? "bg-surface-muted text-foreground"
                    : "text-muted hover:text-foreground hover:bg-surface-muted/70",
                )}
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/tentang"
              onClick={() => setOpen(false)}
              className={cn(buttonClasses({ size: "md" }), "mt-2 w-full")}
            >
              Jelajahi Nusantara
            </Link>
          </div>
        </nav>
      ) : null}
    </header>
  );
}
