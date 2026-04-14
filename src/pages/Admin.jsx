import { useState, useEffect } from 'react';
import { auth, db } from '../lib/firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { collection, query, orderBy, onSnapshot, doc, deleteDoc, updateDoc, addDoc, serverTimestamp } from 'firebase/firestore';
import { useNavigate, Link } from 'react-router-dom';
import emailjs from '@emailjs/browser';

// EmailJS Configuration (Replace with your keys)
const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
const EMAILJS_USER_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_USER_TEMPLATE_ID;
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
  X
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
  
  const navigate = useNavigate();

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
  const deleteInquiry = async (id) => {
    if (window.confirm('Delete this transmission permanently?')) {
      await deleteDoc(doc(db, 'inquiries', id));
    }
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
        console.log('Reply transmitted to client successfully!');
      }
    } catch (err) {
      console.error('Email Transmission Failed:', err);
      const errorMsg = err?.text || err?.message || 'Unknown error';
      alert('The vision was recorded in the archive, but the email transmission failed: ' + errorMsg);
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

  const deleteBlog = async (id) => {
    if (window.confirm('Exterminate this insight?')) {
      await deleteDoc(doc(db, 'blogs', id));
    }
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

  const deleteEvent = async (id) => {
    if (window.confirm('Cancel this engagement?')) {
      await deleteDoc(doc(db, 'events', id));
    }
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-background flex text-white relative">
      <div className="fixed inset-0 grain-overlay z-[0] pointer-events-none opacity-[0.03]"></div>
      
      {/* Sidebar Shell */}
      <aside className="w-64 border-r border-stone-800 bg-stone-900/50 flex flex-col fixed inset-y-0 z-20">
        <div className="p-8 border-b border-stone-800">
          <div className="text-xl font-bold text-white mb-1 font-headline">TOP Admin</div>
          <div className="font-body font-extralight uppercase tracking-[0.1em] text-[10px] text-stone-500 italic">Architectural Curator</div>
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

      {/* Main Content Area */}
      <main className="flex-grow ml-64 p-12 relative z-10">
        <header className="flex justify-between items-center mb-12">
          <div>
            <h1 className="font-headline text-4xl text-white mb-2">
              {activeTab === 'dashboard' ? 'System Overview' : 'Vision Transmissions'}
            </h1>
            <p className="font-body text-stone-500 text-sm italic">
              {activeTab === 'dashboard' ? 'Curating the digital landscape' : 'Managing inbound inquiries and bookings'}
            </p>
          </div>
          <Link 
            to="/" 
            className="flex items-center gap-2 text-secondary font-label uppercase tracking-widest text-[10px] border border-secondary/20 px-6 py-3 hover:bg-secondary/5 transition-all"
          >
            View Live Site <ExternalLink className="w-3 h-3" />
          </Link>
        </header>

        {activeTab === 'dashboard' && (
          <>
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              <div className="bg-stone-950 p-8 border border-stone-800 relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                  <FileText className="w-12 h-12" />
                </div>
                <h4 className="font-label uppercase text-[10px] text-stone-500 tracking-widest mb-4">Total Insights</h4>
                <p className="font-headline text-5xl text-white">{blogs.length}</p>
              </div>
              <div className="bg-stone-950 p-8 border border-stone-800 relative overflow-hidden group">
                 <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                  <Calendar className="w-12 h-12" />
                </div>
                <h4 className="font-label uppercase text-[10px] text-stone-500 tracking-widest mb-4">Global Forums</h4>
                <p className="font-headline text-5xl text-secondary">{events.length}</p>
              </div>
              <div className="bg-stone-950 p-8 border border-stone-800 relative overflow-hidden group">
                 <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                  <MessageSquare className="w-12 h-12" />
                </div>
                <h4 className="font-label uppercase text-[10px] text-stone-500 tracking-widest mb-4">Transmission Waitlist</h4>
                <p className="font-headline text-5xl text-primary">{inquiries.filter(i => !i.resolved).length}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-stone-950 p-10 border border-stone-800">
                <h3 className="font-headline text-2xl text-white mb-6 italic text-stone-400">Curatorial Commands</h3>
                <div className="space-y-4">
                  <button onClick={() => setActiveTab('blogs')} className="w-full flex items-center justify-between p-4 bg-stone-900/50 hover:bg-stone-800 transition-all group">
                    <span className="font-label uppercase tracking-widest text-[10px] text-stone-300">Draft New Insight</span>
                    <Plus className="w-4 h-4 text-stone-600 group-hover:translate-x-1 transition-transform" />
                  </button>
                  <button onClick={() => setActiveTab('inquiries')} className="w-full flex items-center justify-between p-4 bg-stone-900/50 hover:bg-stone-800 transition-all group">
                    <span className="font-label uppercase tracking-widest text-[10px] text-stone-300">Review Transmissions</span>
                    <ChevronRight className="w-4 h-4 text-stone-600 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
              
              <div className="bg-stone-950 p-10 border-l-4 border-primary border-t border-r border-b border-stone-800">
                <h3 className="font-headline text-2xl text-white mb-4">Architecture of Data</h3>
                <p className="font-body text-stone-400 text-sm mb-8 leading-relaxed italic">
                  Systems Online. Your curator console is bridged with Firestore. All transmissions and insights are synchronized across the global network.
                </p>
                <div className="flex gap-4">
                  <div className="flex items-center gap-2 text-[10px] font-label uppercase text-green-500">
                    <CheckCircle2 className="w-3 h-3" /> Synchronization Active
                  </div>
                </div>
              </div>
            </div>
          </>
        )}

        {activeTab === 'inquiries' && (
          <div className="space-y-6 max-w-5xl">
            {inquiries.length === 0 ? (
              <div className="bg-stone-950 p-24 text-center border border-dashed border-stone-800">
                <MessageSquare className="w-12 h-12 text-stone-800 mx-auto mb-6" />
                <p className="font-body text-stone-500 italic">The waitlist is silent.</p>
              </div>
            ) : (
              inquiries.map((inquiry) => (
                <div key={inquiry.id} className={`bg-stone-950 border border-stone-800 p-8 transition-all group hover:bg-stone-900/40 relative ${inquiry.resolved ? 'opacity-40 grayscale' : 'border-l-primary-container border-l-4'}`}>
                  <div className="flex flex-col md:flex-row justify-between gap-8">
                    <div className="flex-grow space-y-6">
                      <div className="flex flex-wrap items-center gap-6">
                        <div className="flex items-center gap-2 text-stone-400">
                          <User className="w-3 h-3" />
                          <span className="font-label uppercase tracking-widest text-[10px]">{inquiry.name}</span>
                        </div>
                        <div className="flex items-center gap-2 text-stone-400">
                          <Mail className="w-3 h-3" />
                          <span className="font-label uppercase tracking-widest text-[10px]">{inquiry.email}</span>
                        </div>
                        <div className="flex items-center gap-2 text-secondary">
                          <Briefcase className="w-3 h-3" />
                          <span className="font-label uppercase tracking-widest text-[10px]">{inquiry.service}</span>
                        </div>
                        <div className="flex items-center gap-2 text-stone-600">
                          <Clock className="w-3 h-3" />
                          <span className="font-label uppercase tracking-widest text-[10px]">
                            {inquiry.timestamp?.toDate().toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                      <p className="font-body text-lg text-stone-300 italic">"{inquiry.message}"</p>
                      {inquiry.reply && (
                        <div className="mt-6 p-6 bg-stone-900/50 border-l border-secondary">
                          <div className="flex items-center gap-2 text-secondary text-[10px] font-label uppercase tracking-widest mb-2">
                             <Reply className="w-3 h-3" /> Response Transmitted
                          </div>
                          <p className="font-body text-sm text-stone-400">{inquiry.reply}</p>
                        </div>
                      )}
                    </div>
                    
                    <div className="flex md:flex-col gap-4">
                      {!inquiry.reply && (
                        <button onClick={() => setShowInquiryReply(inquiry)} className="p-3 rounded-full bg-stone-800 text-stone-400 hover:text-white" title="Reply">
                          <Reply className="w-5 h-5" />
                        </button>
                      )}
                      <button onClick={() => markResolved(inquiry.id, inquiry.resolved)} className={`p-3 rounded-full ${inquiry.resolved ? 'text-green-500' : 'text-stone-400'} hover:bg-stone-800`}>
                        <CheckCircle2 className="w-5 h-5" />
                      </button>
                      <button onClick={() => deleteInquiry(inquiry.id)} className="p-3 rounded-full text-stone-400 hover:text-primary hover:bg-stone-800">
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* Blog Management View */}
        {activeTab === 'blogs' && (
          <div className="space-y-8">
            <div className="flex justify-between items-center bg-stone-950 p-6 border border-stone-800">
              <span className="font-label uppercase tracking-widest text-[10px] text-stone-500">Live Insights: {blogs.length}</span>
              <button 
                onClick={() => setShowBlogForm({ title: '', excerpt: '', category: 'Architecture', content: '' })}
                className="bg-primary-container text-white px-8 py-3 font-label uppercase tracking-widest text-[10px] font-bold hover:bg-red-700 transition-all flex items-center gap-3"
              >
                <Plus className="w-4 h-4" /> New Insight
              </button>
            </div>
            <div className="grid grid-cols-1 gap-4">
              {blogs.map(blog => (
                <div key={blog.id} className="bg-stone-950 border border-stone-800 p-8 flex justify-between items-center group hover:bg-stone-900/30">
                  <div>
                    <span className="text-primary-container font-label uppercase text-[9px] tracking-widest block mb-2">{blog.category}</span>
                    <h3 className="font-headline text-2xl text-white mb-2">{blog.title}</h3>
                    <p className="font-body text-sm text-stone-500 italic truncate max-w-xl">{blog.excerpt}</p>
                  </div>
                  <div className="flex gap-4 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button onClick={() => setShowBlogForm(blog)} className="p-4 bg-stone-800 text-stone-400 hover:text-white rounded-full">
                      <Pencil className="w-4 h-4" />
                    </button>
                    <button onClick={() => deleteBlog(blog.id)} className="p-4 bg-stone-800 text-stone-400 hover:text-primary rounded-full">
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
          <div className="space-y-8">
             <div className="flex justify-between items-center bg-stone-950 p-6 border border-stone-800">
              <span className="font-label uppercase tracking-widest text-[10px] text-stone-500">Global Forums: {events.length}</span>
              <button 
                onClick={() => setShowEventForm({ title: '', location: '', venue: '', date: '', action: 'Register', isPrimary: false })}
                className="bg-secondary text-black px-8 py-3 font-label uppercase tracking-widest text-[10px] font-bold hover:bg-yellow-500 transition-all flex items-center gap-3"
              >
                <Plus className="w-4 h-4" /> Add Forum
              </button>
            </div>
            <div className="grid grid-cols-1 gap-4">
              {events.map(event => (
                <div key={event.id} className="bg-stone-950 border border-stone-800 p-8 flex justify-between items-center group hover:bg-stone-900/30">
                  <div>
                    <div className="flex items-center gap-4 mb-2">
                       <span className="text-secondary font-label uppercase text-[9px] tracking-widest">{event.date}</span>
                       {event.isPrimary && <span className="bg-primary-container text-white text-[7px] px-1.5 py-0.5 font-label uppercase tracking-widest">Featured</span>}
                    </div>
                    <h3 className="font-headline text-2xl text-white">{event.title}</h3>
                    <p className="font-label text-stone-600 text-[10px] uppercase tracking-widest mt-1">{event.location} • {event.venue}</p>
                  </div>
                  <div className="flex gap-4 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button onClick={() => setShowEventForm(event)} className="p-4 bg-stone-800 text-stone-400 hover:text-white rounded-full">
                      <Pencil className="w-4 h-4" />
                    </button>
                    <button onClick={() => deleteEvent(event.id)} className="p-4 bg-stone-800 text-stone-400 hover:text-primary rounded-full">
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
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-8">
            <div className="bg-stone-950 border border-stone-800 w-full max-w-2xl p-12 relative">
              <button onClick={() => setShowInquiryReply(null)} className="absolute top-8 right-8 text-stone-500 hover:text-white">
                <X className="w-6 h-6" />
              </button>
              <h3 className="font-headline text-3xl text-white mb-2">Transmit Response</h3>
              <p className="font-body text-stone-500 mb-8 italic">Responding to {showInquiryReply.name} ({showInquiryReply.email})</p>
              
              <textarea 
                className="w-full bg-stone-900 border-none p-6 text-white font-body text-lg focus:ring-1 focus:ring-secondary min-h-[200px] mb-8"
                placeholder="Curate your message..."
                id="reply-text"
              />
              
              <button 
                onClick={() => sendReply(showInquiryReply, document.getElementById('reply-text').value)}
                className="w-full bg-primary-container text-white py-4 font-label uppercase tracking-widest text-[10px] font-bold hover:bg-neutral-800 transition-all flex items-center justify-center gap-3"
              >
                Transmit Vision <Reply className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {showBlogForm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-lg p-8">
            <div className="bg-stone-950 border border-stone-800 w-full max-w-4xl p-12 overflow-y-auto max-h-[90vh]">
               <div className="flex justify-between items-center mb-12">
                <h3 className="font-headline text-4xl text-white italic">{showBlogForm.id ? 'Edit Insight' : 'Draft New Insight'}</h3>
                <button onClick={() => setShowBlogForm(null)} className="text-stone-500 hover:text-white"><X className="w-6 h-6" /></button>
              </div>
              <form onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.target);
                saveBlog({
                  ...showBlogForm,
                  title: formData.get('title'),
                  category: formData.get('category'),
                  excerpt: formData.get('excerpt'),
                  content: formData.get('content')
                });
              }} className="space-y-8">
                <div className="grid grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="font-label uppercase text-[10px] tracking-widest text-stone-500">Title of Insight</label>
                    <input name="title" defaultValue={showBlogForm.title} required className="w-full bg-stone-900 border-none p-4 text-white focus:ring-1 focus:ring-primary" />
                  </div>
                  <div className="space-y-2">
                    <label className="font-label uppercase text-[10px] tracking-widest text-stone-500">Curatorial Category</label>
                    <input name="category" defaultValue={showBlogForm.category} required className="w-full bg-stone-900 border-none p-4 text-white focus:ring-1 focus:ring-primary" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="font-label uppercase text-[10px] tracking-widest text-stone-500">Narrative Excerpt</label>
                  <textarea name="excerpt" defaultValue={showBlogForm.excerpt} required rows="2" className="w-full bg-stone-900 border-none p-4 text-white focus:ring-1 focus:ring-primary" />
                </div>
                <div className="space-y-2">
                  <label className="font-label uppercase text-[10px] tracking-widest text-stone-500">Body Content (Markdown)</label>
                  <textarea name="content" defaultValue={showBlogForm.content} required rows="10" className="w-full bg-stone-950 border border-stone-800 p-6 text-white font-body text-sm leading-relaxed focus:ring-1 focus:ring-primary" />
                </div>
                <button className="w-full bg-primary-container text-white py-5 font-label uppercase tracking-[0.2em] font-bold hover:bg-red-700 transition-all">Publish into Archive</button>
              </form>
            </div>
          </div>
        )}

        {showEventForm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-lg p-8">
            <div className="bg-stone-950 border border-stone-800 w-full max-w-2xl p-12">
               <div className="flex justify-between items-center mb-12">
                <h3 className="font-headline text-4xl text-white italic">{showEventForm.id ? 'Edit engagement' : 'New Engagement'}</h3>
                <button onClick={() => setShowEventForm(null)} className="text-stone-500 hover:text-white"><X className="w-6 h-6" /></button>
              </div>
              <form onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.target);
                saveEvent({
                  ...showEventForm,
                  title: formData.get('title'),
                  date: formData.get('date'),
                  location: formData.get('location'),
                  venue: formData.get('venue'),
                  isPrimary: formData.get('isPrimary') === 'on'
                });
              }} className="space-y-6">
                <div className="space-y-2">
                  <label className="font-label uppercase text-[10px] tracking-widest text-stone-500">Forum Title</label>
                  <input name="title" defaultValue={showEventForm.title} required className="w-full bg-stone-900 border-none p-4 text-white focus:ring-1 focus:ring-secondary" />
                </div>
                <div className="grid grid-cols-2 gap-8">
                   <div className="space-y-2">
                    <label className="font-label uppercase text-[10px] tracking-widest text-stone-500">Date</label>
                    <input name="date" defaultValue={showEventForm.date} placeholder="e.g. Oct 12, 2024" className="w-full bg-stone-900 border-none p-4 text-white" />
                  </div>
                  <div className="space-y-2">
                    <label className="font-label uppercase text-[10px] tracking-widest text-stone-500">Location</label>
                    <input name="location" defaultValue={showEventForm.location} className="w-full bg-stone-900 border-none p-4 text-white" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="font-label uppercase text-[10px] tracking-widest text-stone-500">Venue</label>
                  <input name="venue" defaultValue={showEventForm.venue} className="w-full bg-stone-900 border-none p-4 text-white" />
                </div>
                <div className="flex items-center gap-4 py-4">
                  <input type="checkbox" name="isPrimary" defaultChecked={showEventForm.isPrimary} className="w-4 h-4 bg-stone-900 border-stone-700 rounded text-secondary focus:ring-secondary" />
                  <label className="font-label uppercase text-[10px] tracking-widest text-stone-300">Feature this Engagement</label>
                </div>
                <button className="w-full bg-secondary text-black py-5 font-label uppercase tracking-[0.2em] font-bold hover:bg-neutral-800 hover:text-white transition-all">Synchronize Forum</button>
              </form>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Admin;
