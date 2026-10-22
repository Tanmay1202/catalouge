import { createBrowserRouter, Navigate } from 'react-router-dom';
import { PublicLayout } from '../components/layout/PublicLayout';
import { AdminLayout } from '../components/layout/AdminLayout';
import { AdminRoute } from './AdminRoute';

// Public Pages
import { HomePage } from '../pages/public/HomePage';
import { ProductsPage } from '../pages/public/ProductsPage';
import { ProductDetailPage } from '../pages/public/ProductDetailPage';
import { NotFoundPage } from '../pages/public/NotFoundPage';

// Admin Pages
import { LoginPage } from '../pages/admin/LoginPage';
import { AdminProductsPage } from '../pages/admin/AdminProductsPage';
import { AdminProductFormPage } from '../pages/admin/AdminProductFormPage';

export const router = createBrowserRouter([
  // Public Storefront Routes
  {
    path: '/',
    element: <PublicLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'products', element: <ProductsPage /> },
      { path: 'products/:productCode', element: <ProductDetailPage /> },
      { path: '404', element: <NotFoundPage /> },
      { path: '*', element: <NotFoundPage /> },
    ],
  },

  // Admin Auth Route (Public)
  {
    path: '/admin/login',
    element: <LoginPage />,
  },

  // Protected Admin Routes
  {
    path: '/admin',
    element: (
      <AdminRoute>
        <AdminLayout />
      </AdminRoute>
    ),
    children: [
      { index: true, element: <AdminProductsPage /> },
      { path: 'products', element: <Navigate to="/admin" replace /> },
      { path: 'products/new', element: <AdminProductFormPage /> },
      { path: 'products/:id/edit', element: <AdminProductFormPage /> },
    ],
  },
]);
