import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { doc, getDoc, collection, query, where, getDocs, limit } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { ArrowLeft, Globe } from 'lucide-react';
import { Instagram, Linkedin, XIcon } from '../components/BrandIcons';
import SEO from '../components/SEO';
import { motion } from 'framer-motion';

// Splits a biography into readable paragraphs (every ~2 sentences)
const formatBio = (bio) => {
  if (!bio) return [];
  const sentences = bio.match(/[^.!?]+[.!?]+/g) || [bio];
  const chunks = [];
  for (let i = 0; i < sentences.length; i += 2) {
    chunks.push(sentences.slice(i, i + 2).join(' ').trim());
  }
  return chunks;
};

const SpeakerProfile = () => {
  const { eventSlug, speakerIndex } = useParams();
  const [speaker, setSpeaker] = useState(null);
  const [eventTitle, setEventTitle] = useState('');
  const [eventId, setEventId] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSpeakerData = async () => {
      try {
        // First try slug lookup
        let eventData = null;
        let resolvedId = eventSlug;

        const q = query(
          collection(db, 'events'),
          where('slug', '==', eventSlug),
          limit(1)
        );
        const snap = await getDocs(q);

        if (!snap.empty) {
          resolvedId = snap.docs[0].id;
          eventData = snap.docs[0].data();
        } else {
          // Fallback: treat eventSlug as a legacy Firestore ID
          const docSnap = await getDoc(doc(db, 'events', eventSlug));
          if (docSnap.exists()) {
            resolvedId = docSnap.id;
            eventData = docSnap.data();
          }
        }

        if (eventData) {
          const speakerData = eventData.speakers?.[parseInt(speakerIndex)];
          setSpeaker(speakerData);
          setEventTitle(eventData.title);
          setEventId(resolvedId);
        }
      } catch (err) {
        console.error("Data retrieval failure:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchSpeakerData();
    window.scrollTo(0, 0);
  }, [eventSlug, speakerIndex]);

  if (loading) return (
    <div className="min-h-screen bg-stone-950 flex items-center justify-center">
      <div className="w-12 h-0.5 bg-secondary animate-pulse"></div>
    </div>
  );

  if (!speaker) return (
    <div className="min-h-screen bg-stone-950 flex flex-col items-center justify-center text-white p-6">
      <h2 className="font-headline text-3xl mb-4 italic text-stone-400">Speaker profile not found.</h2>
      <Link to={`/event/${eventId}`} className="text-secondary font-label uppercase tracking-widest text-[10px] border border-secondary/20 px-6 py-3 hover:bg-secondary/5 transition-all">
        Return to Forum
      </Link>
    </div>
  );

  const bioParagraphs = formatBio(speaker.bio);
  const pullQuote = bioParagraphs[0] || '';
  const bodyParagraphs = bioParagraphs.slice(1);

  return (
    <div className="min-h-screen bg-stone-950 text-white pb-32 overflow-x-hidden">
      <SEO
        title={`${speaker.name} | Orchestrator`}
        description={speaker.bio}
        image={speaker.imageUrl}
        path={`/event/${eventId}/speaker/${speakerIndex}`}
      />

      {/* Hero Banner: Content-Free */}
      <section className="relative w-full h-[50vh] md:h-[65vh] overflow-hidden bg-stone-900 border-b border-white/5">
        <motion.div
          initial={{ scale: 1.1 }}
          animate={{ scale: 1.0 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="w-full h-full"
        >
          {speaker.imageUrl ? (
            <img
              src={speaker.imageUrl}
              alt={`${speaker.name} — Speaker at ${eventTitle}`}
              className="w-full h-full object-cover grayscale opacity-60"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-stone-800 font-headline text-[25vw] italic select-none opacity-20">
              {speaker.name.charAt(0)}
            </div>
          )}
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/30 to-transparent"></div>
      </section>

      {/* All Content Below the Banner */}
      <section className="max-w-3xl mx-auto px-6 md:px-12 mt-12 md:mt-20">

        {/* Back Navigation */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-12"
        >
          <Link
            to={`/event/${eventId}`}
            className="flex items-center gap-3 text-stone-500 hover:text-white transition-all font-label uppercase text-[10px] tracking-[0.3em] group inline-flex"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span>Back to {eventTitle}</span>
          </Link>
        </motion.div>

        {/* Identity Block */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-14 space-y-4"
        >
          <p className="text-secondary font-label uppercase text-[11px] tracking-[0.5em] font-bold">
            Expert Curator / Speaker
          </p>
          <h1 className="font-headline text-5xl md:text-7xl font-light tracking-tighter leading-[0.9] text-white">
            {speaker.name}
          </h1>
          <p className="font-label uppercase text-stone-500 tracking-[0.2em] text-[13px] border-l-2 border-secondary/30 pl-5 py-1">
            {speaker.role}
          </p>
        </motion.div>

        {/* Animated Divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.55, duration: 0.6 }}
          className="origin-left h-[1px] bg-white/10 mb-14"
        />

        {/* Pull Quote — First 2 sentences, set large to avoid dense wall of text */}
        {pullQuote && (
          <motion.blockquote
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="font-headline text-2xl md:text-3xl text-stone-200 font-light italic leading-snug mb-14 border-l-4 border-secondary/40 pl-8"
          >
            {pullQuote}
          </motion.blockquote>
        )}

        {/* Body Paragraphs — Airy, one chunk per 2 sentences */}
        {bodyParagraphs.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.75 }}
            className="space-y-8"
          >
            {bodyParagraphs.map((para, i) => (
              <p
                key={i}
                className="font-body text-stone-400 text-base md:text-lg font-light leading-[1.9] md:leading-[2]"
              >
                {para}
              </p>
            ))}
          </motion.div>
        )}

        {/* Digital Footprint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-20 pt-10 border-t border-white/5"
        >
          <span className="font-label uppercase tracking-widest text-[10px] text-stone-600 block mb-5">Digital Footprint</span>
          <div className="flex gap-6 items-center">
            {speaker.instagram && (
              <a href={speaker.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-stone-500 hover:text-white transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
            )}
            {speaker.linkedin && (
              <a href={speaker.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="text-stone-500 hover:text-white transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
            )}
            {speaker.twitter && (
              <a href={speaker.twitter} target="_blank" rel="noopener noreferrer" aria-label="X / Twitter" className="text-stone-500 hover:text-white transition-colors">
                <XIcon className="w-5 h-5" />
              </a>
            )}
            {!speaker.instagram && !speaker.linkedin && !speaker.twitter && (
              <span className="font-label text-[10px] text-stone-700 italic">No social profiles linked.</span>
            )}
          </div>
        </motion.div>

      </section>
    </div>
  );
};

export default SpeakerProfile;
