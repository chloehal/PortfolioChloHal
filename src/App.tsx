import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Moi from "./pages/Moi";
import Experience from "./pages/Experience";
import Bookmarks from "./pages/Bookmarks";
import Laboratoire from "./pages/Laboratoire";
import Blog from "./pages/Blog";

import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Moi />} />
            <Route path="/experience" element={<Experience />} />
            <Route path="/bookmarks" element={<Bookmarks />} />
            <Route path="/laboratoire" element={<Laboratoire />} />
            <Route path="/blog" element={<Blog />} />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
