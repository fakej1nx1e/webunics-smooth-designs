import { useState, useRef } from "react";
import { ArrowRight, Mail, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { motion, useSpring, useTransform } from "framer-motion";

const LOCAL_SERVER_URL = "http://localhost:3001";

const Contact = () => {
  const [loading, setLoading] = useState(false);
  const [hearts, setHearts] = useState<{ id: number; x: number; delay: number }[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseX = useSpring(0, { stiffness: 300, damping: 30 });
  const mouseY = useSpring(0, { stiffness: 300, damping: 30 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const rotateX = useTransform(mouseY, [-0.5, 0.5], [5, -5]);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], [-5, 5]);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      company: formData.get("company"),
      message: formData.get("message"),
    };

    const newInquiry = {
      timestamp: new Date().toLocaleString("de-DE"),
      name: data.name,
      email: data.email,
      company: data.company || "",
      message: data.message,
    };

    const existing = JSON.parse(
      localStorage.getItem("webunics_inquiries") || "[]",
    );
    existing.push(newInquiry);
    localStorage.setItem("webunics_inquiries", JSON.stringify(existing));

    try {
      await fetch(`${LOCAL_SERVER_URL}/inquiries`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newInquiry),
      });
    } catch (error) {
      console.error("Fehler beim Senden an Server:", error);
    }

    toast.success("Nachricht gesendet!", {
      description: "Wir melden uns innerhalb von 24h bei dir.",
    });
    form.reset();
    setLoading(false);

    const newHearts = Array.from({ length: 10 }, (_, i) => ({
      id: Date.now() + i,
      x: Math.random() * 100,
      delay: Math.random() * 0.2,
    }));
    setHearts(newHearts);
    setTimeout(() => setHearts([]), 1500);
  };

  return (
    <section id="contact" className="py-24 md:py-32 relative">
      <div className="container">
        <div style={{ perspective: "1000px" }}>
          <motion.div
            ref={containerRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={() => {
              mouseX.set(0);
              mouseY.set(0);
            }}
            className="relative glass rounded-3xl overflow-hidden p-8 md:p-14 shadow-elegant"
            style={{ rotateX, rotateY }}
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
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
                  Erzähl uns kurz von deinem Projekt — wir melden uns innerhalb
                  von 24 Stunden mit einer ehrlichen Einschätzung.
                </p>

                <div className="mt-10 space-y-4">
                  <a
                    href="mailto:webunics.cl@gmail.com"
                    className="flex items-center gap-3 text-muted-foreground hover:text-foreground transition-smooth group"
                  >
                    <span className="h-10 w-10 rounded-xl glass flex items-center justify-center group-hover:bg-iridescent transition-smooth">
                      <Mail size={16} />
                    </span>
                    webunics.cl@gmail.com
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
                      name="name"
                      required
                      placeholder="Dein Name"
                      className="mt-2 w-full bg-secondary/40 border-border/60 h-12 px-3 rounded-md focus:outline-none focus:border-primary focus:opacity-100 opacity-70 transition-opacity duration-300"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email" className="text-sm">
                      E-Mail
                    </Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      required
                      placeholder="dich@firma.de"
                      className="mt-2 w-full bg-secondary/40 border-border/60 h-12 px-3 rounded-md focus:outline-none focus:border-primary focus:opacity-100 opacity-70 transition-opacity duration-300"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="company" className="text-sm">
                    Unternehmen
                  </Label>
                  <Input
                    id="company"
                    name="company"
                    placeholder="Optional"
                    className="mt-2 w-full bg-secondary/40 border-border/60 h-12 px-3 rounded-md focus:outline-none focus:border-primary focus:opacity-100 opacity-70 transition-opacity duration-300"
                  />
                </div>
                <div>
                  <Label htmlFor="message" className="text-sm">
                    Worum geht's?
                  </Label>
                  <Textarea
                    id="message"
                    name="message"
                    required
                    placeholder="Erzähl uns kurz von deinem Projekt..."
                    className="mt-2 w-full bg-secondary/40 border-border/60 min-h-32 p-3 rounded-md focus:outline-none focus:border-primary focus:opacity-100 opacity-70 transition-opacity duration-300"
                  />
                </div>
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
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
                </motion.div>
              </form>
            </div>
            {hearts.map((heart) => (
              <motion.div
                key={heart.id}
                className="absolute bottom-0 text-2xl pointer-events-none"
                style={{ left: `${heart.x}%` }}
                initial={{ y: 0, opacity: 1 }}
                animate={{
                  y: -200 - Math.random() * 150,
                  x: (Math.random() - 0.5) * 300,
                  opacity: 0,
                }}
                transition={{ duration: 1.5, delay: heart.delay, ease: "easeOut" }}
              >
                ❤️
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
