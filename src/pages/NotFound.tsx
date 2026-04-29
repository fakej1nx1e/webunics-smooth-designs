import { useLocation } from "react-router-dom";
import { useEffect, useRef } from "react";
import { motion, useInView, useAnimation } from "framer-motion";

const NotFound = () => {
  const location = useLocation();
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });
  const controls = useAnimation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  const floatingOrbs = [
    { x: "10%", y: "20%", size: "w-32 h-32", color: "bg-primary/20", duration: 6 },
    { x: "80%", y: "60%", size: "w-48 h-48", color: "bg-accent/15", duration: 8 },
    { x: "30%", y: "70%", size: "w-24 h-24", color: "bg-primary/15", duration: 7 },
  ];

  return (
    <div className="min-h-screen bg-background relative overflow-hidden flex items-center justify-center">
      {floatingOrbs.map((orb, i) => (
        <motion.div
          key={i}
          className={`absolute ${orb.size} ${orb.color} rounded-full blur-[80px]`}
          style={{ left: orb.x, top: orb.y }}
          animate={{
            y: [0, -40, 0],
            x: [0, 20, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: orb.duration,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      <div className="absolute inset-0 grid-pattern opacity-30 [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]" />

      <motion.div
        ref={ref}
        className="relative text-center"
        initial="hidden"
        animate={controls}
        variants={{
          hidden: { opacity: 0, y: 40 },
          visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] },
          },
        }}
      >
        <motion.div
          className="font-display text-9xl font-bold text-gradient mb-4"
          initial={{ scale: 0.5, opacity: 0 }}
          animate={isInView ? { scale: 1, opacity: 1 } : {}}
          transition={{ duration: 0.8, type: "spring", stiffness: 200, delay: 0.2 }}
        >
          404
        </motion.div>

        <motion.h2
          className="text-3xl font-semibold mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          Oops! Page not found
        </motion.h2>

        <motion.p
          className="text-xl text-muted-foreground mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          The page you&apos;re looking for doesn&apos;t exist.
        </motion.p>

        <motion.a
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-iridescent text-background font-medium hover:opacity-90 transition-opacity"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Return to Home
        </motion.a>
      </motion.div>
    </div>
  );
};

export default NotFound;
