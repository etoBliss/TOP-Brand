import { useState } from 'react';
import { Link } from 'react-router-dom';
import { db } from '../lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import emailjs from '@emailjs/browser';
import curator from '../assets/Frame 5.svg';

// EmailJS Configuration (Replace with your keys)
const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
const EMAILJS_ADMIN_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_ADMIN_TEMPLATE_ID;
import { ArrowRight, ChevronDown, Home as HomeIcon, Building2, BookOpen, Mail, AtSign, Share2, ArrowUpRight } from 'lucide-react';
import { Instagram, XIcon, Linkedin } from '../components/BrandIcons';

const Connect = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    service: '',
    message: ''
  });
  const [status, setStatus] = useState('idle'); // idle, loading, success, error

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    console.log('Attempting to transmit vision to Firestore...');
    
    try {
      const docRef = await addDoc(collection(db, 'inquiries'), {
        ...formData,
        source: 'Connect Page',
        timestamp: serverTimestamp()
      });
      console.log('Vision transmitted successfully. Reference ID:', docRef.id);

      // EmailJS Notification to Admin
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_ADMIN_TEMPLATE_ID,
        {
          from_name: formData.name,
          from_email: formData.email,
          message: formData.message,
          service_requested: formData.service,
          admin_email: "popooladolapo7@gmail.com"
        },
        EMAILJS_PUBLIC_KEY
      );

      setStatus('success');
      setFormData({ name: '', email: '', service: '', message: '' });
    } catch (err) {
      console.error('Transmission failed:', err);
      setStatus('error');
      
      // Detailed error for EmailJS
      const errorMsg = err?.text || err?.message || 'Unknown error';
      
      if (err.code === 'permission-denied') {
        alert('Permission Denied: Please check your Firestore Security Rules.');
      } else {
        alert('Transmission Error: ' + errorMsg);
      }
    }
  };

  return (
    <main className="min-h-screen flex flex-col relative text-on-surface bg-surface overflow-x-hidden">
      <div className="fixed inset-0 grain-overlay z-[100] pointer-events-none opacity-[0.03]"></div>
      
      {/* Hero Section: Architectural Narrative */}
      <section className="pt-32 md:pt-48 pb-16 md:pb-32 px-6 md:px-16 lg:px-24 mx-auto w-full">
        <div className="max-w-7xl mx-auto">
          <p className="text-[10px] uppercase tracking-[0.4em] text-secondary font-semibold mb-6">Strategic Partnership</p>
          <h1 className="font-headline text-6xl md:text-8xl lg:text-[10rem] font-bold tracking-tighter text-neutral-100 leading-[0.85] mb-12 italic">
            Let’s Build <br /><span className="not-italic text-on-surface-variant">Together</span>
          </h1>
          
          <div className="w-16 h-[2px] bg-primary-container mb-12"></div>
          
          <div className="flex items-center gap-6">
            <div className="w-16 h-16 md:w-20 md:h-20 overflow-hidden bg-surface-container grayscale hover:grayscale-0 transition-all duration-700 ring-1 ring-white/10">
              <img 
                alt="Oluwadolapo Popoola" 
                className="w-full h-full object-cover" 
                src={curator}
              />
            </div>
            <div>
              <p className="font-headline text-xl md:text-2xl font-bold text-neutral-100">Oluwadolapo Popoola</p>
              <p className="text-sm text-neutral-500 tracking-tight font-body">@thatspace_boy</p>
            </div>
          </div>
        </div>
      </section>

      {/* Form Section: Architectural Inquiry */}
      <section className="bg-surface-container-low p-6 md:p-16 lg:p-24 mx-auto w-full">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-16">
          <div className="md:col-span-7 bg-surface p-8 md:p-16 ring-1 ring-white/5 shadow-2xl">
            {status === 'success' ? (
              <div className="space-y-8 py-12 text-center">
                <div className="w-16 h-16 bg-primary-container/20 flex items-center justify-center mx-auto">
                  <ArrowRight className="text-primary -rotate-45" />
                </div>
                <h3 className="font-headline text-2xl md:text-3xl">Transmission Successful.</h3>
                <p className="font-body text-stone-400">I will respond shortly to review your strategic vision.</p>
                <button onClick={() => setStatus('idle')} className="text-[10px] uppercase tracking-widest text-secondary border-b border-secondary/20 hover:text-white transition-colors">Submit another inquiry</button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-10">
                <div className="relative">
                  <label className="text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-bold mb-2 block">Identity (Name)</label>
                  <input 
                    className="w-full bg-transparent border-0 border-b border-outline-variant/30 py-4 px-0 text-neutral-100 focus:ring-0 focus:border-secondary transition-colors placeholder:text-neutral-700" 
                    placeholder="Your Full Name" type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                  />
                </div>
                <div className="relative">
                  <label className="text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-bold mb-2 block">Direct Email</label>
                  <input 
                    className="w-full bg-transparent border-0 border-b border-outline-variant/30 py-4 px-0 text-neutral-100 focus:ring-0 focus:border-secondary transition-colors placeholder:text-neutral-700" 
                    placeholder="hello@brand.com" type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                  />
                </div>
                <div className="relative">
                  <label className="text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-bold mb-2 block">Engagement Type</label>
                  <select 
                    className="w-full bg-transparent border-0 border-b border-outline-variant/30 py-4 px-0 text-neutral-100 focus:ring-0 focus:border-secondary transition-colors appearance-none cursor-pointer"
                    required
                    value={formData.service}
                    onChange={(e) => setFormData({...formData, service: e.target.value})}
                  >
                    <option className="bg-surface" value="" disabled>Select engagement type</option>
                    <option className="bg-surface" value="Brand & Business Strategy">Brand & Business Strategy</option>
                    <option className="bg-surface" value="Personal Brand Consulting">Personal Brand Consulting</option>
                    <option className="bg-surface" value="Strategic Advisory">Strategic Advisory</option>
                    <option className="bg-surface" value="Public Speaking">Public Speaking</option>
                    <option className="bg-surface" value="Voice Over Acting">Voice Over Acting</option>
                  </select>
                  <ChevronDown className="absolute right-0 bottom-4 text-neutral-600 w-4 h-4 pointer-events-none" />
                </div>
                <div className="relative">
                  <label className="text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-bold mb-2 block">The Brief (Strategic Vision)</label>
                  <textarea 
                    className="w-full bg-transparent border-0 border-b border-outline-variant/30 py-4 px-0 text-neutral-100 focus:ring-0 focus:border-secondary transition-colors placeholder:text-neutral-700 resize-none" 
                    placeholder="Describe your current bottleneck or strategic vision..." rows="4"
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                  ></textarea>
                </div>
                <button 
                  disabled={status === 'loading'}
                  className="bg-primary-container text-on-primary-container py-6 px-8 text-[12px] uppercase tracking-[0.3em] font-bold text-center hover:bg-on-primary-fixed-variant transition-colors duration-400 group flex items-center justify-center gap-3 disabled:opacity-50 active:scale-[0.99]" 
                  type="submit"
                >
                  {status === 'loading' ? 'Transmitting...' : 'Initiate Transformation'}
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </form>
            )}
          </div>

          <div className="md:col-span-5 space-y-12">
            {/* Social Grid */}
            <div className="grid grid-cols-2 gap-px bg-neutral-900 border border-neutral-900">
              <a href="https://www.instagram.com/thatspace_boy?igsh=MW80ZjJodnZidnlxNW==" target="_blank" rel="noopener noreferrer" className="bg-surface p-8 group flex flex-col justify-between aspect-square hover:bg-surface-container-high transition-colors">
                <Instagram className="w-6 h-6 text-neutral-600 group-hover:text-primary transition-colors" />
                <span className="text-[10px] uppercase tracking-widest text-neutral-500 font-bold">Instagram</span>
              </a>
              <a href="https://ng.linkedin.com/in/the-oluwadolapo-popoola-top-b22b1a21a" target="_blank" rel="noopener noreferrer" className="bg-surface p-8 group flex flex-col justify-between aspect-square hover:bg-surface-container-high transition-colors">
                <Linkedin className="w-6 h-6 text-neutral-600 group-hover:text-primary transition-colors" />
                <span className="text-[10px] uppercase tracking-widest text-neutral-500 font-bold">LinkedIn</span>
              </a>
              <a href="https://x.com/thatspace_boy?s=21" target="_blank" rel="noopener noreferrer" className="bg-surface p-8 group flex flex-col justify-between aspect-square hover:bg-surface-container-high transition-colors">
                <XIcon className="w-6 h-6 text-neutral-600 group-hover:text-primary transition-colors" />
                <span className="text-[10px] uppercase tracking-widest text-neutral-500 font-bold">X (Twitter)</span>
              </a>
              <div className="bg-surface p-8 flex items-center justify-center aspect-square relative overflow-hidden">
                <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(#9E0B00 1px, transparent 1px)', backgroundSize: '10px 10px' }}></div>
                <p className="font-headline font-bold text-6xl text-neutral-900">01</p>
              </div>
            </div>

            {/* Aesthetic Quote */}
            <div className="pl-6 border-l-4 border-primary-container py-4">
              <h2 className="font-headline text-3xl font-light text-secondary leading-tight italic">
                "Top vision. Top strategy. Top execution."
              </h2>
            </div>
          </div>
        </div>
      </section>

      {/* Archive Teaser / Bento Section: Multi-row stacking on mobile */}
      <section className="py-24 md:py-32 px-6 md:px-16 lg:px-24 max-w-7xl mx-auto w-full space-y-10 md:space-y-12">
        <h3 className="text-[10px] uppercase tracking-[0.4em] md:tracking-[0.5em] text-stone-500 text-center">Visual Index</h3>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 h-auto md:h-[600px]">
          <div className="col-span-1 md:col-span-4 bg-surface-container-high overflow-hidden relative group aspect-[4/5] md:aspect-auto">
            <img 
              alt="Minimal Detail" 
              className="w-full h-full object-cover scale-110 group-hover:scale-100 transition-transform duration-1000 grayscale opacity-40 group-hover:opacity-100" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuChCn6oVEtmyzLKhFKLI9DZp-8GWkyvuvU1MLk_-ez11vIrHTZ9knDM12WlDLNarMMLrcrX1DhPi4-5isCUuE36VkNZk1cDYYoP7AUnwq0ij2rH4igqnXuKHW4vMywxE3AdmWdcJxJxMCASMD0lqeHLicSkQxFikwI4h3DHRqC-kSjZRBAyDDkZ25g1FFyCGcY5dksj_VEs9QLp7eMvD41c-adqroeMEyBnMsz4kEbrU9zJ6ChSao4vu88C1huHMsdDZMiN2EFPqpI"
            />
            <div className="absolute bottom-6 left-6">
              <span className="text-[10px] uppercase tracking-widest text-secondary">001. Form</span>
            </div>
          </div>
          <div className="col-span-1 md:col-span-8 bg-surface-container-high overflow-hidden relative group aspect-[16/9] md:aspect-auto">
            <img 
              alt="Studio Space" 
              className="w-full h-full object-cover scale-110 group-hover:scale-100 transition-transform duration-1000 grayscale opacity-40 group-hover:opacity-100" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuB6I1LSjpjjuR53Db7bpmZ5IWLbC8EqfzbQHeUUjFCPZUiZjz4ExYYz5EfVtFqLZjGWelu4jJylZhSou5uVgwttluSXzbj3Xbpn0orQ13frfWqnV6xRwSkRTd7SzafQa92ipqdKjpLcJJEyY9BpxLayVF0em2wpkjOFC861Wiqz70tTzagyQ9RCgLCxOyWWCO1n9Tfw9_EfK8Q62Ay1aUmWew-Y2ymXIB2U_agASGGZmUz0qlx3EVSd8YwzcxQw2NvgQWGkRzurJwQ"
            />
            <div className="absolute bottom-6 left-6">
              <span className="text-[10px] uppercase tracking-widest text-secondary">002. Space</span>
            </div>
          </div>
        </div>
      </section>

      {/* Floating Branding Accent */}
      <div className="fixed bottom-12 right-12 z-50 mix-blend-difference hidden lg:block opacity-20 hover:opacity-100 transition-opacity">
        <p className="text-[10px] uppercase tracking-[1em] vertical-text text-white cursor-default" style={{ writingMode: 'vertical-rl' }}>VISION. STRATEGY. EXECUTION.</p>
      </div>
      {/* Mobile Bottom Nav */}
      <nav className="fixed bottom-0 left-0 w-full bg-stone-950/80 backdrop-blur-xl md:hidden flex justify-around items-center py-4 px-6 z-50 border-t border-white/5 pb-2">
        <Link to="/" className="flex flex-col items-center text-stone-500">
          <HomeIcon className="w-5 h-5 mb-1" />
          <span className="text-[8px] font-label uppercase tracking-tighter">Home</span>
        </Link>
        <Link to="/services" className="flex flex-col items-center text-stone-500">
          <Building2 className="w-5 h-5 mb-1" />
          <span className="text-[8px] font-label uppercase tracking-tighter">Services</span>
        </Link>
        <Link to="/blog" className="flex flex-col items-center text-stone-500">
          <BookOpen className="w-5 h-5 mb-1" />
          <span className="text-[8px] font-label uppercase tracking-tighter">Insights</span>
        </Link>
        <Link to="/connect" className="flex flex-col items-center text-white border-b-2 border-primary pb-1">
          <Mail className="w-5 h-5 mb-1" />
          <span className="text-[8px] font-label uppercase tracking-tighter">Connect</span>
        </Link>
      </nav>
    </main>
  );
};

export default Connect;
