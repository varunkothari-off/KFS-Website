import { useQuery } from "@tanstack/react-query";
import { useLocation } from "wouter";
import { useEffect } from "react";
import { apiRequest } from "@/lib/queryClient";

export function useAuth() {
  const { data: user, isLoading, error } = useQuery({
    queryKey: ["/api/auth/user"],
    queryFn: async () => {
      const token = localStorage.getItem("authToken");
      if (!token) {
        throw new Error("No auth token");
      }
      const response = await apiRequest("GET", "/api/auth/user", null, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      if (!response.ok) {
        throw new Error("Not authenticated");
      }
      const data = await response.json();
      return data.user;
    },
    retry: false,
  });

  return {
    user,
    isLoading,
    isAuthenticated: !!user && !error,
  };
}

export function useRequireAuth() {
  const { isAuthenticated, isLoading } = useAuth();
  const [, setLocation] = useLocation();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      // Store the current path to redirect back after login
      const currentPath = window.location.pathname;
      localStorage.setItem("redirectAfterLogin", currentPath);
      setLocation("/login");
    }
  }, [isAuthenticated, isLoading, setLocation]);

  return { isAuthenticated, isLoading };
}