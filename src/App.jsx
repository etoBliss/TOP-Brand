import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { Analytics } from '@vercel/analytics/react';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
import Footer from './components/Footer';

// Dynamic Imports for Code Splitting
const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const Services = lazy(() => import('./pages/Services'));
const Blog = lazy(() => import('./pages/Blog'));
const Events = lazy(() => import('./pages/Events'));
const Connect = lazy(() => import('./pages/Connect'));
const Login = lazy(() => import('./pages/Login'));
const Admin = lazy(() => import('./pages/Admin'));
const BlogPostDetail = lazy(() => import('./pages/BlogPostDetail'));
const EventDetail = lazy(() => import('./pages/EventDetail'));
const SpeakerProfile = lazy(() => import('./pages/SpeakerProfile'));

// Premium Loading State
const PageLoader = () => (
  <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6 text-center">
    <div className="w-16 h-16 border-t-2 border-primary-container rounded-full animate-spin mb-8"></div>
    <p className="font-headline text-2xl italic text-on-surface opacity-50 animate-pulse">Designing Vision...</p>
  </div>
);

function AppContent() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin') || location.pathname === '/login';

  return (
    <div className="flex flex-col min-h-screen">
      {!isAdminRoute && <Navbar />}
      <main className="flex-grow">
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/events" element={<Events />} />
            <Route path="/blog/:id" element={<BlogPostDetail />} />
            <Route path="/event/:id" element={<EventDetail />} />
            <Route path="/event/:eventId/speaker/:speakerIndex" element={<SpeakerProfile />} />
            <Route path="/connect" element={<Connect />} />
            <Route path="/login" element={<Login />} />
            <Route 
              path="/admin" 
              element={
                <ProtectedRoute>
                  <Admin />
                </ProtectedRoute>
              } 
            />
          </Routes>
        </Suspense>
      </main>
      {!isAdminRoute && <Footer />}
    </div>
  );
}

function App() {
  return (
    <HelmetProvider>
      <Router>
        <AppContent />
      </Router>
      <Analytics />
    </HelmetProvider>
  );
}

export default App;
