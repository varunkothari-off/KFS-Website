import { useAuth } from "@/hooks/useAuth";
import { useLocation } from "wouter";
import { useEffect, ReactNode } from "react";

interface ProtectedRouteProps {
  children: ReactNode;
  requireProfileComplete?: boolean;
}

export default function ProtectedRoute({ children, requireProfileComplete = true }: ProtectedRouteProps) {
  const { user, isAuthenticated } = useAuth();
  const [, setLocation] = useLocation();

  useEffect(() => {
    if (!isAuthenticated) {
      setLocation("/login");
      return;
    }

    if (requireProfileComplete && user && !user.isProfileComplete) {
      setLocation("/complete-profile");
      return;
    }
  }, [isAuthenticated, user, requireProfileComplete, setLocation]);

  if (!isAuthenticated) {
    return null;
  }

  if (requireProfileComplete && user && !user.isProfileComplete) {
    return null;
  }

  return <>{children}</>;
}