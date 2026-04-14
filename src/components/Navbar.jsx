import { NavLink, Link, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { X } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === '/';

  const navLinks = [
    { name: 'About', path: '/about' },
    { name: 'Services', path: '/services' },
    { name: 'Blog & Event', path: '/blog' },
  ];

  return (
    <nav className={`fixed top-0 w-full z-[100] bg-stone-950/60 backdrop-blur-xl border-b border-white/5 ${isHome ? 'hidden md:block' : ''}`}>
      <div className="max-w-7xl mx-auto flex justify-between items-center px-8 py-6">
        <Link to="/" className="text-2xl font-black tracking-tighter text-white font-headline">TOP</Link>
        
        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-12">
          {navLinks.map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              className={({ isActive }) => 
                `font-headline font-light tracking-tight transition-colors duration-400 ease-out scale-95 active:duration-150 ${
                  isActive 
                    ? "text-white border-b border-primary-container pb-1" 
                    : "text-stone-400 hover:text-primary"
                }`
              }
            >
              {link.name}
            </NavLink>
          ))}
          <Link to="/connect" className="bg-primary-container text-on-primary-container px-6 py-2 font-label uppercase tracking-widest text-[10px] hover:opacity-90 transition-opacity">
            Connect
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
