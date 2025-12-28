import React from 'react';
import { Navigation } from './components/Navigation';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Experience } from './components/Experience';
import { Projects } from './components/Projects';
import { ChatWidget } from './components/ChatWidget';

const App: React.FC = () => {
  return (
    <div className="relative bg-brand-dark min-h-screen text-white selection:bg-brand-accent/30 selection:text-white">
      <Navigation />

      <main>
        <Hero />
        <About />
        <Experience />
        <Projects />

        {/* Contact Footer Area */}
        <section id="contact" className="py-32 px-6 md:px-12 border-t border-white/5 bg-black">
          <div className="max-w-6xl mx-auto text-center">
            <h2 className="text-4xl md:text-8xl font-serif italic text-brand-accent mb-8">Let's Connect</h2>
            <p className="text-gray-400 max-w-xl mx-auto mb-12">
              I'm always open to discussing new projects, creative ideas or opportunities to be part of your visions.
            </p>
            <a href="mailto:abhinav@chalisezabhinav.com.np" className="inline-block border border-white/20 hover:border-brand-accent hover:text-brand-accent px-8 py-4 rounded-full transition-colors duration-300">
              Get in Touch
            </a>

            <div className="mt-32 flex justify-between items-end text-xs text-gray-600 font-mono uppercase tracking-widest">
              <div>© 2026 Abhinav Chalise</div>
              <div>Developed by <a href="https://github.com/ac17dollars/ac17-portfolio" target="_blank" rel="noopener noreferrer">AC17dollars</a></div>
            </div>
          </div>
        </section>
      </main>

      <ChatWidget />
    </div>
  );
};

export default App;
