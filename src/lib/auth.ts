import { supabase, isSupabaseConfigured } from '../config/supabase';

export interface AdminUser {
  id: string;
  email: string;
  role: 'admin';
}

const MOCK_AUTH_STORAGE_KEY = 'aurelle_mock_admin_session';

/**
 * Sign in with email and password
 */
export async function signInAdmin(email: string, password: string): Promise<AdminUser> {
  const cleanEmail = email.trim().toLowerCase();

  if (isSupabaseConfigured && supabase) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: cleanEmail,
      password,
    });

    if (error) {
      throw error;
    }

    const user = data.user;
    const role = user?.app_metadata?.role;

    // Security check: Only allow users with app_metadata.role === 'admin'
    if (role !== 'admin') {
      await supabase.auth.signOut();
      throw new Error(
        'Access denied. This account does not have administrator privileges.'
      );
    }

    return {
      id: user.id,
      email: user.email || cleanEmail,
      role: 'admin',
    };
  }

  // Fallback for dev / testing prior to setting up Supabase
  if (cleanEmail === 'admin@aurelle.com' && password === 'admin123') {
    const mockUser: AdminUser = {
      id: 'mock-admin-uuid-001',
      email: cleanEmail,
      role: 'admin',
    };
    sessionStorage.setItem(MOCK_AUTH_STORAGE_KEY, JSON.stringify(mockUser));
    return mockUser;
  }

  throw new Error('Invalid email or password. (Dev hint: use admin@aurelle.com / admin123)');
}

/**
 * Sign out administrator
 */
export async function signOutAdmin(): Promise<void> {
  if (isSupabaseConfigured && supabase) {
    await supabase.auth.signOut();
  }
  sessionStorage.removeItem(MOCK_AUTH_STORAGE_KEY);
}

/**
 * Get the current administrator session if valid
 */
export async function getCurrentAdmin(): Promise<AdminUser | null> {
  if (isSupabaseConfigured && supabase) {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session || !session.user) return null;

    if (session.user.app_metadata?.role === 'admin') {
      return {
        id: session.user.id,
        email: session.user.email || '',
        role: 'admin',
      };
    }
    return null;
  }

  try {
    const raw = sessionStorage.getItem(MOCK_AUTH_STORAGE_KEY);
    if (raw) {
      return JSON.parse(raw);
    }
  } catch {
    // Ignore parse error
  }
  return null;
}
