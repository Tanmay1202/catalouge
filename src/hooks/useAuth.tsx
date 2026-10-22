import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { AdminUser, getCurrentAdmin, signInAdmin, signOutAdmin } from '../lib/auth';
import { supabase, isSupabaseConfigured } from '../config/supabase';

interface AuthContextType {
  admin: AdminUser | null;
  isLoading: boolean;
  login: (email: string, pass: string) => Promise<AdminUser>;
  logout: () => Promise<void>;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [admin, setAdmin] = useState<AdminUser | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Check auth state on mount
  useEffect(() => {
    let isMounted = true;

    async function checkAuth() {
      try {
        const current = await getCurrentAdmin();
        if (isMounted) {
          setAdmin(current);
        }
      } catch (err) {
        console.warn('Error verifying admin auth session:', err);
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    checkAuth();

    // Listen to Supabase auth changes if configured
    if (isSupabaseConfigured && supabase) {
      const {
        data: { subscription },
      } = supabase.auth.onAuthStateChange(async (_event, session) => {
        if (session?.user && session.user.app_metadata?.role === 'admin') {
          setAdmin({
            id: session.user.id,
            email: session.user.email || '',
            role: 'admin',
          });
        } else {
          setAdmin(null);
        }
        setIsLoading(false);
      });

      return () => {
        isMounted = false;
        subscription.unsubscribe();
      };
    }

    return () => {
      isMounted = false;
    };
  }, []);

  const login = useCallback(async (email: string, pass: string) => {
    setIsLoading(true);
    try {
      const user = await signInAdmin(email, pass);
      setAdmin(user);
      return user;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const logout = useCallback(async () => {
    setIsLoading(true);
    try {
      await signOutAdmin();
      setAdmin(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        admin,
        isLoading,
        login,
        logout,
        isAuthenticated: Boolean(admin),
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth(): AuthContextType {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return ctx;
}
