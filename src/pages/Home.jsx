import { ArrowRight, Box, Share2, Layers, Home as HomeIcon, Building2, BookOpen, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';
import heroImage from '../assets/1a 1.svg';

const Home = () => {
  return (
    <div className="min-h-screen overflow-x-hidden">
      <div className="grain-overlay" />
      
      {/* Hero Section: Overlay on Mobile, Split on Desktop */}
      <section className="relative min-h-screen md:min-h-[921px] flex flex-col justify-end md:grid md:grid-cols-2 overflow-hidden">
        {/* Mobile Background / Desktop Image Side */}
        <div className="absolute inset-0 md:relative md:translate-y-0 h-full w-full order-1 md:order-2 bg-surface-container-low overflow-hidden">
          <img 
            alt="Visionary Leader" 
            className="w-full h-full object-cover grayscale brightness-50 md:brightness-100 contrast-125 md:contrast-100 transition-all duration-1000 ease-in-out" 
            src={heroImage}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent md:bg-gradient-to-r md:from-background"></div>
          
          {/* Floating Detail - Desktop Only */}
          <div className="absolute bottom-12 right-12 hidden lg:block bg-stone-900/40 backdrop-blur-md p-6 border-l-4 border-primary">
            <p className="font-label text-[10px] uppercase tracking-[0.3em] text-secondary mb-2">TOP</p>
            <p className="font-headline text-lg italic text-white">THE OLUWADOLAPO POPOOLA</p>
          </div>
        </div>

        {/* Content Side: Stacks below image on mobile, overlays slightly if needed */}
        <div className="relative z-10 flex flex-col justify-end md:justify-center px-6 md:px-20 pb-20 md:py-12 order-2 md:order-1 bg-transparent md:bg-surface max-w-sm md:max-w-none">
          <div className="max-w-xl">
            <span className="font-label text-[10px] uppercase tracking-[0.4em] text-secondary mb-6 md:mb-8 block">Architectural Curator</span>
            <h1 className="font-headline text-5xl md:text-7xl lg:text-8xl font-black md:font-light leading-[0.95] md:leading-[1.1] tracking-tighter md:tracking-tight mb-8 md:mb-10 text-white md:text-on-background text-glow">
              Building people, brands, and systems.
            </h1>
            <p className="font-body font-light md:font-extralight text-sm md:text-xl text-tertiary md:text-on-surface-variant mb-10 md:mb-12 max-w-[280px] md:max-w-md leading-relaxed">
              Sculpting digital and physical environments through the lens of precision and purpose.
            </p>
            <div className="flex flex-col sm:flex-row gap-6">
              <Link to="/connect" className="bg-primary-container text-on-primary-container px-10 py-5 font-label font-bold uppercase tracking-[0.2em] text-xs md:text-sm hover:bg-inverse-primary transition-all duration-400 shadow-xl shadow-primary-container/10 text-center active:scale-95">
                Connect
              </Link>
              <Link to="/about" className="group flex items-center justify-center md:justify-start gap-4 text-secondary font-label font-bold uppercase tracking-[0.2em] text-xs md:text-sm py-5 px-6 border border-outline-variant/20 hover:bg-surface-container-high transition-all">
                Our Method
                <ArrowRight className="text-xl transition-transform group-hover:translate-x-2" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section: 2 columns on mobile, 4 on desktop */}
      <section className="bg-surface-container-low md:bg-surface-container-lowest py-24 md:py-32 px-6 md:px-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 border-t border-outline-variant/10 pt-24">
          <div className="space-y-2">
            <h3 className="font-headline text-4xl text-secondary md:text-primary mb-2 italic font-black md:font-light">120+</h3>
            <p className="font-label text-[9px] md:text-[10px] uppercase tracking-[0.2em] text-stone-500">Brands Elevated</p>
          </div>
          <div className="space-y-2">
            <h3 className="font-headline text-4xl text-secondary md:text-primary mb-2 italic font-black md:font-light">15k</h3>
            <p className="font-label text-[9px] md:text-[10px] uppercase tracking-[0.2em] text-stone-500">People Impacted</p>
          </div>
          <div className="space-y-2">
            <h3 className="font-headline text-4xl text-secondary md:text-primary mb-2 italic font-black md:font-light">09</h3>
            <p className="font-label text-[9px] md:text-[10px] uppercase tracking-[0.2em] text-stone-500">Global Systems</p>
          </div>
          <div className="space-y-2">
            <h3 className="font-headline text-4xl text-secondary md:text-primary mb-2 italic font-black md:font-light">0.1</h3>
            <p className="font-label text-[9px] md:text-[10px] uppercase tracking-[0.2em] text-stone-500">Precision Margin</p>
          </div>
        </div>
      </section>

      {/* Quote Section: Vertical line on mobile */}
      <section className="bg-background md:bg-surface py-32 px-6 md:px-20">
        <div className="flex gap-6 md:max-w-4xl border-l-4 border-primary-container md:border-primary pl-6 md:pl-12">
          <blockquote className="font-headline text-3xl md:text-6xl text-secondary leading-snug md:leading-tight italic font-light">
            "The void is not an absence of space, but the presence of potential."
          </blockquote>
        </div>
      </section>

      {/* Services Section: Stacks on mobile, Bento on desktop */}
      <section className="px-6 md:px-20 py-24 md:py-32 bg-background">
        <div className="mb-12 md:hidden">
          <h2 className="font-label text-[10px] uppercase tracking-[0.4em] text-stone-500 mb-2">Our Discipline</h2>
          <div className="h-px w-12 bg-primary"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-6 auto-rows-auto md:auto-rows-[300px]">
          {/* Card 1 */}
          <div className="md:col-span-8 group">
             <div className="aspect-[4/5] md:aspect-auto md:h-full bg-surface-container-low p-8 md:p-12 flex flex-col justify-end group cursor-pointer overflow-hidden relative">
              <div className="absolute inset-0 bg-stone-950/20 group-hover:bg-primary-container/10 transition-colors duration-500"></div>
              <img className="absolute inset-0 w-full h-full object-cover grayscale opacity-60 md:opacity-0 group-hover:opacity-100 transition-all duration-700" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDuOmpsnN7Yk7xhdDWMb8dkjFaU0vk-hBQKuHuPL647kYKG3dTXLfMU9s0aURjrYwH3Ke4yzGCkLeHUu2z2OVlCfjPAw2gpE71ZbJ1uR9Kjm-KEn7F6-xFuQGUAgkf_EnBUMZL8hKC-AaRLpApmURR45WULNZgE0IPXrLrRGadQtITAV5ev0JdMQEKAsYoc9k37tAzGEHC3k_7D8_A8UjQ8TG4sxYT02LokJDFz0sT7UIa8WjdjfXTDKEjP7J9bup2QL9V3ExLVrAo" alt="Architectural Curation" />
              <div className="relative z-10">
                <span className="font-label text-[10px] uppercase tracking-[0.4em] text-secondary mb-4 block">Core Pillar</span>
                <h3 className="font-headline text-2xl md:text-5xl text-white mb-6">Architectural Curation</h3>
                <p className="text-stone-400 text-sm md:text-base font-light font-extralight max-w-md md:opacity-0 group-hover:opacity-100 transition-opacity duration-500 leading-relaxed">
                  Designing spaces that dictate emotion and facilitate human connection through structural integrity.
                </p>
              </div>
            </div>
          </div>

          {/* Card 2 */}
          <div className="md:col-span-4 bg-surface-container-high p-12 flex flex-col items-center justify-center text-center border-t-4 border-secondary transition-transform hover:-translate-y-2">
            <Box className="w-12 h-12 text-secondary mb-6" />
            <h3 className="font-headline text-3xl text-white">System Logic</h3>
          </div>

          {/* Card 3 (Hidden on mobile for cleaner look if needed, or kept) */}
          <div className="md:col-span-4 bg-primary-container p-12 flex flex-col justify-between group">
            <Share2 className="w-10 h-10 text-on-primary-container" />
            <h3 className="font-headline text-3xl text-on-primary-container leading-tight">Clarity in Complexity</h3>
          </div>

          {/* Card 4 */}
          <div className="md:col-span-8 relative group overflow-hidden h-[400px] md:h-full">
            <img 
              className="w-full h-full object-cover grayscale transition-transform duration-700 group-hover:scale-110" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDLMM5Oa83vEDjAgX1iobeG37UI0WoRjKuFgEjW5SiEJzLVbPnIys6EMyjTpGw4mSs-iFM80cGgsALKIK36dpSLPezj-wM72BBn6ap9x-xwOSgqAZ3YYr07af86Fng12HdECqktACbsCDHn1gXynU4Vrk2Mry4EbrY7V5rHx69SWmE7y-XNtPjoMvBa-z1Tn2PfwZZgo-PIHnABDPzLnXyY7GfN2sDj4s0UpMVeIk8WfRLNvX-c4cQFYDla_h1x3G5ShhOcLYbuSms"
              alt="The Process"
            />
            <div className="absolute inset-0 bg-stone-950/60 flex items-center justify-center">
              <h2 className="font-headline text-4xl md:text-5xl text-white tracking-widest italic uppercase">The Process</h2>
            </div>
          </div>
        </div>
      </section>

      {/* Identities Section: Mobile grid 2, Desktop flex */}
      <section className="bg-surface-container-low md:bg-surface py-32 px-6 md:px-20">
        <div className="space-y-8 md:max-w-4xl md:border-l-4 md:border-primary md:pl-12">
          <h2 className="font-headline text-4xl md:text-5xl font-bold text-white md:text-secondary leading-tight md:italic">
            Identity is the infrastructure of success.
          </h2>
          <div className="grid grid-cols-2 md:flex md:gap-16 items-start">
            <div className="space-y-2">
              <div className="text-secondary font-headline text-4xl font-black">12+</div>
              <div className="font-label text-[9px] uppercase tracking-widest text-stone-500">Years of Craft</div>
            </div>
            <div className="space-y-2">
              <div className="text-secondary font-headline text-4xl font-black">84</div>
              <div className="font-label text-[9px] uppercase tracking-widest text-stone-500">Global Systems</div>
            </div>
          </div>
         <div className="pt-8 md:pt-12">
            <Link to="/services" className="inline-flex items-center gap-4 text-primary font-label text-[10px] uppercase tracking-[0.2em] group">
              View Disciplines
              <ArrowRight className="text-sm transition-transform group-hover:translate-x-2" />
            </Link>
          </div>
        </div>
      </section>

      {/* Mobile Bottom Nav */}
      <nav className="fixed bottom-0 left-0 w-full bg-stone-950/80 backdrop-blur-xl md:hidden flex justify-around items-center py-4 px-6 z-50 border-t border-white/5 pb-2">
        <Link to="/" className="flex flex-col items-center text-white border-b-2 border-primary pb-1">
          <HomeIcon className="w-5 h-5 mb-1" />
          <span className="text-[8px] font-label uppercase tracking-tighter">Home</span>
        </Link>
        <Link to="/services" className="flex flex-col items-center text-stone-500">
          <Building2 className="w-5 h-5 mb-1" />
          <span className="text-[8px] font-label uppercase tracking-tighter">Services</span>
        </Link>
        <Link to="/blog" className="flex flex-col items-center text-stone-500">
          <BookOpen className="w-5 h-5 mb-1" />
          <span className="text-[8px] font-label uppercase tracking-tighter">Insights</span>
        </Link>
        <Link to="/connect" className="flex flex-col items-center text-stone-500">
          <Mail className="w-5 h-5 mb-1" />
          <span className="text-[8px] font-label uppercase tracking-tighter">Connect</span>
        </Link>
      </nav>
    </div>
  );
};

export default Home;
