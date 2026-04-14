import { useState, useEffect } from 'react';
import { db } from '../lib/firebase';
import { collection, addDoc, serverTimestamp, onSnapshot, query, orderBy } from 'firebase/firestore';
import { ArrowRight } from 'lucide-react';
import emailjs from '@emailjs/browser';

// EmailJS Configuration (Replace with your keys)
const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
const EMAILJS_ADMIN_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_ADMIN_TEMPLATE_ID;

const Blog = () => {
  const [blogs, setBlogs] = useState([]);
  const [events, setEvents] = useState([]);
  const [status, setStatus] = useState('idle');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    service: 'Blog Inquiry'
  });

  useEffect(() => {
    const unsubBlogs = onSnapshot(query(collection(db, 'blogs'), orderBy('timestamp', 'desc')), (snapshot) => {
      setBlogs(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });

    const unsubEvents = onSnapshot(query(collection(db, 'events'), orderBy('timestamp', 'desc')), (snapshot) => {
      setEvents(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });

    return () => {
      unsubBlogs();
      unsubEvents();
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    
    try {
      await addDoc(collection(db, 'inquiries'), {
        ...formData,
        timestamp: serverTimestamp(),
        resolved: false,
        source: 'Blog Contact Section'
      });

      // EmailJS Notification to Admin
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_ADMIN_TEMPLATE_ID,
        {
          from_name: formData.name,
          from_email: formData.email,
          message: formData.message,
          service_requested: "Newsletter/Project Inquiry from Blog",
          admin_email: "popooladolapo7@gmail.com"
        },
        EMAILJS_PUBLIC_KEY
      );

      setStatus('success');
      setFormData({ name: '', email: '', message: '' });
    } catch (err) {
      console.error('Firestore Error:', err);
      const errorMsg = err?.text || err?.message || 'Unknown error';
      setStatus('error');
      alert('Transmission failed: ' + errorMsg);
    }
  };

  return (
    <main className="pt-32 pb-24 text-white">
      <div className="fixed inset-0 grain-overlay z-[100] pointer-events-none opacity-[0.03]"></div>
      
      {/* Hero Section */}
      <section className="px-8 md:px-16 mb-32 grid grid-cols-1 md:grid-cols-12 gap-8 items-end relative z-10">
        <div className="md:col-span-8">
          <span className="font-label uppercase tracking-[0.4em] text-[10px] text-secondary mb-6 block">Editorial Perspective</span>
          <h1 className="font-headline text-6xl md:text-8xl font-light tracking-tighter leading-none text-white">
            Insights <span className="italic text-primary-fixed-dim">&</span> Engagements
          </h1>
        </div>
        <div className="md:col-span-4 pb-4">
          <p className="font-body font-extralight text-stone-400 leading-relaxed max-w-xs">
            Curated thoughts on architectural legacy, modern curation, and the intersection of physical and digital spaces.
          </p>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="px-8 md:px-16 mb-48 relative z-10">
        <div className="max-w-7xl mx-auto">
          {blogs.length === 0 ? (
             <div className="py-24 border-t border-stone-800 text-stone-500 font-body italic">
                Archives are currently being curated. Await fresh insights.
             </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16">
              {blogs.map((post) => (
                <div key={post.id} className="group cursor-pointer">
                  <span className="font-label uppercase tracking-widest text-[9px] text-primary-container mb-4 block">{post.category}</span>
                  <h3 className="font-headline text-2xl font-light text-white mb-4 group-hover:text-primary transition-colors">{post.title}</h3>
                  <p className="font-body font-extralight text-stone-400 text-sm mb-6 leading-relaxed line-clamp-3">{post.excerpt}</p>
                  <div className="h-[1px] w-8 bg-stone-800 mb-4 group-hover:w-full transition-all duration-700"></div>
                  <span className="font-label uppercase tracking-widest text-[9px] text-stone-600">
                    {post.timestamp?.toDate().toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Events Section */}
      <section className="bg-surface-container-low py-32 px-8 md:px-16 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-8">
            <div className="max-w-md">
              <h2 className="font-headline text-5xl font-light text-white mb-6 italic">Speaking Engagements</h2>
              <p className="font-body font-extralight text-stone-400">Join the conversation. Masterclasses and global forums focused on the future of architectural curation.</p>
            </div>
            <div className="h-[1px] flex-grow bg-outline-variant/20 mx-12 hidden md:block"></div>
            <span className="font-label text-[10px] uppercase tracking-[0.5em] text-primary-container">Live Tracker</span>
          </div>

          <div className="space-y-1">
            {events.length === 0 ? (
               <div className="py-12 border-t border-stone-800 text-stone-600 font-label uppercase tracking-widest text-[10px]">No active forums at this moment.</div>
            ) : (
              events.map((event) => (
                <div key={event.id} className="group py-12 flex flex-col md:grid md:grid-cols-12 items-center gap-8 border-t border-stone-800 hover:bg-stone-900 transition-colors px-4 text-left">
                  <div className="md:col-span-2">
                    <span className="font-label text-stone-500 text-[11px] uppercase tracking-widest">{event.date}</span>
                  </div>
                  <div className="md:col-span-6">
                    <h4 className="font-headline text-2xl font-light text-white group-hover:text-primary transition-colors">{event.title}</h4>
                    <p className="font-label text-stone-600 text-[10px] uppercase tracking-widest mt-1">{event.location}</p>
                  </div>
                  <div className="md:col-span-2">
                    <span className="text-secondary font-label text-[10px] uppercase tracking-widest">{event.venue}</span>
                  </div>
                  <div className="md:col-span-2 text-right w-full">
                    <button className={`px-6 py-2 text-[10px] font-label uppercase tracking-widest transition-all ${event.isPrimary ? 'bg-primary-container text-white hover:bg-red-700' : 'border border-outline-variant/30 text-white hover:bg-white hover:text-black'}`}>
                      {event.action || 'Register'}
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-32 px-8 md:px-16 bg-background relative z-10">
        <div className="max-w-4xl mx-auto border-l-4 border-primary pl-12 md:pl-24 py-12">
          <h2 className="font-headline text-5xl md:text-7xl font-light text-white mb-4">Let’s Build <span className="italic text-secondary">Together.</span></h2>
          <p className="font-body font-extralight text-stone-400 mb-16 text-lg">For collaborative inquiries, architectural curation, or speaking requests.</p>
          
          {status === 'success' ? (
            <div className="py-12 text-left">
              <h3 className="font-headline text-3xl mb-4 text-white">Vision Received.</h3>
              <p className="font-body text-stone-500 mb-8">Your message has been stored in the curator's archive. Await response.</p>
              <button onClick={() => setStatus('idle')} className="text-secondary font-label uppercase tracking-widest text-[10px] border-b border-secondary/20 transition-all hover:text-white">Send another message</button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-12">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-white">
                <div className="relative group">
                  <input 
                    type="text" id="name" name="name" placeholder=" " required
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="peer block w-full bg-transparent border-0 border-b border-outline-variant/30 py-3 focus:ring-0 focus:border-secondary transition-all text-white font-light" 
                  />
                  <label 
                    htmlFor="name" 
                    className="absolute top-3 left-0 -z-10 origin-[0] -translate-y-6 scale-75 transform font-label text-[10px] uppercase tracking-widest text-stone-600 transition-all peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-secondary"
                  >Full Name</label>
                </div>
                <div className="relative group">
                  <input 
                    type="email" id="email" name="email" placeholder=" " required
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="peer block w-full bg-transparent border-0 border-b border-outline-variant/30 py-3 focus:ring-0 focus:border-secondary transition-all text-white font-light" 
                  />
                  <label 
                    htmlFor="email" 
                    className="absolute top-3 left-0 -z-10 origin-[0] -translate-y-6 scale-75 transform font-label text-[10px] uppercase tracking-widest text-stone-600 transition-all peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-secondary"
                  >Email Address</label>
                </div>
              </div>
              <div className="relative group">
                <textarea 
                  id="message" name="message" placeholder=" " rows="4" required
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  className="peer block w-full bg-transparent border-0 border-b border-outline-variant/30 py-3 focus:ring-0 focus:border-secondary transition-all text-white font-light resize-none"
                ></textarea>
                <label 
                  htmlFor="message" 
                  className="absolute top-3 left-0 -z-10 origin-[0] -translate-y-6 scale-75 transform font-label text-[10px] uppercase tracking-widest text-stone-600 transition-all peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-secondary"
                >Your Vision / Project Brief</label>
              </div>
              {status === 'error' && (
                <div className="text-red-500 font-label uppercase text-[10px] tracking-widest bg-red-500/10 p-4 border border-red-500/20">
                  Submission failed. Please check your internet connection or Firestore rules.
                </div>
              )}
              <div className="flex flex-col md:flex-row items-center justify-between gap-8 pt-8">
                <div className="flex items-center gap-6">
                  <a href="#" className="text-stone-500 hover:text-primary transition-colors text-sm font-label tracking-widest">@thatspace_boy</a>
                  <span className="w-1 h-1 rounded-full bg-stone-800"></span>
                  <span className="text-stone-700 text-[10px] uppercase font-label tracking-widest">Global Inquiries Only</span>
                </div>
                <button 
                  type="submit" 
                  disabled={status === 'loading'}
                  className="bg-primary-container text-white px-12 py-4 font-label uppercase tracking-[0.2em] text-xs font-bold hover:bg-neutral-800 transition-all active:scale-95 shadow-2xl shadow-primary-container/20 group flex items-center gap-4 disabled:opacity-50"
                >
                  {status === 'loading' ? 'Sending...' : 'Send Proposal'}
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-2" />
                </button>
              </div>
            </form>
          )}
        </div>
      </section>
    </main>
  );
};

export default Blog;
