import { useEffect, useState } from 'react';
import { BookOpen } from 'lucide-react';
import { supabase } from '../lib/supabase';
import FadeIn from '../components/FadeIn';
import { SCHOOL } from '../lib/constants';

const gradients = [
  'from-blue-500 to-blue-700',
  'from-green-500 to-green-700',
  'from-purple-500 to-purple-700',
  'from-orange-400 to-orange-600'
];

export default function Staff() {
  const [staff, setStaff] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.title = `Our Staff - ${SCHOOL.name}`;
    
    // Set meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', `Meet ${SCHOOL.name}'s dedicated team of 30+ qualified teachers and educators. Our experienced faculty is committed to bringing out the best in every child.`);
    }

    async function fetchStaff() {
      const { data } = await supabase
        .from('staff_members')
        .select('*')
        .order('display_order', { ascending: true });
      
      if (data) {
        setStaff(data);
      }
      setLoading(false);
    }
    fetchStaff();
  }, []);

  return (
    <div className="w-full bg-surface pb-24">
      {/* Hero */}
      <section className="bg-primary py-24 px-4 sm:px-6 lg:px-8 text-center text-white relative">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1577896851231-70ef18881754?w=1600&q=80')] opacity-10 bg-cover bg-center mix-blend-overlay" />
        <FadeIn className="relative z-10">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-heading font-extrabold mb-6">
            Meet Our Dedicated Team
          </h1>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto leading-relaxed">
            Our qualified and passionate educators are the heart of Triton International School, committed to bringing out the absolute best in every child.
          </p>
        </FadeIn>
      </section>

      {/* Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-20">
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 animate-pulse">
                <div className="flex flex-col items-center">
                  <div className="w-24 h-24 rounded-full bg-gray-200 mb-4" />
                  <div className="h-6 w-3/4 bg-gray-200 rounded mb-2" />
                  <div className="h-4 w-1/2 bg-gray-200 rounded mb-4" />
                  <div className="h-6 w-1/3 bg-gray-200 rounded-full mb-6" />
                  <div className="w-full space-y-2">
                    <div className="h-4 bg-gray-200 rounded" />
                    <div className="h-4 w-5/6 bg-gray-200 rounded" />
                    <div className="h-4 w-4/6 bg-gray-200 rounded" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {staff.map((member, index) => {
              const gradient = gradients[index % gradients.length];
              return (
                <FadeIn key={member.id} delay={(index % 3) * 100}>
                  <div className="bg-white rounded-3xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 h-full flex flex-col group">
                    <div className="flex flex-col items-center text-center">
                      <div className={`w-24 h-24 rounded-full mb-6 p-1 bg-gradient-to-br ${gradient} shadow-lg transform group-hover:scale-105 transition-transform`}>
                        {member.photo_url ? (
                          <img 
                            src={member.photo_url} 
                            alt={member.name} 
                            className="w-full h-full rounded-full object-cover border-2 border-white"
                            loading="lazy"
                          />
                        ) : (
                          <div className="w-full h-full rounded-full bg-white flex items-center justify-center text-2xl font-bold text-navy border-2 border-white">
                            {member.name.split(' ').map(n => n[0]).join('').substring(0, 2)}
                          </div>
                        )}
                      </div>
                      
                      <h3 className="text-xl font-heading font-bold text-navy mb-1">{member.name}</h3>
                      <p className="text-success font-semibold text-sm mb-4">{member.role}</p>
                      
                      {member.subject && (
                        <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-primary-light text-primary rounded-full text-xs font-bold mb-6">
                          <BookOpen className="w-3 h-3" />
                          {member.subject}
                        </div>
                      )}
                      
                      {member.bio && (
                        <p className="text-muted text-sm leading-relaxed border-t border-gray-100 pt-6 mt-auto">
                          {member.bio}
                        </p>
                      )}
                    </div>
                  </div>
                </FadeIn>
              );
            })}
          </div>
        )}
      </div>

      {/* Stats Strip */}
      <section className="mt-24 bg-gradient-to-r from-primary to-primary-dark py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center divide-x-0 md:divide-x divide-white/20">
            <div className="px-4 mb-6 md:mb-0">
              <div className="text-3xl sm:text-4xl font-heading font-bold text-white mb-2">30+</div>
              <div className="text-blue-200 text-sm font-medium">Teaching Staff</div>
            </div>
            <div className="px-4 mb-6 md:mb-0">
              <div className="text-3xl sm:text-4xl font-heading font-bold text-white mb-2">100%</div>
              <div className="text-blue-200 text-sm font-medium">Qualified Teachers</div>
            </div>
            <div className="px-4">
              <div className="text-3xl sm:text-4xl font-heading font-bold text-white mb-2">10+</div>
              <div className="text-blue-200 text-sm font-medium">Avg. Years Experience</div>
            </div>
            <div className="px-4">
              <div className="text-3xl sm:text-4xl font-heading font-bold text-white mb-2">3</div>
              <div className="text-blue-200 text-sm font-medium">Education Levels Covered</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
