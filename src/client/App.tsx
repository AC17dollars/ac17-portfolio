import React from "react";
import { Navigation } from "./components/Navigation";
import { Hero } from "./components/Hero";
import { About } from "./components/About";
import { Experience } from "./components/Experience";
import { Projects } from "./components/Projects";
import { ChatWidget } from "./components/ChatWidget";
import { Mail, MessageSquare } from "lucide-react";

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
        <section
          id="contact"
          className="py-32 px-6 md:px-12 border-t border-white/5 bg-black"
        >
          <div className="max-w-6xl mx-auto text-center">
            <h2 className="text-4xl md:text-8xl font-serif italic text-brand-accent mb-8">
              Let's Connect
            </h2>
            <p className="text-gray-400 max-w-xl mx-auto mb-12">
              I'm always open to discussing new projects, creative ideas or
              opportunities to be part of your visions.
            </p>
            <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-8">
              <a
                href="mailto:ac@chaliseabhinav.com.np"
                className="group flex items-center space-x-3 border border-white/10 hover:border-brand-accent/50 hover:bg-brand-accent/5 px-10 py-5 rounded-2xl transition-all duration-500 hover:-translate-y-1"
              >
                <Mail className="w-5 h-5 text-brand-accent group-hover:scale-110 transition-transform duration-500" />
                <span className="font-mono text-xs font-bold tracking-[0.2em] uppercase text-gray-300 group-hover:text-white transition-colors">
                  Email
                </span>
              </a>

              <a
                href="https://matrix.to/#/@chalisez:chaliseabhinav.com.np"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center space-x-3 border border-white/10 hover:border-brand-accent/50 hover:bg-brand-accent/5 px-10 py-5 rounded-2xl transition-all duration-500 hover:-translate-y-1"
              >
                <MessageSquare className="w-5 h-5 text-brand-accent group-hover:scale-110 transition-transform duration-500" />
                <span className="font-mono text-xs font-bold tracking-[0.2em] uppercase text-gray-300 group-hover:text-white transition-colors">
                  Matrix
                </span>
              </a>
            </div>

            <div className="mt-32 flex justify-between items-end text-xs text-gray-600 font-mono uppercase tracking-widest">
              <div>© {new Date().getFullYear()} Abhinav Chalise</div>
              <div>
                Developed by{" "}
                <a
                  href="https://github.com/ac17dollars/ac17-portfolio"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  AC17dollars
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <ChatWidget />
    </div>
  );
};

export default App;
