import { useEffect } from 'react';
import { Users } from 'lucide-react';
import FadeIn from '../components/FadeIn';
import { SCHOOL } from '../lib/constants';

export default function Management() {
  useEffect(() => {
    document.title = `Management - ${SCHOOL.name}`;
  }, []);

  return (
    <div className="w-full bg-surface pb-24">
      {/* Hero */}
      <section className="bg-gradient-to-br from-primary-dark to-primary py-24 px-4 sm:px-6 lg:px-8 text-center text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1577896851231-70ef18881754?w=1600&q=80')] opacity-10 bg-cover bg-center mix-blend-overlay" />
        <FadeIn className="relative z-10">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-heading font-extrabold mb-6">
            School Management
          </h1>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto leading-relaxed">
            Meet the visionary leaders guiding Triton International School toward excellence in education.
          </p>
        </FadeIn>
      </section>

      {/* Profiles Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          
          {/* Profile 1 - Chairman */}
          <FadeIn delay={100}>
            <div className="bg-white rounded-3xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 h-full flex flex-col group">
              <div className="flex flex-col items-center text-center">
                <div className="w-36 h-36 sm:w-56 sm:h-56 rounded-full mb-6 p-1 bg-gradient-to-br from-blue-500 to-blue-700 shadow-lg transform group-hover:scale-105 transition-transform">
                  <img 
                    src="/Prof S Mustafa.jpg"
                    alt="Professor S. Mustafa"
                    className="w-full h-full rounded-full object-cover border-2 border-white"
                    loading="lazy"
                  />
                </div>
                
                <h3 className="text-xl font-heading font-bold text-navy mb-1">PROFESSOR S. MUSTAFA</h3>
                <p className="text-success font-semibold text-sm mb-4">Proprietor / Chairman</p>
                
                <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-primary-light text-primary rounded-full text-xs font-bold mb-6">
                  <Users className="w-3 h-3" />
                  Leadership
                </div>
                
                <p className="text-muted text-sm leading-relaxed border-t border-gray-100 pt-6 mt-auto">
                  An icon of Science and technology, he was formerly Vice-Chancellor at Federal University of Technology, Yola. His vision for this notable school is to ensure teachers are committed, innovative, disciplined and set a high standard for the school and thereby, develop the child's character and knowledge towards leadership role in the society.
                </p>
              </div>
            </div>
          </FadeIn>

          {/* Profile 2 - Vice-Chairman */}
          <FadeIn delay={200}>
            <div className="bg-white rounded-3xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 h-full flex flex-col group">
              <div className="flex flex-col items-center text-center">
                <div className="w-28 h-28 rounded-full mb-6 p-1 bg-gradient-to-br from-green-500 to-green-700 shadow-lg transform group-hover:scale-105 transition-transform flex items-center justify-center bg-white">
                  <div className="w-full h-full rounded-full bg-gradient-to-br from-green-100 to-green-200 flex items-center justify-center text-3xl font-bold text-green-700 border-2 border-white">
                    HF
                  </div>
                </div>
                
                <h3 className="text-xl font-heading font-bold text-navy mb-1">HAJIYA FATIMAZ. MUSTAFA</h3>
                <p className="text-success font-semibold text-sm mb-4">Vice-Chairman</p>
                
                <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-green-50 text-green-700 rounded-full text-xs font-bold mb-6">
                  <Users className="w-3 h-3" />
                  Administration
                </div>
                
                <p className="text-muted text-sm leading-relaxed border-t border-gray-100 pt-6 mt-auto">
                  She has taught in private and public secondary schools for over 25 years and served with the FCT Education Department rising to Chief Education Officer before retiring in 2007. She is committed to staff and students good ethics, discipline, neatness and maintenance of high academic standards in the school.
                </p>
              </div>
            </div>
          </FadeIn>

          {/* Profile 3 - Director */}
          <FadeIn delay={300}>
            {/* DIRECTOR INFO WORKFLOW AREA: INSERT BIO HERE WHEN AVAILABLE */}
            <div className="bg-white rounded-3xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 h-full flex flex-col group">
              <div className="flex flex-col items-center text-center">
                <div className="w-28 h-28 rounded-full mb-6 p-1 bg-gradient-to-br from-purple-500 to-purple-700 shadow-lg transform group-hover:scale-105 transition-transform flex items-center justify-center bg-white">
                  <div className="w-full h-full rounded-full bg-gradient-to-br from-purple-100 to-purple-200 flex items-center justify-center text-3xl font-bold text-purple-700 border-2 border-white">
                    HM
                  </div>
                </div>
                
                <h3 className="text-xl font-heading font-bold text-navy mb-1">Mrs. Halima S. Mustafa</h3>
                <p className="text-success font-semibold text-sm mb-4">Director</p>
                
                <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-purple-50 text-purple-700 rounded-full text-xs font-bold mb-6">
                  <Users className="w-3 h-3" />
                  Management
                </div>
                
                <p className="text-muted text-sm leading-relaxed border-t border-gray-100 pt-6 mt-auto">
                  She has over two decades of experience in education and has been at the heart of the school's leadership for many years. As a dedicated member of the management team, she oversees the day-to-day affairs of the school, ensuring excellence in academics, administration, and student welfare. Her visionary leadership, wealth of experience, and commitment to quality education continue to inspire both staff and students while driving the school's continued growth and success.
                </p>
              </div>
            </div>
          </FadeIn>

        </div>
      </div>

      {/* Stats Strip */}
      <section className="mt-24 bg-gradient-to-r from-primary to-primary-dark py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center divide-x-0 md:divide-x divide-white/20">
            <div className="px-4 mb-6 md:mb-0">
              <div className="text-3xl sm:text-4xl font-heading font-bold text-accent mb-2">20</div>
              <div className="text-blue-200 text-sm font-medium">Years of Leadership</div>
            </div>
            <div className="px-4 mb-6 md:mb-0">
              <div className="text-3xl sm:text-4xl font-heading font-bold text-white mb-2">100%</div>
              <div className="text-blue-200 text-sm font-medium">Commitment to Excellence</div>
            </div>
            <div className="px-4">
              <div className="text-3xl sm:text-4xl font-heading font-bold text-white mb-2">3</div>
              <div className="text-blue-200 text-sm font-medium">Key Leaders</div>
            </div>
            <div className="px-4">
              <div className="text-3xl sm:text-4xl font-heading font-bold text-white mb-2">500+</div>
              <div className="text-blue-200 text-sm font-medium">Students Guided</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
