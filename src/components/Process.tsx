const steps = [
  {
    n: "01",
    title: "Discovery Call",
    desc: "Wir lernen dein Business kennen, klären Ziele und definieren den Scope. Kostenlos & unverbindlich.",
  },
  {
    n: "02",
    title: "Design",
    desc: "Wir entwerfen ein maßgeschneidertes Design, das deine Marke transportiert und Conversions im Blick hat.",
  },
  {
    n: "03",
    title: "Development",
    desc: "Wir bauen deine Website mit modernen Tools — schnell, sicher und SEO-ready.",
  },
  {
    n: "04",
    title: "Launch & Care",
    desc: "Live-Schaltung, Performance-Check, optionaler Wartungsvertrag. Wir bleiben an deiner Seite.",
  },
];

const Process = () => {
  return (
    <section id="process" className="py-24 md:py-32 relative">
      <div className="container">
        <div className="max-w-2xl mb-16">
          <div className="text-sm font-medium text-accent mb-4 tracking-widest uppercase">
            So arbeiten wir
          </div>
          <h2 className="font-display text-4xl md:text-5xl font-semibold tracking-tight text-balance">
            Vier Schritte zu deiner{" "}
            <span className="text-gradient">neuen Website</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5 relative">
          {steps.map((s, i) => (
            <div
              key={s.n}
              className="relative glass rounded-2xl p-6 transition-smooth hover:-translate-y-1"
            >
              <div className="font-display text-5xl font-bold text-gradient mb-4">
                {s.n}
              </div>
              <h3 className="font-display text-lg font-semibold mb-2">
                {s.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {s.desc}
              </p>
              {i < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-3 w-6 h-px bg-gradient-to-r from-border to-transparent" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Process;
