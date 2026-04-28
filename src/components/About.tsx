import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const founders = [
   {
     initials: "LH",
     name: "Lenard Hildenberg",
     role: "Development & IT",
     bio: "4 Jahre Erfahrung mit React und TypeScript. Baut moderne, performante Webanwendungen.",
     gradient: "from-primary to-accent",
   },
   {
     initials: "CS",
     name: "Christopher Spaet",
     role: "Marketing & Organisierung",
     bio: "Verantwortlich für Marketing und Organisation. Sorgt mit exzellentem Kundenservice für reibungslose Abläufe.",
     gradient: "from-accent to-primary",
   },
 ];

const About = () => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const toggleExpand = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <section id="about" className="py-24 md:py-32 relative">
      <div className="container">
        <div className="grid lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-5 lg:sticky lg:top-32">
            <div className="text-sm font-medium text-accent mb-4 tracking-widest uppercase">
              Das Team
            </div>
            <h2 className="font-display text-4xl md:text-5xl font-semibold tracking-tight text-balance">
              Zwei Köpfe.{" "}
              <span className="text-gradient">Eine Mission.</span>
            </h2>
            <p className="mt-5 text-lg text-muted-foreground leading-relaxed">
              Webunics ist ein bewusst kleines Studio. Du arbeitest direkt mit den
              beiden Personen, die deine Website designen und bauen — kein Account
              Manager, keine Übergaben.
            </p>
            <p className="mt-4 text-muted-foreground">
              Diese Nähe ist unser Vorteil: schnellere Entscheidungen, höhere
              Qualität und ein Ergebnis, das wirklich zu dir passt.
            </p>
          </div>

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
                  }}
                  transition={{ duration: 0.3 }}
                  layout
                >
                  <div
                    className={`relative h-32 rounded-2xl bg-gradient-to-br ${f.gradient} overflow-hidden mb-6 flex items-center justify-center`}
                  >
                    <div className="absolute inset-0 grid-pattern opacity-20" />
                    <span className="font-display text-5xl font-bold text-background/90 relative">
                      {f.initials}
                    </span>
                  </div>
                  <h3 className="font-display text-xl font-semibold">{f.name}</h3>
                  <div className="text-sm text-accent mt-1 mb-3">{f.role}</div>
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.p
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="text-sm text-muted-foreground leading-relaxed overflow-hidden mt-4"
                      >
                        {f.bio}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </motion.article>
              );
            })}

            <div className="sm:col-span-2 glass rounded-3xl p-7">
              <div className="grid sm:grid-cols-3 gap-6 text-center sm:text-left">
                <div>
                  <div className="font-display text-3xl font-semibold text-gradient">
                    100%
                  </div>
                  <div className="text-sm text-muted-foreground mt-1">
                    Direkter Kontakt
                  </div>
                </div>
                <div>
                  <div className="font-display text-3xl font-semibold text-gradient">
                    14d
                  </div>
                  <div className="text-sm text-muted-foreground mt-1">
                    Ø Time-to-Launch
                  </div>
                </div>
                <div>
                <div className="font-display text-3xl font-semibold text-gradient">
                     98%
                   </div>
                   <div className="text-sm text-muted-foreground mt-1">
                     Zufriedene Kunden
                   </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
