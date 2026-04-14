import { Compass, Mic, Radio, Building2, Layers, UserCheck, Network, GraduationCap, ArrowRight, Home as HomeIcon, BookOpen, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';

const Services = () => {
  const servicesList = [
    {
      id: "01",
      title: "Brand Strategy",
      desc: "Defining the visual and psychological core of your market presence through rigorous analysis and creative intuition.",
      icon: <Compass className="text-secondary w-10 h-10" />,
      bgClass: "bg-surface"
    },
    {
      id: "02",
      title: "Public Speaking",
      desc: "Transformative keynotes on architectural leadership, digital curation, and the future of creative systems.",
      icon: <Mic className="text-secondary w-10 h-10" />,
      bgClass: "bg-surface-container-low"
    },
    {
      id: "03",
      title: "Voice Over",
      desc: "The authoritative and resonant auditory identity for premium documentary, commercial, and high-fashion narratives.",
      icon: <Radio className="text-secondary w-10 h-10" />,
      bgClass: "bg-surface"
    },
    {
      id: "04",
      title: "Management Consulting",
      desc: "Optimizing creative workflows and organizational structures for boutique studios and global design firms.",
      icon: <Building2 className="text-secondary w-10 h-10" />,
      bgClass: "bg-surface-container-low"
    },
    {
      id: "05",
      title: "Creative Direction",
      desc: "End-to-end visual stewardship for projects that demand a singular, uncompromising aesthetic vision.",
      icon: <Layers className="text-secondary w-10 h-10" />,
      bgClass: "bg-surface-container-low"
    },
    {
      id: "06",
      title: "Personal Branding",
      desc: "Curating the public persona of executives and visionaries through editorial storytelling and visual alignment.",
      icon: <UserCheck className="text-secondary w-10 h-10" />,
      bgClass: "bg-surface"
    },
    {
      id: "07",
      title: "System Design",
      desc: "Constructing scalable design frameworks that bridge the gap between architectural thought and digital execution.",
      icon: <Network className="text-secondary w-10 h-10" />,
      bgClass: "bg-surface-container-low"
    },
    {
      id: "08",
      title: "Corporate Training",
      desc: "Workshops and seminars designed to instill the principles of architectural curation within internal design teams.",
      icon: <GraduationCap className="text-secondary w-10 h-10" />,
      bgClass: "bg-surface"
    }
  ];

  return (
    <main className="pt-24 md:pt-32 pb-24 px-6 md:px-24 lg:px-32 overflow-x-hidden">
      <div className="fixed inset-0 grain-overlay z-[60] pointer-events-none"></div>
      
      {/* Hero Section */}
      <header className="mb-20 md:mb-24">
        <p className="font-label font-extralight uppercase tracking-[0.2em] text-[10px] text-secondary mb-4">Architectural Curator</p>
        <h1 className="font-headline text-5xl md:text-8xl lg:text-9xl font-light tracking-tight md:-tracking-[0.04em] leading-none italic mb-8">
          Curated <span className="text-primary md:text-on-surface-variant not-italic">Services</span>
        </h1>
        <p className="font-body font-extralight text-on-surface-variant md:text-stone-400 leading-relaxed max-w-sm md:max-w-md text-lg md:text-xl">
          A meticulous approach to space, form, and heritage. We transform conceptual visions into physical legacies through precision and artistic intent.
        </p>
      </header>

      {/* Services Grid / Accordion-style on mobile */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px md:gap-px md:bg-stone-800/20 overflow-hidden relative">
        {servicesList.map((service, index) => (
          <div 
            key={service.id} 
            className={`group bg-surface-container-low md:${service.bgClass} border-b border-outline-variant/10 md:border-none px-0 md:p-10 flex flex-col justify-between min-h-auto md:min-h-[400px] hover:bg-surface-container-low transition-colors duration-500 cursor-pointer`}
          >
            <div className="flex flex-col md:block">
              <div className="flex items-start justify-between py-8 md:py-0 md:mb-8">
                <div className="flex gap-6 md:block">
                  <span className="font-label text-secondary font-bold text-[10px] md:text-sm tracking-widest pt-2 md:pt-0 md:mb-8 block">{service.id}</span>
                  <div>
                    <h2 className="font-headline text-3xl md:text-3xl font-light mb-4 group-hover:text-primary transition-colors leading-tight">{service.title}</h2>
                    <p className="font-body font-extralight text-on-surface-variant md:text-stone-500 text-sm leading-relaxed mb-6 md:mb-0">
                      {service.desc}
                    </p>
                    <div className="flex items-center gap-2 group/btn md:hidden">
                      <span className="font-label uppercase tracking-widest text-[10px] text-primary">Inquiry</span>
                      <ArrowRight className="text-primary w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Mobile-only image for the first item as per snippet */}
              {index === 0 && (
                <div className="w-full h-48 mb-8 overflow-hidden md:hidden">
                  <img 
                    alt="Architectural living space" 
                    className="w-full h-full object-cover grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all duration-700" 
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuD_Gx2sWL6l5CVaWns0pcpQUl0SjFa0IwGnYlm3rFlUxji871hj5NmDibhUMvO6AgS4xPH2diMGWTETEC87bK2V4pokVvguFpnD3tf36HYvVVzImHK9_asqmjNInQ8wM2m8VDyj7DDDYlk5Y4CS4auLfTmiqNGO4LRVMjuQSD0farH4NeZg-MjKmuQnp4VqGdZzUFeG82ga6BbBI5jCtdAYfaB0XqIzSi4yK6zOLk44J-B4QhmfdjWlCwySF181QJaS2U9h9U2Vw1Q"
                  />
                </div>
              )}
            </div>

            <div className="hidden md:block mt-8">
              {service.icon}
            </div>
          </div>
        ))}
      </section>

      {/* CTA Section */}
      <section className="mt-24 md:mt-32 mb-12">
        <div className="bg-primary-container p-10 md:py-24 md:flex md:flex-col md:items-center md:text-center relative overflow-hidden">
          <div className="relative z-10">
            <h3 className="font-headline text-4xl md:text-5xl text-white font-light leading-tight mb-8 md:mb-12 max-w-2xl">Begin Your Architectural Narrative.</h3>
            <Link to="/connect" className="inline-block bg-white md:bg-transparent text-primary-container md:text-white border md:border-white/30 font-label uppercase tracking-widest text-xs px-8 md:px-12 py-4 md:py-5 font-bold md:font-normal hover:bg-white hover:text-primary-container transition-all active:scale-95 shadow-xl shadow-black/10">
              Schedule Consultation
            </Link>
          </div>
          <div className="absolute top-0 right-0 w-32 md:w-64 h-32 md:h-64 bg-primary/10 rounded-full blur-3xl -mr-16 -mt-16 md:-mr-32 md:-mt-32"></div>
        </div>
      </section>

      {/* Mobile Bottom Nav */}
      <nav className="fixed bottom-0 left-0 w-full bg-stone-950/80 backdrop-blur-xl md:hidden flex justify-around items-center py-4 px-6 z-50 border-t border-white/5 pb-2">
        <Link to="/" className="flex flex-col items-center text-stone-500">
          <HomeIcon className="w-5 h-5 mb-1" />
          <span className="text-[8px] font-label uppercase tracking-tighter">Home</span>
        </Link>
        <Link to="/services" className="flex flex-col items-center text-white border-b-2 border-primary pb-1">
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

export default Services;
