import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import StickyHeader from "@/components/sticky-header";
import Home from "./pages/home";
import LoanApplication from "./pages/loan-application";
import Consultation from "./pages/consultation";
import ApplicationStatus from "./pages/application-status";
import LoginPage from "./pages/login";
import CompleteProfilePage from "./pages/complete-profile";
import PrivacyPolicy from "./pages/privacy-policy";
import TermsOfService from "./pages/terms-of-service";
import NotFound from "./pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/login" component={LoginPage} />
      <Route path="/complete-profile" component={CompleteProfilePage} />
      <Route path="/loan-application" component={LoanApplication} />
      <Route path="/consultation" component={Consultation} />
      <Route path="/application-status/:id?" component={ApplicationStatus} />
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
        <StickyHeader />
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
