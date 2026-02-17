import { Routes, Route } from 'react-router-dom';
import { lazy, Suspense } from 'react';

const LandingPage = lazy(() => import('@/features/landing/LandingPage'));
const AppLayout = lazy(() => import('@/components/layout/AppLayout'));
const DashboardPage = lazy(() => import('@/features/dashboard/DashboardPage'));
const InventoryPage = lazy(() => import('@/features/inventory/InventoryPage'));
const POSPage = lazy(() => import('@/features/pos/POSPage'));
const AlertsPage = lazy(() => import('@/features/alerts/AlertsPage'));

function Loading() {
  return (
    <div className="flex h-screen items-center justify-center bg-surface-950">
      <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary-500 border-t-transparent" />
    </div>
  );
}

export default function App() {
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route element={<AppLayout />}>
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/inventory" element={<InventoryPage />} />
          <Route path="/pos" element={<POSPage />} />
          <Route path="/alerts" element={<AlertsPage />} />
        </Route>
      </Routes>
    </Suspense>
  );
}
