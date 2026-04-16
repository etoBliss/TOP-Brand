import { useState, useEffect } from 'react';
import { db } from '../lib/firebase';
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';
import { ArrowRight, Calendar, MapPin, Ticket, Building2 } from 'lucide-react';
import { Link } from 'react-router-dom';

const Events = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const unsub = onSnapshot(query(collection(db, 'events'), orderBy('timestamp', 'asc')), (snapshot) => {
      const allEvents = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setEvents(allEvents.filter(e => !e.isPast));
    });
    return () => unsub();
  }, []);

  return (
    <main className="pt-32 pb-24 overflow-x-hidden">
      <div className="grain-overlay" />
      
      {/* Hero Section */}
      <section className="px-8 md:px-16 mb-24 flex justify-between items-end">
        <div>
          <span className="font-label uppercase tracking-[0.4em] text-[10px] text-secondary mb-6 block">Global Forums</span>
          <h1 className="font-headline text-5xl md:text-9xl font-light tracking-tighter leading-none text-white italic break-words">
            Speaking <br /> <span className="not-italic text-primary-fixed-dim">Engagements</span>
          </h1>
        </div>
      </section>

      {/* Events List */}
      <section className="py-12 px-8 md:px-16">
        <div className="max-w-6xl mx-auto space-y-1">
          {events.map((event) => (
            <Link key={event.id} to={`/event/${event.id}`} className="group block">
              <div className="py-16 flex flex-col md:grid md:grid-cols-12 items-center gap-12 border-t border-stone-800 hover:bg-stone-900 transition-colors px-6">
                <div className="md:col-span-2">
                  <div className="flex items-center gap-3 mb-2">
                    <Calendar className="w-4 h-4 text-stone-600" />
                    <span className="font-label text-stone-500 text-[11px] uppercase tracking-widest">{event.date}</span>
                  </div>
                </div>
                <div className="md:col-span-6">
                  <h4 className="font-headline text-3xl font-light text-white group-hover:text-primary transition-colors mb-2">{event.title}</h4>
                  <div className="flex items-center gap-3">
                    <MapPin className="w-3 h-3 text-stone-600" />
                    <p className="font-label text-stone-600 text-[10px] uppercase tracking-widest">{event.location}</p>
                  </div>
                </div>
                <div className="md:col-span-2">
                  <div className="flex items-center gap-3">
                    <Building2 className="w-3 h-3 text-secondary/50" />
                    <span className="text-secondary font-label text-[10px] uppercase tracking-widest">{event.venue}</span>
                  </div>
                </div>
                <div className="md:col-span-2 text-right w-full">
                  <div className={`w-full flex items-center justify-between px-6 py-3 text-[10px] font-label uppercase tracking-widest transition-all text-center ${event.isPrimary ? 'bg-primary-container text-white hover:bg-red-700' : 'border border-outline-variant/30 text-white group-hover:bg-white group-hover:text-black'}`}>
                    {event.isPrimary ? 'Attend' : 'Learn More'}
                    <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Special CTA for Booking */}
      <section className="mt-32 px-8 md:px-16 pb-24">
        <div className="max-w-4xl mx-auto bg-surface-container-high p-16 md:p-24 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary-container/5 rounded-full blur-3xl -translate-y-12 translate-x-12"></div>
          <div className="relative z-10">
            <h2 className="font-headline text-4xl md:text-5xl text-white mb-8">Host a Masterclass</h2>
            <p className="font-body font-extralight text-stone-400 text-lg mb-12 max-w-xl">
              Bring the philosophy of architectural curation to your organization. Custom workshops designed for creative leadership and design excellence.
            </p>
            <button className="bg-white text-black px-12 py-4 font-label uppercase tracking-widest text-xs font-bold hover:bg-stone-200 transition-all active:scale-95">
              Request Brochure
            </button>
          </div>
        </div>
      </section>
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
        <Link to="/connect" className="flex flex-col items-center text-stone-500">
          <Mail className="w-5 h-5 mb-1" />
          <span className="text-[8px] font-label uppercase tracking-tighter">Connect</span>
        </Link>
      </nav>
    </main>
  );
};

export default Events;
