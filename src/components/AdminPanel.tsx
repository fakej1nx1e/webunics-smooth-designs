import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const LOCAL_SERVER_URL = "http://localhost:3001";
const ADMIN_PASSWORD = "webunics1983!?";
const AUTH_KEY = "webunics_admin_auth";

interface Inquiry {
  timestamp: string;
  name: string;
  email: string;
  company: string;
  message: string;
}

export const AdminPanel = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const auth = localStorage.getItem(AUTH_KEY);
    if (auth === "true") {
      setIsAuthenticated(true);
    }
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      fetch(`${LOCAL_SERVER_URL}/inquiries`)
        .then((res) => res.json())
        .then((data) => {
          setInquiries(data);
          setLoading(false);
        })
        .catch(() => {
          const stored = JSON.parse(localStorage.getItem("webunics_inquiries") || "[]");
          setInquiries(stored);
          setLoading(false);
        });
    }
  }, [isAuthenticated]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      localStorage.setItem(AUTH_KEY, "true");
      setIsAuthenticated(true);
      setError("");
    } else {
      setError("Falsches Passwort");
      setPassword("");
    }
  };

  const handleDelete = async (index: number) => {
    const updatedInquiries = inquiries.filter((_, i) => i !== index);
    setInquiries(updatedInquiries);
    localStorage.setItem("webunics_inquiries", JSON.stringify(updatedInquiries));

    try {
      await fetch(`${LOCAL_SERVER_URL}/inquiries/${index}`, { method: "DELETE" });
    } catch (error) {
      console.error("Fehler beim Löschen:", error);
    }
  };

  const handleDeleteAll = async () => {
    setInquiries([]);
    localStorage.setItem("webunics_inquiries", JSON.stringify([]));
    try {
      await fetch(`${LOCAL_SERVER_URL}/inquiries`, { method: "DELETE" });
    } catch (error) {
      console.error("Fehler beim Löschen aller Anfragen:", error);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen relative overflow-x-hidden flex items-center justify-center">
        <div className="absolute inset-0 grid-pattern opacity-40 [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]" />
        <div className="absolute -top-40 -left-40 h-96 w-96 rounded-full bg-primary/30 blur-[140px] animate-glow-pulse" />
        <div className="absolute -bottom-40 -right-40 h-96 w-96 rounded-full bg-accent/25 blur-[140px] animate-glow-pulse" style={{ animationDelay: "1.5s" }} />

        <div className="container relative animate-fade-in-slow">
          <div className="max-w-md mx-auto">
            <div className="text-center mb-8">
              <h1 className="font-display text-5xl font-semibold leading-[1.05] tracking-tight text-gradient bg-[length:200%_auto] animate-gradient-shift">
                Webunics
              </h1>
              <p className="mt-4 text-muted-foreground">Admin Bereich</p>
            </div>

            <div className="glass rounded-3xl p-8 shadow-elegant">
              <form onSubmit={handleLogin}>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Passwort eingeben"
                  className="w-full px-4 py-3 rounded-xl bg-background/50 border border-border focus:border-primary focus:outline-none transition-colors mb-4"
                  autoFocus
                />
                {error && <p className="text-red-500 text-sm mb-4 text-center">{error}</p>}
                <button
                  type="submit"
                  className="w-full bg-iridescent text-white py-3 rounded-xl font-medium hover:opacity-90 transition-opacity"
                >
                  Login
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative overflow-x-hidden py-24">
      <div className="absolute inset-0 grid-pattern opacity-40 [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]" />
      <div className="absolute -top-40 -left-40 h-96 w-96 rounded-full bg-primary/30 blur-[140px] animate-glow-pulse" />
      <div className="absolute -bottom-40 -right-40 h-96 w-96 rounded-full bg-accent/25 blur-[140px] animate-glow-pulse" style={{ animationDelay: "1.5s" }} />

      <div className="container relative">
        <button
          onClick={() => navigate("/")}
          className="mb-8 glass px-4 py-2 rounded-xl text-sm cursor-pointer hover:opacity-80 transition-opacity inline-flex items-center gap-2"
        >
          ← Zurück zur Homepage
        </button>

        <h1 className="font-display text-5xl font-semibold text-center mb-4 text-gradient bg-[length:200%_auto] animate-gradient-shift">
          Anfragen
        </h1>
        <p className="text-center text-muted-foreground mb-12">Alle eingegangenen Kontaktanfragen</p>

        {loading ? (
          <p className="text-center text-muted-foreground">Lade Anfragen...</p>
        ) : inquiries.length === 0 ? (
          <p className="text-center text-muted-foreground glass rounded-3xl p-8">Noch keine Anfragen eingegangen.</p>
        ) : (
          <>
            <div className="flex justify-end mb-6">
              <button
                onClick={handleDeleteAll}
                className="glass px-4 py-2 rounded-xl text-sm text-red-500 hover:bg-red-500/10 transition-colors cursor-pointer"
              >
                Alle löschen
              </button>
            </div>
            <div className="space-y-5 max-w-4xl mx-auto">
              {inquiries.map((inq, index) => (
                <div key={index} className="glass rounded-3xl p-6 shadow-elegant relative">
                  <button
                    onClick={() => handleDelete(index)}
                    className="absolute top-4 right-4 text-muted-foreground hover:text-red-500 transition-colors cursor-pointer"
                  >
                    ✕
                  </button>
                  <div className="flex flex-wrap justify-between items-start gap-4 mb-4">
                    <div>
                      <h3 className="font-display text-xl font-semibold">{inq.name}</h3>
                      <a href={`mailto:${inq.email}`} className="text-sm text-accent hover:underline">
                        {inq.email}
                      </a>
                    </div>
                    <div className="text-right">
                      {inq.company && <div className="text-sm text-muted-foreground">{inq.company}</div>}
                      <div className="text-xs text-muted-foreground mt-1">{inq.timestamp}</div>
                    </div>
                  </div>
                  <p className="text-muted-foreground leading-relaxed">{inq.message}</p>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};
