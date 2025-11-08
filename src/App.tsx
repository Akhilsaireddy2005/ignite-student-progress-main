import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import StudentDashboard from "./pages/StudentDashboard";
import StudentLeaderboard from "./pages/StudentLeaderboard";
import StudentReports from "./pages/StudentReports";
import FacultyDashboard from "./pages/FacultyDashboard";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/student/dashboard" element={<StudentDashboard />} />
          <Route path="/student/leaderboard" element={<StudentLeaderboard />} />
          <Route path="/student/reports" element={<StudentReports />} />
          <Route path="/faculty/dashboard" element={<FacultyDashboard />} />
          <Route path="/faculty/students" element={<FacultyDashboard />} />
          <Route path="/faculty/reports" element={<StudentReports />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
