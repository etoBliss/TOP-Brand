const Footer = () => {
  return (
    <footer className="w-full border-t border-stone-900 bg-stone-950 flex flex-col md:flex-row justify-between items-center px-12 py-16">
      <div className="text-xl font-black text-white font-headline mb-8 md:mb-0">TOP</div>
      <div className="flex flex-wrap justify-center gap-8 md:gap-12 mb-8 md:mb-0">
        <a className="font-body font-extralight tracking-widest text-[11px] uppercase text-stone-600 hover:text-primary transition-opacity opacity-80 hover:opacity-100 underline underline-offset-8" href="#">Instagram</a>
        <a className="font-body font-extralight tracking-widest text-[11px] uppercase text-stone-600 hover:text-primary transition-opacity opacity-80 hover:opacity-100 underline underline-offset-8" href="#">LinkedIn</a>
        <a className="font-body font-extralight tracking-widest text-[11px] uppercase text-stone-600 hover:text-primary transition-opacity opacity-80 hover:opacity-100 underline underline-offset-8" href="#">Threads</a>
        <a className="font-body font-extralight tracking-widest text-[11px] uppercase text-stone-600 hover:text-primary transition-opacity opacity-80 hover:opacity-100 underline underline-offset-8" href="#">Contact</a>
      </div>
      <div className="font-body font-extralight tracking-widest text-[11px] uppercase text-stone-600">
        © 2026 THE OLUWADOLAPO POPOOLA. ALL RIGHTS RESERVED.
      </div>
    </footer>
  );
};

export default Footer;
