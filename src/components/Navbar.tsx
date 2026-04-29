import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/useIsMobile";

const links = [
  { href: "#services", label: "Services" },
  { href: "#portfolio", label: "Portfolio" },
  { href: "#about", label: "Über uns" },
  { href: "#process", label: "Prozess" },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const { isTouch } = useIsMobile();

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 12);
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(docHeight > 0 ? (window.scrollY / docHeight) * 100 : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled ? "py-3" : "py-5"
      }`}
    >
      <motion.div
        className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-primary via-accent to-primary"
        style={{ width: `${scrollProgress}%` }}
        transition={{ duration: 0.1 }}
      />

      <div className="container">
        <motion.nav
          className={`flex items-center justify-between rounded-2xl px-5 py-3 transition-all duration-500 ${
            scrolled ? "glass shadow-elegant" : "bg-transparent"
          }`}
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <motion.a
            href="#top"
            className="flex items-center gap-2 group"
            whileHover={isTouch ? undefined : { scale: 1.05 }}
            whileTap={isTouch ? undefined : { scale: 0.98 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
          >
            <motion.span className="relative inline-flex h-8 w-8 items-center justify-center rounded-lg bg-iridescent shadow-glow-accent">
              <motion.span
                className="absolute inset-0 rounded-lg bg-iridescent blur-md"
                initial={{ opacity: 0.6 }}
                whileHover={{ opacity: 0.9, scale: 1.2 }}
                transition={{ duration: 0.3 }}
              />
              <span className="relative font-display font-bold text-background">W</span>
            </motion.span>
            <span className="font-display text-lg font-semibold tracking-tight">
              Webunics
            </span>
          </motion.a>

          <div className="hidden md:flex items-center gap-8">
            {links.map((l, i) => (
              <motion.a
                key={l.href}
                href={l.href}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-300 relative"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.2 + i * 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
                whileHover={isTouch ? undefined : { y: -2 }}
              >
                {l.label}
                <motion.span
                  className="absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-primary to-accent rounded-full"
                  initial={{ width: 0, opacity: 0 }}
                  whileHover={{ width: "100%", opacity: 1 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                />
              </motion.a>
            ))}
          </div>

          <motion.div
            className="hidden md:block"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <Button
              asChild
              variant="iridescent"
              size="sm"
              className="relative overflow-hidden"
            >
              <motion.a
                href="#contact"
                whileHover={isTouch ? undefined : { scale: 1.02 }}
                whileTap={isTouch ? undefined : { scale: 0.98 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
              >
                Projekt starten
              </motion.a>
            </Button>
          </motion.div>

          <motion.button
            onClick={() => setOpen((v) => !v)}
            className="md:hidden p-2 rounded-lg hover:bg-secondary transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            aria-label={open ? "Menü schließen" : "Menü öffnen"}
          >
            <AnimatePresence mode="wait">
              {open ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <X size={20} />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Menu size={20} />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </motion.nav>

        <AnimatePresence>
          {open && (
            <motion.div
              className="md:hidden mt-3 glass rounded-2xl p-5 overflow-hidden"
              initial={{ opacity: 0, height: 0, y: -20 }}
              animate={{ opacity: 1, height: "auto", y: 0 }}
              exit={{ opacity: 0, height: 0, y: -20 }}
              transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              <div className="flex flex-col gap-4">
                {links.map((l, i) => (
                  <motion.a
                    key={l.href}
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors py-2"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: i * 0.1 }}
                    whileHover={isTouch ? undefined : { x: 5 }}
                  >
                    {l.label}
                  </motion.a>
                ))}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.4 }}
                >
                  <Button
                    asChild
                    variant="iridescent"
                    size="sm"
                    className="mt-2 w-full"
                  >
                    <a href="#contact" onClick={() => setOpen(false)}>
                      Projekt starten
                    </a>
                  </Button>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
};

export default Navbar;
