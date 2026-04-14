import { useState } from 'react';
import { db } from '../lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import emailjs from '@emailjs/browser';

// EmailJS Configuration (Replace with your keys)
const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
const EMAILJS_ADMIN_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_ADMIN_TEMPLATE_ID;
import { ArrowRight, ChevronDown } from 'lucide-react';

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
    <main className="min-h-screen flex flex-col relative text-white">
      <div className="fixed inset-0 grain-overlay z-[100]"></div>
      
      {/* Hero Section */}
      <section className="pt-48 pb-20 px-8 lg:px-24 max-w-7xl mx-auto w-full grid grid-cols-12 gap-12">
        <div className="col-span-12 lg:col-span-8 flex flex-col justify-center">
          <h2 className="text-7xl lg:text-[10rem] font-headline font-bold text-on-surface leading-[0.85] -tracking-tighter mb-12">
            Let’s Build <br />Together
          </h2>
          <div className="w-24 h-1 bg-primary-container mb-12"></div>
          <p className="text-lg lg:text-xl font-light text-tertiary max-w-xl leading-relaxed font-body">
            Transforming conceptual architecture into digital permanence. We curate spaces that breathe, move, and inspire.
          </p>
        </div>
        <div className="col-span-12 lg:col-span-4 relative aspect-[3/4] overflow-hidden">
          <img 
            alt="Architectural detail" 
            className="w-full h-full object-cover filter grayscale hover:grayscale-0 transition-all duration-1000" 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAK1PRwbpJv_EG0wQFzpx_RzBNl4ctknKAqENnjVlOamkjj12mcGNj6SlaMrY6VdTXM4-SdSCwrlMfLJC-rCTRQ3oW0AQCZOBAYmam4z8ope7U3yF0HOu_UuQjhKZNN1pV181zxF9827Pr8kGtxwsyRFUAAhFAlzOFbVUBY5d-2hhLnxF4f6E8jqw73nbwuNFEXc_ooieKxQtpCnS8DvHmx0d20CIUN6Z4UmmPUn8OydkE_ehtVxPfhuUqYO_hhIiYamq19pGkJ6iA"
          />
          <div className="absolute inset-0 border-[20px] border-surface-container-lowest/20 pointer-events-none"></div>
        </div>
      </section>

      {/* Form & Details Section */}
      <section className="py-32 bg-surface-container-lowest relative z-10">
        <div className="px-8 lg:px-24 max-w-7xl mx-auto grid grid-cols-12 gap-12 lg:gap-24">
          {/* Left: Info Column */}
          <div className="col-span-12 lg:col-span-5 space-y-16">
            <div>
              <h3 className="text-[10px] uppercase tracking-[0.4em] text-secondary font-bold mb-6">Social Command</h3>
              <p className="text-3xl font-headline italic text-on-surface">@thatspace_boy</p>
            </div>
            <div className="space-y-8">
              <h3 className="text-[10px] uppercase tracking-[0.4em] text-secondary font-bold">Contact Points</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-end border-b border-outline-variant pb-2">
                  <span className="text-sm font-label text-neutral-500 uppercase tracking-widest">Inquiries</span>
                  <span className="text-lg font-body text-on-surface">hello@popoola.design</span>
                </div>
                <div className="flex justify-between items-end border-b border-outline-variant pb-2">
                  <span className="text-sm font-label text-neutral-500 uppercase tracking-widest">Studio</span>
                  <span className="text-lg font-body text-on-surface">Lagos, NG</span>
                </div>
              </div>
            </div>
            <div className="relative pt-12 text-on-surface">
              <div className="absolute top-0 left-0 w-12 h-1 bg-primary-container"></div>
              <blockquote className="text-2xl font-headline text-tertiary leading-snug">
                "Precision is the difference between a building and a home; between a website and an experience."
              </blockquote>
            </div>
          </div>

          {/* Right: Inquiry Form */}
          <div className="col-span-12 lg:col-span-7 bg-surface p-10 lg:p-20 shadow-2xl relative overflow-hidden">
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-primary-container/10 blur-[100px] rounded-full"></div>
            <h4 className="text-2xl font-headline mb-12 text-on-surface">Inquiry Form</h4>
            
            {status === 'success' ? (
              <div className="space-y-8 py-12 text-center">
                <div className="w-16 h-16 bg-primary-container/20 rounded-full flex items-center justify-center mx-auto">
                  <ArrowRight className="text-primary -rotate-45" />
                </div>
                <h3 className="font-headline text-3xl">Vision Transmitted.</h3>
                <p className="font-body text-stone-400">We will respond shortly to curate your digital space.</p>
                <button onClick={() => setStatus('idle')} className="text-[10px] uppercase tracking-widest text-secondary border-b border-secondary/20">Send another inquiry</button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-10 relative z-10">
                <div className="relative group text-on-surface">
                  <input 
                    className="peer w-full bg-transparent border-0 border-b border-outline-variant focus:border-secondary focus:ring-0 px-0 py-4 transition-all duration-300 text-on-surface" 
                    id="name" placeholder=" " type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                  />
                  <label className="absolute top-4 left-0 text-[10px] uppercase tracking-[0.2em] text-neutral-500 pointer-events-none transition-all duration-300 peer-focus:-top-2 peer-focus:text-secondary peer-[:not(:placeholder-shown)]:-top-2" htmlFor="name">FullName</label>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                  <div className="relative group">
                    <input 
                      className="peer w-full bg-transparent border-0 border-b border-outline-variant focus:border-secondary focus:ring-0 px-0 py-4 transition-all duration-300 text-on-surface" 
                      id="email" placeholder=" " type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                    />
                    <label className="absolute top-4 left-0 text-[10px] uppercase tracking-[0.2em] text-neutral-500 pointer-events-none transition-all duration-300 peer-focus:-top-2 peer-focus:text-secondary peer-[:not(:placeholder-shown)]:-top-2" htmlFor="email">Email Address</label>
                  </div>
                  <div className="relative group">
                    <select 
                      className="peer w-full bg-transparent border-0 border-b border-outline-variant focus:border-secondary focus:ring-0 px-0 py-4 transition-all duration-300 text-on-surface appearance-none" 
                      id="service"
                      required
                      value={formData.service}
                      onChange={(e) => setFormData({...formData, service: e.target.value})}
                    >
                      <option className="bg-surface" value="" disabled></option>
                      <option className="bg-surface" value="ui">Architectural UI</option>
                      <option className="bg-surface" value="brand">Brand Identity</option>
                      <option className="bg-surface" value="consult">Design Strategy</option>
                    </select>
                    <label className="absolute top-4 left-0 text-[10px] uppercase tracking-[0.2em] text-neutral-500 pointer-events-none transition-all duration-300 peer-focus:-top-2 peer-focus:text-secondary peer-[:not(:placeholder-shown)]:-top-2" htmlFor="service">Subject Of Inquiry</label>
                    <ChevronDown className="absolute right-0 top-6 text-neutral-600 w-5 h-5 pointer-events-none" />
                  </div>
                </div>
                <div className="relative group">
                  <textarea 
                    className="peer w-full bg-transparent border-0 border-b border-outline-variant focus:border-secondary focus:ring-0 px-0 py-4 transition-all duration-300 text-on-surface resize-none" 
                    id="message" placeholder=" " rows="4"
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                  ></textarea>
                  <label className="absolute top-4 left-0 text-[10px] uppercase tracking-[0.2em] text-neutral-500 pointer-events-none transition-all duration-300 peer-focus:-top-2 peer-focus:text-secondary peer-[:not(:placeholder-shown)]:-top-2" htmlFor="message">Project Vision</label>
                </div>
                <div className="flex justify-end pt-6">
                  <button 
                    disabled={status === 'loading'}
                    className="group flex items-center gap-4 bg-primary-container text-white px-12 py-5 font-bold tracking-[0.2em] text-xs uppercase hover:bg-on-primary-fixed-variant transition-all duration-500 disabled:opacity-50" 
                    type="submit"
                  >
                    {status === 'loading' ? 'Transmitting...' : 'Transmit Vision'}
                    <ArrowRight className="group-hover:translate-x-2 transition-transform duration-300 w-5 h-5" />
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* Archive Teaser / Bento Section */}
      <section className="py-32 px-8 lg:px-24 max-w-7xl mx-auto w-full space-y-12">
        <h3 className="text-[10px] uppercase tracking-[0.5em] text-neutral-500 text-center">Visual Index</h3>
        <div className="grid grid-cols-12 gap-8 h-[600px]">
          <div className="col-span-12 lg:col-span-4 bg-surface-container-high overflow-hidden relative group">
            <img 
              alt="Minimal Detail" 
              className="w-full h-full object-cover scale-110 group-hover:scale-100 transition-transform duration-1000 grayscale opacity-40 group-hover:opacity-100" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuChCn6oVEtmyzLKhFKLI9DZp-8GWkyvuvU1MLk_-ez11vIrHTZ9knDM12WlDLNarMMLrcrX1DhPi4-5isCUuE36VkNZk1cDYYoP7AUnwq0ij2rH4igqnXuKHW4vMywxE3AdmWdcJxJxMCASMD0lqeHLicSkQxFikwI4h3DHRqC-kSjZRBAyDDkZ25g1FFyCGcY5dksj_VEs9QLp7eMvD41c-adqroeMEyBnMsz4kEbrU9zJ6ChSao4vu88C1huHMsdDZMiN2EFPqpI"
            />
            <div className="absolute bottom-6 left-6">
              <span className="text-[10px] uppercase tracking-widest text-secondary">001. Form</span>
            </div>
          </div>
          <div className="col-span-12 lg:col-span-8 bg-surface-container-high overflow-hidden relative group">
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
        <p className="text-[10px] uppercase tracking-[1em] vertical-text text-white cursor-default" style={{ writingMode: 'vertical-rl' }}>CURATING PERMANENCE</p>
      </div>
    </main>
  );
};

export default Connect;
