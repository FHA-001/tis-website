import { useEffect, useState } from 'react';
import { ZoomIn, X, Facebook } from 'lucide-react';
import { supabase } from '../lib/supabase';
import FadeIn from '../components/FadeIn';
import { SCHOOL } from '../lib/constants';

const TABS = ['All', 'Campus', 'Academics', 'Sports', 'Events', 'Arts', 'Other'];

export default function Gallery() {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('All');
  const [lightboxImg, setLightboxImg] = useState(null);
  const [previousFocus, setPreviousFocus] = useState(null);

  useEffect(() => {
    document.title = `Gallery - ${SCHOOL.name}`;
    
    // Set meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', `View photos of life, learning, and celebrations at ${SCHOOL.name}. Browse our gallery featuring campus, academics, sports, events, and arts activities.`);
    }

    async function fetchPhotos() {
      const { data } = await supabase
        .from('gallery_photos')
        .select('*')
        .order('display_order', { ascending: true });
      
      if (data) {
        setPhotos(data);
      }
      setLoading(false);
    }
    fetchPhotos();
  }, []);

  const filteredPhotos = activeTab === 'All' 
    ? photos 
    : photos.filter(p => p.category === activeTab);

  // Close lightbox on escape key and focus trapping
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && lightboxImg) {
        setLightboxImg(null);
      }
      // Trap focus within lightbox
      if (lightboxImg && e.key === 'Tab') {
        const lightbox = document.querySelector('[role="dialog"]');
        if (lightbox) {
          const focusableElements = lightbox.querySelectorAll(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
          );
          const firstElement = focusableElements[0];
          const lastElement = focusableElements[focusableElements.length - 1];

          if (e.shiftKey) {
            if (document.activeElement === firstElement) {
              e.preventDefault();
              lastElement.focus();
            }
          } else {
            if (document.activeElement === lastElement) {
              e.preventDefault();
              firstElement.focus();
            }
          }
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxImg]);

  // Save and restore focus when lightbox opens/closes
  useEffect(() => {
    if (lightboxImg) {
      setPreviousFocus(document.activeElement);
      // Focus the close button when lightbox opens
      const closeButton = document.querySelector('[aria-label="Close lightbox"]');
      if (closeButton) {
        closeButton.focus();
      }
    } else if (previousFocus) {
      // Restore focus when lightbox closes
      previousFocus.focus();
      setPreviousFocus(null);
    }
  }, [lightboxImg, previousFocus]);

  return (
    <div className="w-full bg-surface min-h-screen flex flex-col">
      {/* Hero */}
      <section className="bg-primary py-24 px-4 sm:px-6 lg:px-8 text-center text-white relative">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=1600&q=80')] opacity-10 bg-cover bg-center mix-blend-overlay" />
        <FadeIn className="relative z-10">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-heading font-extrabold mb-6">
            Photo Gallery
          </h1>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto">
            Glimpses of life, learning, and celebrations at Triton.
          </p>
        </FadeIn>
      </section>

      {/* Filter Tabs (Sticky) */}
      <div className="sticky top-[72px] lg:top-[88px] z-40 bg-white/80 backdrop-blur-lg border-b border-gray-200 shadow-sm py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex overflow-x-auto pb-2 -mb-2 hide-scrollbar gap-2 sm:justify-center">
            {TABS.map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`whitespace-nowrap px-5 py-2 rounded-full font-heading font-semibold text-sm transition-all ${
                  activeTab === tab 
                    ? 'bg-primary text-white shadow-md' 
                    : 'bg-gray-100 text-muted hover:bg-gray-200 hover:text-navy'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Masonry Grid */}
      <div className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
        {loading ? (
          <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-4">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="bg-gray-200 rounded-2xl animate-pulse" style={{ height: `${Math.max(200, Math.random() * 400)}px` }} />
            ))}
          </div>
        ) : filteredPhotos.length === 0 ? (
          <div className="text-center py-20 text-muted">
            No photos available in this category.
          </div>
        ) : (
          <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-4">
            {filteredPhotos.map((photo, i) => (
              <FadeIn key={photo.id} delay={(i % 8) * 50} className="break-inside-avoid">
                <div 
                  className="relative group rounded-2xl overflow-hidden cursor-pointer bg-gray-100 border border-gray-200"
                  onClick={() => setLightboxImg(photo)}
                >
                  <img 
                    src={photo.image_url} 
                    alt={photo.title || 'Gallery image'} 
                    className="w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                    decoding="async"
                  />
                  <div className="absolute inset-0 bg-navy/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center p-4 text-center">
                    <ZoomIn className="w-10 h-10 text-white mb-3 transform scale-50 group-hover:scale-100 transition-transform duration-300 delay-100" />
                    {photo.title && (
                      <h4 className="text-white font-heading font-bold text-lg leading-tight transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-150">
                        {photo.title}
                      </h4>
                    )}
                    <span className="text-success-light text-xs uppercase tracking-wider font-bold mt-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-200 border border-success-light/30 px-2 py-1 rounded-md bg-white/10 backdrop-blur-sm">
                      {photo.category}
                    </span>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        )}
      </div>

      {/* Facebook CTA */}
      <section className="bg-blue-50 border-t border-blue-100 py-16 text-center px-4">
        <FadeIn>
          <h3 className="text-2xl font-heading font-bold text-navy mb-4">Want to see more?</h3>
          <p className="text-muted mb-6">Follow us on Facebook for the latest updates and event photos.</p>
          <a 
            href={SCHOOL.facebook} 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#1877F2] text-white px-6 py-3 rounded-full font-bold hover:bg-[#166fe5] transition-colors shadow-md"
          >
            <Facebook className="w-5 h-5 fill-current" /> Like our Page
          </a>
        </FadeIn>
      </section>

      {/* Lightbox */}
      {lightboxImg && (
        <div 
          className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-sm flex items-center justify-center p-4 sm:p-8 animate-in fade-in duration-200"
          role="dialog"
          aria-modal="true"
          aria-labelledby={lightboxImg.title ? 'lightbox-title' : undefined}
        >
          <button 
            onClick={() => setLightboxImg(null)}
            className="absolute top-6 right-6 text-white/70 hover:text-white bg-black/50 p-2 rounded-full transition-colors"
            aria-label="Close lightbox"
          >
            <X className="w-8 h-8" />
          </button>
          
          <div className="max-w-5xl w-full max-h-full flex flex-col items-center">
            <img 
              src={lightboxImg.image_url} 
              alt={lightboxImg.title || 'Gallery image'} 
              className="max-w-full max-h-[85vh] object-contain rounded-lg shadow-2xl"
            />
            {lightboxImg.title && (
              <p 
                id="lightbox-title"
                className="text-white text-xl font-heading mt-6 text-center bg-black/50 px-6 py-2 rounded-full border border-white/10"
              >
                {lightboxImg.title}
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
