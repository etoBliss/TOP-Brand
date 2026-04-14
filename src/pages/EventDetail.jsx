import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { ArrowLeft, Calendar, MapPin, Building2, ExternalLink } from 'lucide-react';

const EventDetail = () => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const docRef = doc(db, 'events', id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setEvent({ id: docSnap.id, ...docSnap.data() });
        }
      } catch (err) {
        console.error("Historical data retrieval failure:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchEvent();
    window.scrollTo(0, 0);
  }, [id]);

  if (loading) return (
    <div className="min-h-screen bg-stone-950 flex items-center justify-center">
      <div className="w-12 h-0.5 bg-secondary animate-pulse"></div>
    </div>
  );

  if (!event) return (
    <div className="min-h-screen bg-stone-950 flex flex-col items-center justify-center text-white p-6">
      <h2 className="font-headline text-3xl mb-4 italic text-stone-400">Forum engagement not found.</h2>
      <Link to="/blog" className="text-secondary font-label uppercase tracking-widest text-[10px] border border-secondary/20 px-6 py-3 hover:bg-secondary/5 transition-all">Return to Forums</Link>
    </div>
  );

  return (
    <div className="min-h-screen bg-stone-950 text-white flex items-center justify-center p-8 md:p-20 pt-28 md:pt-32 pb-32 overflow-hidden">
       <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 gap-20 lg:gap-32 items-center">
          {/* Left Column: Text Content */}
          <div className="space-y-16 animate-in slide-in-from-left-8 duration-1000">
             <Link to="/blog" className="flex items-center gap-3 text-stone-500 hover:text-white transition-all font-label uppercase text-[10px] tracking-widest group">
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Back to Global Forums
             </Link>
             
             <div className="space-y-8">
                <div className="flex items-center gap-6">
                   <div className="flex flex-col">
                      <span className="text-secondary font-label uppercase text-[12px] tracking-[0.4em] font-bold">{event.date}</span>
                      <div className="h-0.5 w-12 bg-secondary mt-2"></div>
                   </div>
                   {event.isPrimary && (
                      <span className="bg-primary/10 text-primary text-[8px] px-3 py-1 font-label uppercase tracking-[0.2em] font-bold border border-primary/20 backdrop-blur-md">Featured Artifact</span>
                   )}
                </div>
                <h1 className="font-headline text-5xl md:text-8xl font-light tracking-tighter leading-[0.9] text-white">
                  {event.title}
                </h1>
                <p className="font-body text-stone-400 text-lg italic max-w-md leading-relaxed">
                  Engage with the pinnacle of architectural discourse in a curated global forum.
                </p>
             </div>

             <div className="grid grid-cols-1 md:grid-cols-2 gap-12 py-12 border-y border-white/5">
                <div className="space-y-3">
                   <div className="flex items-center gap-3 text-stone-600">
                      <MapPin className="w-4 h-4" /> <span className="font-label uppercase text-[10px] tracking-widest font-bold">Geography</span>
                   </div>
                   <p className="font-headline text-2xl lg:text-3xl italic text-white/90">{event.location}</p>
                </div>
                <div className="space-y-3">
                   <div className="flex items-center gap-3 text-stone-600">
                      <Building2 className="w-4 h-4" /> <span className="font-label uppercase text-[10px] tracking-widest font-bold">Space / Venue</span>
                   </div>
                   <p className="font-headline text-2xl lg:text-3xl italic text-white/90">{event.venue}</p>
                </div>
             </div>

             {event.registrationLink && (
                <div className="pt-6">
                   <a 
                     href={event.registrationLink} 
                     target="_blank" 
                     rel="noopener noreferrer"
                     className="relative inline-flex items-center justify-center gap-6 bg-secondary text-black px-16 py-8 font-label uppercase tracking-[0.25em] text-[12px] font-black hover:bg-white hover:scale-105 transition-all w-full md:w-auto shadow-[0_20px_40px_rgba(237,193,59,0.15)] group"
                   >
                     Secure Private Attendance 
                     <ExternalLink className="w-4 h-4 group-hover:rotate-12 transition-transform" />
                   </a>
                </div>
             )}
          </div>

          {/* Right Column: Visual Artifact */}
          <div className="relative aspect-[4/5] bg-stone-900 overflow-hidden border border-white/10 group animate-in zoom-in-95 duration-1000 delay-200">
             <div className="absolute inset-0 bg-stone-950 opacity-50 group-hover:opacity-20 transition-opacity z-10"></div>
             <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-stone-950 to-transparent z-10"></div>
             <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-stone-950 to-transparent z-10"></div>
             
             {event.imageUrl ? (
               <img src={event.imageUrl} alt={event.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" />
             ) : (
               <div className="w-full h-full flex items-center justify-center text-stone-800 font-headline text-[25vw] lg:text-[15rem] italic select-none opacity-30 transform group-hover:scale-110 transition-transform duration-1000">
                 {event.title.charAt(0)}
               </div>
             )}
             
             {/* Decorative Elements */}
             <div className="absolute top-12 left-12 z-20">
                <div className="p-4 border border-secondary/40 rounded-full backdrop-blur-md">
                   <Calendar className="w-8 h-8 text-secondary opacity-80" />
                </div>
             </div>
             <div className="absolute bottom-12 right-12 z-20">
                <div className="text-[10px] font-label uppercase tracking-[0.4em] text-stone-600 vertical-text origin-bottom-right rotate-90 mb-4 whitespace-nowrap">
                   ARCHITECTURAL CURATOR ARCHIVE
                </div>
             </div>
          </div>
       </div>
    </div>
  );
};

export default EventDetail;
