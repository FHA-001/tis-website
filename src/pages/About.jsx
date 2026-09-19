import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Target, Eye, Heart, ChevronRight } from 'lucide-react';
import FadeIn from '../components/FadeIn';
import { SCHOOL } from '../lib/constants';

export default function About() {
  useEffect(() => {
    document.title = `About Us - ${SCHOOL.name}`;
    
    // Set meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', `Learn about ${SCHOOL.name}'s mission, vision, and 20 years of educational excellence in Nasarawa State. Discover our journey from 2006 to present.`);
    }
  }, []);

  return (
    <div className="w-full">
      {/* Hero */}
      <section className="bg-gradient-to-br from-primary-dark to-primary py-24 px-4 sm:px-6 lg:px-8 text-center text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=1600&q=80')] opacity-10 bg-cover bg-center mix-blend-overlay" />
        <FadeIn className="relative z-10">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-heading font-extrabold mb-4">
            About Triton International School
          </h1>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto italic font-medium">
            {SCHOOL.motto}
          </p>
        </FadeIn>
      </section>

      {/* Who We Are */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <FadeIn>
              <span className="text-success font-bold tracking-wider uppercase text-sm mb-2 block">Our Story</span>
              <h2 className="text-3xl sm:text-4xl font-heading font-bold text-navy mb-6">
                A Legacy of Educational Excellence
              </h2>
              <p className="text-muted text-lg mb-6 leading-relaxed">
                Triton International School was established with a singular focus: to provide a nurturing, rigorous, and inspiring educational environment for children in Nasarawa State and beyond. We believe that every child has boundless potential waiting to be unlocked.
              </p>
              <p className="text-muted text-lg leading-relaxed mb-8">
                From our Early Years program to Senior Secondary, our curriculum is designed to challenge students intellectually while supporting their physical, emotional, and social development. Our dedicated faculty ensures that learning is engaging, practical, and deeply connected to real-world applications.
              </p>
              <div className="flex gap-4">
                <Link to="/programs" className="text-primary font-semibold hover:text-primary-dark inline-flex items-center gap-1">
                  Explore Programs <ChevronRight className="w-4 h-4" />
                </Link>
                <Link to="/staff" className="text-primary font-semibold hover:text-primary-dark inline-flex items-center gap-1">
                  Meet Our Staff <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
            </FadeIn>
            
            <FadeIn delay={200} className="relative">
              <img 
                src="https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800&q=80" 
                alt="Students learning" 
                className="rounded-3xl shadow-xl w-full object-cover h-[500px]"
                loading="lazy"
              />
              <div className="absolute -bottom-8 -left-8 bg-white p-6 rounded-2xl shadow-2xl border border-gray-100 hidden sm:block">
                <div className="text-4xl font-heading font-black text-accent mb-1">20</div>
                <div className="text-sm font-semibold text-navy uppercase tracking-wide">Years of Excellence</div>
              </div>
              <div className="absolute -top-8 -right-8 bg-primary p-6 rounded-2xl shadow-2xl hidden sm:block">
                <div className="text-4xl font-heading font-black text-white mb-1">500+</div>
                <div className="text-sm font-semibold text-blue-200 uppercase tracking-wide">Happy Students</div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Mission / Vision / Values */}
      <section className="py-20 bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FadeIn delay={100}>
              <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 h-full hover:shadow-md transition-shadow">
                <div className="w-16 h-16 rounded-2xl bg-blue-50 flex items-center justify-center mb-6">
                  <Target className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-2xl font-heading font-bold text-navy mb-4">Our Mission</h3>
                <p className="text-muted leading-relaxed">
                  To provide quality, holistic education that empowers students to achieve academic excellence, develop strong moral character, and become responsible global citizens.
                </p>
              </div>
            </FadeIn>

            <FadeIn delay={200}>
              <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 h-full hover:shadow-md transition-shadow">
                <div className="w-16 h-16 rounded-2xl bg-green-50 flex items-center justify-center mb-6">
                  <Eye className="w-8 h-8 text-success" />
                </div>
                <h3 className="text-2xl font-heading font-bold text-navy mb-4">Our Vision</h3>
                <p className="text-muted leading-relaxed">
                  To be the premier institution of academic excellence in Nigeria, recognized for innovative teaching, outstanding student achievement, and transformative community impact.
                </p>
              </div>
            </FadeIn>

            <FadeIn delay={300}>
              <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 h-full hover:shadow-md transition-shadow">
                <div className="w-16 h-16 rounded-2xl bg-yellow-50 flex items-center justify-center mb-6">
                  <Heart className="w-8 h-8 text-accent" />
                </div>
                <h3 className="text-2xl font-heading font-bold text-navy mb-4">Core Values</h3>
                <p className="text-muted leading-relaxed">
                  Integrity, Excellence, Creativity, Respect, and Community. We embed these principles into everything we do, from classroom instruction to sports and extracurricular activities.
                </p>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-24 bg-white overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <FadeIn>
              <h2 className="text-3xl sm:text-4xl font-heading font-bold text-navy mb-4">Our Journey</h2>
              <p className="text-muted">A timeline of growth and achievement.</p>
            </FadeIn>
          </div>

          <div className="relative">
            {/* Center Line */}
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-primary via-success to-primary -translate-x-1/2 rounded-full hidden sm:block" />

            <div className="flex flex-col gap-12">
              {[
                { year: '2006', title: 'School Founded', desc: 'Triton International School opens its doors to the first set of Nursery and Primary pupils.' },
                { year: '2010', title: 'Primary Section Expanded', desc: 'Full primary curriculum established with dedicated classrooms and facilities.' },
                { year: '2013', title: 'Secondary School Launched', desc: 'Junior Secondary operations begin to provide continuity for graduating primary pupils.' },
                { year: '2018', title: 'Modern Science Labs', desc: 'Commissioning of state-of-the-art laboratories for Physics, Chemistry, and Biology.' },
                { year: '2026', title: '20 Years of Excellence', desc: 'Celebrating two decades of outstanding WAEC and BECE results.' }
              ].map((milestone, i) => (
                <FadeIn key={i} delay={100} className={`relative flex flex-col md:flex-row items-center gap-8 ${i % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                  {/* Timeline Dot */}
                  <div className="hidden sm:flex absolute left-4 md:left-1/2 -translate-x-1/2 w-6 h-6 rounded-full bg-white border-4 border-primary z-10 shadow-sm" />
                  
                  {/* Content Box */}
                  <div className={`w-full md:w-1/2 p-6 bg-surface rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow relative
                    ${i % 2 === 0 ? 'md:mr-8 md:text-right' : 'md:ml-8 md:text-left'}
                  `}>
                    <div className="text-3xl font-heading font-black text-primary mb-2 absolute top-4 right-4 md:static">{milestone.year}</div>
                    <h3 className="text-xl font-heading font-bold text-navy mb-2">{milestone.title}</h3>
                    <p className="text-muted">{milestone.desc}</p>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-r from-success to-primary py-20 px-4 text-center">
        <FadeIn>
          <h2 className="text-3xl sm:text-4xl font-heading font-bold text-white mb-6">
            Ready to Be Part of Our Story?
          </h2>
          <p className="text-blue-100 mb-8 max-w-2xl mx-auto text-lg">
            Give your child the foundation they need to succeed in a rapidly changing world.
          </p>
          <Link to="/admissions" className="inline-block bg-white text-primary px-8 py-4 rounded-full font-heading font-bold text-lg hover:bg-gray-50 hover:scale-105 transition-all shadow-xl">
            Apply for Admission
          </Link>
        </FadeIn>
      </section>
    </div>
  );
}
