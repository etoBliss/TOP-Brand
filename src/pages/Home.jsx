import { ArrowRight, Box, Share2, Layers } from 'lucide-react';
import { Link } from 'react-router-dom';
import heroImage from '../assets/1a 1.svg';

const Home = () => {
  return (
    <div className="min-h-screen pt-24">
      <div className="grain-overlay" />
      {/* Hero Section: Split Layout */}
      <section className="grid grid-cols-1 md:grid-cols-2 min-h-[921px]">
        {/* Content Side */}
        <div className="flex flex-col justify-center px-8 md:px-20 py-12 order-2 md:order-1 bg-surface">
          <div className="max-w-xl">
            <span className="font-label text-[10px] uppercase tracking-[0.4em] text-secondary mb-8 block">Architectural Curator</span>
            <h1 className="font-headline text-5xl md:text-7xl lg:text-8xl font-light leading-[1.1] tracking-tight mb-10 text-glow">
              Building people, brands, and systems with <span className="italic text-primary">clarity</span> and precision.
            </h1>
            <p className="font-body font-extralight text-lg md:text-xl text-on-surface-variant mb-12 max-w-md">
              Let’s take you and your brand straight to the <span className="text-white font-medium">TOP</span>.
            </p>
            <div className="flex flex-col sm:flex-row gap-6">
              <Link to="/services" className="bg-primary-container text-on-primary-container px-10 py-5 font-label font-bold uppercase tracking-[0.2em] text-sm hover:bg-inverse-primary transition-colors duration-400 shadow-xl shadow-primary-container/10 text-center">
                Start Journey
              </Link>
              <Link to="/about" className="group flex items-center gap-4 text-secondary font-label font-bold uppercase tracking-[0.2em] text-sm py-5 px-6 border border-outline-variant/20 hover:bg-surface-container-high transition-all">
                Our Method
                <ArrowRight className="text-xl transition-transform group-hover:translate-x-2" />
              </Link>
            </div>
          </div>
        </div>
        {/* Image Side */}
        <div className="relative min-h-[500px] md:min-h-full order-1 md:order-2 overflow-hidden bg-surface-container-low">
          <img 
            alt="Visionary Leader" 
            className="absolute inset-0 w-full h-full object-cover object-center grayscale hover:grayscale-0 transition-all duration-1000 ease-in-out" 
            src={heroImage}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent md:bg-gradient-to-r md:from-background"></div>
          {/* Floating Detail */}
          <div className="absolute bottom-12 right-12 hidden lg:block bg-stone-900/40 backdrop-blur-md p-6 border-l-4 border-primary">
            <p className="font-label text-[10px] uppercase tracking-[0.3em] text-secondary mb-2">TOP</p>
            <p className="font-headline text-lg italic text-white">THE OLUWADOLAPO POPOOLA</p>
          </div>
        </div>
      </section>

      {/* Stats / Proof Section */}
      <section className="bg-surface-container-lowest py-24 px-8 md:px-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 border-t border-outline-variant/10 pt-24">
          <div>
            <h3 className="font-headline text-4xl text-primary mb-2 italic">120+</h3>
            <p className="font-label text-[10px] uppercase tracking-[0.2em] text-stone-500">Brands Elevated</p>
          </div>
          <div>
            <h3 className="font-headline text-4xl text-primary mb-2 italic">15k</h3>
            <p className="font-label text-[10px] uppercase tracking-[0.2em] text-stone-500">People Impacted</p>
          </div>
          <div>
            <h3 className="font-headline text-4xl text-primary mb-2 italic">09</h3>
            <p className="font-label text-[10px] uppercase tracking-[0.2em] text-stone-500">Global Systems</p>
          </div>
          <div>
            <h3 className="font-headline text-4xl text-primary mb-2 italic">0.1</h3>
            <p className="font-label text-[10px] uppercase tracking-[0.2em] text-stone-500">Precision Margin</p>
          </div>
        </div>
      </section>

      {/* Bento Grid Service Preview */}
      <section className="px-8 md:px-20 py-32 bg-background">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 auto-rows-[300px]">
          {/* Item 1 */}
          <div className="md:col-span-8 bg-surface-container-low p-12 flex flex-col justify-end group cursor-pointer overflow-hidden relative">
            <div className="absolute inset-0 bg-stone-950/20 group-hover:bg-primary-container/10 transition-colors duration-500"></div>
            <div className="relative z-10">
              <span className="font-label text-[10px] uppercase tracking-[0.4em] text-secondary mb-4 block">Core Pillar</span>
              <h2 className="font-headline text-4xl md:text-5xl text-white mb-6">Brand Strategy</h2>
              <p className="text-stone-400 font-extralight max-w-md opacity-0 group-hover:opacity-100 transition-opacity duration-500">Defining the visual and psychological landscape of modern authority.</p>
            </div>
          </div>
          {/* Item 2 */}
          <div className="md:col-span-4 bg-surface-container-high p-12 flex flex-col items-center justify-center text-center border-t-4 border-secondary transition-transform hover:-translate-y-2">
            <Box className="w-12 h-12 text-secondary mb-6" />
            <h2 className="font-headline text-3xl text-white">Systemic Design</h2>
          </div>
          {/* Item 3 */}
          <div className="md:col-span-4 bg-primary-container p-12 flex flex-col justify-between group">
            <Share2 className="w-10 h-10 text-on-primary-container" />
            <h2 className="font-headline text-3xl text-on-primary-container leading-tight">Clarity in Complexity</h2>
          </div>
          {/* Item 4 */}
          <div className="md:col-span-8 relative group overflow-hidden">
            <img 
              className="w-full h-full object-cover grayscale transition-transform duration-700 group-hover:scale-110" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDLMM5Oa83vEDjAgX1iobeG37UI0WoRjKuFgEjW5SiEJzLVbPnIys6EMyjTpGw4mSs-iFM80cGgsALKIK36dpSLPezj-wM72BBn6ap9x-xwOSgqAZ3YYr07af86Fng12HdECqktACbsCDHn1gXynU4Vrk2Mry4EbrY7V5rHx69SWmE7y-XNtPjoMvBa-z1Tn2PfwZZgo-PIHnABDPzLnXyY7GfN2sDj4s0UpMVeIk8WfRLNvX-c4cQFYDla_h1x3G5ShhOcLYbuSms"
            />
            <div className="absolute inset-0 bg-stone-950/60 flex items-center justify-center">
              <h2 className="font-headline text-5xl text-white tracking-widest italic uppercase">The Process</h2>
            </div>
          </div>
        </div>
      </section>

      {/* Quote Section */}
      <section className="py-40 px-8 md:px-20 bg-surface">
        <div className="max-w-4xl border-l-4 border-primary pl-12">
          <h2 className="font-headline text-4xl md:text-6xl text-secondary leading-tight italic">
            "Precision is not just about the lines we draw, but the vision we dare to hold when the world is in chaos."
          </h2>
          <p className="mt-8 font-label text-xs uppercase tracking-[0.5em] text-stone-500">— The Oluwadolapo Popoola</p>
        </div>
      </section>
    </div>
  );
};

export default Home;
