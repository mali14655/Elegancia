import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import WhatsAppFab from '../ui/WhatsAppFab';
import ScrollToTop from './ScrollToTop';

gsap.registerPlugin(ScrollTrigger);

export default function Layout() {
  useEffect(() => {
    const onScroll = () => ScrollTrigger.update();
    window.addEventListener('scroll', onScroll, { passive: true });

    const refresh = () => ScrollTrigger.refresh();
    refresh();
    const t = setTimeout(refresh, 400);

    return () => {
      window.removeEventListener('scroll', onScroll);
      clearTimeout(t);
    };
  }, []);

  return (
    <>
      <ScrollToTop />
      <Header />
      <div className="site-content">
        <Outlet />
      </div>
      <Footer />
      <WhatsAppFab />
    </>
  );
}
