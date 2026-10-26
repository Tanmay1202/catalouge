import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { BRAND_NAME } from '../../config/constants';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { Lock, ArrowLeft, ShieldCheck } from 'lucide-react';
import { isSupabaseConfigured } from '../../config/supabase';

export const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Determine redirect target (default to /admin)
  const from = (location.state as { from?: { pathname: string } })?.from?.pathname || '/admin';

  // If already logged in, redirect
  React.useEffect(() => {
    if (isAuthenticated) {
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, navigate, from]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      await login(email, password);
      navigate(from, { replace: true });
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Invalid credentials. Please try again.';
      setError(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-cream flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center space-y-3">
        <Link
          to="/"
          className="text-2xl font-bold tracking-tight text-[#2B1A15] inline-block hover:text-[#C47A53] transition-colors"
        >
          {BRAND_NAME}
        </Link>
        <h2 className="text-lg font-semibold text-zinc-800">
          Admin Sign In
        </h2>
        <p className="text-xs text-zinc-500">
          Catalogue management console
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-6 shadow-xs border border-zinc-200 rounded-lg sm:px-10 space-y-6">
          {!isSupabaseConfigured && (
            <div className="p-3.5 rounded-lg bg-amber-50 border border-amber-200 text-xs text-amber-950 space-y-1">
              <p className="font-semibold flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-amber-700" />
                Dev Mode Active
              </p>
              <p className="text-amber-900/90">
                Supabase credentials not yet configured in <code className="font-mono">.env.local</code>. Use demo admin credentials:
              </p>
              <p className="font-mono text-[11px] pt-1">
                <strong>Email:</strong> admin@ziba.com<br />
                <strong>Password:</strong> admin123
              </p>
            </div>
          )}

          {error && (
            <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-xs text-red-700 font-medium">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Admin Email"
              type="email"
              autoComplete="email"
              required
              placeholder="admin@ziba.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <Input
              label="Password"
              type="password"
              autoComplete="current-password"
              required
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <div className="pt-2">
              <Button
                type="submit"
                variant="primary"
                className="w-full"
                isLoading={isSubmitting}
                leftIcon={<Lock className="w-4 h-4" />}
              >
                Sign In
              </Button>
            </div>
          </form>

          <div className="pt-4 border-t border-brand-border text-center">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-xs font-medium text-warm-gray hover:text-brand-brown transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Storefront</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
