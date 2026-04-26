import { useState } from "react";
import { ArrowRight, Mail, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

const Contact = () => {
  const [loading, setLoading] = useState(false);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast.success("Nachricht gesendet!", {
        description: "Wir melden uns innerhalb von 24h bei dir.",
      });
      (e.target as HTMLFormElement).reset();
    }, 800);
  };

  return (
    <section id="contact" className="py-24 md:py-32 relative">
      <div className="container">
        <div className="relative glass rounded-3xl overflow-hidden p-8 md:p-14 shadow-elegant">
          <div className="absolute -top-32 -right-32 h-72 w-72 rounded-full bg-primary/30 blur-[120px]" />
          <div className="absolute -bottom-32 -left-32 h-72 w-72 rounded-full bg-accent/25 blur-[120px]" />

          <div className="relative grid lg:grid-cols-2 gap-12 items-start">
            <div>
              <div className="text-sm font-medium text-accent mb-4 tracking-widest uppercase">
                Lass uns reden
              </div>
              <h2 className="font-display text-4xl md:text-5xl font-semibold tracking-tight text-balance">
                Bereit für deine{" "}
                <span className="text-gradient">neue Website?</span>
              </h2>
              <p className="mt-5 text-lg text-muted-foreground max-w-md">
                Erzähl uns kurz von deinem Projekt — wir melden uns innerhalb von
                24 Stunden mit einer ehrlichen Einschätzung.
              </p>

              <div className="mt-10 space-y-4">
                <a
                  href="mailto:hallo@webunics.com"
                  className="flex items-center gap-3 text-muted-foreground hover:text-foreground transition-smooth group"
                >
                  <span className="h-10 w-10 rounded-xl glass flex items-center justify-center group-hover:bg-iridescent transition-smooth">
                    <Mail size={16} />
                  </span>
                  hallo@webunics.com
                </a>
                <div className="flex items-center gap-3 text-muted-foreground">
                  <span className="h-10 w-10 rounded-xl glass flex items-center justify-center">
                    <MapPin size={16} />
                  </span>
                  Remote · Europa
                </div>
              </div>
            </div>

            <form onSubmit={onSubmit} className="space-y-5">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name" className="text-sm">
                    Name
                  </Label>
                  <Input
                    id="name"
                    required
                    placeholder="Dein Name"
                    className="mt-2 bg-secondary/40 border-border/60 h-12"
                  />
                </div>
                <div>
                  <Label htmlFor="email" className="text-sm">
                    E-Mail
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    required
                    placeholder="dich@firma.de"
                    className="mt-2 bg-secondary/40 border-border/60 h-12"
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="company" className="text-sm">
                  Unternehmen
                </Label>
                <Input
                  id="company"
                  placeholder="Optional"
                  className="mt-2 bg-secondary/40 border-border/60 h-12"
                />
              </div>
              <div>
                <Label htmlFor="message" className="text-sm">
                  Worum geht's?
                </Label>
                <Textarea
                  id="message"
                  required
                  placeholder="Erzähl uns kurz von deinem Projekt..."
                  className="mt-2 bg-secondary/40 border-border/60 min-h-32"
                />
              </div>
              <Button
                type="submit"
                variant="iridescent"
                size="lg"
                className="w-full"
                disabled={loading}
              >
                {loading ? "Wird gesendet…" : "Anfrage senden"}
                <ArrowRight size={18} className="ml-1" />
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
