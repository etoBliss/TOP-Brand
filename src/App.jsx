import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Blog from './pages/Blog';
import Events from './pages/Events';
import Connect from './pages/Connect';
import Login from './pages/Login';
import Admin from './pages/Admin';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
import Footer from './components/Footer';

import { useLocation } from 'react-router-dom';

function AppContent() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin') || location.pathname === '/login';

  return (
    <div className="flex flex-col min-h-screen">
      {!isAdminRoute && <Navbar />}
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/events" element={<Events />} />
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
      </main>
      {!isAdminRoute && <Footer />}
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
