import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import FadeIn from './FadeIn';

export default function TestimonialsSection() {
  const [testimonials, setTestimonials] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    async function fetchTestimonials() {
      const { data } = await supabase
        .from('testimonials')
        .select('*')
        .eq('featured', true)
        .order('display_order', { ascending: true });
      
      if (data && data.length > 0) {
        setTestimonials(data);
      }
    }
    fetchTestimonials();
  }, []);

  useEffect(() => {
    if (testimonials.length <= 1) return;
    
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [testimonials.length]);

  if (testimonials.length === 0) return null;

  return (
    <section className="py-20 bg-white overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
        <FadeIn>
          <div className="text-9xl text-primary/10 font-serif leading-none absolute top-0 left-1/2 -translate-x-1/2 -mt-8 select-none">
            "
          </div>
          
          <div className="relative z-10 min-h-[250px] flex flex-col justify-center">
            {testimonials.map((t, idx) => (
              <div 
                key={t.id}
                className={`transition-all duration-1000 absolute top-0 left-0 w-full h-full flex flex-col justify-center ${
                  idx === currentSlide ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8 pointer-events-none'
                }`}
              >
                <p className="text-xl sm:text-2xl text-navy font-medium italic mb-8 px-4 sm:px-12 leading-relaxed">
                  "{t.quote}"
                </p>
                <div className="flex flex-col items-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-primary to-success rounded-full flex items-center justify-center text-white font-bold text-xl mb-4 shadow-md">
                    {t.photo_url ? (
                      <img src={t.photo_url} alt={t.parent_name} className="w-full h-full rounded-full object-cover" />
                    ) : (
                      t.parent_name.charAt(0)
                    )}
                  </div>
                  <h4 className="font-heading font-bold text-navy text-lg">{t.parent_name}</h4>
                  <span className="text-sm font-medium text-success bg-success-light px-3 py-1 rounded-full mt-2">
                    {t.child_level} Parent
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-center gap-2 mt-12">
            {testimonials.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentSlide(idx)}
                className={`w-3 h-3 rounded-full transition-all ${
                  idx === currentSlide ? 'bg-primary scale-125' : 'bg-gray-300 hover:bg-gray-400'
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
