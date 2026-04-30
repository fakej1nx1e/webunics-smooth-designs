import { Code2, Palette, Rocket, Search, Smartphone, Wand2 } from "lucide-react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useIsMobile } from "@/hooks/useIsMobile";

const services = [
  {
    icon: Palette,
    title: "Bespoke Design",
    desc: "Custom designs without templates. Every pixel decision carries your brand.",
  },
  {
    icon: Code2,
    title: "Modernes Development",
    desc: "Clean code with React, TypeScript & Tailwind. Maintainable, scalable, performant.",
  },
  {
    icon: Smartphone,
    title: "Responsive zuerst",
    desc: "Perfect display on every device — from 320px mobile to 4K monitor.",
  },
  {
    icon: Rocket,
    title: "Performance",
    desc: "Lighthouse 95+, sub-second loads. Speed is a feature.",
  },
  {
    icon: Search,
    title: "SEO Foundation",
    desc: "Clean semantics, meta setup, structured data — Google loves your site.",
  },
  {
    icon: Wand2,
    title: "Smooth Animations",
    desc: "Subtle micro-interactions that make your site feel alive and premium.",
  },
];

const TiltCard = ({ children, className }: { children: React.ReactNode; className?: string }) => {
  const { isTouch } = useIsMobile();
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useTransform(y, [-0.5, 0.5], isTouch ? [0, 0] : [8, -8]);
  const rotateY = useTransform(x, [-0.5, 0.5], isTouch ? [0, 0] : [-8, 8]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isTouch) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const normalizedX = (e.clientX - centerX) / rect.width;
    const normalizedY = (e.clientY - centerY) / rect.height;
    x.set(normalizedX);
    y.set(normalizedY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      className={className}
      style={{ perspective: "1000px" }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
};

const Services = () => {
  return (
    <section id="services" className="py-24 md:py-32 relative">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="max-w-2xl mb-16"
        >
          <motion.div
            className="text-sm font-medium text-accent mb-4 tracking-widest uppercase"
            initial={{ opacity: 0, letterSpacing: "0.3em" }}
            whileInView={{ opacity: 1, letterSpacing: "0.2em" }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            What we do
          </motion.div>
          <h2 className="font-display text-4xl md:text-5xl font-semibold tracking-tight text-balance">
            End-to-End Webdesign &{" "}
            <span className="text-gradient">Development</span>
          </h2>
          <motion.p
            className="mt-5 text-lg text-muted-foreground"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
From the first idea to launch — we handle the entire process
              and deliver results we're proud of.
          </motion.p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map((s, i) => (
            <TiltCard key={s.title} className="group">
              <motion.article
                initial={{ opacity: 0, y: 40, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: i * 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
                whileHover={{ y: -8 }}
                className="relative glass rounded-2xl p-7 cursor-default h-full"
              >
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/10 to-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                <motion.div
                  className="relative"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.1 + 0.2 }}
                >
                  <motion.div
                    className="inline-flex items-center justify-center h-12 w-12 rounded-xl bg-iridescent shadow-glow-primary mb-5"
                    whileHover={{ scale: 1.15, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 400, damping: 20 }}
                  >
                    <s.icon size={22} className="text-background" />
                  </motion.div>
                  <h3 className="font-display text-xl font-semibold mb-2">
                    {s.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {s.desc}
                  </p>
                </motion.div>
              </motion.article>
            </TiltCard>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
