import { ArrowUpRight } from "lucide-react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useIsMobile } from "@/hooks/useIsMobile";

const projects = [
  {
    title: "Lumen Studios",
    category: "Brand Website",
    color: "from-primary/40 via-primary/10 to-accent/30",
  },
  {
    title: "Northwind Capital",
    category: "Finance Landing",
    color: "from-accent/40 via-primary/10 to-primary/30",
  },
  {
    title: "Habit OS",
    category: "SaaS Marketing",
    color: "from-primary/30 via-accent/20 to-accent/40",
  },
  {
    title: "Atlas & Co.",
    category: "E-Commerce",
    color: "from-accent/30 via-primary/30 to-primary/10",
  },
];

const PortfolioCard = ({ project, index }: { project: typeof projects[0]; index: number }) => {
  const { isTouch } = useIsMobile();
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useTransform(y, [-0.5, 0.5], isTouch ? [0, 0] : [6, -6]);
  const rotateY = useTransform(x, [-0.5, 0.5], isTouch ? [0, 0] : [-6, 6]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isTouch) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set((e.clientX - centerX) / rect.width);
    y.set((e.clientY - centerY) / rect.height);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      style={{ perspective: "1000px" }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 60, scale: 0.9 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.7, delay: index * 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      <motion.article
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        whileHover={{ y: -8 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="group relative aspect-[4/3] rounded-3xl overflow-hidden glass cursor-pointer"
      >
        <motion.div
          className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-90`}
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
        />
        <div className="absolute inset-0 grid-pattern opacity-20" />
        <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent" />

        <motion.div
          className="absolute top-6 left-6 right-6 glass rounded-xl p-3"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: index * 0.15 + 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
          style={{ transform: "translateZ(30px)" }}
        >
          <div className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-destructive/70" />
            <span className="h-2.5 w-2.5 rounded-full bg-primary/70" />
            <span className="h-2.5 w-2.5 rounded-full bg-accent/70" />
          </div>
        </motion.div>

        <div className="absolute bottom-0 left-0 right-0 p-7 flex items-end justify-between">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.15 + 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
            style={{ transform: "translateZ(20px)" }}
          >
            <div className="text-xs text-muted-foreground mb-1">
              {project.category}
            </div>
            <h3 className="font-display text-2xl font-semibold">{project.title}</h3>
          </motion.div>
          <motion.div
            className="h-11 w-11 rounded-full glass flex items-center justify-center"
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 20 }}
            style={{ transform: "translateZ(40px)" }}
          >
            <ArrowUpRight size={18} />
          </motion.div>
        </div>
      </motion.article>
    </motion.div>
  );
};

const Portfolio = () => {
  return (
    <section id="portfolio" className="py-24 md:py-32 relative">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16"
        >
          <div className="max-w-2xl">
            <motion.div
              className="text-sm font-medium text-accent mb-4 tracking-widest uppercase"
              initial={{ opacity: 0, letterSpacing: "0.3em" }}
              whileInView={{ opacity: 1, letterSpacing: "0.2em" }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              Ausgewählte Arbeiten
            </motion.div>
            <h2 className="font-display text-4xl md:text-5xl font-semibold tracking-tight text-balance">
              Projekte, die wir mit{" "}
              <span className="text-gradient">Stolz zeigen</span>
            </h2>
          </div>
          <motion.a
            href="#contact"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-smooth group"
            whileHover={{ x: 5 }}
            transition={{ duration: 0.3 }}
          >
            Vollständiges Portfolio anfragen
            <ArrowUpRight
              size={16}
              className="transition-smooth group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </motion.a>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-5">
          {projects.map((p, i) => (
            <PortfolioCard key={p.title} project={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
