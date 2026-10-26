// src/pages/public/NotFoundPage.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../../components/ui/Button';
import { ArrowLeft, Home } from 'lucide-react';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4 py-16">
      <div className="max-w-md w-full text-center space-y-4">
        <p className="text-xs uppercase font-semibold tracking-wider text-[#D46A7E]">404 Error</p>
        <h1 className="text-2xl sm:text-3xl font-bold text-zinc-900">
          Page Not Found
        </h1>
        <p className="text-xs sm:text-sm text-zinc-500">
          The page you are looking for may have been moved or does not exist.
        </p>
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link to="/" className="w-full sm:w-auto">
            <Button variant="primary" leftIcon={<Home className="w-4 h-4" />}>
              Return Home
            </Button>
          </Link>
          <Link to="/products" className="w-full sm:w-auto">
            <Button variant="secondary" leftIcon={<ArrowLeft className="w-4 h-4" />}>
              View Catalogue
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};
