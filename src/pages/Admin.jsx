import { useState, useEffect, useRef } from 'react';
import { auth, db } from '../lib/firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { collection, query, orderBy, onSnapshot, doc, deleteDoc, updateDoc, addDoc, serverTimestamp } from 'firebase/firestore';
import { useNavigate, Link } from 'react-router-dom';
import emailjs from '@emailjs/browser';
import { uploadToCloudinary } from '../lib/uploadToCloudinary';
import { compressImage } from '../utils/compressImage';
import curator from '../assets/Frame 5.svg';

// EmailJS Configuration
const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID || 'service_9jb5rez';
const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || 'k7zeSlbI00R-E3sGa';
const EMAILJS_USER_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_USER_TEMPLATE_ID || 'template_v0dy8mc';
import { 
  LayoutDashboard, 
  FileText, 
  Calendar, 
  MessageSquare, 
  Settings, 
  LogOut, 
  ExternalLink,
  ChevronRight,
  Clock,
  User,
  Mail,
  Briefcase,
  Trash2,
  CheckCircle2,
  Plus,
  Pencil,
  Reply,
  X,
  TrendingUp,
  Database,
  Menu,
  Activity
} from 'lucide-react';

const Admin = () => {
  const [user, setUser] = useState(null);
  const [inquiries, setInquiries] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [events, setEvents] = useState([]);
  const [activeTab, setActiveTab] = useState('dashboard');
  
  // Modal States
  const [showInquiryReply, setShowInquiryReply] = useState(null);
  const [showBlogForm, setShowBlogForm] = useState(null);
  const [showEventForm, setShowEventForm] = useState(null);
  const [confirmModal, setConfirmModal] = useState(null); // { title: string, message: string, onConfirm: () => void, confirmText: string }
  const [systemAlert, setSystemAlert] = useState(null); // { title: string, message: string }

  // Image upload state
  const [blogImageFile, setBlogImageFile] = useState(null);
  const [blogImagePreview, setBlogImagePreview] = useState(null);
  const [eventImageFile, setEventImageFile] = useState(null);
  const [eventImagePreview, setEventImagePreview] = useState(null);
  const [galleryPreview, setGalleryPreview] = useState([]);
  const [speakerImageFiles, setSpeakerImageFiles] = useState({}); // { speakerIdx: File }
  const [uploading, setUploading] = useState(false);
  
  const navigate = useNavigate();

  // Auto-close modals on tab change
  useEffect(() => {
    setShowInquiryReply(null);
    setShowBlogForm(null);
    setShowEventForm(null);
    setConfirmModal(null);
  }, [activeTab]);

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        navigate('/login');
      }
    });

    // Subscriptions
    const unsubInquiries = onSnapshot(query(collection(db, 'inquiries'), orderBy('timestamp', 'desc')), (snapshot) => {
      setInquiries(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });

    const unsubBlogs = onSnapshot(query(collection(db, 'blogs'), orderBy('timestamp', 'desc')), (snapshot) => {
      setBlogs(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });

    const unsubEvents = onSnapshot(query(collection(db, 'events'), orderBy('timestamp', 'desc')), (snapshot) => {
      setEvents(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });

    return () => {
      unsubscribeAuth();
      unsubInquiries();
      unsubBlogs();
      unsubEvents();
    };
  }, [navigate]);

  const handleLogout = () => signOut(auth);

  // Inquiry Logic
  const deleteInquiry = (id) => {
    setConfirmModal({
      title: 'Exterminate Transmission',
      message: 'Are you certain you wish to purge this artifact from the system memory? This action is irreversible.',
      confirmText: 'Confirm Purge',
      onConfirm: async () => {
        await deleteDoc(doc(db, 'inquiries', id));
        setConfirmModal(null);
      }
    });
  };

  const markResolved = async (id, current) => {
    await updateDoc(doc(db, 'inquiries', id), { resolved: !current });
  };

  const sendReply = async (inquiry, replyText) => {
    try {
      await updateDoc(doc(db, 'inquiries', inquiry.id), {
        reply: replyText,
        repliedAt: serverTimestamp(),
        resolved: true
      });

      // EmailJS Response to User
      const result = await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_USER_TEMPLATE_ID,
        {
          to_name: inquiry.name,
          to_email: inquiry.email,
          reply_message: replyText,
          original_message: inquiry.message
        },
        EMAILJS_PUBLIC_KEY
      );
      if (result.status === 200) {
        setSystemAlert({
          title: 'Transmission Success',
          message: 'The vision has been successfully synchronized and transmitted to the client.'
        });
      }
    } catch (err) {
      console.error('Email Transmission Failed:', err);
      const errorMsg = err?.text || err?.message || 'Unknown error';
      setSystemAlert({
        title: 'Network Dissonance',
        message: 'The insight was archived locally, but the transmission failed: ' + errorMsg
      });
    } finally {
      setShowInquiryReply(null);
    }
  };

  // Blog Logic
  const saveBlog = async (data) => {
    if (data.id) {
      await updateDoc(doc(db, 'blogs', data.id), { ...data, timestamp: serverTimestamp() });
    } else {
      await addDoc(collection(db, 'blogs'), { ...data, timestamp: serverTimestamp() });
    }
    setShowBlogForm(null);
  };

  const deleteBlog = (id) => {
    setConfirmModal({
      title: 'Erase Insight',
      message: 'This curated artifact will be permanently removed from the public archive. Proceed with caution.',
      confirmText: 'Erase Permanently',
      onConfirm: async () => {
        await deleteDoc(doc(db, 'blogs', id));
        setConfirmModal(null);
      }
    });
  };

  // Event Logic
  const saveEvent = async (data) => {
    if (data.id) {
      await updateDoc(doc(db, 'events', data.id), { ...data });
    } else {
      await addDoc(collection(db, 'events'), { ...data, timestamp: serverTimestamp() });
    }
    setShowEventForm(null);
  };

  const deleteEvent = (id) => {
    setConfirmModal({
      title: 'Cancel Engagement',
      message: 'Removing this forum will synchronize across all curator terminals. All registration links will be deactivated.',
      confirmText: 'Confirm Deactivation',
      onConfirm: async () => {
        await deleteDoc(doc(db, 'events', id));
        setConfirmModal(null);
      }
    });
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-background flex text-white relative">
      <div className="fixed inset-0 grain-overlay z-[0] pointer-events-none opacity-[0.03]"></div>
      
      {/* Desktop Sidebar Shell */}
      <aside className="hidden md:flex w-64 border-r border-stone-800 bg-stone-900/50 flex-col fixed inset-y-0 z-20">
        <div className="p-8 border-b border-stone-800">
          <div className="text-xl font-bold text-white mb-1 font-headline">TOP Admin</div>
          <div className="font-body font-extralight uppercase tracking-[0.1em] text-[10px] text-stone-500 italic">Curator Console</div>
        </div>

        <nav className="flex-grow py-8 bg-stone-950/20">
          <ul className="space-y-2 px-4">
            <li>
              <button 
                onClick={() => setActiveTab('dashboard')}
                className={`w-full flex items-center gap-4 px-4 py-3 transition-all ${activeTab === 'dashboard' ? 'bg-red-950/20 text-red-500 border-r-4 border-red-700' : 'text-stone-500 hover:text-white'}`}
              >
                <LayoutDashboard className="w-4 h-4" />
                <span className="font-label uppercase tracking-widest text-[10px] font-bold">Dashboard</span>
              </button>
            </li>
            <li>
              <button 
                onClick={() => setActiveTab('inquiries')}
                className={`w-full flex items-center gap-4 px-4 py-3 transition-all ${activeTab === 'inquiries' ? 'bg-red-950/20 text-red-500 border-r-4 border-red-700' : 'text-stone-500 hover:text-white'}`}
              >
                <MessageSquare className="w-4 h-4" />
                <span className="font-label uppercase tracking-widest text-[10px]">Inquiries</span>
                {inquiries.filter(i => !i.resolved).length > 0 && (
                  <span className="ml-auto bg-primary-container text-white text-[8px] px-1.5 py-0.5 rounded-full">
                    {inquiries.filter(i => !i.resolved).length}
                  </span>
                )}
              </button>
            </li>
            <li>
              <button 
                onClick={() => setActiveTab('blogs')}
                className={`w-full flex items-center gap-4 px-4 py-3 transition-all ${activeTab === 'blogs' ? 'bg-red-950/20 text-red-500 border-r-4 border-red-700' : 'text-stone-500 hover:text-white'}`}
              >
                <FileText className="w-4 h-4" />
                <span className="font-label uppercase tracking-widest text-[10px]">Blog Posts</span>
              </button>
            </li>
            <li>
              <button 
                onClick={() => setActiveTab('events')}
                className={`w-full flex items-center gap-4 px-4 py-3 transition-all ${activeTab === 'events' ? 'bg-red-950/20 text-red-500 border-r-4 border-red-700' : 'text-stone-500 hover:text-white'}`}
              >
                <Calendar className="w-4 h-4" />
                <span className="font-label uppercase tracking-widest text-[10px]">Events</span>
              </button>
            </li>
          </ul>
        </nav>

        <div className="p-4 border-t border-stone-800 bg-stone-950/30">
          <button 
            onClick={handleLogout}
            className="w-full flex items-center gap-4 px-4 py-3 text-stone-500 hover:text-red-500 transition-all group"
          >
            <LogOut className="w-4 h-4" />
            <span className="font-label uppercase tracking-widest text-[10px]">Logout</span>
          </button>
        </div>
      </aside>

      {/* Mobile Top Navigation */}
      <header className="fixed top-0 left-0 w-full z-40 bg-stone-950/60 backdrop-blur-xl border-b border-stone-800/30 md:hidden">
        <div className="flex justify-between items-center px-6 py-5">
          <div className="flex items-center gap-3">
            <span className="text-xl font-black tracking-tighter text-white font-headline border-l-2 border-secondary pl-3">TOP</span>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-8 h-8 bg-stone-800 flex items-center justify-center overflow-hidden ring-1 ring-white/10">
              <img alt="Profile" className="w-full h-full object-cover" src={curator} />
            </div>
          </div>
        </div>
      </header>
      
      {/* Main Content Area */}
      <main className="flex-grow md:ml-64 p-6 md:p-12 relative z-10 pt-28 md:pt-12 pb-32 md:pb-12">
        <header className="flex justify-between items-end mb-12">
          <div>
            <p className="font-body font-extralight uppercase tracking-[0.2em] text-[10px] text-primary mb-2 md:mb-4">Internal Management</p>
            <h1 className="font-headline text-3xl md:text-5xl font-light tracking-tight text-white mb-2 md:mb-4">
              {activeTab === 'dashboard' ? 'Overview' : activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
            </h1>
            <div className="h-0.5 w-12 bg-primary mt-2"></div>
          </div>
          <Link 
            to="/" 
            className="hidden md:flex items-center gap-2 text-secondary font-label uppercase tracking-widest text-[10px] border border-secondary/20 px-6 py-3 hover:bg-secondary/5 transition-all"
          >
            Terminal <ExternalLink className="w-3 h-3" />
          </Link>
        </header>

        {activeTab === 'dashboard' && (
          <div className="space-y-12 animate-in fade-in duration-700">
            {/* Key Metrics: 2x2 on mobile */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
              <div className="bg-stone-900/40 p-5 md:p-8 flex flex-col justify-between h-32 md:h-40 border-l-2 border-primary group hover:bg-stone-900/60 transition-colors">
                <span className="font-label font-extralight uppercase tracking-widest text-[9px] text-stone-500 group-hover:text-stone-400 transition-colors">Impressions</span>
                <div className="flex flex-col">
                  <span className="text-2xl md:text-4xl font-light text-white tracking-tighter">142.8k</span>
                  <span className="text-[10px] text-primary font-medium mt-1">+12% vs week</span>
                </div>
              </div>
              <div className="bg-stone-900/40 p-5 md:p-8 flex flex-col justify-between h-32 md:h-40 group hover:bg-stone-900/60 transition-colors">
                <span className="font-label font-extralight uppercase tracking-widest text-[9px] text-stone-500 group-hover:text-stone-400 transition-colors">Curations</span>
                <div className="flex flex-col">
                  <span className="text-2xl md:text-4xl font-light text-white tracking-tighter">{blogs.length}</span>
                  <span className="text-[10px] text-stone-500 font-medium mt-1">Active Portfolio</span>
                </div>
              </div>
              <div className="bg-stone-900/40 p-5 md:p-8 flex flex-col justify-between h-32 md:h-40 group hover:bg-stone-900/60 transition-colors">
                <span className="font-label font-extralight uppercase tracking-widest text-[9px] text-stone-500 group-hover:text-stone-400 transition-colors">Forums</span>
                <div className="flex flex-col">
                  <span className="text-2xl md:text-4xl font-light text-white tracking-tighter">{events.length}</span>
                  <span className="text-[10px] text-secondary font-medium mt-1">Global Reach</span>
                </div>
              </div>
              <div className="bg-stone-900/40 p-5 md:p-8 flex flex-col justify-between h-32 md:h-40 border-r-2 border-stone-800 group hover:bg-stone-900/60 transition-colors">
                <span className="font-label font-extralight uppercase tracking-widest text-[9px] text-stone-500 group-hover:text-stone-400 transition-colors">Waitlist</span>
                <div className="flex flex-col">
                  <span className="text-2xl md:text-4xl font-light text-white tracking-tighter">{inquiries.filter(i => !i.resolved).length}</span>
                  <span className="text-[10px] text-primary font-medium mt-1">Priority Tasks</span>
                </div>
              </div>
            </div>

            {/* Primary CTA */}
            <div className="flex flex-col md:flex-row gap-4 mb-16">
               <button 
                onClick={() => setActiveTab('blogs')}
                className="flex-1 py-5 bg-primary-container text-white font-label font-medium uppercase tracking-[0.15em] text-[10px] flex items-center justify-center gap-3 active:scale-[0.98] transition-all hover:bg-red-700"
              >
                <Plus className="w-4 h-4" /> New Insight entry
              </button>
              <button 
                onClick={() => setActiveTab('inquiries')}
                className="flex-1 py-5 bg-stone-900 border border-stone-800 text-stone-400 font-label font-medium uppercase tracking-[0.15em] text-[10px] flex items-center justify-center gap-3 active:scale-[0.98] transition-all hover:border-stone-600 hover:text-white"
              >
                <MessageSquare className="w-4 h-4" /> Review waitlist
              </button>
            </div>

            {/* Recent Artifacts Gallery */}
            <section className="mb-20">
              <div className="flex justify-between items-end mb-8 border-b border-stone-800 pb-4">
                <h2 className="font-headline text-2xl font-light italic text-white/90">Recent Artifacts</h2>
                <button onClick={() => setActiveTab('blogs')} className="font-label font-extralight uppercase tracking-[0.1em] text-[10px] text-stone-500 hover:text-primary transition-colors">View Archives</button>
              </div>
              
              {blogs.length === 0 ? (
                <div className="py-20 text-center border border-dashed border-stone-800 bg-stone-900/20">
                   <Database className="w-8 h-8 text-stone-800 mx-auto mb-4" />
                   <p className="font-body text-stone-600 text-sm italic">The archive is waiting for your curated vision.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                  {blogs.slice(0, 3).map((blog, idx) => (
                    <div key={blog.id} className="group cursor-pointer" onClick={() => setShowBlogForm(blog)}>
                      <div className="relative w-full aspect-[4/5] bg-stone-900 mb-6 overflow-hidden">
                        <div className="absolute inset-0 bg-stone-950 opacity-40 group-hover:opacity-20 transition-opacity z-10"></div>
                        <div className="w-full h-full flex items-center justify-center text-stone-800 font-headline text-2xl italic select-none">
                            {blog.title.charAt(0)}
                        </div>
                        <div className="absolute top-6 left-6 bg-stone-950/90 backdrop-blur-md px-3 py-1.5 z-20 border border-white/5">
                          <span className="text-[9px] font-label tracking-[0.2em] text-white uppercase">{blog.category}</span>
                        </div>
                        <div className="absolute bottom-6 left-6 z-20 opacity-0 group-hover:opacity-100 transition-opacity">
                           <div className="p-3 bg-primary rounded-full shadow-2xl">
                              <Plus className="w-4 h-4 text-white" />
                           </div>
                        </div>
                      </div>
                      <div className="space-y-3">
                        <h3 className="font-headline text-xl font-light text-white leading-tight group-hover:text-primary transition-colors line-clamp-2">{blog.title}</h3>
                        <div className="flex items-center gap-3 text-[10px] text-stone-500 font-label uppercase tracking-widest">
                          <span className="flex items-center gap-1.5"><Clock className="w-3 h-3" /> Modified {idx === 0 ? 'Recently' : 'Archives'}</span>
                          <span className="w-1 h-1 bg-stone-800 rounded-full"></span>
                          <span className="text-secondary">{idx === 0 ? 'Public' : 'Stored'}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </section>

            {/* Performance Bento Segment */}
            <section className="bg-stone-900/20 border border-stone-800 p-8 md:p-12 mb-12">
              <div className="flex flex-col lg:flex-row justify-between gap-12">
                <div className="lg:w-1/3">
                  <h3 className="font-label font-extralight uppercase tracking-[0.2em] text-[10px] text-stone-500 mb-4">Performance Insights</h3>
                  <p className="font-body text-stone-400 text-sm italic leading-relaxed">
                    Analyzing the resonant frequencies of your curatorial data across the global architectural network.
                  </p>
                </div>
                <div className="lg:w-2/3 flex flex-col gap-8">
                  <div className="space-y-4">
                    <div className="flex justify-between items-end">
                      <span className="font-label text-stone-500 uppercase tracking-widest text-[10px]">Global Resonance</span>
                      <span className="font-headline text-2xl text-white tracking-tighter">84%</span>
                    </div>
                    <div className="w-full h-px bg-stone-800 relative">
                      <div className="absolute left-0 top-0 h-full w-[84%] bg-primary shadow-[0_0_10px_rgba(255,0,0,0.5)]"></div>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-8">
                    <div className="p-6 bg-stone-900/40 border border-stone-800 group hover:border-stone-600 transition-colors">
                       <TrendingUp className="w-5 h-5 text-secondary mb-4" />
                       <span className="block text-xl font-light text-white tracking-tighter mb-1">12.4m</span>
                       <span className="text-[9px] text-stone-500 uppercase tracking-widest leading-none">Total Seconds Viewtime</span>
                    </div>
                    <div className="p-6 bg-stone-900/40 border border-stone-800 group hover:border-stone-600 transition-colors">
                       <Activity className="w-5 h-5 text-primary mb-4" />
                       <span className="block text-xl font-light text-white tracking-tighter mb-1">98.2%</span>
                       <span className="text-[9px] text-stone-500 uppercase tracking-widest leading-none">System Stability Index</span>
                    </div>
                  </div>
                </div>
              </div>
            </section>

             {/* Support Actions */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-8 bg-stone-900 border border-stone-800 flex items-center justify-between group hover:bg-stone-800/40 transition-colors">
                <div className="flex items-center gap-6">
                  <div className="p-3 bg-stone-950 border border-stone-800 group-hover:border-primary transition-colors">
                    <Activity className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <h4 className="text-white text-[11px] font-bold uppercase tracking-widest">System Health</h4>
                    <p className="text-[10px] text-stone-500 font-light mt-1 italic">All curator services operational</p>
                  </div>
                </div>
                <div className="w-2 h-2 bg-green-500/50 rounded-full animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.5)]"></div>
              </div>
              <div className="p-8 bg-stone-900 border border-stone-800 flex items-center justify-between group hover:bg-stone-800/40 transition-colors">
                <div className="flex items-center gap-6">
                  <div className="p-3 bg-stone-950 border border-stone-800 group-hover:border-stone-400 transition-colors">
                    <Database className="w-4 h-4 text-stone-500" />
                  </div>
                  <div>
                    <h4 className="text-white text-[11px] font-bold uppercase tracking-widest">Archive Backup</h4>
                    <p className="text-[10px] text-stone-500 font-light mt-1 italic">Last sync: 2 hours ago</p>
                  </div>
                </div>
                <CheckCircle2 className="w-4 h-4 text-stone-700 group-hover:text-stone-400 transition-colors" />
              </div>
            </div>
          </div>
        )}

        {activeTab === 'inquiries' && (
          <div className="space-y-6 max-w-5xl animate-in slide-in-from-bottom-4 duration-500">
            {inquiries.length === 0 ? (
              <div className="bg-stone-950/20 p-24 text-center border border-dashed border-stone-800">
                <MessageSquare className="w-10 h-10 text-stone-800 mx-auto mb-6" />
                <p className="font-body text-stone-600 italic">The waitlist is silent.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-6">
                {inquiries.map((inquiry) => (
                  <div key={inquiry.id} className={`bg-stone-950 border border-stone-800 p-8 transition-all group hover:bg-stone-900/40 relative ${inquiry.resolved ? 'opacity-40 grayscale' : 'border-l-primary-container border-l-4'}`}>
                    <div className="flex flex-col md:flex-row justify-between gap-8">
                      <div className="flex-grow space-y-6">
                        <div className="flex flex-wrap items-center gap-6">
                          <div className="flex items-center gap-2 text-stone-500">
                            <User className="w-3 h-3" />
                            <span className="font-label uppercase tracking-widest text-[9px] font-bold">{inquiry.name}</span>
                          </div>
                          <div className="flex items-center gap-2 text-stone-500">
                            <Mail className="w-3 h-3" />
                            <span className="font-label uppercase tracking-widest text-[9px] font-bold">{inquiry.email}</span>
                          </div>
                          <div className="flex items-center gap-2 text-secondary">
                            <Briefcase className="w-3 h-3" />
                            <span className="font-label uppercase tracking-widest text-[9px] font-bold">{inquiry.service}</span>
                          </div>
                          <div className="flex items-center gap-2 text-stone-700">
                            <Clock className="w-3 h-3" />
                            <span className="font-label uppercase tracking-widest text-[9px] font-bold">
                              {inquiry.timestamp?.toDate().toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                        <p className="font-body text-xl text-white font-light leading-relaxed italic">"{inquiry.message}"</p>
                        {inquiry.reply && (
                          <div className="mt-8 p-6 bg-stone-900/50 border-l border-secondary/50">
                            <div className="flex items-center gap-2 text-secondary text-[9px] font-label uppercase tracking-widest mb-3">
                               <Reply className="w-3 h-3" /> Response Transmitted
                            </div>
                            <p className="font-body text-sm text-stone-400 italic">"{inquiry.reply}"</p>
                          </div>
                        )}
                      </div>
                      
                      <div className="flex md:flex-col gap-3 justify-end">
                        {!inquiry.reply && (
                          <button onClick={() => setShowInquiryReply(inquiry)} className="p-4 bg-stone-900 text-stone-500 hover:text-white border border-stone-800 hover:border-stone-600 transition-all" title="Reply">
                            <Reply className="w-5 h-5" />
                          </button>
                        )}
                        <button onClick={() => markResolved(inquiry.id, inquiry.resolved)} className={`p-4 border border-stone-800 hover:border-stone-600 transition-all ${inquiry.resolved ? 'text-green-500 bg-green-500/5' : 'text-stone-500 bg-stone-900 hover:text-white'}`}>
                          <CheckCircle2 className="w-5 h-5" />
                        </button>
                        <button onClick={() => deleteInquiry(inquiry.id)} className="p-4 bg-stone-900 text-stone-500 hover:text-primary border border-stone-800 hover:border-red-900/30 transition-all">
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === 'blogs' && (
          <div className="space-y-8 animate-in slide-in-from-bottom-4 duration-500 overflow-hidden">
            <div className="flex flex-wrap justify-between items-center gap-4 bg-stone-900/40 p-6 border border-stone-800">
              <span className="font-label uppercase tracking-widest text-[10px] text-stone-500">Live Insights: {blogs.length}</span>
              <button 
                onClick={() => setShowBlogForm({ title: '', excerpt: '', category: 'Architecture', content: '', imageUrl: '' })}
                className="bg-primary-container text-white px-8 py-4 font-label uppercase tracking-widest text-[10px] font-bold hover:bg-red-700 transition-all flex items-center gap-3"
              >
                <Plus className="w-4 h-4" /> New entry
              </button>
            </div>
            <div className="grid grid-cols-1 gap-6">
              {blogs.map(blog => (
                <div key={blog.id} className="bg-stone-950 border border-stone-800 p-6 md:p-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 group hover:bg-stone-900/30 transition-all min-w-0">
                  <div className="flex-1 min-w-0">
                    <span className="bg-primary/10 text-primary font-label uppercase text-[8px] tracking-[0.2em] px-2 py-1 mb-3 inline-block">{blog.category}</span>
                    <h3 className="font-headline text-xl md:text-2xl text-white mb-2 font-light group-hover:text-primary transition-colors break-words">{blog.title}</h3>
                    <p className="font-body text-sm text-stone-500 italic group-hover:text-stone-400 transition-colors break-words">{blog.excerpt}</p>
                  </div>
                  <div className="flex gap-4 w-full md:w-auto flex-shrink-0">
                    {blog.imageUrl && (
                      <div className="hidden lg:flex items-center justify-center w-12 h-12 bg-stone-900 border border-stone-800 overflow-hidden">
                        <img src={blog.imageUrl} alt="Asset" className="w-full h-full object-cover opacity-50" />
                      </div>
                    )}
                    <button onClick={() => setShowBlogForm(blog)} className="flex-1 md:flex-none p-4 bg-stone-900 text-stone-500 hover:text-white border border-stone-800 hover:border-stone-600 transition-all">
                      <Pencil className="w-4 h-4" />
                    </button>
                    <button onClick={() => deleteBlog(blog.id)} className="flex-1 md:flex-none p-4 bg-stone-900 text-stone-500 hover:text-primary border border-stone-800 hover:border-red-900/30 transition-all">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Events Management View */}
        {activeTab === 'events' && (
          <div className="space-y-8 animate-in slide-in-from-bottom-4 duration-500">
             <div className="flex justify-between items-center bg-stone-900/40 p-6 border border-stone-800">
              <span className="font-label uppercase tracking-widest text-[10px] text-stone-500">Global Forums: {events.length}</span>
              <button 
                onClick={() => setShowEventForm({ title: '', location: '', venue: '', date: '', action: 'Register', isPrimary: false, registrationLink: '', speakers: [], description: '' })}
                className="bg-secondary text-black px-8 py-4 font-label uppercase tracking-widest text-[10px] font-bold hover:bg-yellow-500 transition-all flex items-center gap-3"
              >
                <Plus className="w-4 h-4" /> Add Forum
              </button>
            </div>
            <div className="grid grid-cols-1 gap-6">
              {events.map(event => (
                <div key={event.id} className="bg-stone-950 border border-stone-800 p-8 flex flex-col md:flex-row justify-between items-start md:items-center group hover:bg-stone-900/30 transition-all">
                  <div className="mb-6 md:mb-0">
                    <div className="flex items-center gap-4 mb-3">
                       <span className="text-secondary font-label uppercase text-[8px] tracking-[0.2em] font-bold">{event.date}</span>
                       {event.isPrimary && <span className="bg-primary/10 text-primary text-[7px] px-2 py-0.5 font-label uppercase tracking-[0.1em] font-bold border border-primary/20">Featured</span>}
                    </div>
                    <h3 className="font-headline text-2xl text-white font-light group-hover:text-primary transition-colors">{event.title}</h3>
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-2">
                       <p className="font-label text-stone-600 text-[10px] uppercase tracking-[0.2em] italic">{event.location} • {event.venue}</p>
                       {event.registrationLink && (
                         <a href={event.registrationLink} target="_blank" rel="noopener noreferrer" className="text-secondary font-label uppercase text-[8px] tracking-widest border-b border-secondary/20 hover:border-secondary transition-all">Portal <ExternalLink className="w-2 h-2 inline ml-1" /></a>
                       )}
                    </div>
                  </div>
                  <div className="flex gap-4 w-full md:w-auto">
                    <button onClick={() => setShowEventForm(event)} className="flex-1 md:flex-none p-4 bg-stone-900 text-stone-500 hover:text-white border border-stone-800 hover:border-stone-600 transition-all">
                      <Pencil className="w-4 h-4" />
                    </button>
                    <button onClick={() => deleteEvent(event.id)} className="flex-1 md:flex-none p-4 bg-stone-900 text-stone-500 hover:text-primary border border-stone-800 hover:border-red-900/30 transition-all">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* MODALS */}
        {showInquiryReply && (
          <div className="fixed inset-0 md:left-64 z-[100] flex items-start md:items-center justify-center bg-black/90 backdrop-blur-xl p-4 md:p-8 overflow-y-auto">
            <div className="bg-stone-950 border border-stone-800 w-full max-w-2xl p-8 md:p-12 relative shadow-[0_0_50px_rgba(0,0,0,0.8)] animate-in zoom-in-95 duration-300 my-auto">
              <button onClick={() => setShowInquiryReply(null)} className="absolute top-6 right-6 md:top-8 md:right-8 text-stone-600 hover:text-white transition-colors">
                <X className="w-6 h-6" />
              </button>
              <h3 className="font-headline text-3xl md:text-4xl text-white mb-2 font-light">Transmit Vision</h3>
              <p className="font-body text-stone-500 mb-10 italic">Responding to {showInquiryReply.name}</p>
              
              <div className="space-y-8">
                <div className="bg-stone-900/50 p-6 border-l border-white/10 mb-8 italic text-stone-400 text-sm">
                   "{showInquiryReply.message}"
                </div>
                <textarea 
                  className="w-full bg-stone-900 border border-stone-800 p-6 text-white font-body text-lg focus:ring-1 focus:ring-primary focus:border-primary transition-all min-h-[220px] outline-none"
                  placeholder="Curate your message..."
                  id="reply-text"
                />
                
                <button 
                  onClick={() => sendReply(showInquiryReply, document.getElementById('reply-text').value)}
                  className="w-full bg-primary-container text-white py-5 font-label uppercase tracking-[0.2em] text-[10px] font-bold hover:bg-red-700 transition-all flex items-center justify-center gap-3 shadow-xl"
                >
                  Confirm Transmission <Reply className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        )}

        {showBlogForm && (
          <div className="fixed inset-0 md:left-64 z-[100] overflow-y-auto bg-black/95 backdrop-blur-2xl">
            <div className="flex min-h-full items-start md:items-center justify-center p-4 md:p-8">
              <div className="bg-stone-950 border border-stone-800 w-full max-w-4xl flex flex-col animate-in slide-in-from-bottom-8 duration-500 shadow-2xl my-4 md:my-0">
                {/* Header */}
                <div className="flex justify-between items-center px-6 md:px-12 pt-8 pb-6 border-b border-stone-800 sticky top-0 bg-stone-950 z-10">
                  <div>
                    <h3 className="font-headline text-2xl md:text-4xl text-white italic font-light">{showBlogForm.id ? 'Refine Insight' : 'Draft New Insight'}</h3>
                    <p className="font-label uppercase tracking-widest text-[9px] text-stone-500 mt-2">Archiving curated vision</p>
                  </div>
                  <button onClick={() => setShowBlogForm(null)} className="text-stone-600 hover:text-white transition-colors flex-shrink-0 ml-4">
                    <X className="w-7 h-7" />
                  </button>
                </div>
                {/* Form Body */}
                <div className="px-6 md:px-12 py-8">
                  <form onSubmit={async (e) => {
                    e.preventDefault();
                    const formData = new FormData(e.target);
                    let imageUrl = showBlogForm.imageUrl || '';
                     if (blogImageFile) {
                       setUploading(true);
                       try { 
                         const optimized = await compressImage(blogImageFile);
                         imageUrl = await uploadToCloudinary(optimized); 
                       }
                       catch (err) { 
                         console.error("Blog image compression/upload failure:", err);
                         imageUrl = showBlogForm.imageUrl || ''; 
                       }
                       setUploading(false);
                     }
                    saveBlog({
                      ...showBlogForm,
                      title: formData.get('title'),
                      category: formData.get('category'),
                      excerpt: formData.get('excerpt'),
                      content: formData.get('content'),
                      imageUrl
                    });
                    setBlogImageFile(null); setBlogImagePreview(null);
                  }} className="space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="space-y-3">
                        <label className="font-label uppercase text-[10px] tracking-widest text-stone-500 font-bold">Title of Insight</label>
                        <input name="title" defaultValue={showBlogForm.title} required className="w-full bg-stone-900/50 border border-stone-800 p-4 text-white focus:ring-1 focus:ring-primary focus:border-primary transition-all outline-none italic" />
                      </div>
                      <div className="space-y-3">
                        <label className="font-label uppercase text-[10px] tracking-widest text-stone-500 font-bold">Curatorial Category</label>
                        <input name="category" defaultValue={showBlogForm.category} required className="w-full bg-stone-900/50 border border-stone-800 p-4 text-white focus:ring-1 focus:ring-primary focus:border-primary transition-all outline-none" />
                      </div>
                    </div>
                    {/* Image upload */}
                    <div className="space-y-3">
                      <label className="font-label uppercase text-[10px] tracking-widest text-stone-500 font-bold">Cover Image</label>
                      <label className="flex items-center gap-4 p-4 bg-stone-900/50 border border-dashed border-stone-700 hover:border-primary transition-all cursor-pointer group">
                        <input type="file" accept="image/*" className="hidden" onChange={(e) => {
                          const file = e.target.files[0];
                          if (!file) return;
                          setBlogImageFile(file);
                          setBlogImagePreview(URL.createObjectURL(file));
                        }} />
                        {blogImagePreview || showBlogForm.imageUrl ? (
                          <img src={blogImagePreview || showBlogForm.imageUrl} alt="preview" className="w-16 h-16 object-cover border border-stone-700" />
                        ) : (
                          <div className="w-16 h-16 bg-stone-800 flex items-center justify-center border border-stone-700">
                            <span className="text-stone-600 text-2xl">+</span>
                          </div>
                        )}
                        <div>
                          <p className="font-label uppercase text-[10px] tracking-widest text-stone-400 group-hover:text-white transition-colors">{blogImageFile ? blogImageFile.name : 'Choose image file'}</p>
                          <p className="text-stone-600 text-[9px] mt-1">JPG, PNG, WEBP — uploaded to Cloudinary</p>
                        </div>
                      </label>
                    </div>
                    <div className="space-y-3">
                      <label className="font-label uppercase text-[10px] tracking-widest text-stone-500 font-bold">Narrative Excerpt</label>
                      <textarea name="excerpt" defaultValue={showBlogForm.excerpt} required rows="3" className="w-full bg-stone-900/50 border border-stone-800 p-4 text-white focus:ring-1 focus:ring-primary focus:border-primary transition-all outline-none italic" />
                    </div>
                    <div className="space-y-3">
                      <label className="font-label uppercase text-[10px] tracking-widest text-stone-500 font-bold">Body Content</label>
                      <textarea name="content" defaultValue={showBlogForm.content} required rows="10" className="w-full bg-stone-950 border border-stone-800 p-6 text-white font-body text-base leading-relaxed focus:ring-1 focus:ring-primary focus:border-primary transition-all outline-none" />
                    </div>
                    <button disabled={uploading} className="w-full bg-primary-container text-white py-5 font-label uppercase tracking-[0.25em] text-[10px] font-bold hover:bg-red-700 transition-all shadow-xl active:scale-[0.99] disabled:opacity-50 disabled:cursor-wait">
                      {uploading ? 'Uploading Image…' : 'Publish into Archive'}
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        )}

        {showEventForm && (
          <div className="fixed inset-0 md:left-64 z-[100] overflow-y-auto bg-black/95 backdrop-blur-2xl">
            <div className="flex min-h-full items-start md:items-center justify-center p-4 md:p-8">
              <div className="bg-stone-950 border border-stone-800 w-full max-w-2xl flex flex-col animate-in zoom-in-95 duration-300 shadow-2xl my-4 md:my-0">
                {/* Header */}
                <div className="flex justify-between items-center px-6 md:px-12 pt-8 pb-6 border-b border-stone-800 sticky top-0 bg-stone-950 z-10">
                  <div>
                    <h3 className="font-headline text-2xl md:text-4xl text-white italic font-light">{showEventForm.id ? 'Refine Engagement' : 'New Engagement'}</h3>
                    <p className="font-label uppercase tracking-widest text-[9px] text-stone-500 mt-2">Synchronizing global forum</p>
                  </div>
                  <button onClick={() => { setShowEventForm(null); setEventImageFile(null); setEventImagePreview(null); setGalleryPreview([]); }} className="text-stone-600 hover:text-white transition-colors flex-shrink-0 ml-4">
                    <X className="w-6 h-6" />
                  </button>
                </div>
                {/* Form Body */}
                <div className="px-6 md:px-12 py-8">
                  <form onSubmit={async (e) => {
                    e.preventDefault();
                    const formData = new FormData(e.target);
                    let imageUrl = showEventForm.imageUrl || '';
                    let speakers = [...(showEventForm.speakers || [])];
                    
                    setUploading(true);
                    try {
                      // 1. Handle single cover image upload
                      if (eventImageFile) {
                        const optimized = await compressImage(eventImageFile);
                        imageUrl = await uploadToCloudinary(optimized);
                      }
                      
                      // 2. Handle speaker image uploads
                      const speakerUploadPromises = Object.keys(speakerImageFiles).map(async (idx) => {
                        const file = speakerImageFiles[idx];
                        if (file) {
                          const optimized = await compressImage(file);
                          const url = await uploadToCloudinary(optimized);
                          speakers[idx] = { ...speakers[idx], imageUrl: url };
                        }
                      });
                      await Promise.all(speakerUploadPromises);

                    } catch (err) {
                      console.error("Synchronization failure:", err);
                      setSystemAlert({ title: "Upload Dissonance", message: "Failed to synchronize some vision fragments to the cloud." });
                    }
                    setUploading(false);

                    // 3. Finalize Speaker Data from Form
                    const updatedSpeakers = speakers.map((s, idx) => ({
                      ...s,
                      name: formData.get(`speaker_name_${idx}`),
                      role: formData.get(`speaker_role_${idx}`),
                      bio: formData.get(`speaker_bio_${idx}`)
                    }));

                    saveEvent({
                      ...showEventForm,
                      title: formData.get('title'),
                      date: formData.get('date'),
                      location: formData.get('location'),
                      venue: formData.get('venue'),
                      description: formData.get('description'),
                      isPrimary: formData.get('isPrimary') === 'on',
                      registrationLink: formData.get('registrationLink'),
                      imageUrl,
                      speakers: updatedSpeakers
                    });
                    setEventImageFile(null); setEventImagePreview(null); setSpeakerImageFiles({}); setGalleryPreview([]);
                  }} className="space-y-6">
                    <div className="space-y-3">
                      <label className="font-label uppercase text-[10px] tracking-widest text-stone-500 font-bold">Forum Title</label>
                      <input name="title" defaultValue={showEventForm.title} required className="w-full bg-stone-900/50 border border-stone-800 p-4 text-white focus:ring-1 focus:ring-secondary focus:border-secondary transition-all outline-none italic" />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-3">
                        <label className="font-label uppercase text-[10px] tracking-widest text-stone-500 font-bold">Chronology (Date)</label>
                        <input name="date" defaultValue={showEventForm.date} placeholder="Oct 12, 2024" required className="w-full bg-stone-900/50 border border-stone-800 p-4 text-white outline-none" />
                      </div>
                      <div className="space-y-3">
                        <label className="font-label uppercase text-[10px] tracking-widest text-stone-500 font-bold">Geography (Location)</label>
                        <input name="location" defaultValue={showEventForm.location} required className="w-full bg-stone-900/50 border border-stone-800 p-4 text-white outline-none" />
                      </div>
                    </div>
                    <div className="space-y-3">
                      <label className="font-label uppercase text-[10px] tracking-widest text-stone-500 font-bold">Venue Site</label>
                      <input name="venue" defaultValue={showEventForm.venue} required className="w-full bg-stone-900/50 border border-stone-800 p-4 text-white outline-none" />
                    </div>
                    <div className="space-y-3">
                      <label className="font-label uppercase text-[10px] tracking-widest text-stone-500 font-bold">Registration Site (URL) / Action Link</label>
                      <input name="registrationLink" defaultValue={showEventForm.registrationLink} placeholder="https://..." className="w-full bg-stone-900/50 border border-stone-800 p-4 text-white outline-none" />
                    </div>
                    <div className="space-y-3">
                      <label className="font-label uppercase text-[10px] tracking-widest text-stone-500 font-bold">Narrative Description</label>
                      <textarea name="description" defaultValue={showEventForm.description} rows="4" className="w-full bg-stone-900/50 border border-stone-800 p-4 text-white focus:ring-1 focus:ring-secondary focus:border-secondary transition-all outline-none italic" placeholder="Details for the archival record..." />
                    </div>
                    <div className="space-y-3">
                      <label className="font-label uppercase text-[10px] tracking-widest text-stone-500 font-bold">Cover Image</label>
                      <label className="flex items-center gap-4 p-4 bg-stone-900/50 border border-dashed border-stone-700 hover:border-secondary transition-all cursor-pointer group">
                        <input type="file" accept="image/*" className="hidden" onChange={(e) => {
                          const file = e.target.files[0];
                          if (!file) return;
                          setEventImageFile(file);
                          setEventImagePreview(URL.createObjectURL(file));
                        }} />
                        {eventImagePreview || showEventForm.imageUrl ? (
                          <img src={eventImagePreview || showEventForm.imageUrl} alt="preview" className="w-16 h-16 object-cover border border-stone-700" />
                        ) : (
                          <div className="w-16 h-16 bg-stone-800 flex items-center justify-center border border-stone-700">
                            <span className="text-stone-600 text-2xl">+</span>
                          </div>
                        )}
                        <div>
                          <p className="font-label uppercase text-[10px] tracking-widest text-stone-400 group-hover:text-white transition-colors">{eventImageFile ? eventImageFile.name : 'Choose cover file'}</p>
                          <p className="text-secondary text-[8px] uppercase tracking-widest mt-1 font-bold italic">Limit: 10MB per image</p>
                        </div>
                      </label>
                    </div>

                    {/* Speakers / Orchestrators Section */}
                    <div className="space-y-6 pt-6 border-t border-stone-800">
                      <div className="flex justify-between items-center">
                        <label className="font-label uppercase text-[11px] tracking-[0.3em] text-secondary font-bold">Orchestrators & Curators</label>
                        <button 
                          type="button" 
                          onClick={() => {
                            const newSpeakers = [...(showEventForm.speakers || []), { name: '', role: '', bio: '', imageUrl: '' }];
                            setShowEventForm({...showEventForm, speakers: newSpeakers});
                          }}
                          className="text-white hover:text-secondary transition-colors flex items-center gap-2 font-label uppercase text-[9px] tracking-widest border border-stone-800 px-3 py-1.5 hover:bg-stone-900"
                        >
                          <Plus className="w-3 h-3" /> Append Speaker
                        </button>
                      </div>

                      <div className="space-y-8">
                        {(showEventForm.speakers || []).map((speaker, idx) => (
                          <div key={idx} className="p-6 bg-stone-900/30 border border-stone-800 space-y-6 relative group/speaker">
                            <button 
                              type="button"
                              onClick={() => {
                                const newSpeakers = showEventForm.speakers.filter((_, i) => i !== idx);
                                setShowEventForm({...showEventForm, speakers: newSpeakers});
                                const newFiles = {...speakerImageFiles};
                                delete newFiles[idx];
                                setSpeakerImageFiles(newFiles);
                              }}
                              className="absolute top-4 right-4 bg-stone-950 p-2 text-stone-600 hover:text-primary transition-colors opacity-0 group-hover/speaker:opacity-100"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>

                            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                              <div className="md:col-span-3">
                                <label className="font-label uppercase text-[9px] tracking-widest text-stone-500 mb-3 block">Profile Artifact</label>
                                <label className="relative aspect-square bg-stone-950 border border-stone-800 flex items-center justify-center cursor-pointer overflow-hidden group/img">
                                  <input 
                                    type="file" 
                                    accept="image/*" 
                                    className="hidden" 
                                    onChange={(e) => {
                                      const file = e.target.files[0];
                                      if (file) {
                                        setSpeakerImageFiles({...speakerImageFiles, [idx]: file});
                                      }
                                    }}
                                  />
                                  {speakerImageFiles[idx] || speaker.imageUrl ? (
                                    <img 
                                      src={speakerImageFiles[idx] ? URL.createObjectURL(speakerImageFiles[idx]) : speaker.imageUrl} 
                                      alt="Speaker" 
                                      className="w-full h-full object-cover grayscale transition-all group-hover/img:grayscale-0" 
                                    />
                                  ) : (
                                    <Plus className="w-6 h-6 text-stone-700 group-hover/img:text-secondary transition-colors" />
                                  )}
                                </label>
                              </div>
                              <div className="md:col-span-9 space-y-4">
                                <div>
                                  <label className="font-label uppercase text-[9px] tracking-widest text-stone-500 mb-2 block">Full Name</label>
                                  <input 
                                    name={`speaker_name_${idx}`} 
                                    defaultValue={speaker.name} 
                                    required 
                                    placeholder="e.g. Adisa Olutoye"
                                    className="w-full bg-stone-950 border border-stone-800 p-3 text-white outline-none focus:border-secondary transition-colors" 
                                  />
                                </div>
                                <div>
                                  <label className="font-label uppercase text-[9px] tracking-widest text-stone-500 mb-2 block">Designation / Role</label>
                                  <input 
                                    name={`speaker_role_${idx}`} 
                                    defaultValue={speaker.role} 
                                    required 
                                    placeholder="e.g. Lead Architect, curator"
                                    className="w-full bg-stone-950 border border-stone-800 p-3 text-white outline-none focus:border-secondary transition-colors" 
                                  />
                                </div>
                              </div>
                            </div>
                            <div>
                              <label className="font-label uppercase text-[9px] tracking-widest text-stone-500 mb-2 block">Brief Biography</label>
                              <textarea 
                                name={`speaker_bio_${idx}`} 
                                defaultValue={speaker.bio} 
                                rows="3" 
                                placeholder="Details about this orchestrator's vision..."
                                className="w-full bg-stone-950 border border-stone-800 p-3 text-white outline-none focus:border-secondary transition-colors italic text-sm" 
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="pt-6 border-t border-stone-800 space-y-4">
                      <div className="flex items-center gap-4 py-2 group">
                        <input type="checkbox" name="isPrimary" id="isPrimary" defaultChecked={showEventForm.isPrimary} className="w-5 h-5 bg-stone-900 border-stone-700 rounded text-secondary focus:ring-secondary transition-all" />
                        <label htmlFor="isPrimary" className="font-label uppercase text-[10px] tracking-[0.2em] text-stone-300 group-hover:text-secondary transition-colors cursor-pointer">Feature Engagement</label>
                      </div>
                    </div>
                    <button disabled={uploading} className="w-full bg-secondary text-black py-5 font-label uppercase tracking-[0.25em] text-[10px] font-bold hover:bg-neutral-800 hover:text-white transition-all shadow-xl disabled:opacity-50 disabled:cursor-wait">
                      {uploading ? 'Uploading Image…' : 'Synchronize Forum'}
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {/* CUSTOM CONFIRM MODAL */}
        {confirmModal && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/95 backdrop-blur-3xl p-6">
            <div className="bg-stone-950 border border-stone-800 w-full max-w-lg p-10 md:p-12 animate-in zoom-in-95 duration-300 shadow-[0_0_100px_rgba(255,0,0,0.1)]">
               <div className="w-16 h-1 bg-primary mb-10"></div>
               <h3 className="font-headline text-3xl text-white mb-6 italic">{confirmModal.title}</h3>
               <p className="font-body text-stone-500 text-base leading-relaxed mb-12 italic">
                 {confirmModal.message}
               </p>
               <div className="flex flex-col gap-4">
                 <button 
                  onClick={confirmModal.onConfirm}
                  className="w-full bg-primary-container text-white py-5 font-label uppercase tracking-[0.2em] text-[10px] font-bold hover:bg-red-700 transition-all shadow-xl"
                 >
                   {confirmModal.confirmText}
                 </button>
                 <button 
                  onClick={() => setConfirmModal(null)}
                  className="w-full bg-stone-900 text-stone-500 py-5 font-label uppercase tracking-[0.2em] text-[10px] font-bold hover:text-white border border-stone-800 transition-all"
                 >
                   Relinquish
                 </button>
               </div>
            </div>
          </div>
        )}

        {/* SYSTEM ALERT MODAL */}
        {systemAlert && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/95 backdrop-blur-3xl p-6">
             <div className="bg-stone-950 border border-stone-800 w-full max-w-md p-10 md:p-12 animate-in zoom-in-95 duration-300">
               <div className="flex justify-between items-start mb-8">
                  <div className="w-12 h-1 bg-secondary"></div>
                  <button onClick={() => setSystemAlert(null)} className="text-stone-700 hover:text-white transition-colors"><X className="w-5 h-5" /></button>
               </div>
               <h3 className="font-headline text-2xl text-white mb-4">{systemAlert.title}</h3>
               <p className="font-body text-stone-500 text-sm italic leading-relaxed mb-10">
                 {systemAlert.message}
               </p>
               <button 
                onClick={() => setSystemAlert(null)}
                className="w-full bg-stone-900 text-secondary py-5 font-label uppercase tracking-[0.2em] text-[10px] font-bold border border-stone-800 hover:border-secondary/30 transition-all"
               >
                 Acknowledge
               </button>
            </div>
          </div>
        )}
      </main>

      {/* Mobile Bottom Navigation Bar */}
      <nav className="fixed bottom-0 left-0 w-full bg-stone-950/90 backdrop-blur-2xl z-50 px-4 md:hidden border-t border-white/5">
        <div className="flex justify-around items-center py-4">
          <button 
            onClick={() => setActiveTab('dashboard')}
            className={`flex flex-col items-center gap-1 py-1 transition-all ${activeTab === 'dashboard' ? 'text-primary' : 'text-stone-500 opacity-60'}`}
          >
            <LayoutDashboard className="w-5 h-5" />
            <span className="font-label uppercase tracking-[0.1em] text-[8px]">Dashboard</span>
          </button>
          <button 
            onClick={() => setActiveTab('blogs')}
            className={`flex flex-col items-center gap-1 py-1 transition-all ${activeTab === 'blogs' ? 'text-primary' : 'text-stone-500 opacity-60'}`}
          >
            <FileText className="w-5 h-5" />
            <span className="font-label uppercase tracking-[0.1em] text-[8px]">Insights</span>
          </button>
          <button 
            onClick={() => setActiveTab('inquiries')}
            className={`flex flex-col items-center gap-1 py-1 transition-all ${activeTab === 'inquiries' ? 'text-primary' : 'text-stone-500 opacity-60'}`}
          >
            <div className="relative">
              <MessageSquare className="w-5 h-5" />
              {inquiries.filter(i => !i.resolved).length > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary text-white text-[6px] w-2.5 h-2.5 flex items-center justify-center rounded-full font-bold">
                  {inquiries.filter(i => !i.resolved).length}
                </span>
              )}
            </div>
            <span className="font-label uppercase tracking-[0.1em] text-[8px]">waitlist</span>
          </button>
          <button 
            onClick={() => setActiveTab('events')}
            className={`flex flex-col items-center gap-1 py-1 transition-all ${activeTab === 'events' ? 'text-primary' : 'text-stone-500 opacity-60'}`}
          >
            <Calendar className="w-5 h-5" />
            <span className="font-label uppercase tracking-[0.1em] text-[8px]">Forums</span>
          </button>
          
          <div className="h-8 w-px bg-white/5 mx-2"></div>

          <Link to="/" className="flex flex-col items-center gap-1 py-1 text-stone-500 opacity-60 hover:text-white transition-all">
            <ExternalLink className="w-5 h-5" />
            <span className="font-label uppercase tracking-[0.1em] text-[8px]">Exit</span>
          </Link>

          <button onClick={handleLogout} className="flex flex-col items-center gap-1 py-1 text-stone-500 opacity-60 hover:text-red-500 transition-all">
            <LogOut className="w-5 h-5" />
            <span className="font-label uppercase tracking-[0.1em] text-[8px]">Logout</span>
          </button>
        </div>
      </nav>
    </div>
  );
};

export default Admin;
