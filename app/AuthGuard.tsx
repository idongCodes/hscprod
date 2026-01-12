"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "./AuthProvider";

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { isAuthenticated, isLoading } = useAuth();

  console.log('AuthGuard - isAuthenticated:', isAuthenticated, 'isLoading:', isLoading);

  useEffect(() => {
    console.log('AuthGuard useEffect - isAuthenticated:', isAuthenticated, 'isLoading:', isLoading);
    if (!isLoading && !isAuthenticated) {
      console.log('AuthGuard - Redirecting to home');
      router.push('/');
    }
  }, [isAuthenticated, isLoading, router]);

  // Show loading state while checking authentication
  if (isLoading || !isAuthenticated) {
    console.log('AuthGuard - Showing loading state');
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Checking authentication...</p>
        </div>
      </div>
    );
  }

  console.log('AuthGuard - Showing children');
  // Show children if authenticated
  return <>{children}</>;
}
