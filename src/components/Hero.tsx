import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, useScroll, useTransform, useSpring, useMotionValue, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import heroPrism from "@/assets/hero-prism.jpg";
import { useIsMobile } from "@/hooks/useIsMobile";

const AnimatedCounter = ({ value, duration = 2 }: { value: string; duration?: number }) => {
  const [display, setDisplay] = useState("0");
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    setIsAnimating(true);
  }, []);

  useEffect(() => {
    if (!isAnimating) return;
    const numericValue = parseInt(value.replace(/\D/g, ""));
    if (isNaN(numericValue)) {
      setDisplay(value);
      return;
    }
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
  }, [isAnimating, value, duration]);

  return <span>{display}</span>;
};

const StaggeredText = ({ children, delay = 0 }: { children: string; delay?: number }) => {
  const words = children.split(" ");

  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.08, delayChildren: delay },
    }),
  };

  const child = {
    hidden: { opacity: 0, y: 20, filter: "blur(10px)" },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { type: "spring", stiffness: 200, damping: 20 },
    },
  };

  return (
    <motion.span
      variants={container}
      initial="hidden"
      animate="visible"
      className="inline-block"
    >
      {words.map((word, i) => (
        <span key={i} className="inline-block mr-[0.25em]">
          {word.split("").map((char, j) => (
            <motion.span
              key={j}
              variants={child}
              className="inline-block"
            >
              {char}
            </motion.span>
          ))}
        </span>
      ))}
    </motion.span>
  );
};

const MagneticButton = ({ children, href, variant, size }: { children: React.ReactNode; href: string; variant?: string; size?: string }) => {
  const ref = useRef<HTMLDivElement>(null);
  const { isTouch } = useIsMobile();
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springX = useSpring(x, { stiffness: 400, damping: 30, mass: 0.5 });
  const springY = useSpring(y, { stiffness: 400, damping: 30, mass: 0.5 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current || isTouch) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const distX = e.clientX - centerX;
    const distY = e.clientY - centerY;
    x.set(distX * 0.3);
    y.set(distY * 0.3);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: isTouch ? undefined : springX, y: isTouch ? undefined : springY }}
      whileHover={isTouch ? undefined : { scale: 1.02 }}
      whileTap={isTouch ? undefined : { scale: 0.98 }}
    >
      <Button asChild variant={variant as any} size={size as any}>
        <a href={href}>{children}</a>
      </Button>
    </motion.div>
  );
};

