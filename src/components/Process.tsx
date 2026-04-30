import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const steps = [
  {
    n: "01",
    title: "Discovery Call",
    desc: "We get to know your business, clarify goals and define the scope. Free & non-binding.",
  },
  {
    n: "02",
    title: "Design",
    desc: "We design a tailored design that carries your brand and keeps conversions in mind.",
  },
  {
    n: "03",
    title: "Development",
    desc: "We build your website with modern tools — fast, secure, and SEO-ready.",
  },
  {
    n: "04",
    title: "Launch & Care",
    desc: "Go live, performance check, optional maintenance contract. We stay by your side.",
  },
];

const Process = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const progressOpacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const progressScale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.95, 1, 1, 0.98]);

  return (
    <section id="process" className="py-24 md:py-32 relative overflow-hidden" ref={sectionRef}>
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[150px]"
        style={{ opacity: progressOpacity }}
      />

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
            transition={{ duration: 0.6 }}
          >
            How we work
          </motion.div>
          <h2 className="font-display text-4xl md:text-5xl font-semibold tracking-tight text-balance">
Four steps to your{" "}
              <span className="text-gradient">new website</span>
          </h2>
        </motion.div>

        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-5 relative"
          style={{ scale: progressScale, opacity: progressOpacity }}
        >
          {steps.map((s, i) => (
            <motion.div
              key={s.n}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: i * 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}
              whileHover={{ y: -6, transition: { duration: 0.3, ease: "easeOut" } }}
              className="relative glass rounded-2xl p-6 group"
            >
              <motion.div
                className="font-display text-5xl font-bold text-gradient mb-4"
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.15 + 0.2, type: "spring", stiffness: 200 }}
              >
                {s.n}
              </motion.div>
              <motion.h3
                className="font-display text-lg font-semibold mb-2"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.15 + 0.3 }}
              >
                {s.title}
              </motion.h3>
              <motion.p
                className="text-sm text-muted-foreground leading-relaxed"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.15 + 0.4 }}
              >
                {s.desc}
              </motion.p>

              <motion.div
                className="absolute -top-3 -left-3 w-6 h-6 rounded-full bg-gradient-to-r from-primary to-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ filter: "blur(8px)" }}
              />

              {i < steps.length - 1 && (
                <motion.div
                  className="hidden lg:block absolute top-1/2 -right-3 w-6 h-px bg-gradient-to-r from-primary/50 to-accent/50"
                  initial={{ scaleX: 0, opacity: 0 }}
                  whileInView={{ scaleX: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.15 + 0.5, ease: "easeOut" }}
                  style={{ transformOrigin: "left" }}
                />
              )}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Process;
