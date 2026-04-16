import { Mail } from 'lucide-react';
import { Instagram, XIcon, TikTok, Linkedin, Youtube } from './BrandIcons';

const Footer = () => {
  return (
    <footer className="w-full border-t border-stone-900 bg-stone-950 flex flex-col md:flex-row justify-between items-center px-12 py-16 gap-8 md:gap-0">
      <div className="text-xl font-black text-white font-headline">TOP</div>
      
      <div className="flex flex-wrap justify-center gap-6 md:gap-10">
        <a 
          href="https://www.instagram.com/thatspace_boy?igsh=MW80ZjJodnZidnlxNW==" 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-stone-500 hover:text-secondary transition-all transform hover:scale-110"
          aria-label="Instagram"
        >
          <Instagram className="w-5 h-5" />
        </a>
        <a 
          href="https://x.com/thatspace_boy?s=21" 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-stone-500 hover:text-secondary transition-all transform hover:scale-110"
          aria-label="X (Twitter)"
        >
          <XIcon className="w-5 h-5" />
        </a>
        <a 
          href="https://www.tiktok.com/@thatspace_boy" 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-stone-500 hover:text-secondary transition-all transform hover:scale-110"
          aria-label="TikTok"
        >
          <TikTok className="w-5 h-5" />
        </a>
        <a 
          href="https://ng.linkedin.com/in/the-oluwadolapo-popoola-top-b22b1a21a" 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-stone-500 hover:text-secondary transition-all transform hover:scale-110"
          aria-label="LinkedIn"
        >
          <Linkedin className="w-5 h-5" />
        </a>
        <a 
          href="https://youtube.com/channel/UCZ8ah78fMVoOAJIOB9XLDBA" 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-stone-500 hover:text-secondary transition-all transform hover:scale-110"
          aria-label="YouTube"
        >
          <Youtube className="w-5 h-5" />
        </a>
        <div className="w-[1px] h-5 bg-stone-800 hidden md:block"></div>
        <a 
          href="mailto:popooladolapo7@gmail.com"
          className="text-stone-500 hover:text-primary transition-all transform hover:scale-110"
          aria-label="Email"
        >
          <Mail className="w-5 h-5" />
        </a>
      </div>

      <div className="flex flex-col items-center md:items-end gap-2">
        <div className="font-body font-extralight tracking-widest text-[9px] md:text-[11px] uppercase text-stone-700 md:text-stone-600 text-center md:text-right">
          © 2026 THE OLUWADOLAPO POPOOLA. <br className="md:hidden" /> ALL RIGHTS RESERVED.
        </div>
        <div className="text-[8px] md:text-[9px] uppercase tracking-[0.2em] text-stone-700">
          developed by <a href="https://etobliss.vercel.app/" target="_blank" rel="noopener noreferrer" className="font-bold text-white hover:text-stone-300 transition-colors">etoBliss<span style={{ color: '#b49cf5' }}>.</span></a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