const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(heroRef, { once: true, margin: "-100px" });
  const { isTouch } = useIsMobile();

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springMouseX = useSpring(mouseX, { stiffness: 100, damping: 30 });
  const springMouseY = useSpring(mouseY, { stiffness: 100, damping: 30 });

  const parallaxX1 = useTransform(springMouseX, [0, 1], isTouch ? [0, 0] : [0, -30]);
  const parallaxY1 = useTransform(springMouseY, [0, 1], isTouch ? [0, 0] : [0, -20]);
  const parallaxX2 = useTransform(springMouseX, [0, 1], isTouch ? [0, 0] : [0, 40]);
  const parallaxY2 = useTransform(springMouseY, [0, 1], isTouch ? [0, 0] : [0, 30]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!heroRef.current || isTouch) return;
    const rect = heroRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    mouseX.set(x);
    mouseY.set(y);
  };

  const stats = [
    { value: "50+", label: "Launches" },
    { value: "98%", label: "PageSpeed Score" },
    { value: "2x", label: "⌀ Conversion-Lift" },
  ];

  return (
    <section
      id="top"
      className="relative pt-36 pb-24 md:pt-44 md:pb-32 overflow-hidden"
      ref={heroRef}
      onMouseMove={handleMouseMove}
    >
      <motion.div
        className="absolute top-20 left-10 w-72 h-72 bg-primary/20 rounded-full blur-[100px]"
        style={{ x: parallaxX1, y: useTransform(springMouseY, [0, 1], [0, -40]) }}
        animate={{
          y: [0, -30, 0],
          x: [0, 20, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute bottom-20 right-10 w-96 h-96 bg-accent/15 rounded-full blur-[120px]"
        style={{ x: parallaxX2, y: useTransform(springMouseY, [0, 1], [0, 40]) }}
        animate={{
          y: [0, 40, 0],
          x: [0, -30, 0],
          scale: [1, 0.95, 1],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute top-1/2 left-1/2 w-64 h-64 bg-primary/10 rounded-full blur-[80px]"
        style={{
          x: useTransform(springMouseX, [0, 1], [0, 60]),
          y: useTransform(springMouseY, [0, 1], [0, 50]),
        }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <div className="absolute inset-0 grid-pattern opacity-40 [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]" />

      <div className="container relative">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          <motion.div
            className="lg:col-span-7"
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <motion.div
              className="inline-flex items-center gap-2 glass rounded-full px-4 py-2 text-xs text-muted-foreground mb-8"
              initial={{ opacity: 0, x: -20, scale: 0.9 }}
              animate={isInView ? { opacity: 1, x: 0, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              <Sparkles size={14} className="text-accent" />
              <span>Bespoke Webdesign · 2025 verfügbar</span>
            </motion.div>

            <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-semibold leading-[1.05] tracking-tight text-balance mb-8">
              <StaggeredText delay={0.3}>Websites, die deine Marke</StaggeredText>{" "}
              <motion.span
                className="text-gradient bg-[length:200%_auto] animate-gradient-shift animate-heartbeat-glow"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
              >
                strahlen lassen.
              </motion.span>
            </h1>

            <motion.p
              className="text-lg md:text-xl text-muted-foreground max-w-xl leading-relaxed"
              initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
              animate={isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
              transition={{ duration: 0.8, delay: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              Wir sind Webunics — ein zweiköpfiges Studio für moderne,
              performante Websites. Strategisch durchdacht, handwerklich
              poliert, messbar wirksam.
            </motion.p>

            <motion.div
              className="mt-10 flex flex-wrap gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <MagneticButton href="#contact" variant="iridescent" size="xl">
                Projekt starten
                <ArrowRight size={18} className="ml-1" />
              </MagneticButton>
              <MagneticButton href="#portfolio" variant="glass" size="xl">
                Unsere Arbeit
              </MagneticButton>
            </motion.div>

            <motion.div
              className="mt-12 flex flex-wrap items-center gap-x-10 gap-y-4 text-sm text-muted-foreground"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 1, delay: 0.8 }}
            >
              {stats.map((stat, i) => (
                <motion.div
                  key={stat.value}
                  initial={{ opacity: 0, y: 20, scale: 0.9 }}
                  animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
                  transition={{ duration: 0.5, delay: 0.9 + i * 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}
                >
                  <div className="font-display text-2xl text-foreground">
                    <AnimatedCounter value={stat.value} />
                  </div>
                  <div>{stat.label}</div>
                </motion.div>
              ))}
              <div className="h-8 w-px bg-border hidden sm:block" />
            </motion.div>
          </motion.div>

          <motion.div
            className="lg:col-span-5 relative"
            initial={{ opacity: 0, x: 50, scale: 0.95 }}
            animate={isInView ? { opacity: 1, x: 0, scale: 1 } : {}}
            transition={{ duration: 1, delay: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <motion.div
              className="relative mx-auto max-w-md"
              style={{ perspective: "1000px" }}
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              <motion.div
                className="absolute -inset-6 bg-iridescent opacity-30 blur-3xl rounded-full"
                animate={{
                  scale: [1, 1.15, 1],
                  opacity: [0.3, 0.4, 0.3],
                  rotate: [0, 180, 360],
                }}
                transition={{
                  duration: 15,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
              <div className="relative glass rounded-3xl p-3 shadow-elegant overflow-hidden">
                <motion.img
                  src={heroPrism}
                  alt="Iridescent prism representing Webunics' creative approach"
                  width={1280}
                  height={1280}
                  className="w-full h-auto rounded-2xl"
                  fetchpriority="high"
                  initial={{ scale: 1.1, opacity: 0 }}
                  animate={isInView ? { scale: 1, opacity: 1 } : {}}
                  transition={{ duration: 1.2, delay: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
                />
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
