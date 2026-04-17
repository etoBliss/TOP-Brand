import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { collection, query, where, getDocs, limit, doc, getDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { ArrowLeft, ArrowRight, ArrowDown, Calendar, MapPin, Building2, ExternalLink } from 'lucide-react';
import SEO from '../components/SEO';
import Skeleton from '../components/Skeleton';

const EventDetail = () => {
  const { slug } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        // Query by high-authority semantic slug
        const q = query(
          collection(db, 'events'), 
          where('slug', '==', slug), 
          limit(1)
        );
        const querySnapshot = await getDocs(q);
        
        if (!querySnapshot.empty) {
          const doc = querySnapshot.docs[0];
          setEvent({ id: doc.id, ...doc.data() });
        } else {
          // Fallback to ID for legacy archival links
          const legacyDoc = await getDoc(doc(db, 'events', slug));
          if (legacyDoc.exists()) {
            setEvent({ id: legacyDoc.id, ...legacyDoc.data() });
          }
        }
      } catch (err) {
        console.error("Archive retrieval failure:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchEvent();
    window.scrollTo(0, 0);
  }, [slug]);

  if (loading) return (
    <div className="min-h-screen bg-stone-950 flex items-center justify-center">
      <div className="w-12 h-0.5 bg-secondary animate-pulse"></div>
    </div>
  );

  if (!event) return (
    <div className="min-h-screen bg-stone-950 flex flex-col items-center justify-center text-white p-6">
      <h2 className="font-headline text-3xl mb-4 italic text-stone-400">Forum engagement not found.</h2>
      <Link to="/events" className="text-secondary font-label uppercase tracking-widest text-[10px] border border-secondary/20 px-6 py-3 hover:bg-secondary/5 transition-all">Return to Forums</Link>
    </div>
  );

  const eventSchema = event ? {
    "@context": "https://schema.org",
    "@type": "Event",
    "name": event.title,
    "description": event.description,
    "startDate": event.date,
    "location": {
      "@type": "Place",
      "name": event.venue,
      "address": {
        "@type": "PostalAddress",
        "addressLocality": event.location
      }
    },
    "image": [event.imageUrl || "/og-image.jpg"]
  } : null;

  return (
    <div className="min-h-screen bg-stone-950 text-white pb-32 overflow-x-hidden">
      <SEO 
        title={event.title} 
        description={event.description} 
        image={event.imageUrl} 
        path={`/event/${event.id}`}
        schema={eventSchema}
      />
       {/* Top Hero Banner Section: Contained & Content-Free */}
       <section className="relative w-full h-[50vh] md:h-[70vh] overflow-hidden bg-stone-900 border-b border-white/5 animate-in fade-in duration-1000">
          {event.imageUrl ? (
            <img 
              src={event.imageUrl} 
              alt={event.title} 
              className="w-full h-full object-cover grayscale opacity-60 hover:scale-105 transition-transform duration-[3s]" 
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-stone-900 text-stone-800 font-headline text-[25vw] italic select-none opacity-30">
              {event.title.charAt(0)}
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-stone-950 to-transparent opacity-40"></div>
       </section>

       {/* Detailed Metadata & Content: Positioned Below banner */}
       <div className="max-w-4xl mx-auto px-8 md:px-20 mt-12 md:mt-24">
          
          {/* Universal Back Navigation */}
          <div className="mb-16 animate-in slide-in-from-left-4 duration-700">
             <Link to="/blog" className="flex items-center gap-3 text-stone-500 hover:text-white transition-all font-label uppercase text-[10px] tracking-[0.4em] group inline-flex">
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> 
                <span>Back to Blog & Events</span>
             </Link>
          </div>

          <div className="space-y-16 animate-in fade-in slide-in-from-bottom-8 duration-1000">
             <div className="space-y-8">
                <div className="flex items-center gap-6">
                   <div className="flex flex-col">
                      <span className="text-secondary font-label uppercase text-[12px] tracking-[0.4em] font-bold">{event.date}</span>
                      <div className="h-0.5 w-12 bg-secondary mt-2"></div>
                   </div>
                   {event.isPrimary && (
                      <span className="bg-primary/10 text-primary text-[8px] px-3 py-1 font-label uppercase tracking-[0.2em] font-bold border border-primary/20 backdrop-blur-md">Featured Engagement</span>
                   )}
                </div>
                <h1 className="font-headline text-5xl md:text-9xl font-light tracking-tighter leading-[0.85] text-white break-words">
                  {event.title}
                </h1>
             </div>
          </div>
       </div>

       {/* Main Content Section */}
       <div className="max-w-4xl mx-auto px-8 md:px-20 mt-12 md:mt-16 space-y-24">
          <div className="space-y-16">
             <p className="font-body text-stone-300 text-lg md:text-2xl italic leading-relaxed md:leading-[1.4]">
               {event.description || "Engage with the pinnacle of architectural discourse in a curated global forum."}
             </p>

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

             {/* Speakers Section */}
             {event.speakers && event.speakers.length > 0 && (
                <div className="space-y-16 pt-12">
                   <div className="flex items-center gap-4">
                      <span className="font-label uppercase tracking-[0.4em] text-[10px] text-stone-500 font-bold">Orchestrators & Curators</span>
                      <div className="h-px flex-grow bg-white/5"></div>
                   </div>
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-x-20 gap-y-16">
                      {event.speakers.map((speaker, idx) => (
                        <Link 
                          key={idx} 
                          to={`/event/${event.id}/speaker/${idx}`} 
                          className="space-y-6 group/speaker block"
                        >
                           <div className="aspect-square bg-stone-900 border border-white/10 overflow-hidden grayscale group-hover/speaker:grayscale-0 transition-all duration-700 relative">
                              {speaker.imageUrl ? (
                                <img src={speaker.imageUrl} alt={speaker.name} className="w-full h-full object-cover scale-100 group-hover/speaker:scale-110 transition-transform duration-700" />
                              ) : (
                                <div className="w-full h-full flex items-center justify-center text-stone-700 font-headline text-5xl italic">{speaker.name.charAt(0)}</div>
                              )}
                              <div className="absolute inset-x-0 bottom-0 p-6 bg-gradient-to-t from-stone-950 to-transparent opacity-0 group-hover/speaker:opacity-100 transition-opacity">
                                 <span className="text-[10px] font-label uppercase tracking-widest text-secondary font-bold flex items-center gap-2">View Full Profile <ArrowRight className="w-3 h-3" /></span>
                              </div>
                           </div>
                           <div className="space-y-4">
                              <div>
                                <h4 className="font-headline text-3xl text-white group-hover/speaker:text-secondary transition-colors">{speaker.name}</h4>
                                <p className="font-label uppercase text-[10px] tracking-[0.2em] text-stone-500 mt-2">{speaker.role}</p>
                              </div>
                              <p className="text-stone-400 font-body text-sm italic leading-relaxed line-clamp-3">
                                 {speaker.bio}
                              </p>
                              <div className="pt-4 opacity-0 group-hover/speaker:opacity-100 transition-opacity">
                                <span className="text-[10px] font-label uppercase tracking-[0.3em] text-stone-600 border-b border-stone-800 pb-2">Read Full Architectural Bio</span>
                              </div>
                           </div>
                        </Link>
                      ))}
                   </div>
                </div>
             )}
          </div>

          {/* Bottom Registration Section */}
          <div id="registration-anchor" className="pt-24 border-t border-white/5">
             {event.registrationLink ? (
                <div className="max-w-md mx-auto space-y-8">
                  <div className="bg-stone-900/40 p-1 border border-white/5 backdrop-blur-3xl w-full">
                     <a 
                       href={event.registrationLink} 
                       target="_blank" 
                       rel="noopener noreferrer"
                       className="flex flex-col items-center justify-center gap-4 bg-secondary text-black px-6 py-8 font-label uppercase tracking-widest text-[11px] font-black hover:bg-white transition-all shadow-2xl group text-center w-full overflow-hidden"
                     >
                       Secure Attendance 
                       <ExternalLink className="w-4 h-4 group-hover:rotate-12 transition-transform shrink-0" />
                       <span className="text-[8px] font-normal tracking-[0.4em] text-black/50 mt-4 border-t border-black/10 pt-4 w-full uppercase">Limited Access Curated Space</span>
                     </a>
                  </div>
                  <div className="text-center space-y-4 opacity-50">
                     <div className="h-px bg-white/5 w-12 mx-auto"></div>
                     <p className="font-label uppercase text-[7px] tracking-[0.5em] leading-loose max-w-xs mx-auto">This event data is synchronized via the TOP architectural archive. Unauthorized reproduction is strictly prohibited.</p>
                  </div>
                </div>
             ) : (
                <div className="text-center opacity-30">
                   <p className="font-label uppercase text-[10px] tracking-widest italic">Digital Archive Only - Public Access Closed</p>
                </div>
             )}
          </div>
       </div>
    </div>
  );
};

export default EventDetail;
