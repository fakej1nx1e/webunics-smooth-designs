import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { AuthWrapper } from "./components/AuthWrapper";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <AuthWrapper>
    <App />
  </AuthWrapper>
);
