import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const links = [
  { href: "#services", label: "Services" },
  { href: "#portfolio", label: "Portfolio" },
  { href: "#about", label: "Über uns" },
  { href: "#process", label: "Prozess" },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-smooth ${
        scrolled ? "py-3" : "py-5"
      }`}
    >
      <div className="container">
        <nav
          className={`flex items-center justify-between rounded-2xl px-5 py-3 transition-smooth ${
            scrolled ? "glass shadow-card" : "bg-transparent"
          }`}
        >
          <a href="#top" className="flex items-center gap-2 group">
            <span className="relative inline-flex h-8 w-8 items-center justify-center rounded-lg bg-iridescent shadow-glow-accent">
              <span className="absolute inset-0 rounded-lg bg-iridescent opacity-60 blur-md group-hover:opacity-90 transition-smooth" />
              <span className="relative font-display font-bold text-background">W</span>
            </span>
            <span className="font-display text-lg font-semibold tracking-tight">
              Webunics
            </span>
          </a>

          <div className="hidden md:flex items-center gap-8">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="text-sm text-muted-foreground hover:text-foreground transition-smooth"
              >
                {l.label}
              </a>
            ))}
          </div>

          <div className="hidden md:block">
            <Button asChild variant="iridescent" size="sm">
              <a href="#contact">Projekt starten</a>
            </Button>
          </div>

          <button
            onClick={() => setOpen((v) => !v)}
            className="md:hidden p-2 rounded-lg hover:bg-secondary transition-smooth"
            aria-label="Menü öffnen"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </nav>

        {open && (
          <div className="md:hidden mt-3 glass rounded-2xl p-5 animate-fade-in">
            <div className="flex flex-col gap-4">
              {links.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="text-sm text-muted-foreground hover:text-foreground transition-smooth"
                >
                  {l.label}
                </a>
              ))}
              <Button asChild variant="iridescent" size="sm" className="mt-2">
                <a href="#contact" onClick={() => setOpen(false)}>
                  Projekt starten
                </a>
              </Button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
