import { useState, useCallback, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Layout from './components/layout/Layout';
import Loader from './components/Loader';
import { CartProvider } from './context/CartContext';
import { ToastProvider } from './context/ToastContext';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ProductsPage from './pages/ProductsPage';
import LeadershipPage from './pages/LeadershipPage';
import DistributorsPage from './pages/DistributorsPage';
import CertificationPage from './pages/CertificationPage';
import PartnerPage from './pages/PartnerPage';
import ContactPage from './pages/ContactPage';
import CheckoutPage from './pages/CheckoutPage';
import './styles/global.css';

function AppRoutes() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="products" element={<ProductsPage />} />
        <Route path="leadership" element={<LeadershipPage />} />
        <Route path="distributors" element={<DistributorsPage />} />
        <Route path="certification" element={<CertificationPage />} />
        <Route path="partner" element={<PartnerPage />} />
        <Route path="contact" element={<ContactPage />} />
        <Route path="checkout" element={<CheckoutPage />} />
      </Route>
    </Routes>
  );
}

export default function App() {
  const [loaded, setLoaded] = useState(false);

  const handleLoad = useCallback(() => setLoaded(true), []);

  useEffect(() => {
    if (!loaded) return;
    gsap.registerPlugin(ScrollTrigger);
    const t = setTimeout(() => ScrollTrigger.refresh(), 300);
    return () => clearTimeout(t);
  }, [loaded]);

  return (
    <>
      {!loaded && <Loader onComplete={handleLoad} />}
      <div className={`app-root ${loaded ? 'ready' : ''}`}>
        <BrowserRouter>
          <ToastProvider>
            <CartProvider>
              <AppRoutes />
            </CartProvider>
          </ToastProvider>
        </BrowserRouter>
      </div>
    </>
  );
}
