import { Code2, Palette, Rocket, Search, Smartphone, Wand2 } from "lucide-react";

const services = [
  {
    icon: Palette,
    title: "Bespoke Design",
    desc: "Individuelle Designs ohne Templates. Jede Pixel-Entscheidung trägt deine Marke.",
  },
  {
    icon: Code2,
    title: "Modernes Development",
    desc: "Sauberer Code mit React, TypeScript & Tailwind. Wartbar, skalierbar, performant.",
  },
  {
    icon: Smartphone,
    title: "Responsive zuerst",
    desc: "Perfekte Darstellung auf jedem Device — vom 320px-Handy bis zum 4K-Monitor.",
  },
  {
    icon: Rocket,
    title: "Performance",
    desc: "Lighthouse 95+, sub-second loads. Geschwindigkeit ist ein Feature.",
  },
  {
    icon: Search,
    title: "SEO Foundation",
    desc: "Saubere Semantik, Meta-Setup, strukturierte Daten — Google liebt deine Seite.",
  },
  {
    icon: Wand2,
    title: "Smooth Animations",
    desc: "Subtile Micro-Interactions, die deine Seite lebendig und premium wirken lassen.",
  },
];

const Services = () => {
  return (
    <section id="services" className="py-24 md:py-32 relative">
      <div className="container">
        <div className="max-w-2xl mb-16">
          <div className="text-sm font-medium text-accent mb-4 tracking-widest uppercase">
            Was wir tun
          </div>
          <h2 className="font-display text-4xl md:text-5xl font-semibold tracking-tight text-balance">
            End-to-End Webdesign &{" "}
            <span className="text-gradient">Development</span>
          </h2>
          <p className="mt-5 text-lg text-muted-foreground">
            Von der ersten Idee bis zum Launch — wir übernehmen den gesamten Prozess
            und liefern Ergebnisse, auf die wir stolz sind.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map((s, i) => (
            <article
              key={s.title}
              className="group relative glass rounded-2xl p-7 transition-smooth hover:-translate-y-1 hover:border-primary/30"
              style={{ animationDelay: `${i * 80}ms` }}
            >
              <div className="absolute inset-0 rounded-2xl bg-iridescent-soft opacity-0 group-hover:opacity-100 transition-smooth pointer-events-none" />
              <div className="relative">
                <div className="inline-flex items-center justify-center h-12 w-12 rounded-xl bg-iridescent shadow-glow-primary mb-5 group-hover:scale-110 transition-smooth">
                  <s.icon size={22} className="text-background" />
                </div>
                <h3 className="font-display text-xl font-semibold mb-2">
                  {s.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {s.desc}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
