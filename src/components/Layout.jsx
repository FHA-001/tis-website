import { Outlet } from 'react-router-dom';
import { MessageCircle } from 'lucide-react';
import Navbar from './Navbar';
import Footer from './Footer';
import ScrollToTop from './ScrollToTop';
import ScrollToTopOnMount from './ScrollToTopOnMount';
import { SCHOOL } from '../lib/constants';

export default function Layout() {
  return (
    <div className="min-h-screen flex flex-col bg-surface">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-primary focus:text-white focus:rounded-lg focus:font-medium"
      >
        Skip to main content
      </a>
      <ScrollToTopOnMount />
      <Navbar />
      <main id="main-content" className="flex-1 pt-[88px] lg:pt-[104px]">
        <Outlet />
      </main>
      <Footer />
      <ScrollToTop />
      
      {/* WhatsApp Floating Button */}
      <a 
        href={SCHOOL.whatsapp}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 p-4 bg-[#25D366] text-white rounded-full shadow-xl hover:bg-[#20bd5a] transition-all transform hover:scale-110 flex items-center justify-center group"
        aria-label="Chat with us on WhatsApp"
        title="Chat with us"
      >
        <MessageCircle className="w-6 h-6" />
        <span className="absolute right-full mr-4 bg-navy text-white text-sm px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
          Chat with us
        </span>
      </a>
    </div>
  );
}
