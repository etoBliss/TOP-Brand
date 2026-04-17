import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { collection, query, where, getDocs, limit, doc, getDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { ArrowLeft, Clock, Share2, Share } from 'lucide-react';
import SEO from '../components/SEO';
import Skeleton from '../components/Skeleton';

const BlogPostDetail = () => {
  const { slug } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        // High-authority semantic slug lookup
        const q = query(
          collection(db, 'blogs'), 
          where('slug', '==', slug), 
          limit(1)
        );
        const querySnapshot = await getDocs(q);
        
        if (!querySnapshot.empty) {
          const doc = querySnapshot.docs[0];
          setBlog({ id: doc.id, ...doc.data() });
        } else {
          // Fallback to ID for legacy archival links
          const legacyDoc = await getDoc(doc(db, 'blogs', slug));
          if (legacyDoc.exists()) {
             setBlog({ id: legacyDoc.id, ...legacyDoc.data() });
          }
        }
      } catch (err) {
        console.error("Archive retrieval failure:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchBlog();
    window.scrollTo(0, 0);
  }, [slug]);

  if (loading) return (
    <div className="min-h-screen bg-stone-950 flex items-center justify-center">
       <div className="w-12 h-12 border-t-2 border-primary animate-spin rounded-full"></div>
    </div>
  );

  if (!blog) return (
    <div className="min-h-screen bg-stone-950 flex flex-col items-center justify-center text-center p-8">
      <h2 className="font-headline text-4xl text-white mb-6">Archive Missing</h2>
      <Link to="/blog" className="text-secondary font-label uppercase tracking-widest text-[10px]">Return to Journal</Link>
    </div>
  );

   const blogSchema = blog ? {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": blog.title,
    "image": [blog.imageUrl || "/og-image.jpg"],
    "datePublished": blog.timestamp?.toDate().toISOString() || new Date().toISOString(),
    "author": [{
      "@type": "Person",
      "name": "Oluwadolapo Popoola",
      "url": "https://example.com/about"
    }],
    "description": blog.excerpt
  } : null;

  return (
    <div className="min-h-screen bg-stone-950 text-white pb-32 overflow-x-hidden">
      <SEO 
        title={`${blog.title} | Oluwadolapo Popoola`} 
        description={blog.excerpt} 
        image={blog.imageUrl} 
        article={true}
        path={`/blog/${slug}`}
        schema={blogSchema}
      />

       {/* Hero Banner Section: Contained & Content-Free */}
       <section className="relative w-full h-[50vh] md:h-[70vh] overflow-hidden bg-stone-900 border-b border-white/5 animate-in fade-in duration-1000">
          {blog.imageUrl ? (
            <img 
              src={blog.imageUrl} 
              alt={blog.title} 
              className="w-full h-full object-cover grayscale opacity-60 hover:scale-105 transition-transform duration-[3s]" 
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-stone-900 text-stone-800 font-headline text-[25vw] italic select-none opacity-30">
              {blog.title.charAt(0)}
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
                <span>Back to Insights</span>
             </Link>
          </div>

          <div className="space-y-16 animate-in fade-in slide-in-from-bottom-8 duration-1000">
             <div className="space-y-8">
                <div className="flex items-center gap-4 mb-6">
                   <span className="bg-primary/20 text-primary text-[10px] font-label uppercase tracking-[0.2em] px-3 py-1 border border-primary/30">{blog.category}</span>
                   <span className="text-stone-500 text-[10px] font-label uppercase tracking-widest italic flex items-center gap-2">
                     <Clock className="w-3 h-3" /> {blog.timestamp?.toDate().toLocaleDateString() || 'Recently'}
                   </span>
                </div>
                <h1 className="font-headline text-5xl md:text-9xl font-light tracking-tighter leading-[0.85] text-white break-words">
                  {blog.title}
                </h1>
             </div>

             <div className="flex flex-col md:flex-row gap-16 lg:gap-32 mt-24 pt-24 border-t border-white/5">
                {/* Sidebar Engagement */}
                <aside className="md:w-1/4">
                   <div className="sticky top-32 space-y-12">
                      <div>
                        <h4 className="font-label uppercase text-[10px] tracking-widest text-stone-600 mb-6 font-bold">Protocol</h4>
                        <div className="text-secondary font-label uppercase text-[10px] tracking-widest">Strategic Brief</div>
                      </div>
                      <div>
                        <h4 className="font-label uppercase text-[10px] tracking-widest text-stone-600 mb-6 font-bold">Engagement</h4>
                         <button 
                            onClick={async () => {
                                const url = window.location.href;
                                try {
                                  await navigator.clipboard.writeText(url);
                                  setCopied(true);
                                  setTimeout(() => setCopied(false), 2000);
                                } catch {
                                  if (navigator.share) {
                                    navigator.share({ title: blog.title, url });
                                  }
                                }
                            }}
                            className="flex items-center gap-3 text-stone-400 hover:text-white transition-all font-label uppercase text-[10px] tracking-widest group"
                         >
                            <Share2 className="w-4 h-4 group-hover:scale-110 transition-transform" />
                            {copied ? <span className="text-secondary">Signature Copied!</span> : 'Disseminate Intelligence'}
                         </button>
                       </div>
                   </div>
                </aside>
                
                {/* Body Text */}
                <div className="md:w-3/4 animate-in fade-in duration-1000 delay-300">
                   <p className="font-headline text-xl md:text-3xl text-stone-400 italic leading-relaxed mb-16 border-l border-primary/50 pl-8 lg:pl-12">
                     {blog.excerpt}
                   </p>
                   <article className="font-body text-lg md:text-xl text-stone-300 leading-relaxed space-y-12 whitespace-pre-wrap selection:bg-primary selection:text-white">
                     {blog.content}
                   </article>
                   
                   <div className="mt-32 pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
                      <div className="text-[10px] font-label uppercase tracking-widest text-stone-600 italic">End of Tactical Brief</div>
                      <Link to="/connect" className="font-label uppercase tracking-[0.2em] text-[10px] text-white hover:text-secondary transition-colors">Initiate Strategic Advisory →</Link>
                   </div>
                </div>
             </div>
          </div>
       </div>

        {/* Mobile Detail Nav */}
        <nav className="fixed bottom-0 left-0 w-full bg-stone-950/80 backdrop-blur-xl md:hidden flex justify-center items-center py-5 px-6 z-50 border-t border-white/5">
          <Link to="/blog" className="flex items-center gap-3 text-white font-label uppercase tracking-[0.2em] text-[10px]">
            <ArrowLeft className="w-4 h-4 text-secondary" />
            Back to Global Insights
          </Link>
        </nav>
    </div>
  );
};

export default BlogPostDetail;
