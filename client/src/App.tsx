import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Home from "./pages/home";
import LoanApplication from "./pages/loan-application";
import Consultation from "./pages/consultation";
import ApplicationStatus from "./pages/application-status";
import Login from "./pages/login";
import Register from "./pages/register";
import Dashboard from "./pages/dashboard";
import ComprehensiveDashboard from "./pages/comprehensive-dashboard";
import DocumentUpload from "./pages/document-upload";
import PrivacyPolicy from "./pages/privacy-policy";
import TermsOfService from "./pages/terms-of-service";
import MumbaiPage from "./pages/locations/mumbai";
import DelhiPage from "./pages/locations/delhi";
import BangalorePage from "./pages/locations/bangalore";
import KolkataPage from "./pages/locations/kolkata";
import NotFound from "./pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />
      <Route path="/document-upload" component={DocumentUpload} />
      <Route path="/dashboard" component={ComprehensiveDashboard} />
      <Route path="/dashboard-old" component={Dashboard} />
      <Route path="/loan-application" component={LoanApplication} />
      <Route path="/consultation" component={Consultation} />
      <Route path="/application-status/:id?" component={ApplicationStatus} />
      <Route path="/locations/mumbai" component={MumbaiPage} />
      <Route path="/locations/delhi" component={DelhiPage} />
      <Route path="/locations/bangalore" component={BangalorePage} />
      <Route path="/locations/kolkata" component={KolkataPage} />
      <Route path="/privacy-policy" component={PrivacyPolicy} />
      <Route path="/terms-of-service" component={TermsOfService} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
