import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { ArrowLeft, Globe } from 'lucide-react';
import { Instagram, Linkedin } from '../components/BrandIcons';
import SEO from '../components/SEO';
import { motion } from 'framer-motion';

const SpeakerProfile = () => {
  const { eventId, speakerIndex } = useParams();
  const [speaker, setSpeaker] = useState(null);
  const [eventTitle, setEventTitle] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSpeakerData = async () => {
      try {
        const docRef = doc(db, 'events', eventId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const eventData = docSnap.data();
          const speakerData = eventData.speakers[parseInt(speakerIndex)];
          setSpeaker(speakerData);
          setEventTitle(eventData.title);
        }
      } catch (err) {
        console.error("Data retrieval failure:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchSpeakerData();
    window.scrollTo(0, 0);
  }, [eventId, speakerIndex]);

  if (loading) return (
    <div className="min-h-screen bg-stone-950 flex items-center justify-center">
      <div className="w-12 h-0.5 bg-secondary animate-pulse"></div>
    </div>
  );

  if (!speaker) return (
    <div className="min-h-screen bg-stone-950 flex flex-col items-center justify-center text-white p-6">
      <h2 className="font-headline text-3xl mb-4 italic text-stone-400">Speaker profile not found.</h2>
      <Link to={`/event/${eventId}`} className="text-secondary font-label uppercase tracking-widest text-[10px] border border-secondary/20 px-6 py-3 hover:bg-secondary/5 transition-all">Return to Forum</Link>
    </div>
  );

  return (
    <div className="min-h-screen bg-stone-950 text-white pb-32 overflow-x-hidden">
      <SEO 
        title={`${speaker.name} | Orchestrator`} 
        description={speaker.bio} 
        image={speaker.imageUrl} 
        path={`/event/${eventId}/speaker/${speakerIndex}`}
      />

      {/* Hero Banner Section: Content-Free */}
      <section className="relative w-full h-[50vh] md:h-[70vh] overflow-hidden bg-stone-900 border-b border-white/5">
        <motion.div 
           initial={{ scale: 1.1 }}
           animate={{ scale: 1.0 }}
           transition={{ duration: 1.5, ease: "easeOut" }}
           className="w-full h-full"
        >
          {speaker.imageUrl ? (
            <img 
              src={speaker.imageUrl} 
              alt={speaker.name} 
              className="w-full h-full object-cover grayscale opacity-60"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-stone-800 font-headline text-[25vw] italic select-none opacity-20">
              {speaker.name.charAt(0)}
            </div>
          )}
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950 to-transparent opacity-60"></div>
      </section>

      {/* Detail Section: All text below banner */}
      <section className="max-w-4xl mx-auto px-8 md:px-20 mt-12 md:mt-24">
        
        {/* Navigation Breadcrumb */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-16"
        >
          <Link to={`/event/${eventId}`} className="flex items-center gap-3 text-stone-500 hover:text-white transition-all font-label uppercase text-[10px] tracking-[0.3em] group inline-flex">
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span>Back to {eventTitle}</span>
          </Link>
        </motion.div>

        <div className="space-y-12 animate-in fade-in slide-in-from-bottom-8 duration-1000">
          <div className="space-y-6">
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-secondary font-label uppercase text-[12px] tracking-[0.5em] font-bold"
            >
              Expert Curator / Speaker
            </motion.p>
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="font-headline text-5xl md:text-8xl font-light tracking-tighter leading-[0.9] text-white"
            >
              {speaker.name}
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="font-label uppercase text-stone-500 tracking-[0.2em] text-[14px] border-l-2 border-secondary/30 pl-6 py-2"
            >
              {speaker.role}
            </motion.p>
          </div>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="prose prose-invert prose-stone max-w-none"
          >
            <p className="font-body text-stone-300 text-lg md:text-xl italic leading-relaxed md:leading-[1.6]">
              {speaker.bio}
            </p>
          </motion.div>

          <motion.div 
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             transition={{ delay: 1 }}
             className="pt-12 border-t border-white/5 flex gap-8 items-center"
          >
             <span className="font-label uppercase tracking-widest text-[10px] text-stone-600">Digital Footprint</span>
             <div className="flex gap-6">
                <a href="#" className="text-stone-500 hover:text-white transition-colors"><Instagram className="w-4 h-4" /></a>
                <a href="#" className="text-stone-500 hover:text-white transition-colors"><Linkedin className="w-4 h-4" /></a>
                <a href="#" className="text-stone-500 hover:text-white transition-colors"><Globe className="w-4 h-4" /></a>
             </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default SpeakerProfile;
