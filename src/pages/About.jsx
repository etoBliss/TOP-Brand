import { Box, Share2, Layers, Diamond, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import topImage from "../assets/2a 1.svg"

const About = () => {
  return (
    <main className="pt-32 pb-24">
      <div className="fixed inset-0 grain-overlay z-[100]"></div>
      
      {/* Hero Section: High Contrast Scale */}
      <section className="px-8 md:px-24 mb-32 grid grid-cols-1 md:grid-cols-12 gap-8 items-end">
        <div className="md:col-span-8">
          <span className="font-label text-[10px] uppercase tracking-[0.3em] text-secondary mb-6 block">The Architectural Curator</span>
          <h1 className="font-headline text-6xl md:text-9xl font-light tracking-tighter leading-none mb-8">
            Systems <br /> <span className="italic text-primary">& Strategy.</span>
          </h1>
        </div>
        <div className="md:col-span-4 pb-4">
          <p className="font-body font-extralight text-lg leading-relaxed text-stone-400 border-l border-outline-variant/20 pl-8">
            Redefining digital landscapes through the lens of structural integrity and rhythmic precision.
          </p>
        </div>
      </section>

      {/* Who Am I Section: Soft Ivory Background Block */}
      <section className="bg-white text-background py-32 px-8 md:px-24 rounded-t-[2rem] md:rounded-t-[4rem]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-24 items-start">
          <div className="relative">
            <img 
              className="w-full aspect-[3/4] object-cover grayscale brightness-90 contrast-110 shadow-2xl" 
              alt="Oluwadolapo Popoola"
              src={topImage}
            />
            <div className="absolute -bottom-8 -right-8 bg-primary-container text-white p-12 hidden md:block shadow-2xl">
              <span className="font-headline text-4xl block mb-2 text-white">Curating</span>
              <span className="font-label uppercase tracking-widest text-xs opacity-80 text-white">The Digital Void</span>
            </div>
          </div>
          <div className="flex flex-col justify-center h-full space-y-12">
            <div>
              <h2 className="font-label text-[10px] uppercase tracking-[0.4em] text-primary-container mb-4">The Background</h2>
              <h3 className="font-headline text-5xl md:text-6xl font-light leading-tight mb-8">Who Am I?</h3>
              <p className="font-body font-light text-xl leading-relaxed text-stone-800">
                Oluwadolapo Popoola is more than a designer; he is an orchestrator of complex digital ecosystems. With a foundation rooted in structural engineering and a soul tuned to high-fashion editorial, his work bridges the gap between raw functionality and ethereal aesthetics.
              </p>
            </div>
            <div className="space-y-8">
              <div className="flex gap-6 items-start">
                <span className="font-headline text-3xl text-primary-container">01</span>
                <div>
                  <h4 className="font-label font-bold uppercase text-xs tracking-widest mb-2">Heritage</h4>
                  <p className="font-body font-light text-stone-600">Drawing from a lineage of master builders to apply architectural logic to UI/UX frameworks.</p>
                </div>
              </div>
              <div className="flex gap-6 items-start">
                <span className="font-headline text-3xl text-primary-container">02</span>
                <div>
                  <h4 className="font-label font-bold uppercase text-xs tracking-widest mb-2">Vision</h4>
                  <p className="font-body font-light text-stone-600">Eliminating the noise to reveal the essential beauty of strategic intent.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Systems Section: Tonal Depth Layering */}
      <section className="py-32 px-8 md:px-24 bg-background">
        <div className="max-w-5xl mx-auto">
          <div className="mb-24 flex flex-col md:flex-row md:items-center justify-between gap-8">
            <h2 className="font-headline text-7xl font-light italic">The Methodology</h2>
            <div className="editorial-accent h-24 hidden md:block"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-outline-variant/10">
            <div className="bg-surface-container-low p-12 aspect-square flex flex-col justify-between hover:bg-surface-container transition-colors duration-500 group">
              <Box className="w-10 h-10 text-secondary" />
              <div>
                <h5 className="font-headline text-2xl mb-4 group-hover:text-primary transition-colors">Structural Rigor</h5>
                <p className="font-body font-extralight text-sm text-stone-500 leading-relaxed">Frameworks that survive the test of scale and time. Precision as a prerequisite.</p>
              </div>
            </div>
            <div className="bg-surface-container-low p-12 aspect-square flex flex-col justify-between hover:bg-surface-container transition-colors duration-500 group">
              <Layers className="w-10 h-10 text-secondary" />
              <div>
                <h5 className="font-headline text-2xl mb-4 group-hover:text-primary transition-colors">Rhythmic Flow</h5>
                <p className="font-body font-extralight text-sm text-stone-500 leading-relaxed">User journeys designed as musical compositions, balancing tension and release.</p>
              </div>
            </div>
            <div className="bg-surface-container-low p-12 aspect-square flex flex-col justify-between hover:bg-surface-container transition-colors duration-500 group">
              <Share2 className="w-10 h-10 text-secondary" />
              <div>
                <h5 className="font-headline text-2xl mb-4 group-hover:text-primary transition-colors">Strategic Intent</h5>
                <p className="font-body font-extralight text-sm text-stone-500 leading-relaxed">Visuals that don't just exist, but perform a specific objective with absolute clarity.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quote Component */}
      <section className="px-8 md:px-24 py-24 max-w-6xl mx-auto">
        <div className="border-l-4 border-primary pl-12 py-8">
          <blockquote className="font-headline text-4xl md:text-6xl text-secondary font-light leading-tight italic">
            "A system is only as beautiful as the clarity it provides to the user. We don't build pages; we curate experiences that feel inevitable."
          </blockquote>
          <cite className="block mt-8 font-label uppercase tracking-[0.2em] text-xs text-stone-500">— Oluwadolapo Popoola</cite>
        </div>
      </section>

      {/* Bento Grid: Strategy In Action */}
      <section className="px-8 md:px-24 pb-32">
        <div className="grid grid-cols-1 md:grid-cols-4 grid-rows-2 gap-4 h-[800px] relative">
          <div className="md:col-span-2 md:row-span-2 bg-surface-container-high overflow-hidden group relative">
            <img 
              className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-700" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCfUDPS9gFhGsBYtNM5G942JaJ6ySsyr0vNM5Jt9aVlq1ohJSPVphlYZQTl4XK2Lwtl9axHe4u1A7I-Crzv5CahdTS24uzo0FQGU_gI6BHo_Ta3jkDCuCbFsSm5oVdBWg7TVnCbdglQRNBpCWAhdjz09XzNvEFMNysXSdN8juj4IXWIspeeVvDvKi6Ox8zseSZR3Syc6UnKvNmsg9ZLx8hhnHKqiA0XDjHMhkTfysX9Q6DD3bK-leKvD5ekErMcpJsfaBqpkdLghVE" 
              alt="Case Study"
            />
            <div className="absolute inset-0 p-12 flex flex-col justify-end bg-gradient-to-t from-background to-transparent">
              <h6 className="font-headline text-3xl text-white">Architectural Integrity</h6>
              <p className="font-body font-extralight text-stone-400 mt-4 max-w-xs uppercase text-[10px] tracking-widest">Case Study: 2023 Digital Archive</p>
            </div>
          </div>
          <div className="md:col-span-2 bg-surface-container relative p-12 flex items-center">
            <div className="space-y-4">
              <h6 className="font-label text-[10px] uppercase tracking-widest text-primary">03 / Analysis</h6>
              <p className="font-headline text-2xl leading-snug">Deconstructing the chaos of modern information into curated streams.</p>
            </div>
          </div>
          <div className="bg-primary-container p-8 flex flex-col justify-between group cursor-pointer hover:bg-inverse-primary transition-colors overflow-hidden">
            <Layers className="w-10 h-10 text-on-primary-container" />
            <p className="font-label text-on-primary-container uppercase text-[10px] tracking-widest font-bold">Layered Logic</p>
          </div>
          <div className="bg-secondary p-8 flex flex-col justify-between group cursor-pointer hover:bg-secondary-fixed transition-colors">
            <Diamond className="w-10 h-10 text-on-secondary" />
            <p className="font-label text-on-secondary uppercase text-[10px] tracking-widest font-bold">Luxury Precision</p>
          </div>
        </div>
      </section>

      {/* Final CTA Part of About */}
      <section className="mt-16 py-24 flex flex-col items-center text-center border-t border-stone-900">
        <h2 className="font-headline text-4xl md:text-5xl max-w-2xl mb-12 italic">Interested in a Bespoke Consultation?</h2>
        <Link to="/connect" className="bg-transparent group flex items-center gap-4 border border-outline-variant/30 text-secondary px-12 py-4 font-label uppercase tracking-widest text-xs hover:border-secondary hover:bg-secondary/5 transition-all duration-400">
          Inquire for 2024
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-2" />
        </Link>
      </section>
    </main>
  );
};

export default About;
