import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { MapPin, Phone, Mail, Globe, Loader2, CheckCircle, Clock } from 'lucide-react';
import FadeIn from '../components/FadeIn';
import { SCHOOL } from '../lib/constants';

const schema = z.object({
  name: z.string().min(2, 'Name is required'),
  email: z.string().email('Valid email is required'),
  phone: z.string().optional(),
  subject: z.string().optional(),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: zodResolver(schema),
  });

  useEffect(() => {
    document.title = `Contact Us - ${SCHOOL.name}`;
    
    // Set meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', `Get in touch with ${SCHOOL.name}. Contact us for inquiries, admissions, or general information. Visit our campus in Kuchikau, Nasarawa State or call us.`);
    }
  }, []);

  const onSubmit = async (data) => {
    setIsSubmitting(true);

    try {
      await fetch('/api/notify/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
    } catch (err) {
      console.error('Email notification failed:', err);
    }

    setIsSubmitting(false);
    setIsSuccess(true);
    reset();
    
    setTimeout(() => setIsSuccess(false), 5000);
  };

  return (
    <div className="w-full bg-surface pb-24">
      {/* Hero */}
      <section className="bg-primary py-24 px-4 sm:px-6 lg:px-8 text-center text-white relative">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1577896851231-70ef18881754?w=1600&q=80')] opacity-10 bg-cover bg-center mix-blend-overlay" />
        <FadeIn className="relative z-10">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-heading font-extrabold mb-6">
            Contact Us
          </h1>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto">
            We'd love to hear from you. Get in touch with our team for inquiries, admissions, or general information.
          </p>
        </FadeIn>
      </section>

      {/* Info Cards */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-12 relative z-20 mb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <FadeIn delay={0}>
            <div className="bg-white rounded-3xl p-6 shadow-md border border-gray-100 flex flex-col items-center text-center h-full hover:-translate-y-1 transition-transform">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-primary mb-4">
                <MapPin className="w-6 h-6" />
              </div>
              <h3 className="font-heading font-bold text-navy mb-2">Visit Us</h3>
              <p className="text-sm text-muted">{SCHOOL.fullAddress}</p>
            </div>
          </FadeIn>
          
          <FadeIn delay={100}>
            <div className="bg-white rounded-3xl p-6 shadow-md border border-gray-100 flex flex-col items-center text-center h-full hover:-translate-y-1 transition-transform">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center text-success mb-4">
                <Phone className="w-6 h-6" />
              </div>
              <h3 className="font-heading font-bold text-navy mb-2">Call Us</h3>
              <p className="text-sm text-muted mb-1">{SCHOOL.phone}</p>
              <p className="text-xs text-muted font-medium">Mon–Fri 8am–4pm</p>
            </div>
          </FadeIn>

          <FadeIn delay={200}>
            <div className="bg-white rounded-3xl p-6 shadow-md border border-gray-100 flex flex-col items-center text-center h-full hover:-translate-y-1 transition-transform">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center text-purple-600 mb-4">
                <Mail className="w-6 h-6" />
              </div>
              <h3 className="font-heading font-bold text-navy mb-2">Email Us</h3>
              <a href={`mailto:${SCHOOL.email}`} className="text-sm text-muted hover:text-primary transition-colors mb-1 break-all">
                {SCHOOL.email}
              </a>
              <p className="text-xs text-muted font-medium">Reply within 24–48 hours</p>
            </div>
          </FadeIn>

          <FadeIn delay={300}>
            <div className="bg-white rounded-3xl p-6 shadow-md border border-gray-100 flex flex-col items-center text-center h-full hover:-translate-y-1 transition-transform">
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center text-orange-600 mb-4">
                <Globe className="w-6 h-6" />
              </div>
              <h3 className="font-heading font-bold text-navy mb-2">Website</h3>
              <a href={`https://${SCHOOL.website}`} target="_blank" rel="noopener noreferrer" className="text-sm text-muted hover:text-primary transition-colors">
                {SCHOOL.website}
              </a>
            </div>
          </FadeIn>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          
          {/* Form */}
          <FadeIn className="bg-white rounded-3xl p-8 sm:p-10 shadow-lg border border-gray-100">
            <h2 className="text-2xl font-heading font-bold text-navy mb-6">Send us a Message</h2>
            
            {isSuccess ? (
              <div className="bg-success-light border border-success/30 rounded-2xl p-8 text-center" role="status" aria-live="polite">
                <CheckCircle className="w-12 h-12 text-success mx-auto mb-4" />
                <h3 className="text-xl font-heading font-bold text-navy mb-2">Message Sent!</h3>
                <p className="text-muted">Thank you for reaching out. We will get back to you shortly.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-navy mb-1">Your Name *</label>
                    <input 
                      {...register('name')} 
                      className={`w-full p-3 bg-gray-50 border ${errors.name ? 'border-red-500' : 'border-gray-200'} rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all`}
                    />
                    {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-navy mb-1">Email Address *</label>
                    <input 
                      type="email"
                      {...register('email')} 
                      className={`w-full p-3 bg-gray-50 border ${errors.email ? 'border-red-500' : 'border-gray-200'} rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all`}
                    />
                    {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-navy mb-1">Phone Number</label>
                    <input 
                      type="tel"
                      {...register('phone')} 
                      className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-navy mb-1">Subject</label>
                    <input 
                      {...register('subject')} 
                      className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-navy mb-1">Message *</label>
                  <textarea 
                    {...register('message')} 
                    rows={5}
                    className={`w-full p-3 bg-gray-50 border ${errors.message ? 'border-red-500' : 'border-gray-200'} rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all resize-none`}
                  />
                  {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message.message}</p>}
                </div>

                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full bg-primary text-white p-4 rounded-xl font-heading font-bold text-lg hover:bg-primary-dark transition-colors disabled:opacity-70 flex items-center justify-center"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-6 h-6 mr-2 animate-spin" /> Sending...
                    </>
                  ) : 'Send Message'}
                </button>
              </form>
            )}
          </FadeIn>

          {/* Map & Hours */}
          <FadeIn delay={200} className="space-y-8">
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
              <div className="flex items-center gap-3 mb-6">
                <Clock className="w-6 h-6 text-primary" />
                <h2 className="text-2xl font-heading font-bold text-navy">Office Hours</h2>
              </div>
              <ul className="space-y-4">
                <li className="flex justify-between items-center pb-4 border-b border-gray-100">
                  <span className="font-medium text-navy">Monday – Friday</span>
                  <span className="text-success font-bold text-sm bg-success-light px-3 py-1 rounded-full">8:00 AM – 4:00 PM</span>
                </li>
                <li className="flex justify-between items-center pb-4 border-b border-gray-100">
                  <span className="font-medium text-navy">Saturday</span>
                  <span className="text-success font-bold text-sm bg-success-light px-3 py-1 rounded-full">9:00 AM – 1:00 PM (Admin)</span>
                </li>
                <li className="flex justify-between items-center">
                  <span className="font-medium text-navy">Sunday</span>
                  <span className="text-red-600 font-bold text-sm bg-red-100 px-3 py-1 rounded-full">Closed</span>
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-3xl p-4 shadow-sm border border-gray-100 h-[400px] overflow-hidden relative">
              <iframe 
                title="Triton International School Location Map"
                src="https://maps.google.com/maps?q=Masaka+Kuchikau+Nasarawa+Nigeria&t=&z=13&ie=UTF8&iwloc=&output=embed" 
                className="w-full h-full border-0 rounded-2xl"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </FadeIn>
        </div>
      </div>
    </div>
  );
}
