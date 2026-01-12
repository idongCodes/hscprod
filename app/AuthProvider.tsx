"use client";

import { createContext, useContext, useEffect, useState, ReactNode, useCallback, useRef } from "react";

interface AuthContextType {
  isAuthenticated: boolean;
  isLoading: boolean;
  login: () => void;
  logout: () => void;
  updateActivity: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [lastActivity, setLastActivity] = useState<number>(() => Date.now());
  const logoutTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Memoized logout function to prevent recreation
  const logout = useCallback(() => {
    setIsAuthenticated(false);
    setLastActivity(Date.now());
    
    // Clear session data
    localStorage.removeItem('adminSession');
    localStorage.removeItem('adminAuthenticated');
    
    // Clear timer
    if (logoutTimerRef.current) {
      clearTimeout(logoutTimerRef.current);
      logoutTimerRef.current = null;
    }
    
    // Redirect to home
    window.location.href = '/';
  }, []);

  // Memoized update activity function
  const updateActivity = useCallback(() => {
    if (isAuthenticated) {
      setLastActivity(Date.now());
    }
  }, [isAuthenticated]);

  // Memoized login function
  const login = useCallback(() => {
    const now = Date.now();
    console.log('Login called at:', now);
    
    setIsAuthenticated(true);
    setLastActivity(now);
    
    // Store session data
    const sessionData = {
      loginTime: now,
      lastActivity: now
    };
    
    console.log('Saving session data:', sessionData);
    localStorage.setItem('adminSession', JSON.stringify(sessionData));
    localStorage.setItem('adminAuthenticated', 'true');
    
    console.log('Session saved to localStorage');
  }, []);

  // Check for existing session on mount
  useEffect(() => {
    const sessionData = localStorage.getItem('adminSession');
    console.log('Checking session data:', sessionData);
    
    if (sessionData) {
      const { loginTime, lastActivity: storedActivity } = JSON.parse(sessionData);
      const now = Date.now();
      
      console.log('Session data:', { loginTime, storedActivity, now });
      
      // Check if session is still valid (not expired and not inactive for 10 mins)
      const sessionAge = now - loginTime;
      const inactiveTime = now - storedActivity;
      
      console.log('Time checks:', { sessionAge, inactiveTime, sessionAgeLimit: 24 * 60 * 60 * 1000, inactiveLimit: 10 * 60 * 1000 });
      
      if (inactiveTime < 10 * 60 * 1000 && sessionAge < 24 * 60 * 60 * 1000) {
        console.log('Session valid, setting authenticated');
        setIsAuthenticated(true);
        setLastActivity(storedActivity);
      } else {
        console.log('Session expired, cleaning up');
        // Session expired, clean up
        localStorage.removeItem('adminSession');
        localStorage.removeItem('adminAuthenticated');
      }
    }
    
    // Always set loading to false after checking
    setIsLoading(false);
  }, []);

  // Auto-logout timer
  useEffect(() => {
    if (isAuthenticated) {
      logoutTimerRef.current = setTimeout(() => {
        logout();
      }, 10 * 60 * 1000); // 10 minutes
    }

    return () => {
      if (logoutTimerRef.current) {
        clearTimeout(logoutTimerRef.current);
        logoutTimerRef.current = null;
      }
    };
  }, [isAuthenticated, logout]);

  // Activity tracking
  useEffect(() => {
    const handleActivity = () => {
      updateActivity();
    };

    // Track various user activities
    const events = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart', 'click'];
    events.forEach(event => {
      document.addEventListener(event, handleActivity);
    });

    // Cleanup on unmount
    return () => {
      events.forEach(event => {
        document.removeEventListener(event, handleActivity);
      });
    };
  }, [updateActivity]);

  // Update session storage when activity changes
  useEffect(() => {
    if (isAuthenticated) {
      const sessionData = {
        loginTime: Date.now(),
        lastActivity: lastActivity
      };
      localStorage.setItem('adminSession', JSON.stringify(sessionData));
    }
  }, [isAuthenticated, lastActivity]);

  return (
    <AuthContext.Provider value={{ isAuthenticated, isLoading, login, logout, updateActivity }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
