const founders = [
  {
    initials: "AM",
    name: "Alex Müller",
    role: "Design & Strategie",
    bio: "Verwandelt Marken in unverwechselbare digitale Erlebnisse. 8 Jahre Designerfahrung.",
    gradient: "from-primary to-accent",
  },
  {
    initials: "JK",
    name: "Jonas Krüger",
    role: "Development & Tech",
    bio: "Baut blitzschnelle, skalierbare Websites. Spezialisiert auf React und moderne Web-Performance.",
    gradient: "from-accent to-primary",
  },
];

const About = () => {
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

          <div className="lg:col-span-7 grid sm:grid-cols-2 gap-5">
            {founders.map((f) => (
              <article
                key={f.name}
                className="group glass rounded-3xl p-7 transition-smooth hover:-translate-y-1"
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
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {f.bio}
                </p>
              </article>
            ))}

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
                    5.0★
                  </div>
                  <div className="text-sm text-muted-foreground mt-1">
                    Kundenbewertung
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
