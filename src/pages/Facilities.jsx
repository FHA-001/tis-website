import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Beaker, Trophy, Monitor, UtensilsCrossed, Users, ArrowRight } from 'lucide-react';
import { supabase } from '../lib/supabase';
import FadeIn from '../components/FadeIn';
import { SCHOOL } from '../lib/constants';

const ICONS = {
  BookOpen, Beaker, Trophy, Monitor, UtensilsCrossed, Users
};

const HARDCODED_FACILITIES = [
  {
    id: 'f1',
    name: 'Library',
    icon_name: 'BookOpen',
    description: 'A well-stocked library with a vast collection of books, academic journals, and digital resources to support research and reading habits.',
    image_url: 'https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=800&q=80'
  },
  {
    id: 'f2',
    name: 'Science Lab',
    icon_name: 'Beaker',
    description: 'Modern, fully equipped physics, chemistry, and biology laboratories for practical experiments and scientific discovery.',
    image_url: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=800&q=80'
  },
  {
    id: 'f3',
    name: 'Sports Field',
    icon_name: 'Trophy',
    description: 'Expansive grounds for football, athletics, and recreational activities promoting physical fitness and teamwork.',
    image_url: 'https://images.unsplash.com/photo-1518605368461-1ee7c5320e73?w=800&q=80'
  },
  {
    id: 'f4',
    name: 'Computer Lab',
    icon_name: 'Monitor',
    description: 'Air-conditioned ICT lab with modern desktop computers and high-speed internet to build essential digital skills.',
    image_url: 'https://i.ibb.co/bM39sXvb/EF98-E12-E-1-D1-A-4-F92-A60-A-142964-AA8-EFA.jpg'
  },
  {
    id: 'f5',
    name: 'Dining Hall',
    icon_name: 'UtensilsCrossed',
    description: 'A clean, hygienic cafeteria space where students can enjoy nutritious meals and socialize during break times.',
    image_url: 'https://images.unsplash.com/photo-1587595431973-160d0d94add1?w=800&q=80'
  },
  {
    id: 'f6',
    name: 'Assembly Hall',
    icon_name: 'Users',
    description: 'A spacious multipurpose hall for morning assemblies, debates, drama presentations, and school events.',
    image_url: 'https://images.unsplash.com/photo-1540317580384-e5d43616b9aa?w=800&q=80'
  }
];

export default function Facilities() {
  const [facilities, setFacilities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.title = `Facilities - ${SCHOOL.name}`;
    
    // Set meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', `Discover ${SCHOOL.name}'s modern campus facilities including library, science labs, computer lab, sports field, dining hall, and assembly hall. Enabling environment for excellence.`);
    }

    async function fetchFacilities() {
      const { data } = await supabase
        .from('facilities')
        .select('*')
        .order('display_order', { ascending: true });
      
      if (data && data.length > 0) {
        // Map DB string to actual lucide component if needed, or use DB icons
        setFacilities(data);
      } else {
        setFacilities(HARDCODED_FACILITIES);
      }
      setLoading(false);
    }
    fetchFacilities();
  }, []);

  return (
    <div className="w-full bg-surface pb-24">
      {/* Hero */}
      <section className="bg-navy py-24 px-4 sm:px-6 lg:px-8 text-center text-white relative">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=1600&q=80')] opacity-10 bg-cover bg-center mix-blend-overlay" />
        <FadeIn className="relative z-10">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-heading font-extrabold mb-6">
            Campus Facilities
          </h1>
          <p className="text-xl text-blue-200 max-w-2xl mx-auto leading-relaxed">
            An enabling environment equipped with modern infrastructure to support academic excellence, creativity, and physical development.
          </p>
        </FadeIn>
      </section>

      {/* Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {facilities.map((facility, index) => {
            // Determine Icon
            const IconComp = ICONS[facility.icon_name] || BookOpen;

            return (
              <FadeIn key={facility.id} delay={(index % 3) * 100}>
                <div className="bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 group border border-gray-100 flex flex-col h-full">
                  <div className="h-52 relative overflow-hidden">
                    <img 
                      src={facility.image_url || 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=800&q=80'} 
                      alt={facility.name} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-navy/80 via-navy/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
                    
                    <div className="absolute top-4 right-4 w-12 h-12 bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center border border-white/30 shadow-lg text-white">
                      <IconComp className="w-6 h-6" />
                    </div>
                    
                    <div className="absolute bottom-4 left-4 right-4">
                      <h3 className="text-2xl font-heading font-bold text-white mb-1 drop-shadow-md">{facility.name}</h3>
                    </div>
                  </div>
                  
                  <div className="p-6 flex-1 flex flex-col">
                    <p className="text-muted leading-relaxed text-sm flex-1">
                      {facility.description}
                    </p>
                  </div>
                </div>
              </FadeIn>
            );
          })}
        </div>
      </div>

      {/* CTA */}
      <section className="mt-24 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <div className="bg-gradient-to-r from-primary to-success rounded-3xl p-8 sm:p-12 text-center shadow-xl text-white">
            <h2 className="text-3xl sm:text-4xl font-heading font-bold mb-4">
              Ready to Experience Our Facilities?
            </h2>
            <p className="text-blue-100 mb-8 text-lg max-w-2xl mx-auto">
              We welcome prospective parents and students for guided campus tours. See firsthand where your child will learn and grow.
            </p>
            <Link 
              to="/contact" 
              className="inline-flex items-center gap-2 bg-white text-primary px-8 py-4 rounded-full font-heading font-bold text-lg hover:bg-gray-50 transition-colors shadow-md"
            >
              Schedule a Visit <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </FadeIn>
      </section>
    </div>
  );
}
