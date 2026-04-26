import { ArrowUpRight } from "lucide-react";

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

const Portfolio = () => {
  return (
    <section id="portfolio" className="py-24 md:py-32 relative">
      <div className="container">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
          <div className="max-w-2xl">
            <div className="text-sm font-medium text-accent mb-4 tracking-widest uppercase">
              Ausgewählte Arbeiten
            </div>
            <h2 className="font-display text-4xl md:text-5xl font-semibold tracking-tight text-balance">
              Projekte, die wir mit{" "}
              <span className="text-gradient">Stolz zeigen</span>
            </h2>
          </div>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-smooth group"
          >
            Vollständiges Portfolio anfragen
            <ArrowUpRight
              size={16}
              className="transition-smooth group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </a>
        </div>

        <div className="grid md:grid-cols-2 gap-5">
          {projects.map((p) => (
            <article
              key={p.title}
              className="group relative aspect-[4/3] rounded-3xl overflow-hidden glass cursor-pointer"
            >
              <div
                className={`absolute inset-0 bg-gradient-to-br ${p.color} opacity-90 transition-smooth group-hover:scale-105`}
              />
              <div className="absolute inset-0 grid-pattern opacity-20" />
              <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent" />

              {/* Mock browser frame */}
              <div className="absolute top-6 left-6 right-6 glass rounded-xl p-3">
                <div className="flex items-center gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-destructive/70" />
                  <span className="h-2.5 w-2.5 rounded-full bg-primary/70" />
                  <span className="h-2.5 w-2.5 rounded-full bg-accent/70" />
                </div>
              </div>

              <div className="absolute bottom-0 left-0 right-0 p-7 flex items-end justify-between">
                <div>
                  <div className="text-xs text-muted-foreground mb-1">
                    {p.category}
                  </div>
                  <h3 className="font-display text-2xl font-semibold">{p.title}</h3>
                </div>
                <div className="h-11 w-11 rounded-full glass flex items-center justify-center transition-smooth group-hover:bg-iridescent group-hover:scale-110">
                  <ArrowUpRight size={18} />
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
