import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, ChevronRight, CheckCircle, ExternalLink } from 'lucide-react';
import { supabase } from '../lib/supabase';
import FadeIn from '../components/FadeIn';
import TestimonialsSection from '../components/TestimonialsSection';
import { SCHOOL } from '../lib/constants';

export default function Home() {
  const [latestNews, setLatestNews] = useState([]);
  const [showBanner, setShowBanner] = useState(true);

  useEffect(() => {
    document.title = `${SCHOOL.name} - Where Knowledge Meets Excellence`;

    // Set meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', `${SCHOOL.name} provides world-class education from Nursery through Secondary level in Kuchikau, Nasarawa State. Discover our academic programs, facilities, and admission process for 2026/2027.`);
    }

    async function fetchNews() {
      const { data } = await supabase
        .from('news_posts')
        .select('*')
        .order('published_date', { ascending: false })
        .limit(3);
      if (data) setLatestNews(data);
    }
    fetchNews();
  }, []);

  return (
    <div className="w-full">
      {/* Announcement Banner */}
      {showBanner && (
        <FadeIn>
          <div className="relative bg-gradient-to-r from-primary via-primary-dark to-navy overflow-hidden">
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=1200&q=80')] opacity-10 bg-cover bg-center" />
            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
              <button
                onClick={() => setShowBanner(false)}
                className="absolute top-4 right-4 bg-white/20 hover:bg-white/30 text-white rounded-full p-2 transition-all"
                aria-label="Close announcement"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              <div className="text-center mb-6">
                <span className="inline-block bg-success/20 border border-success/30 text-success-light px-4 py-1 rounded-full text-sm font-semibold mb-4">
                  🎉 Important Announcements
                </span>
                <h2 className="text-2xl sm:text-3xl font-heading font-bold text-white mb-2">
                  Welcome to the New Academic Session!
                </h2>
                <p className="text-blue-100 text-sm sm:text-base">
                  School resumed on September 14th, 2026 - First Term Activities Now in Full Swing
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                {/* Resumption Flyer */}
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20 hover:bg-white/15 transition-all">
                  <div className="relative rounded-xl overflow-hidden mb-3">
                    <img
                      src="/TIS Resumes .jpg"
                      alt="School Resumption Flyer"
                      className="w-full h-auto object-contain"
                      loading="lazy"
                    />
                  </div>
                  <h3 className="text-white font-heading font-bold text-lg mb-1">School Resumption</h3>
                  <p className="text-blue-100 text-sm">Classes began on September 14th, 2026</p>
                </div>

                {/* Activities Flyer */}
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20 hover:bg-white/15 transition-all">
                  <div className="relative rounded-xl overflow-hidden mb-3">
                    <img
                      src="/TIS activities.jpg"
                      alt="First Term Activities Flyer"
                      className="w-full h-auto object-contain"
                      loading="lazy"
                    />
                  </div>
                  <h3 className="text-white font-heading font-bold text-lg mb-1">First Term Activities</h3>
                  <p className="text-blue-100 text-sm">Exciting programs and events for the new term</p>
                </div>
              </div>
            </div>
          </div>
        </FadeIn>
      )}

      {/* Section 1 — Hero */}
      <section className="relative min-h-[calc(100vh-88px)] flex items-center justify-center overflow-hidden bg-primary-dark">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20 mix-blend-overlay"
          style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=1600&q=80)' }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#003a73]/80 via-[#00509D]/60 to-transparent" />
        
        {/* Decorative blurred circles */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-success/10 blur-3xl rounded-full -translate-y-1/2 translate-x-1/3" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-400/10 blur-3xl rounded-full translate-y-1/2 -translate-x-1/3" />

        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 flex flex-col items-center sm:items-start text-center sm:text-left">
          <FadeIn delay={100}>
            <div className="w-28 h-28 bg-white/10 backdrop-blur-md rounded-full p-2 mb-8 border border-white/20 shadow-2xl">
              <img 
                src="https://media.base44.com/images/public/6a3d0beeb6c22560489f6db1/293ad5186_5902013719250669943.jpg" 
                alt="School Logo" 
                className="w-full h-full object-contain rounded-full bg-white"
              />
            </div>
          </FadeIn>
          
          <FadeIn delay={200}>
            <div className="inline-flex items-center gap-2 bg-success/20 border border-success/30 px-4 py-2 rounded-full mb-6">
              <span className="w-2 h-2 rounded-full bg-success animate-pulse" />
              <span className="text-success-light text-sm font-medium tracking-wide uppercase">Admissions Open — 2026/2027 Session</span>
            </div>
          </FadeIn>

          <FadeIn delay={300}>
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-heading font-extrabold text-white leading-tight mb-6 max-w-4xl">
              Where Knowledge Meets <br className="hidden sm:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-success to-accent">Excellence</span>
            </h1>
          </FadeIn>

          <FadeIn delay={400}>
            <p className="text-lg sm:text-xl text-blue-100 mb-4 max-w-2xl leading-relaxed">
              Triton International School provides world-class education from Nursery through Secondary level in a nurturing, vibrant community in Kuchikau, Nasarawa State.
            </p>
            <p className="text-success-light text-lg italic mb-10">
              ✦ {SCHOOL.motto}
            </p>
          </FadeIn>

          <FadeIn delay={500} className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <Link 
              to="/admissions" 
              className="bg-gradient-to-r from-success to-green-500 text-white px-8 py-4 rounded-full font-heading font-semibold text-lg hover:shadow-lg hover:shadow-success/30 transition-all flex items-center justify-center gap-2"
            >
              Apply Now <ChevronRight className="w-5 h-5" />
            </Link>
            <Link 
              to="/about" 
              className="glass-pill text-white px-8 py-4 rounded-full font-heading font-semibold text-lg hover:bg-white/20 transition-all flex items-center justify-center gap-2"
            >
              Learn More <ChevronRight className="w-5 h-5" />
            </Link>
          </FadeIn>
        </div>

        {/* Bottom wave SVG */}
        <div className="absolute bottom-0 w-full overflow-hidden leading-none">
          <svg className="relative block w-full h-[50px] sm:h-[100px]" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V95.8C59.71,118.08,130.83,119.28,189.9,109.29,235.27,101.5,278.4,81.4,321.39,56.44Z" className="fill-white" />
          </svg>
        </div>
      </section>

      {/* Section 2 — Stats Bar */}
      <section className="bg-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-24 relative z-20">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {[
              { num: '500+', label: 'Students Enrolled' },
              { num: '30+', label: 'Qualified Teachers' },
              { num: '20', label: 'Years of Excellence' },
              { num: '3', label: 'Levels of Education' }
            ].map((stat, i) => (
              <FadeIn key={i} delay={100 * i}>
                <div className="bg-gradient-to-br from-blue-50 to-green-50 border border-blue-100 rounded-2xl p-6 text-center shadow-md hover:shadow-xl transition-shadow h-full flex flex-col justify-center">
                  <div className="text-3xl sm:text-4xl font-heading font-extrabold text-accent mb-2">{stat.num}</div>
                  <div className="text-sm sm:text-base font-medium text-navy">{stat.label}</div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Section 3 — Academic Programs */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <FadeIn>
              <span className="text-success font-bold tracking-wider uppercase text-sm mb-2 block">What We Offer</span>
              <h2 className="text-3xl sm:text-4xl font-heading font-bold text-navy">Academic Programs</h2>
            </FadeIn>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {[
              { level: 'Nursery', icon: '🌱', color: 'from-yellow-400 to-orange-400', desc: 'Building strong foundations through play and discovery for early learners.' },
              { level: 'Primary', icon: '📚', color: 'from-blue-400 to-blue-600', desc: 'Fostering academic growth, critical thinking, and character development.' },
              { level: 'Secondary', icon: '🎓', color: 'from-success to-green-600', desc: 'Preparing students for higher education and future leadership.' }
            ].map((prog, i) => (
              <FadeIn key={i} delay={i * 150}>
                <div className="bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-xl transition-all group border border-gray-100">
                  <div className={`h-2 bg-gradient-to-r ${prog.color}`} />
                  <div className="p-8">
                    <div className="text-5xl mb-6 transform group-hover:scale-110 transition-transform origin-bottom-left">{prog.icon}</div>
                    <h3 className="text-2xl font-heading font-bold text-navy mb-4">{prog.level}</h3>
                    <p className="text-muted mb-8 leading-relaxed">{prog.desc}</p>
                    <Link to="/programs" className="text-primary font-semibold hover:text-primary-dark inline-flex items-center gap-1">
                      Learn more <ChevronRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>

          <FadeIn delay={400} className="text-center">
            <Link to="/programs" className="inline-flex items-center gap-2 px-8 py-3 rounded-full border-2 border-primary text-primary font-heading font-semibold hover:bg-primary hover:text-white transition-colors">
              View All Programs <ChevronRight className="w-5 h-5" />
            </Link>
          </FadeIn>
        </div>
      </section>

      {/* Section 4 — Why Triton */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <FadeIn>
              <span className="text-success font-bold tracking-wider uppercase text-sm mb-2 block">Why Choose Us</span>
              <h2 className="text-3xl sm:text-4xl font-heading font-bold text-navy">The Triton Advantage</h2>
            </FadeIn>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { title: 'Academic Excellence', desc: 'Consistently outstanding performance in national and international examinations.' },
              { title: 'Holistic Development', desc: 'Focus on character, sports, arts, and leadership alongside academics.' },
              { title: 'Community & Belonging', desc: 'A safe, inclusive environment where every child is known and valued.' },
              { title: 'Hands-on Learning', desc: 'Modern laboratories and practical approaches to theoretical concepts.' },
              { title: 'Award-Winning Programs', desc: 'Recognized for excellence in debates, sports, and science competitions.' },
              { title: 'Qualified Teachers', desc: 'Dedicated, experienced professionals committed to student success.' }
            ].map((feature, i) => (
              <FadeIn key={i} delay={i * 100}>
                <div className="flex gap-4">
                  <div className="shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-success flex items-center justify-center text-white shadow-lg">
                    <CheckCircle className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-lg text-navy mb-2">{feature.title}</h3>
                    <p className="text-muted text-sm leading-relaxed">{feature.desc}</p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Section 5 — CTA Banner */}
      <section className="py-20 relative overflow-hidden bg-primary">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-10 mix-blend-overlay"
          style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1577896851231-70ef18881754?w=1600&q=80)' }}
        />
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <FadeIn>
            <h2 className="text-3xl sm:text-5xl font-heading font-bold text-white mb-6">
              Give Your Child the Gift of Excellence
            </h2>
            <p className="text-xl text-blue-100 mb-10 max-w-2xl mx-auto">
              Applications are now open for the 2026/2027 academic session. Join the Triton family today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/admissions" className="bg-gradient-to-r from-success to-green-500 text-white px-8 py-4 rounded-full font-heading font-semibold text-lg hover:shadow-lg transition-transform hover:-translate-y-1">
                Start Application →
              </Link>
              <Link to="/contact" className="glass-pill text-white px-8 py-4 rounded-full font-heading font-semibold text-lg hover:bg-white/20 transition-all">
                Contact Us
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Section 6 — Latest News */}
      {latestNews.length > 0 && (
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-end mb-12">
              <FadeIn>
                <h2 className="text-3xl sm:text-4xl font-heading font-bold text-navy">Latest News</h2>
              </FadeIn>
              <FadeIn delay={200}>
                <Link to="/news" className="text-primary font-semibold hover:text-primary-dark hidden sm:flex items-center gap-1">
                  View all news <ChevronRight className="w-4 h-4" />
                </Link>
              </FadeIn>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {latestNews.map((post, i) => (
                <FadeIn key={post.id} delay={i * 150}>
                  <div className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow h-full flex flex-col border border-gray-100">
                    {post.image_url && (
                      <div className="h-48 overflow-hidden relative">
                        <img 
                          src={post.image_url} 
                          alt={post.title} 
                          className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                          loading="lazy"
                          decoding="async"
                        />
                        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-primary shadow-sm">
                          {post.category}
                        </div>
                      </div>
                    )}
                    <div className="p-6 flex-1 flex flex-col">
                      <div className="text-sm text-muted mb-3 font-medium">
                        {new Date(post.published_date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                      </div>
                      <h3 className="font-heading font-bold text-xl text-navy mb-3 line-clamp-2 hover:text-primary transition-colors">
                        <Link to={`/news/${post.id}`}>{post.title}</Link>
                      </h3>
                      <p className="text-muted text-sm line-clamp-3 mb-6 flex-1">
                        {post.excerpt}
                      </p>
                      <Link to={`/news/${post.id}`} className="text-primary font-semibold text-sm hover:text-primary-dark inline-flex items-center gap-1 mt-auto w-fit">
                        Read more <ChevronRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
            
            <div className="mt-8 text-center sm:hidden">
              <Link to="/news" className="text-primary font-semibold hover:text-primary-dark inline-flex items-center gap-1">
                View all news <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Section 7 — Testimonials */}
      <TestimonialsSection />

      {/* Section 8 — Quick Contact Strip */}
      <section className="bg-navy border-t border-slate-800 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-center items-center gap-6 md:gap-12 text-sm sm:text-base text-blue-200">
            <a href={`tel:${SCHOOL.phone.replace(/\s/g, '')}`} className="flex items-center gap-2 hover:text-white transition-colors">
              <Phone className="w-5 h-5 text-success" />
              {SCHOOL.phone}
            </a>
            <a href={`mailto:${SCHOOL.email}`} className="flex items-center gap-2 hover:text-white transition-colors">
              <Mail className="w-5 h-5 text-success" />
              {SCHOOL.email}
            </a>
            <div className="flex items-center gap-2 text-center md:text-left">
              <MapPin className="w-5 h-5 text-success shrink-0" />
              <span>{SCHOOL.address}</span>
            </div>
          </div>
        </div>
      </section>

      {/* School Portal Button */}
      <a
        href="https://tisportal.vercel.app"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 left-6 z-50 px-5 py-3 bg-[#FFD700] text-navy rounded-full shadow-xl hover:bg-[#E6C200] transition-all transform hover:scale-105 flex items-center gap-2 font-heading font-bold text-sm sm:text-base"
        aria-label="Visit School Portal"
        title="School Portal"
      >
        <ExternalLink className="w-4 h-4" />
        School Portal
      </a>
    </div>
  );
}
