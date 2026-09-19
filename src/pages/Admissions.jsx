import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { CheckCircle, Phone, Mail, Loader2, Printer } from 'lucide-react';
import { supabase } from '../lib/supabase';
import FadeIn from '../components/FadeIn';
import { SCHOOL } from '../lib/constants';

const schema = z.object({
  applicant_name: z.string().min(2, 'Applicant name is required'),
  date_of_birth: z.string().min(1, 'Date of birth is required'),
  gender: z.enum(['Male', 'Female'], { required_error: 'Please select gender' }),
  level: z.enum(['Nursery', 'Primary', 'Secondary'], { required_error: 'Please select level' }),
  parent_name: z.string().min(2, 'Parent name is required'),
  phone: z.string().min(10, 'Valid phone number is required'),
  email: z.string().email('Valid email is required'),
  message: z.string().optional(),
});

export default function Admissions() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: zodResolver(schema),
  });

  useEffect(() => {
    document.title = `Admissions - ${SCHOOL.name}`;
    
    // Set meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', `Apply for admission to ${SCHOOL.name} for the 2026/2027 academic session. Learn about our admission process, requirements, and how to enroll your child.`);
    }
  }, []);

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    
    // Insert into Supabase
    const { error } = await supabase
      .from('admission_applications')
      .insert([data]);

    setIsSubmitting(false);

    if (error) {
      alert('There was an error submitting your application. Please try again or contact the school.');
      console.error(error);
    } else {
      setIsSuccess(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });

      // Notify the school by email (best-effort; submission is already saved above)
      fetch('/api/notify/admission', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          student_name: data.applicant_name,
          date_of_birth: data.date_of_birth,
          program_applying_for: data.level,
          parent_name: data.parent_name,
          parent_email: data.email,
          parent_phone: data.phone,
          message: data.message,
        }),
      }).catch((err) => console.error('Email notification failed:', err));
    }
  };

  const handlePrint = () => {
    window.print();
  };

  if (isSuccess) {
    return (
      <div className="w-full min-h-[70vh] bg-surface flex items-center justify-center py-20 px-4">
        <FadeIn className="bg-white max-w-xl w-full rounded-3xl p-10 text-center shadow-xl border border-gray-100">
          <div className="w-24 h-24 bg-success/10 text-success rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-12 h-12" />
          </div>
          <h2 className="text-3xl font-heading font-bold text-navy mb-4">Application Submitted Successfully</h2>
          <p className="text-muted text-lg mb-8 leading-relaxed" role="status" aria-live="polite">
            Thank you for choosing Triton International School. We have received your application and will review it shortly. Our admissions team will contact you within 2–3 working days regarding the next steps and assessment dates.
          </p>
          <button 
            onClick={() => { reset(); setIsSuccess(false); }}
            className="px-8 py-3 bg-primary text-white rounded-full font-heading font-bold hover:bg-primary-dark transition-colors"
          >
            Submit Another Application
          </button>
        </FadeIn>
      </div>
    );
  }

  return (
    <div className="w-full bg-surface pb-24">
      {/* Hero */}
      <section className="bg-gradient-to-r from-success to-primary py-24 px-4 sm:px-6 lg:px-8 text-center text-white relative">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1577896851231-70ef18881754?w=1600&q=80')] opacity-10 bg-cover bg-center mix-blend-overlay" />
        <FadeIn className="relative z-10">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-heading font-extrabold mb-4">
            Admissions 2026/2027
          </h1>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto">
            Take the first step towards an extraordinary education for your child.
          </p>
        </FadeIn>
      </section>

      {/* 4-Step Process */}
      <section className="py-16 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-heading font-bold text-navy">The Admission Process</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { num: '1', title: 'Submit Application', desc: 'Fill the online form below with accurate details.' },
              { num: '2', title: 'Receive Confirmation', desc: 'We will review and respond within 2–3 working days.' },
              { num: '3', title: 'Entrance Assessment', desc: 'Child attends a brief assessment or interview.' },
              { num: '4', title: 'Admission Offered', desc: 'Accept the offer and join the Triton family.' }
            ].map((step, i) => (
              <FadeIn key={i} delay={i * 100} className="relative">
                <div className="bg-surface rounded-2xl p-6 text-center border border-gray-200 h-full">
                  <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center text-xl font-black font-heading mx-auto mb-4 shadow-md">
                    {step.num}
                  </div>
                  <h3 className="font-heading font-bold text-navy mb-2">{step.title}</h3>
                  <p className="text-sm text-muted">{step.desc}</p>
                </div>
                {i < 3 && <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-0.5 bg-gray-200" />}
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Main Layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-8 print:hidden">
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 sticky top-[120px]">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-heading font-bold text-navy">Requirements</h3>
                <button 
                  onClick={handlePrint}
                  className="text-muted hover:text-primary bg-gray-50 p-2 rounded-full transition-colors"
                  title="Print Requirements"
                >
                  <Printer className="w-5 h-5" />
                </button>
              </div>
              
              <ul className="space-y-4 mb-8">
                {[
                  'Birth certificate or age declaration',
                  'Previous school report cards (where applicable)',
                  'Passport photographs (2–4)',
                  'Immunization card (Nursery/Primary only)',
                  'Parent/guardian valid ID',
                  'Completed application form'
                ].map((req, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm">
                    <CheckCircle className="w-5 h-5 text-success shrink-0" />
                    <span className="text-muted leading-tight pt-0.5">{req}</span>
                  </li>
                ))}
              </ul>

              <div className="bg-success-light rounded-2xl p-6 border border-success/20">
                <h4 className="font-heading font-bold text-success mb-2 text-lg">Need Help?</h4>
                <p className="text-sm text-success/80 mb-4">Contact our admissions office for assistance.</p>
                <div className="space-y-2 text-sm font-medium text-success text-center sm:text-left">
                  <a href={`tel:${SCHOOL.phone.replace(/\s/g, '')}`} className="flex items-center gap-2 justify-center sm:justify-start hover:underline">
                    <Phone className="w-4 h-4" /> {SCHOOL.phone}
                  </a>
                  <a href={`mailto:${SCHOOL.email}`} className="flex items-center gap-2 justify-center sm:justify-start hover:underline break-all">
                    <Mail className="w-4 h-4" /> {SCHOOL.email}
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-3xl p-8 sm:p-10 shadow-lg border border-gray-100">
              <h2 className="text-2xl font-heading font-bold text-navy mb-8 pb-4 border-b border-gray-100">Application Form</h2>
              
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                
                {/* Applicant Info */}
                <div>
                  <h3 className="text-sm font-bold text-primary uppercase tracking-wider mb-6">Applicant Information</h3>
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-navy mb-1">Full Name *</label>
                      <input 
                        {...register('applicant_name')} 
                        className={`w-full p-3 bg-gray-50 border ${errors.applicant_name ? 'border-red-500' : 'border-gray-200'} rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all`}
                        placeholder="Child's legal name"
                      />
                      {errors.applicant_name && <p className="text-red-500 text-xs mt-1">{errors.applicant_name.message}</p>}
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-navy mb-1">Date of Birth *</label>
                        <input 
                          type="date"
                          {...register('date_of_birth')} 
                          className={`w-full p-3 bg-gray-50 border ${errors.date_of_birth ? 'border-red-500' : 'border-gray-200'} rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all`}
                        />
                        {errors.date_of_birth && <p className="text-red-500 text-xs mt-1">{errors.date_of_birth.message}</p>}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-navy mb-1">Gender *</label>
                        <select 
                          {...register('gender')} 
                          className={`w-full p-3 bg-gray-50 border ${errors.gender ? 'border-red-500' : 'border-gray-200'} rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all`}
                        >
                          <option value="">Select Gender</option>
                          <option value="Male">Male</option>
                          <option value="Female">Female</option>
                        </select>
                        {errors.gender && <p className="text-red-500 text-xs mt-1">{errors.gender.message}</p>}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-navy mb-1">Level Applying For *</label>
                      <select 
                        {...register('level')} 
                        className={`w-full p-3 bg-gray-50 border ${errors.level ? 'border-red-500' : 'border-gray-200'} rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all`}
                      >
                        <option value="">Select Level</option>
                        <option value="Nursery">Nursery School</option>
                        <option value="Primary">Primary School</option>
                        <option value="Secondary">Secondary School (JSS/SSS)</option>
                      </select>
                      {errors.level && <p className="text-red-500 text-xs mt-1">{errors.level.message}</p>}
                    </div>
                  </div>
                </div>

                {/* Parent Info */}
                <div>
                  <h3 className="text-sm font-bold text-primary uppercase tracking-wider mb-6 pt-6 border-t border-gray-100">Parent/Guardian Information</h3>
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-navy mb-1">Parent/Guardian Name *</label>
                      <input 
                        {...register('parent_name')} 
                        className={`w-full p-3 bg-gray-50 border ${errors.parent_name ? 'border-red-500' : 'border-gray-200'} rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all`}
                        placeholder="Your full name"
                      />
                      {errors.parent_name && <p className="text-red-500 text-xs mt-1">{errors.parent_name.message}</p>}
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-navy mb-1">Phone Number *</label>
                        <input 
                          type="tel"
                          {...register('phone')} 
                          className={`w-full p-3 bg-gray-50 border ${errors.phone ? 'border-red-500' : 'border-gray-200'} rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all`}
                          placeholder="e.g. 0706 264 1324"
                        />
                        {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-navy mb-1">Email Address *</label>
                        <input 
                          type="email"
                          {...register('email')} 
                          className={`w-full p-3 bg-gray-50 border ${errors.email ? 'border-red-500' : 'border-gray-200'} rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all`}
                          placeholder="you@example.com"
                        />
                        {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-navy mb-1">Additional Information (Optional)</label>
                      <textarea 
                        {...register('message')} 
                        rows={4}
                        className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                        placeholder="Any medical conditions, previous schools, or notes for the admission team."
                      />
                    </div>
                  </div>
                </div>

                <div className="pt-6">
                  <button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-success to-green-500 text-white p-4 rounded-xl font-heading font-bold text-lg hover:shadow-lg hover:-translate-y-0.5 transition-all disabled:opacity-70 disabled:hover:translate-y-0 disabled:shadow-none flex items-center justify-center"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-6 h-6 mr-2 animate-spin" /> Submitting...
                      </>
                    ) : 'Submit Application'}
                  </button>
                  <p className="text-xs text-center text-muted mt-4">
                    By submitting, you confirm that all information provided is accurate to the best of your knowledge.
                  </p>
                </div>

              </form>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
