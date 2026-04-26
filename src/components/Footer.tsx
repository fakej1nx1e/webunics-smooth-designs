const Footer = () => {
  return (
    <footer className="py-12 border-t border-border/50">
      <div className="container">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-iridescent">
              <span className="font-display font-bold text-background">W</span>
            </span>
            <span className="font-display font-semibold">Webunics</span>
          </div>

          <div className="flex items-center gap-8 text-sm text-muted-foreground">
            <a href="#services" className="hover:text-foreground transition-smooth">
              Services
            </a>
            <a href="#portfolio" className="hover:text-foreground transition-smooth">
              Portfolio
            </a>
            <a href="#contact" className="hover:text-foreground transition-smooth">
              Kontakt
            </a>
          </div>

          <div className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Webunics. Alle Rechte vorbehalten.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
