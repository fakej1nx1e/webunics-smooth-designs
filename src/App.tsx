import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index.tsx";
import NotFound from "./pages/NotFound.tsx";
import { AdminPanel } from "./components/AdminPanel";
import { CustomCursor } from "./components/CustomCursor";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const queryClient = new QueryClient();

const RedirectHandler = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    const redirect = sessionStorage.getItem('redirect');
    if (redirect) {
      sessionStorage.removeItem('redirect');
      // Entferne den Basename vom Pfad
      const path = redirect.startsWith('/webunics') ? redirect.slice('/webunics'.length) : redirect;
      navigate(path, { replace: true });
    }
  }, [navigate]);

  return null;
};

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter basename="/webunics">
          <RedirectHandler />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/admin" element={<AdminPanel />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
          
          <CustomCursor />
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
