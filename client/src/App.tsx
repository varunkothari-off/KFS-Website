import { Suspense, lazy } from "react";
import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";

const Home = lazy(() => import("./pages/home"));
const LoanApplication = lazy(() => import("./pages/loan-application"));
const Consultation = lazy(() => import("./pages/consultation"));
const ApplicationStatus = lazy(() => import("./pages/application-status"));
const Login = lazy(() => import("./pages/login"));
const Register = lazy(() => import("./pages/register"));
const Dashboard = lazy(() => import("./pages/dashboard"));
const ComprehensiveDashboard = lazy(
  () => import("./pages/comprehensive-dashboard"),
);
const DocumentUpload = lazy(() => import("./pages/document-upload"));
const PrivacyPolicy = lazy(() => import("./pages/privacy-policy"));
const TermsOfService = lazy(() => import("./pages/terms-of-service"));
const MumbaiPage = lazy(() => import("./pages/locations/mumbai"));
const DelhiPage = lazy(() => import("./pages/locations/delhi"));
const BangalorePage = lazy(() => import("./pages/locations/bangalore"));
const KolkataPage = lazy(() => import("./pages/locations/kolkata"));
const NotFound = lazy(() => import("./pages/not-found"));

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
        <Suspense fallback={<div>Loading...</div>}>
          <Router />
        </Suspense>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
