import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { ArrowLeft, Clock, Share2 } from 'lucide-react';
import SEO from '../components/SEO';

const BlogPostDetail = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const docRef = doc(db, 'blogs', id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setBlog({ id: docSnap.id, ...docSnap.data() });
        }
      } catch (err) {
        console.error("Data retrieval failure:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchBlog();
    window.scrollTo(0, 0);
  }, [id]);

  if (loading) return (
    <div className="min-h-screen bg-stone-950 flex items-center justify-center">
      <div className="w-12 h-0.5 bg-primary animate-pulse"></div>
    </div>
  );

  if (!blog) return (
    <div className="min-h-screen bg-stone-950 flex flex-col items-center justify-center text-white p-6">
      <h2 className="font-headline text-3xl mb-4 italic text-stone-400">Strategic artifact not found.</h2>
      <Link to="/blog" className="text-secondary font-label uppercase tracking-widest text-[10px] border border-secondary/20 px-6 py-3 hover:bg-secondary/5 transition-all">Return to Global Forum</Link>
    </div>
  );

  return (
    <div className="min-h-screen bg-stone-950 text-white pb-32 pt-24 md:pt-28">
      <SEO 
        title={blog.title} 
        description={blog.excerpt} 
        image={blog.imageUrl} 
        article={true}
        path={`/blog/${blog.id}`}
      />
       {/* Hero Section */}
       <div className="relative h-[65vh] overflow-hidden">
          {blog.imageUrl ? (
            <img src={blog.imageUrl} alt={blog.title} className="w-full h-full object-cover opacity-60" />
          ) : (
            <div className="w-full h-full bg-stone-900 flex items-center justify-center text-stone-800 text-[10rem] md:text-[20rem] font-headline italic select-none opacity-20">
              {blog.title.charAt(0)}
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/40 to-transparent"></div>
          
          <div className="absolute bottom-0 left-0 w-full p-8 md:p-20">
            <div className="max-w-4xl mx-auto">
               <div className="flex items-center gap-4 mb-6">
                  <span className="bg-primary/20 text-primary text-[10px] font-label uppercase tracking-[0.2em] px-3 py-1 border border-primary/30">{blog.category}</span>
                  <span className="text-stone-500 text-[10px] font-label uppercase tracking-widest italic flex items-center gap-2">
                    <Clock className="w-3 h-3" /> {blog.timestamp?.toDate().toLocaleDateString() || 'Recently'}
                  </span>
               </div>
               <h1 className="font-headline text-4xl md:text-7xl font-light tracking-tight leading-tight animate-in slide-in-from-bottom-4 duration-700">{blog.title}</h1>
            </div>
          </div>
       </div>

       {/* Content Container */}
       <div className="max-w-4xl mx-auto px-8 py-20">
          <div className="flex flex-col md:flex-row gap-16 lg:gap-32">
             {/* Sidebar Navigation */}
             <aside className="md:w-1/4 border-t md:border-t-0 border-white/5 pt-12 md:pt-0">
                <div className="sticky top-32 space-y-12">
                   <div>
                     <h4 className="font-label uppercase text-[10px] tracking-widest text-stone-600 mb-6 font-bold">Protocol</h4>
                     <Link to="/blog" className="flex items-center gap-3 text-secondary hover:text-white transition-all font-label uppercase text-[10px] tracking-widest group">
                        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Back to Archive
                     </Link>
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
