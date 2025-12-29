import React, { useRef } from 'react';
import { useOnScreen } from '../hooks/useOnScreen';

export const About: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isVisible = useOnScreen(ref);

  return (
    <section id="about" className="relative min-h-[80vh] flex items-center justify-center py-20 px-6 md:px-12 bg-brand-dark">
      <div ref={ref} className="max-w-6xl w-full">
        <div className={`transition-all duration-1000 ease-out transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}>
          <h2 className="text-4xl md:text-6xl lg:text-7xl leading-[1.1] font-sans text-gray-200">
            As an <span className="font-serif italic text-brand-accent">Electronics, Communication and Information Engineer</span>, I specialize in designing <span className="text-gray-400">intelligent system architectures</span> with an emphasis on <span className="font-serif italic text-white">robust, elegant infrastructure</span>.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 mt-20">
          <div className="hidden md:block md:col-span-4 lg:col-span-5">
            <div className="w-full h-px bg-white/10 mt-6"></div>
          </div>
          <div className={`md:col-span-8 lg:col-span-7 transition-all duration-1000 delay-300 ease-out transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}>
            <p className="text-lg md:text-xl text-gray-400 leading-relaxed font-light">
              I specialize in building full-stack applications using <span className="text-white">React</span>, <span className='text-white'>Typescript</span>, and <span className="text-white">Node.js</span>, with hands-on experience in AI through computer vision projects and implicit neural networks.
            </p>
            <p className="text-lg md:text-xl text-gray-400 leading-relaxed font-light mt-8">
              Currently working as a <span className="text-brand-accent font-serif italic">Node Developer</span> for <a href="https://ekbana.com" target="_blank" rel="noopener noreferrer" className="hover:underline underline-offset-4">E.K. Solutions (EKbana)</a>.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
