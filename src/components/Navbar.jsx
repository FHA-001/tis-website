import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { SCHOOL } from '../lib/constants';

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about' },
  { name: 'Programs', path: '/programs' },
  { name: 'Staff', path: '/staff' },
  { name: 'Management', path: '/management' },
  { name: 'Facilities', path: '/facilities' },
  { name: 'Gallery', path: '/gallery' },
  { name: 'News', path: '/news' },
  { name: 'Contact', path: '/contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const mobileMenuRef = useRef(null);
  const menuButtonRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  // Focus management for mobile menu
  useEffect(() => {
    if (mobileMenuOpen) {
      // Focus first menu item when menu opens
      const firstLink = mobileMenuRef.current?.querySelector('a');
      if (firstLink) {
        setTimeout(() => firstLink.focus(), 100);
      }
    } else {
      // Return focus to menu button when menu closes
      if (menuButtonRef.current) {
        menuButtonRef.current.focus();
      }
    }
  }, [mobileMenuOpen]);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-white ${scrolled ? 'shadow-md py-2' : 'py-4'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          
          <Link to="/" className="flex items-center gap-3">
            <img 
              src="https://media.base44.com/images/public/6a3d0beeb6c22560489f6db1/293ad5186_5902013719250669943.jpg" 
              alt="Triton International School Logo" 
              className="w-16 h-16 sm:w-20 sm:h-20 object-contain rounded-full shadow-sm"
            />
            <div className="flex flex-col">
              <span className="font-heading font-bold text-primary text-lg sm:text-xl leading-tight">
                Triton International
              </span>
              <span className="font-heading font-semibold text-accent text-sm tracking-wide">
                School
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path || (link.path !== '/' && location.pathname.startsWith(link.path));
              return (
                <Link 
                  key={link.name} 
                  to={link.path}
                  className={`px-3 py-2 rounded-lg font-heading font-medium transition-colors ${
                    isActive ? 'text-primary bg-blue-50' : 'text-navy hover:text-primary hover:bg-gray-50'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
            <Link 
              to="/admissions"
              className="ml-4 px-6 py-2.5 bg-[#00509D] text-white rounded-full font-heading font-medium hover:bg-primary-dark transition-colors shadow-sm hover:shadow"
            >
              Apply Now
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden flex items-center">
            <button 
              ref={menuButtonRef}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-navy hover:text-primary focus:outline-none"
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-menu"
            >
              {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      {mobileMenuOpen && (
        <div 
          ref={mobileMenuRef}
          id="mobile-menu"
          className="lg:hidden absolute top-full left-0 right-0 bg-white shadow-xl border-t border-gray-100 flex flex-col py-4 px-4 gap-2 animate-in slide-in-from-top-2"
          role="navigation"
          aria-label="Main navigation"
        >
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path || (link.path !== '/' && location.pathname.startsWith(link.path));
            return (
              <Link 
                key={link.name} 
                to={link.path}
                className={`px-4 py-3 rounded-lg font-heading font-medium text-lg ${
                  isActive ? 'text-primary bg-blue-50' : 'text-navy hover:text-primary hover:bg-gray-50'
                }`}
              >
                {link.name}
              </Link>
            );
          })}
          <div className="pt-4 border-t border-gray-100 pb-2">
            <Link 
              to="/admissions"
              className="block w-full text-center px-6 py-3 bg-primary text-white rounded-full font-heading font-medium hover:bg-primary-dark transition-colors"
            >
              Apply Now
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
