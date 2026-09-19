import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, ChevronRight } from 'lucide-react';
import FadeIn from '../components/FadeIn';
import { SCHOOL } from '../lib/constants';

const programs = [
  {
    id: 'nursery',
    name: 'Nursery School',
    emoji: '🌱',
    ages: '2–5',
    classes: 'Creche, Nursery 1, Nursery 2',
    colorTheme: 'yellow',
    bgLight: 'bg-yellow-50',
    textDark: 'text-yellow-700',
    borderCol: 'border-yellow-200',
    gradient: 'from-yellow-400 to-orange-400',
    btnGradient: 'from-yellow-500 to-orange-500',
    desc: 'Our Early Years program provides a warm, stimulating environment where young children take their first steps into learning. Through play-based and structured activities, we focus on sensory development, basic numeracy, literacy, and vital social skills. Every child is nurtured to feel secure and confident.',
    highlights: [
      'Play-based learning curriculum',
      'Sensory and motor skills development',
      'Early phonics and numeracy introduction',
      'Safe, colorful, and engaging classrooms',
      'High teacher-to-child ratio for personal attention'
    ]
  },
  {
    id: 'primary',
    name: 'Primary School',
    emoji: '📚',
    ages: '6–11',
    classes: 'Primary 1–6',
    colorTheme: 'blue',
    bgLight: 'bg-blue-50',
    textDark: 'text-blue-700',
    borderCol: 'border-blue-200',
    gradient: 'from-blue-400 to-blue-600',
    btnGradient: 'from-blue-500 to-blue-600',
    desc: 'The Primary section builds a solid academic foundation. We blend the national curriculum with international best practices to foster critical thinking, creativity, and a love for reading. Students are introduced to core subjects alongside ICT, physical education, and the creative arts.',
    highlights: [
      'Comprehensive core subjects (Math, English, Science)',
      'Integration of ICT and computer literacy',
      'Focus on reading comprehension and creative writing',
      'Continuous assessment and progress tracking',
      'Extracurricular clubs and sports activities'
    ]
  },
  {
    id: 'jss',
    name: 'Junior Secondary (JSS)',
    emoji: '🎓',
    ages: '12–14',
    classes: 'JSS 1–3',
    colorTheme: 'green',
    bgLight: 'bg-green-50',
    textDark: 'text-green-700',
    borderCol: 'border-green-200',
    gradient: 'from-green-400 to-green-600',
    btnGradient: 'from-success to-green-600',
    desc: 'Junior Secondary marks the transition to specialized learning. Students explore a broader range of subjects, discovering their strengths and interests. The focus is on preparing them thoroughly for the Basic Education Certificate Examination (BECE) while developing discipline and independent study habits.',
    highlights: [
      'Broad curriculum covering Sciences, Arts, and Vocational subjects',
      'Intensive BECE preparation and mock exams',
      'Introduction to practical laboratory work',
      'Leadership and character development programs',
      'Guidance and counseling services'
    ]
  },
  {
    id: 'sss',
    name: 'Senior Secondary (SSS)',
    emoji: '🏆',
    ages: '15–18',
    classes: 'SSS 1–3',
    colorTheme: 'purple',
    bgLight: 'bg-purple-50',
    textDark: 'text-purple-700',
    borderCol: 'border-purple-200',
    gradient: 'from-purple-500 to-purple-700',
    btnGradient: 'from-purple-600 to-purple-800',
    desc: 'Our Senior Secondary program is a rigorous, specialized phase where students choose between Science, Arts, or Commercial pathways. We provide expert instruction aimed at outstanding performance in WAEC, NECO, and JAMB, preparing them for admission into top universities locally and globally.',
    highlights: [
      'Specialized pathways: Science, Arts, Commercial',
      'Advanced practicals in Physics, Chemistry, and Biology labs',
      'Intensive WAEC/NECO/JAMB preparatory classes',
      'Career counseling and university admission guidance',
      'Advanced leadership roles (Prefectship)'
    ]
  }
];

export default function Programs() {
  useEffect(() => {
    document.title = `Academic Programs - ${SCHOOL.name}`;
    
    // Set meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', `Explore ${SCHOOL.name}'s comprehensive academic programs: Nursery (ages 2-5), Primary (ages 6-11), Junior Secondary (ages 12-14), and Senior Secondary (ages 15-18). Excellence in education.`);
    }
  }, []);

  return (
    <div className="w-full bg-surface pb-24">
      {/* Hero */}
      <section className="bg-navy py-20 px-4 sm:px-6 lg:px-8 text-center text-white relative">
        <div className="absolute inset-0 bg-gradient-to-r from-primary-dark to-navy opacity-90" />
        <FadeIn className="relative z-10">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-heading font-extrabold mb-6">
            Academic Programs
          </h1>
          <p className="text-xl text-blue-200 max-w-2xl mx-auto">
            A continuous journey of excellence from Early Years to University Preparation.
          </p>
        </FadeIn>
      </section>

      {/* Programs List */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 relative z-20 flex flex-col gap-12">
        {programs.map((prog, index) => (
          <FadeIn key={prog.id} delay={index * 100}>
            <div className="bg-white rounded-3xl overflow-hidden shadow-lg border border-gray-100 flex flex-col lg:flex-row">
              {/* Left Side: Description */}
              <div className="p-8 lg:p-12 lg:w-3/5 flex flex-col justify-between">
                <div>
                  <div className="flex flex-wrap items-center gap-4 mb-6">
                    <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r ${prog.gradient} text-white font-bold text-sm shadow-sm`}>
                      <span className="text-lg">{prog.emoji}</span>
                      {prog.name}
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${prog.bgLight} ${prog.textDark} ${prog.borderCol} border`}>
                      Ages {prog.ages}
                    </span>
                  </div>
                  
                  <h2 className="text-3xl font-heading font-bold text-navy mb-4">{prog.name}</h2>
                  <p className="text-muted text-lg leading-relaxed mb-8">
                    {prog.desc}
                  </p>
                  
                  <div className="mb-8">
                    <h4 className="text-sm font-bold text-navy uppercase tracking-wider mb-3">Classes Offered</h4>
                    <div className="flex flex-wrap gap-2">
                      {prog.classes.split(', ').map(cls => (
                        <span key={cls} className="px-4 py-2 bg-white border border-primary/20 text-primary font-medium rounded-full shadow-sm">
                          {cls}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <Link 
                  to="/admissions" 
                  className={`inline-flex items-center justify-center gap-2 px-8 py-3 rounded-full text-white font-heading font-bold shadow-md hover:shadow-lg transition-transform hover:-translate-y-1 bg-gradient-to-r ${prog.btnGradient} w-fit`}
                >
                  Apply for {prog.name.split(' ')[0]} <ChevronRight className="w-5 h-5" />
                </Link>
              </div>

              {/* Right Side: Highlights */}
              <div className={`${prog.bgLight} p-8 lg:p-12 lg:w-2/5 border-t lg:border-t-0 lg:border-l ${prog.borderCol}`}>
                <h3 className={`text-xl font-heading font-bold ${prog.textDark} mb-6`}>Programme Highlights</h3>
                <ul className="flex flex-col gap-4">
                  {prog.highlights.map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <CheckCircle className={`w-6 h-6 shrink-0 ${prog.textDark}`} />
                      <span className="text-navy font-medium leading-tight pt-0.5">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </FadeIn>
        ))}
      </div>
    </div>
  );
}
