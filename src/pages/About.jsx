import { Box, Share2, Layers, Diamond, ArrowRight, Home as HomeIcon, Building2, BookOpen, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';
import topImage from "../assets/2a 1.svg"

const About = () => {
  return (
    <main className="pt-24 md:pt-32 pb-24">
      <div className="fixed inset-0 grain-overlay z-[100]"></div>
      
      {/* Hero Section: Narrative Arc */}
      <section className="px-6 md:px-24 mb-20 md:mb-32 grid grid-cols-1 md:grid-cols-12 gap-8 items-end">
        <div className="md:col-span-8">
          <span className="font-label text-[10px] md:text-[10px] uppercase tracking-[0.2em] md:tracking-[0.3em] text-secondary mb-4 md:mb-6 block">The Narrative Arc</span>
          <h1 className="font-headline text-5xl md:text-9xl font-black md:font-light tracking-tighter leading-[1.1] md:leading-none mb-8">
            Defining the <span className="text-primary-container italic">Curatorial</span> Standard.
          </h1>
        </div>
        <div className="md:col-span-4 pb-4">
          <p className="font-body font-extralight text-lg leading-relaxed text-stone-400 border-l border-outline-variant/20 pl-6 md:pl-8 max-w-sm md:max-w-none">
            Founded on the intersection of heritage and brutalist modernism, TOP represents the singular vision of Oluwadolapo Popoola. We do not design spaces; we curate legacies.
          </p>
        </div>
        <div className="md:hidden mt-8 relative w-full aspect-[4/5] overflow-hidden">
          <img 
            className="w-full h-full object-cover grayscale brightness-75 shadow-2xl" 
            alt="Oluwadolapo Popoola Portrait"
            src={topImage}
          />
        </div>
      </section>

      {/* Tonal Shift: Soft Ivory Section (Core Values) */}
      <section className="bg-on-surface text-surface py-20 md:py-32 px-6 md:px-24 rounded-none md:rounded-t-[4rem]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 items-start">
          {/* Desktop Image Section */}
          <div className="relative hidden md:block">
            <img 
              className="w-full aspect-[3/4] object-cover grayscale brightness-90 contrast-110 shadow-2xl" 
              alt="Oluwadolapo Popoola Professional"
              src={topImage}
            />
            <div className="absolute -bottom-8 -right-8 bg-primary-container text-white p-12 shadow-2xl">
              <span className="font-headline text-4xl block mb-2 text-white">Curating</span>
              <span className="font-label uppercase tracking-widest text-xs opacity-80 text-white">The Digital Void</span>
            </div>
          </div>

          <div className="flex flex-col justify-center h-full space-y-12">
            <div>
              <span className="font-label text-[10px] uppercase tracking-[0.2em] md:tracking-[0.4em] text-primary-container mb-4 block">Core Values</span>
              <h2 className="font-headline text-4xl md:text-6xl font-bold md:font-light leading-none md:leading-tight mb-8 tracking-tight">Architectural Precision.</h2>
              <p className="font-body font-light text-lg md:text-xl leading-relaxed text-stone-800 md:text-stone-800 opacity-90">
                Oluwadolapo Popoola is more than a designer; he is an orchestrator of complex digital ecosystems. With a foundation rooted in structural engineering, his work bridges the gap between raw functionality and ethereal aesthetics.
              </p>
            </div>
            
            <div className="space-y-12 md:space-y-8">
              <div>
                <h3 className="font-headline text-2xl font-bold mb-4">Structural Honesty</h3>
                <p className="font-body font-light text-base leading-relaxed opacity-80">
                  We believe in materials that speak for themselves. Raw concrete, unrefined timber, and cold steel arranged in rhythmic harmony.
                </p>
              </div>
              <div>
                <h3 className="font-headline text-2xl font-bold mb-4">The Void Element</h3>
                <p className="font-body font-light text-base leading-relaxed opacity-80">
                  Space is not a vacuum to be filled. It is a medium to be sculpted. We use the 'void' to give weight to the presence.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Methodology Section: Stacked Bento-Style Cards on mobile */}
      <section className="py-24 md:py-32 px-6 md:px-24 bg-background">
        <div className="max-w-5xl mx-auto">
          <div className="mb-12 md:mb-24 text-center md:text-left md:flex md:items-center justify-between gap-8">
            <div>
              <span className="font-label font-extralight uppercase tracking-[0.2em] text-[10px] text-secondary">Methodology</span>
              <h2 className="font-headline text-3xl md:text-7xl font-light italic mt-2">The TOP Process</h2>
            </div>
            <div className="editorial-accent h-24 hidden md:block"></div>
          </div>

          <div className="space-y-6 md:space-y-0 md:grid md:grid-cols-3 md:gap-px md:bg-outline-variant/10">
            {/* Bento Card 1 */}
            <div className="bg-surface-container-low p-8 md:p-12 md:aspect-square flex flex-col justify-between hover:bg-surface-container transition-colors duration-500 group relative overflow-hidden">
               <div className="md:hidden absolute top-0 right-0 p-4 opacity-10">
                <span className="text-7xl font-headline font-black">01</span>
              </div>
              <Box className="w-10 h-10 text-secondary mb-6 md:mb-0" />
              <div>
                <h4 className="md:hidden font-label font-extralight uppercase tracking-widest text-[11px] text-primary mb-2">Immersion</h4>
                <h3 className="font-headline text-2xl mb-4 group-hover:text-primary transition-colors">Structural Rigor</h3>
                <p className="font-body font-extralight text-sm text-stone-500 leading-relaxed">Frameworks that survive the test of scale and time. Precision as a prerequisite.</p>
              </div>
            </div>

            {/* Bento Card 2: Visual Heavy on mobile */}
            <div className="bg-surface-container-low md:bg-surface-container-low md:p-12 md:aspect-square flex flex-col justify-between hover:bg-surface-container transition-colors duration-500 group overflow-hidden">
              <div className="h-48 md:hidden relative">
                <img className="w-full h-full object-cover grayscale opacity-60" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDZKayTi4b98EXmFo9-odLnP4DuH1ZJO8npMDem2FRQV8-tIaTIgTV42IKUce8qZ0ckizlnaZcONFr9LX69Eu4ICHn34mjK2VdVmTAus9DHvpgVN1Pbh9ODKOrKHR5HSOq5tUBAYQr1-Ph9La-zMJb02HGXTqLs3ghqnT9KUUg17Yy4c2HXF5cx0puphSCe0kIfczgvMXSz4FIE9SUHubwOgtkY8bUsJtdXfqDqUMPVxwXVCPV7iaXKt5HT4Ro6sfpwL7Fa1XXzqZc" alt="Rhythmic Flow" />
                <div className="absolute inset-0 bg-primary-container/20"></div>
              </div>
              <div className="p-8 md:p-0">
                <Layers className="hidden md:block w-10 h-10 text-secondary mb-0" />
                <h4 className="md:hidden font-label font-extralight uppercase tracking-widest text-[11px] text-secondary mb-2">Synthesis</h4>
                <h3 className="font-headline text-2xl mb-4 group-hover:text-primary transition-colors">Rhythmic Flow</h3>
                <p className="font-body font-extralight text-sm text-stone-500 leading-relaxed">User journeys designed as musical compositions, balancing tension and release.</p>
              </div>
            </div>

            {/* Bento Card 3 */}
            <div className="bg-primary-container p-8 md:p-12 md:aspect-square flex flex-col justify-between hover:bg-inverse-primary transition-colors duration-500 group">
              <div className="flex justify-between items-start mb-6 md:mb-0">
                <Share2 className="w-10 h-10 text-on-primary-container" />
                <Building2 className="md:hidden w-10 h-10 text-on-primary-container" />
              </div>
              <div>
                <h3 className="font-headline text-2xl mb-4 text-on-primary-container">Strategic Intent</h3>
                <p className="font-body font-extralight text-sm text-on-primary-container opacity-80 leading-relaxed">Visuals that don't just exist, but perform a specific objective with absolute clarity.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Editorial Quote Section */}
      <section className="px-6 md:px-24 py-12 md:py-24 max-w-6xl mx-auto">
        <div className="border-l-4 border-primary-container md:border-primary pl-6 md:pl-12 py-2 md:py-8">
          <blockquote className="font-headline text-3xl md:text-6xl text-secondary font-black md:font-light leading-tight italic">
            "Modernism is not a style, it is a response to the gravity of existence."
          </blockquote>
          <cite className="block mt-4 font-label uppercase tracking-[0.3em] text-[9px] md:text-xs text-stone-500">— Oluwadolapo Popoola</cite>
        </div>
      </section>

      {/* Testimonial Stack: Vertical on mobile */}
      <section className="bg-surface-container-lowest py-24 px-6 md:px-24 border-t border-stone-900">
        <div className="mb-16 md:mb-24">
          <h2 className="font-headline text-3xl md:text-5xl font-bold md:font-light leading-none">Voices of the <span className="text-secondary">Vanguard</span></h2>
        </div>
        <div className="space-y-12 md:space-y-24 max-w-5xl">
          <div className="group">
            <div className="flex items-center gap-1 mb-4 text-primary text-xs">
              <Diamond className="w-3 h-3 fill-primary" />
              <Diamond className="w-3 h-3 fill-primary" />
              <Diamond className="w-3 h-3 fill-primary" />
              <Diamond className="w-3 h-3 fill-primary" />
              <Diamond className="w-3 h-3 fill-primary" />
            </div>
            <p className="font-body font-light text-lg md:text-2xl italic text-on-surface mb-6 leading-relaxed">
              "TOP transformed our HQ into a living monolith. The attention to tonal shifts is unlike anything in the industry."
            </p>
            <div className="flex items-center gap-4">
              <div className="w-8 h-[1px] bg-outline-variant"></div>
              <span className="font-label font-extralight uppercase tracking-widest text-[10px]">Director, Arca Global</span>
            </div>
          </div>
          <div className="group">
            <div className="flex items-center gap-1 mb-4 text-primary text-xs">
              <Diamond className="w-3 h-3 fill-primary" />
              <Diamond className="w-3 h-3 fill-primary" />
              <Diamond className="w-3 h-3 fill-primary" />
              <Diamond className="w-3 h-3 fill-primary" />
              <Diamond className="w-3 h-3 fill-primary" />
            </div>
            <p className="font-body font-light text-lg md:text-2xl italic text-on-surface mb-6 leading-relaxed">
              "Popoola understands the silence required for true luxury. His vision for our residence was transcendent."
            </p>
            <div className="flex items-center gap-4">
              <div className="w-8 h-[1px] bg-outline-variant"></div>
              <span className="font-label font-extralight uppercase tracking-widest text-[10px]">Private Curator, London</span>
            </div>
          </div>
        </div>
      </section>

      {/* Connect CTA: High-end button for mobile */}
      <section className="px-6 py-24 md:py-32 text-center border-t border-stone-900">
        <h2 className="font-headline text-4xl md:text-5xl font-bold md:font-light mb-8 md:mb-12 tracking-tighter italic">Start your <br className="md:hidden"/>curation.</h2>
        <Link to="/connect" className="inline-block w-full md:w-auto bg-gradient-to-br from-primary-container to-on-primary-fixed-variant md:from-transparent md:to-transparent md:bg-transparent md:border md:border-outline-variant/30 text-white md:text-secondary px-12 py-5 font-label font-extrabold md:font-normal uppercase tracking-widest text-xs hover:border-secondary hover:bg-secondary/5 transition-all duration-400 active:scale-95">
          Connect With Us
        </Link>
      </section>

      {/* Mobile Bottom Nav */}
      <nav className="fixed bottom-0 left-0 w-full bg-stone-950/80 backdrop-blur-xl md:hidden flex justify-around items-center py-4 px-6 z-50 border-t border-white/5 pb-2">
        <Link to="/" className="flex flex-col items-center text-stone-500">
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
    </main>
  );
};

export default About;
