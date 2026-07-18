export interface FooterLink {
  label: string;
  href: string;
}

export interface FooterProps {
  brand: string;
  tagline?: string;
  links?: FooterLink[];
}

const defaultLinks: FooterLink[] = [
  { label: "Home", href: "/" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

export default function Footer({ brand, tagline, links = defaultLinks }: FooterProps) {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-16 w-full border-t border-brand-900/10 bg-brand-900 text-white">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-4 py-12 sm:px-8 md:flex-row md:items-start md:justify-between">
        <div className="flex flex-col gap-2">
          <span className="text-lg font-bold">{brand}</span>
          {tagline && <p className="max-w-sm text-sm text-white/70">{tagline}</p>}
        </div>

        <ul className="flex flex-col gap-4 sm:flex-row sm:gap-8">
          {links.map((link) => (
            <li key={link.href}>
              <a href={link.href} className="text-sm text-white/80 hover:text-brand-500">
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </div>

      <div className="border-t border-white/10 px-4 py-4 text-center text-xs text-white/60 sm:px-8">
        © {year} {brand}. All rights reserved.
      </div>
    </footer>
  );
}
