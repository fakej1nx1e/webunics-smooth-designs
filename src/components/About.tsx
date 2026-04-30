import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useInView, useScroll, useTransform } from "framer-motion";

const AnimatedCounter = ({ value, duration = 2 }: { value: string; duration?: number }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [display, setDisplay] = useState("0");

  useEffect(() => {
    if (!isInView) return;
    const numericValue = parseInt(value.replace(/\D/g, ""));
    const suffix = value.replace(/[\d\s]/g, "");
    let start = 0;
    const increment = numericValue / (duration * 60);
    const timer = setInterval(() => {
      start += increment;
      if (start >= numericValue) {
        setDisplay(value);
        clearInterval(timer);
      } else {
        setDisplay(Math.floor(start) + suffix);
      }
    }, 1000 / 60);
    return () => clearInterval(timer);
  }, [isInView, value, duration]);

  return <span ref={ref}>{display}</span>;
};

const founders = [
  {
    initials: "LH",
    name: "Lenard Hildenberg",
    role: "Development & IT",
    bio: "4 years of experience with React and TypeScript. Builds modern, performant web applications.",
    gradient: "from-primary to-accent",
  },
  {
    initials: "CS",
    name: "Christopher Spaet",
    role: "Marketing & Organization",
    bio: "Responsible for marketing and organization. Ensures smooth processes with excellent customer service.",
    gradient: "from-accent to-primary",
  },
];

const About = () => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const parallaxY = useTransform(scrollYProgress, [0, 1], [50, -50]);

  const toggleExpand = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <section id="about" className="py-24 md:py-32 relative overflow-hidden" ref={sectionRef}>
      <motion.div
        className="absolute top-40 left-20 w-64 h-64 bg-primary/10 rounded-full blur-[100px]"
        style={{ y: parallaxY }}
        animate={{ y: [0, -40, 0], scale: [1, 1.1, 1] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-40 right-20 w-80 h-80 bg-accent/10 rounded-full blur-[120px]"
        style={{ y: useTransform(scrollYProgress, [0, 1], [-30, 40]) }}
        animate={{ y: [0, 50, 0], scale: [1, 0.9, 1] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="container relative">
        <div className="grid lg:grid-cols-12 gap-12 items-start">
          <motion.div
            className="lg:col-span-5 lg:sticky lg:top-32"
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <motion.div
              className="text-sm font-medium text-accent mb-4 tracking-widest uppercase"
              initial={{ opacity: 0, letterSpacing: "0.3em" }}
              animate={isInView ? { opacity: 1, letterSpacing: "0.2em" } : {}}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              The Team
            </motion.div>
            <h2 className="font-display text-4xl md:text-5xl font-semibold tracking-tight text-balance">
              Two heads.{" "}
              <span className="text-gradient">One Mission.</span>
            </h2>
            <motion.p
              className="mt-5 text-lg text-muted-foreground leading-relaxed"
              initial={{ opacity: 0, y: 10 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Webunics is a deliberately small studio. You work directly with the
              two people who design and build your website — no account
              manager, no handoffs.
            </motion.p>
            <motion.p
              className="mt-4 text-muted-foreground"
              initial={{ opacity: 0, y: 10 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              This closeness is our advantage: faster decisions, higher
              quality, and a result that truly fits you.
            </motion.p>
          </motion.div>

          <div className="lg:col-span-7 grid sm:grid-cols-2 gap-5 relative">
            <AnimatePresence>
              {expandedIndex !== null && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40"
                  onClick={() => setExpandedIndex(null)}
                />
              )}
            </AnimatePresence>

            {founders.map((f, index) => {
              const isExpanded = expandedIndex === index;
              return (
                <motion.article
                  key={f.name}
                  onClick={() => toggleExpand(index)}
                  className={`group glass rounded-3xl p-7 cursor-pointer ${
                    isExpanded ? "z-50 relative" : ""
                  }`}
                  animate={{
                    scale: isExpanded ? 1.05 : 1,
                    opacity: isInView ? 1 : 0,
                    y: isInView ? 0 : 40,
                  }}
                  transition={{
                    scale: { duration: 0.3 },
                    opacity: { duration: 0.6, delay: index * 0.2 },
                    y: { duration: 0.6, delay: index * 0.2, ease: [0.25, 0.46, 0.45, 0.94] },
                  }}
                  layout
                  initial={{ opacity: 0, y: 40 }}
                  whileHover={{ y: -8, transition: { duration: 0.3, ease: "easeOut" } }}
                >
                  <motion.div
                    className={`relative h-32 rounded-2xl bg-gradient-to-br ${f.gradient} overflow-hidden mb-6 flex items-center justify-center`}
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                  >
                    <div className="absolute inset-0 grid-pattern opacity-20" />
                    <span className="font-display text-5xl font-bold text-background/90 relative">
                      {f.initials}
                    </span>
                  </motion.div>
                  <h3 className="font-display text-xl font-semibold">{f.name}</h3>
                  <div className="text-sm text-accent mt-1 mb-3">{f.role}</div>
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.p
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                        className="text-sm text-muted-foreground leading-relaxed overflow-hidden mt-4"
                      >
                        {f.bio}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </motion.article>
              );
            })}

            <motion.div
              className="sm:col-span-2 glass rounded-3xl p-7"
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              <div className="grid sm:grid-cols-3 gap-6 text-center sm:text-left">
                {[
{ value: "100%", label: "Direct Contact", delay: 0.6 },
                   { value: "14d", label: "Avg. Time-to-Launch", delay: 0.7 },
                   { value: "98%", label: "Satisfied Clients", delay: 0.8 },
                ].map((stat, i) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ delay: stat.delay, type: "spring", stiffness: 200, damping: 20 }}
                    whileHover={{ scale: 1.05 }}
                  >
                    <div className="font-display text-3xl font-semibold text-gradient">
                      <AnimatedCounter value={stat.value} />
                    </div>
                    <div className="text-sm text-muted-foreground mt-1">
                      {stat.label}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
