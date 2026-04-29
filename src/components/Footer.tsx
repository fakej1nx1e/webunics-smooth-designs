import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const Footer = () => {
  const footerRef = useRef<HTMLElement>(null);
  const isInView = useInView(footerRef, { once: true, margin: "-50px" });

  const footerLinks = [
    { href: "#services", label: "Services" },
    { href: "#portfolio", label: "Portfolio" },
    { href: "#contact", label: "Kontakt" },
  ];

  return (
    <footer className="py-12 border-t border-border/50" ref={footerRef}>
      <div className="container">
        <motion.div
          className="flex flex-col md:flex-row items-center justify-between gap-6"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <motion.a
            href="#top"
            className="flex items-center gap-2 group"
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            whileHover={{ scale: 1.02 }}
          >
            <motion.span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-iridescent relative overflow-hidden">
              <motion.span
                className="absolute inset-0 bg-iridescent blur-md"
                initial={{ opacity: 0.5 }}
                whileHover={{ opacity: 0.8 }}
              />
              <span className="relative font-display font-bold text-background">W</span>
            </motion.span>
            <span className="font-display font-semibold">Webunics</span>
          </motion.a>

          <div className="flex items-center gap-8 text-sm text-muted-foreground">
            {footerLinks.map((link, i) => (
              <motion.a
                key={link.href}
                href={link.href}
                className="hover:text-foreground transition-colors relative"
                initial={{ opacity: 0, y: 10 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.2 + i * 0.1 }}
                whileHover={{ y: -2 }}
              >
                {link.label}
                <motion.span
                  className="absolute -bottom-1 left-0 h-px bg-gradient-to-r from-primary to-accent"
                  initial={{ width: 0 }}
                  whileHover={{ width: "100%" }}
                  transition={{ duration: 0.3 }}
                />
              </motion.a>
            ))}
          </div>

          <motion.div
            className="text-sm text-muted-foreground"
            initial={{ opacity: 0, x: 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            © {new Date().getFullYear()} Webunics. Alle Rechte vorbehalten.
          </motion.div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
