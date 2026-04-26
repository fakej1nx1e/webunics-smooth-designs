import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroPrism from "@/assets/hero-prism.jpg";

const Hero = () => {
  return (
    <section
      id="top"
      className="relative pt-36 pb-24 md:pt-44 md:pb-32 overflow-hidden"
    >
      {/* Decorative background */}
      <div className="absolute inset-0 grid-pattern opacity-40 [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]" />
      <div className="absolute -top-40 -left-40 h-96 w-96 rounded-full bg-primary/30 blur-[140px] animate-glow-pulse" />
      <div
        className="absolute -bottom-40 -right-40 h-96 w-96 rounded-full bg-accent/25 blur-[140px] animate-glow-pulse"
        style={{ animationDelay: "1.5s" }}
      />

      <div className="container relative">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 animate-fade-in-slow">
            <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-2 text-xs text-muted-foreground mb-8">
              <Sparkles size={14} className="text-accent" />
              <span>Bespoke Webdesign · 2025 verfügbar</span>
            </div>

            <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-semibold leading-[1.05] tracking-tight text-balance">
              Websites, die deine Marke{" "}
              <span className="text-gradient bg-[length:200%_auto] animate-gradient-shift">
                strahlen lassen
              </span>
              .
            </h1>

            <p className="mt-7 text-lg md:text-xl text-muted-foreground max-w-xl leading-relaxed">
              Wir sind Webunics — ein zweiköpfiges Studio für moderne, performante
              Websites. Strategisch durchdacht, handwerklich poliert, messbar
              wirksam.
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <Button asChild variant="iridescent" size="xl">
                <a href="#contact">
                  Projekt starten
                  <ArrowRight size={18} className="ml-1" />
                </a>
              </Button>
              <Button asChild variant="glass" size="xl">
                <a href="#portfolio">Unsere Arbeit</a>
              </Button>
            </div>

            <div className="mt-12 flex flex-wrap items-center gap-x-10 gap-y-4 text-sm text-muted-foreground">
              <div>
                <div className="font-display text-2xl text-foreground">50+</div>
                <div>Launches</div>
              </div>
              <div className="h-8 w-px bg-border hidden sm:block" />
              <div>
                <div className="font-display text-2xl text-foreground">98%</div>
                <div>PageSpeed Score</div>
              </div>
              <div className="h-8 w-px bg-border hidden sm:block" />
              <div>
                <div className="font-display text-2xl text-foreground">2x</div>
                <div>⌀ Conversion-Lift</div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 relative animate-scale-in">
            <div className="relative mx-auto max-w-md">
              <div className="absolute -inset-6 bg-iridescent opacity-30 blur-3xl rounded-full animate-glow-pulse" />
              <div className="relative glass rounded-3xl p-3 shadow-elegant">
                <img
                  src={heroPrism}
                  alt="Iridescent prism representing Webunics' creative approach"
                  width={1280}
                  height={1280}
                  className="w-full h-auto rounded-2xl animate-float"
                  fetchPriority="high"
                />
                <div className="absolute -bottom-4 -left-4 glass rounded-2xl px-4 py-3 shadow-card">
                  <div className="text-xs text-muted-foreground">Aktuell</div>
                  <div className="text-sm font-semibold">2 Slots Q2 2025</div>
                </div>
                <div className="absolute -top-4 -right-4 glass rounded-2xl px-4 py-3 shadow-card">
                  <div className="text-xs text-muted-foreground">Ø Lieferzeit</div>
                  <div className="text-sm font-semibold">14 Tage</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
