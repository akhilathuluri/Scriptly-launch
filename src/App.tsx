import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ConvexProvider } from "convex/react";
import { HelmetProvider } from "react-helmet-async";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import CustomCursor from "@/components/CustomCursor";
import { initConvexClient } from "@/lib/convex";
import Index from "./pages/Index.tsx";
import NotFound from "./pages/NotFound.tsx";
import PrivacyPolicy from "./pages/PrivacyPolicy.tsx";
import Issues from "./pages/Issues.tsx";
import FAQs from "./pages/FAQs.tsx";
import Download from "./pages/Download.tsx";
import DownloadStarted from "./pages/DownloadStarted.tsx";
import Why from "./pages/Why.tsx";
import WatchVideos from "./pages/WatchVideos.tsx";
import Uninstall from "./pages/Uninstall.tsx";
import Terms from "./pages/Terms.tsx";
import Changelog from "./pages/Changelog.tsx";

const queryClient = new QueryClient();
const convex = initConvexClient();

const App = () => (
  <HelmetProvider>
    <ConvexProvider client={convex}>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <CustomCursor />
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />
              <Route path="/issues" element={<Issues />} />
              <Route path="/faqs" element={<FAQs />} />
              <Route path="/why" element={<Why />} />
              <Route path="/watch-videos" element={<WatchVideos />} />
              <Route path="/download" element={<Download />} />
              <Route path="/download-started" element={<DownloadStarted />} />
              <Route path="/uninstall" element={<Uninstall />} />
              <Route path="/terms" element={<Terms />} />
              <Route path="/changelog" element={<Changelog />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </QueryClientProvider>
    </ConvexProvider>
  </HelmetProvider>
);

export default App;
