import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../../components/ui/Button';
import { ArrowLeft, Home } from 'lucide-react';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4 py-16">
      <div className="max-w-md w-full text-center space-y-5">
        <p className="font-mono text-sm uppercase tracking-widest text-warm-gray">404 Error</p>
        <h1 className="font-serif text-3xl sm:text-4xl font-medium text-brand-dark">
          Page Not Found
        </h1>
        <p className="text-sm text-warm-gray">
          The page you are looking for may have been moved or does not exist.
        </p>
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link to="/" className="w-full sm:w-auto">
            <Button variant="primary" leftIcon={<Home className="w-4 h-4" />}>
              Return Home
            </Button>
          </Link>
          <Link to="/products" className="w-full sm:w-auto">
            <Button variant="outline" leftIcon={<ArrowLeft className="w-4 h-4" />}>
              View Catalogue
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};
