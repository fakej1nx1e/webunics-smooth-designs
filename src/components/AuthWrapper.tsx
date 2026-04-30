import { useState, useEffect } from "react";

const ADMIN_PASSWORD = "webunics1983!?";
const AUTH_KEY = "webunics_admin_auth";

interface AuthWrapperProps {
  children: React.ReactNode;
}

export const AuthWrapper = ({ children }: AuthWrapperProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const auth = localStorage.getItem(AUTH_KEY);
    if (auth === "true") {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      localStorage.setItem(AUTH_KEY, "true");
      setIsAuthenticated(true);
      setError("");
    } else {
      setError("Wrong password");
      setPassword("");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem(AUTH_KEY);
    setIsAuthenticated(false);
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
              <p className="mt-4 text-muted-foreground">Admin Area</p>
            </div>

            <div className="glass rounded-3xl p-8 shadow-elegant">
              <form onSubmit={handleLogin}>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter password"
                  className="w-full px-4 py-3 rounded-xl bg-background/50 border-border focus:border-primary focus:outline-none transition-colors mb-4"
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
    <div>
      <button
        onClick={() => {
          localStorage.removeItem(AUTH_KEY);
          window.location.reload();
        }}
        className="fixed top-4 right-4 z-[9999] glass px-4 py-2 rounded-xl text-sm cursor-pointer hover:opacity-80 transition-opacity bg-background/80 backdrop-blur-sm border border-border"
        type="button"
        style={{ position: 'fixed', zIndex: 9999, pointerEvents: 'auto' }}
      >
        Logout
      </button>
      {children}
    </div>
  );
};
