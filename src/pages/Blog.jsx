import { useState, useEffect } from 'react';
import { db } from '../lib/firebase';
import { collection, addDoc, serverTimestamp, onSnapshot, query, orderBy } from 'firebase/firestore';
import { ArrowRight, Home as HomeIcon, Building2, BookOpen, Mail, Plus } from 'lucide-react';
import { Link } from 'react-router-dom';
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
    <main className="pt-24 md:pt-32 pb-32">
      <div className="fixed inset-0 grain-overlay z-[100] pointer-events-none opacity-[0.03]"></div>
      
      {/* Hero Section: Editorial Scale */}
      <section className="px-6 md:px-16 mb-16 md:mb-32 grid grid-cols-1 md:grid-cols-12 gap-8 items-end relative z-10">
        <div className="md:col-span-8">
          <span className="font-label uppercase tracking-[0.3em] md:tracking-[0.4em] text-[10px] text-secondary mb-4 md:mb-6 block">Journal & Assemblies</span>
          <h1 className="font-headline text-6xl md:text-8xl lg:text-9xl font-black md:font-light leading-[0.9] md:leading-none tracking-tighter md:tracking-normal text-white">
            INSIGHTS <br className="md:hidden" /><span className="text-primary-container md:text-primary-fixed-dim italic font-light md:font-light">&</span> EVENTS
          </h1>
        </div>
        <div className="md:col-span-4 pb-4">
          <p className="font-body font-extralight text-lg md:text-base text-stone-500 md:text-stone-400 leading-relaxed max-w-md md:max-w-xs">
            An architectural curation of thoughts on minimalist heritage and the upcoming assemblies of the creative vanguard.
          </p>
        </div>
      </section>

      {/* Editorial Blog Feed: Vertical Stack on Mobile */}
      <section className="mb-24 px-6 md:px-16 relative z-10">
        <div className="mb-8 flex justify-between items-end">
          <h2 className="font-label text-[10px] uppercase tracking-[0.2em] text-stone-500">LATEST INSIGHTS</h2>
          <div className="h-[1px] flex-grow mx-4 bg-stone-800"></div>
        </div>

        <div className="max-w-7xl mx-auto">
          {blogs.length === 0 ? (
             <div className="py-24 border-t border-stone-800 text-stone-500 font-body italic">
                Archives are currently being curated. Await fresh insights.
             </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16 md:gap-16">
              {blogs.map((post) => (
                <article key={post.id} className="group cursor-pointer">
                  <div className="aspect-[4/5] md:aspect-video w-full overflow-hidden mb-6 md:mb-4 bg-surface-container-low">
                    {/* Placeholder for blog image if exists, or just a colored background like the snippet */}
                    <div className="w-full h-full bg-surface-container-high group-hover:bg-primary-container/10 transition-all duration-700 flex items-center justify-center">
                       <span className="font-headline text-stone-800 text-5xl md:text-6xl italic group-hover:scale-110 transition-transform duration-700">{post.title.charAt(0)}</span>
                    </div>
                  </div>
                  <div className="space-y-4 md:space-y-0">
                    <div className="flex items-center gap-4 mb-2">
                      <span className="font-label uppercase tracking-widest text-[10px] md:text-[9px] text-primary">{post.category}</span>
                      <span className="text-stone-600 text-[10px]">•</span>
                      <span className="font-label text-[10px] md:text-[9px] uppercase tracking-widest text-stone-600">08 MIN READ</span>
                    </div>
                    <h3 className="font-headline text-3xl md:text-2xl font-bold md:font-light text-white mb-4 group-hover:text-primary transition-colors leading-tight">{post.title}</h3>
                    <p className="font-body font-extralight text-stone-400 text-sm mb-6 leading-relaxed line-clamp-3">{post.excerpt}</p>
                    <div className="h-[1px] w-8 bg-stone-800 mb-4 group-hover:w-full transition-all duration-700"></div>
                    <span className="font-label uppercase tracking-widest text-[9px] text-stone-600">
                      {post.timestamp?.toDate().toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                    </span>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Chronological Events List: Stacked on mobile */}
      <section className="bg-surface-container-low py-20 px-0 md:px-16 relative z-10 transition-all">
        <div className="px-6 max-w-6xl mx-auto mb-12">
          <h2 className="font-label text-[10px] uppercase tracking-[0.2em] text-secondary mb-2">Upcoming Assemblies</h2>
          <h3 className="font-headline text-4xl md:text-5xl font-black md:font-light italic text-white">CALENDAR</h3>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="space-y-0 border-t border-stone-800/50">
            {events.length === 0 ? (
               <div className="p-6 text-stone-600 font-label uppercase tracking-widest text-[10px]">No active forums at this moment.</div>
            ) : (
              events.map((event) => (
                <div key={event.id} className="group p-6 md:py-12 md:px-4 flex flex-col md:grid md:grid-cols-12 md:items-center gap-6 md:gap-8 border-b border-stone-800/50 hover:bg-surface-container transition-colors text-left">
                  <div className="flex justify-between items-start md:col-span-2">
                    <div className="flex flex-col">
                      <span className="font-headline text-4xl md:text-3xl font-bold text-white leading-none">{event.date.split(' ')[0]}</span>
                      <span className="font-label text-[10px] md:text-[11px] uppercase tracking-widest text-stone-500 mt-1">{event.date.split(' ')[1]}</span>
                    </div>
                    <div className="md:hidden text-right">
                      <span className="font-label text-[10px] uppercase tracking-widest text-primary block mb-1">Assembly</span>
                      <span className="text-stone-500 text-xs font-light">{event.location}</span>
                    </div>
                  </div>
                  
                  <div className="md:col-span-6">
                    <h4 className="font-headline text-2xl font-bold md:font-light text-white group-hover:text-primary transition-colors leading-tight">{event.title}</h4>
                    <p className="font-label text-stone-600 text-[10px] uppercase tracking-widest mt-2 md:mt-1 hidden md:block">{event.location}</p>
                    <p className="md:hidden font-body text-sm text-stone-500 font-light mt-3 leading-relaxed">{event.venue}</p>
                  </div>

                  <div className="hidden md:block md:col-span-2">
                    <span className="text-secondary font-label text-[10px] uppercase tracking-widest">{event.venue}</span>
                  </div>

                  <div className="md:col-span-2 flex gap-4 md:block text-right w-full">
                    <button className={`flex-1 md:w-auto px-6 py-4 md:py-2 text-[10px] font-label font-bold md:font-normal uppercase tracking-widest transition-all ${event.isPrimary ? 'bg-primary-container text-white hover:bg-neutral-800' : 'bg-primary-container md:bg-transparent text-white md:text-white border border-outline-variant/30 hover:bg-white hover:text-black'}`}>
                      {event.isPrimary ? 'Register' : 'Inquire'}
                    </button>
                    <button className="flex-1 md:hidden border border-outline-variant/20 text-white py-4 font-label uppercase tracking-widest text-[10px]">Learn More</button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </section>

      {/* Quote Component: Fixed plural quote logic */}
      <section className="px-6 py-24 md:py-32 relative z-10">
        <div className="max-w-4xl mx-auto border-l-4 border-primary-container md:border-primary pl-8 md:pl-24 py-4 md:py-12">
          <blockquote className="font-headline text-4xl md:text-7xl font-light italic text-secondary leading-tight md:leading-none">
            "Design is not a decorative layer; it is the structural integrity of a brand's narrative."
          </blockquote>
          <cite className="block mt-6 md:mt-8 font-label text-[10px] md:text-xs uppercase tracking-[0.3em] md:tracking-[0.2em] text-stone-500">— Oluwadolapo Popoola</cite>
        </div>
      </section>

      {/* Floating Action Button for Mobile Events */}
      <div className="fixed bottom-24 right-6 md:hidden z-50">
        <button className="bg-primary-container text-white w-14 h-14 flex items-center justify-center rounded-none shadow-2xl active:scale-90 transition-transform">
          <Plus className="w-8 h-8" />
        </button>
      </div>

      <nav className="fixed bottom-0 left-0 w-full bg-stone-950/80 backdrop-blur-xl md:hidden flex justify-around items-center py-4 px-6 z-50 border-t border-white/5 pb-2">
        <Link to="/" className="flex flex-col items-center text-stone-500">
          <HomeIcon className="w-5 h-5 mb-1" />
          <span className="text-[8px] font-label uppercase tracking-tighter">Home</span>
        </Link>
        <Link to="/services" className="flex flex-col items-center text-stone-500">
          <Building2 className="w-5 h-5 mb-1" />
          <span className="text-[8px] font-label uppercase tracking-tighter">Services</span>
        </Link>
        <Link to="/blog" className="flex flex-col items-center text-white border-b-2 border-primary pb-1">
          <BookOpen className="w-5 h-5 mb-1" />
          <span className="text-[8px] font-label uppercase tracking-tighter">Insights</span>
        </Link>
        <Link to="/connect" className="flex flex-col items-center text-stone-500">
          <Mail className="w-5 h-5 mb-1" />
          <span className="text-[8px] font-label uppercase tracking-tighter">Connect</span>
        </Link>
      </nav>
    </main>
  );
};

export default Blog;
