import { Compass, Mic, Radio, Building2, Layers, UserCheck, Network, GraduationCap, ArrowRight } from 'lucide-react';
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
    <main className="pt-32 pb-24 px-8 md:px-24 lg:px-32">
      <div className="fixed inset-0 grain-overlay z-[100]"></div>
      
      {/* Hero Section */}
      <header className="mb-24 flex flex-col md:flex-row md:items-end justify-between gap-12">
        <div className="max-w-3xl">
          <span className="font-label text-secondary uppercase tracking-[0.3em] text-[12px] mb-4 block">Expertise & Delivery</span>
          <h1 className="font-headline text-6xl md:text-8xl lg:text-9xl leading-[0.9] -tracking-[0.04em] mb-8 italic">
            The Curated <br /> <span className="not-italic text-on-surface-variant">Offerings</span>
          </h1>
          <div className="flex gap-4 items-start">
            <div className="editorial-accent h-24"></div>
            <p className="font-body font-light text-xl text-stone-400 max-w-md">
              A synthesis of architectural precision and high-level strategy. We don't just provide services; we engineer brand legacies.
            </p>
          </div>
        </div>
        <div className="hidden lg:block">
          <img 
            alt="Minimalist architectural detail" 
            className="w-64 h-80 object-cover grayscale opacity-50 brightness-75 hover:grayscale-0 hover:opacity-100 transition-all duration-700" 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDSMaXmlvUW4CFKyQNdR_RMnBgzGXOXZkDErZ4dPZdsIfmJJXqvuP4lQAl0S3n73NDxWMkFxRLllb7RcZ-8V9EQs2Zwb92y_1eQRcmJoXIMNTvgTV1zf9AX_RWzshp6-YtpR7-OUqIVnFinb0Y55BBBda6tV2sMwjawpzjfjb7X2-Q075tHZ98PaMafjLiVJbNX33Pl1IvBtaMbtDtj2OD3wXmI4K0gNqxttpjwaSKS6bnR5Fk8tGRzTbfFUdWer5WgEmGLockU1iY"
          />
        </div>
      </header>

      {/* Services Grid */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-stone-800/20 overflow-hidden relative">
        {servicesList.map((service) => (
          <div 
            key={service.id} 
            className={`${service.bgClass} p-10 flex flex-col justify-between min-h-[400px] hover:bg-surface-container-low transition-colors duration-500 group cursor-pointer`}
          >
            <div>
              <span className="font-label text-secondary tracking-[0.2em] text-sm mb-8 block">{service.id}</span>
              <h3 className="font-headline text-3xl mb-4 group-hover:text-primary transition-colors">{service.title}</h3>
              <p className="font-body font-extralight text-sm leading-relaxed text-stone-500">{service.desc}</p>
            </div>
            <div className="mt-8">
              {service.icon}
            </div>
          </div>
        ))}
      </section>

      {/* CTA / Footer Transition */}
      <section className="mt-32 py-24 flex flex-col items-center text-center border-t border-stone-900">
        <h2 className="font-headline text-4xl md:text-5xl max-w-2xl mb-12 italic">Interested in a Bespoke Consultation?</h2>
        <Link to="/connect" className="bg-transparent group flex items-center gap-4 border border-outline-variant/30 text-secondary px-12 py-4 font-label uppercase tracking-widest text-xs hover:border-secondary hover:bg-secondary/5 transition-all duration-400">
          Inquire for 2024
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-2" />
        </Link>
      </section>
    </main>
  );
};

export default Services;
