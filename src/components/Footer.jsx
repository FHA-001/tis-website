import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Globe } from 'lucide-react';
import { SCHOOL } from '../lib/constants';

export default function Footer() {
  return (
    <footer className="bg-navy pt-16 pb-8 text-blue-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          
          {/* Brand Column */}
          <div className="flex flex-col gap-6">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary-light to-white p-1">
              <img 
                src="https://media.base44.com/images/public/6a3d0beeb6c22560489f6db1/293ad5186_5902013719250669943.jpg" 
                alt="Logo" 
                className="w-full h-full object-contain rounded-full bg-white"
              />
            </div>
            <div>
              <h3 className="text-white font-heading font-bold text-xl mb-2">{SCHOOL.name}</h3>
              <div className="inline-block px-3 py-1 bg-success/20 border border-success/30 rounded-full">
                <p className="text-success-light italic text-sm text-center">
                  {SCHOOL.motto}
                </p>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-heading font-semibold text-lg mb-6">Quick Links</h4>
            <ul className="flex flex-col gap-3">
              {['Home', 'About', 'Programs', 'Admissions', 'Staff', 'Facilities', 'Gallery', 'News', 'Contact'].map(link => (
                <li key={link}>
                  <Link 
                    to={link === 'Home' ? '/' : `/${link.toLowerCase()}`}
                    className="hover:text-success transition-colors"
                  >
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Programs */}
          <div>
            <h4 className="text-white font-heading font-semibold text-lg mb-6">Programs</h4>
            <ul className="flex flex-col gap-3">
              <li><Link to="/programs" className="hover:text-success transition-colors">Nursery</Link></li>
              <li><Link to="/programs" className="hover:text-success transition-colors">Primary</Link></li>
              <li><Link to="/programs" className="hover:text-success transition-colors">Junior Secondary</Link></li>
              <li><Link to="/programs" className="hover:text-success transition-colors">Senior Secondary</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-heading font-semibold text-lg mb-6">Contact Us</h4>
            <ul className="flex flex-col gap-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-success shrink-0 mt-1" />
                <span>{SCHOOL.address}</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-success shrink-0" />
                <a href={`tel:${SCHOOL.phone.replace(/\s/g, '')}`} className="hover:text-success transition-colors">{SCHOOL.phone}</a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-success shrink-0" />
                <a href={`mailto:${SCHOOL.email}`} className="hover:text-success transition-colors">{SCHOOL.email}</a>
              </li>
              <li className="flex items-center gap-3">
                <Globe className="w-5 h-5 text-success shrink-0" />
                <a href={`https://${SCHOOL.website}`} target="_blank" rel="noopener noreferrer" className="hover:text-success transition-colors">{SCHOOL.website}</a>
              </li>
            </ul>
          </div>

        </div>

        <div className="pt-8 border-t border-slate-700 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm">
            &copy; {new Date().getFullYear()} {SCHOOL.name}. All rights reserved.
          </p>
          <p className="text-sm">
            Located in Kuchikau, Nasarawa State, Nigeria.
          </p>
        </div>
      </div>
    </footer>
  );
}
