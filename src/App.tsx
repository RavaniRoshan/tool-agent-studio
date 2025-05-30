
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Pages
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/auth/LoginPage";
import SignupPage from "./pages/auth/SignupPage";
import NotFound from "./pages/NotFound";

// Dashboard
import DashboardLayout from "./components/layout/DashboardLayout";
import DashboardHome from "./pages/dashboard/DashboardHome";
import AgentsPage from "./pages/dashboard/AgentsPage";
import WorkflowsPage from "./pages/dashboard/WorkflowsPage";
import WorkflowBuilder from "./pages/dashboard/WorkflowBuilder";
import ToolsPage from "./pages/dashboard/ToolsPage";
import CollaborationPage from "./pages/dashboard/CollaborationPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          
          {/* Dashboard Routes */}
          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route index element={<DashboardHome />} />
            <Route path="agents" element={<AgentsPage />} />
            <Route path="workflows" element={<WorkflowsPage />} />
            <Route path="workflows/create" element={<WorkflowBuilder />} />
            <Route path="workflows/:id" element={<WorkflowBuilder />} />
            <Route path="tools" element={<ToolsPage />} />
            <Route path="collaboration" element={<CollaborationPage />} />
            {/* Add more dashboard routes as needed */}
          </Route>
          
          {/* Catch-all route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
