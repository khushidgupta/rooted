import Link from "next/link";

const PORTFOLIO_URL =
  "https://numerous-crowd-108.notion.site/Hey-I-m-Khushi-2d5696ef7fe880fc983be2ff5e063917";
const LINKEDIN_URL = "https://www.linkedin.com/in/khushi-gupta15/";

function FooterLinks() {
  return (
    <div className="flex items-center justify-center gap-6 text-xs text-text-soft">
      <Link href="/about" className="hover:text-forest-800 transition-colors">
        About Rooted
      </Link>
      <a
        href={PORTFOLIO_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="hover:text-forest-800 transition-colors"
      >
        Portfolio
      </a>
      <a
        href={LINKEDIN_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="hover:text-forest-800 transition-colors"
      >
        LinkedIn
      </a>
    </div>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-sage-200/60 mt-auto bg-cream/80">
      <div className="mx-auto max-w-lg px-5 py-10 sm:px-6 text-center">
        <p className="text-sm text-text-muted mb-4">
          Made with love by Khushi Gupta 🌱
        </p>
        <FooterLinks />
      </div>
    </footer>
  );
}

export function FooterWide() {
  return (
    <footer className="border-t border-sage-200/60 bg-cream-warm/50">
      <div className="mx-auto max-w-6xl px-6 py-10 lg:px-10 text-center">
        <p className="text-sm text-text-muted mb-4">
          Made with love by Khushi Gupta 🌱
        </p>
        <FooterLinks />
      </div>
    </footer>
  );
}
