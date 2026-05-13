import React from "react";
import { useKathmanduTime } from "../hooks/useTime";

export const Hero: React.FC = () => {
  const time = useKathmanduTime();

  return (
    <div
      id="home"
      className="relative h-screen w-full flex flex-col justify-between p-6 md:p-12 overflow-hidden"
    >
      {/* Background Ambience */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-[-20%] right-[-10%] w-[800px] h-[800px] bg-blue-900/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-20%] left-[-10%] w-[600px] h-[600px] bg-cyan-900/5 rounded-full blur-[100px]" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150"></div>
      </div>

      {/* Top Left Info */}
      <div
        className="relative z-10 pt-32 md:pt-24 animate-fade-in opacity-0"
        style={{ animationDelay: "0.2s" }}
      >
        <div className="flex flex-col font-mono text-xs text-gray-500 tracking-widest space-y-1">
          <span className="uppercase text-gray-400">Based in Nepal</span>
          <span className="text-gray-300">KATHMANDU {time}</span>
        </div>
      </div>

      {/* Main Center Text */}
      <div className="relative z-10 flex flex-col justify-center items-center grow -mt-20">
        <div className="w-full max-w-[90vw]">
          <div className="overflow-hidden">
            <h1
              className="font-sans font-black text-[18vw] md:text-[15vw] leading-[0.85] tracking-tight text-white uppercase animate-slide-up opacity-0"
              style={{ animationDelay: "0.4s" }}
            >
              Abhinav
            </h1>
          </div>
          <div className="overflow-hidden flex justify-end">
            <h1
              className="font-serif italic text-[18vw] md:text-[15vw] leading-[0.85] tracking-tight text-brand-accent animate-slide-up opacity-0"
              style={{ animationDelay: "0.6s" }}
            >
              Chalise
            </h1>
          </div>
        </div>
      </div>

      {/* Bottom Footer Area */}
      <div
        className="relative z-10 flex justify-start items-end w-full animate-fade-in opacity-0"
        style={{ animationDelay: "1s" }}
      >
        <div className="flex space-x-8 items-center">
          <a
            href="https://github.com/ac17dollars"
            className="flex items-center space-x-2 text-xs font-bold tracking-widest uppercase text-gray-400 hover:text-white transition-colors group"
          >
            <span className="group-hover:-translate-y-1 transition-transform duration-300">
              Github
            </span>
          </a>
          <a
            href="https://linkedin.com/in/ac17dollars"
            className="flex items-center space-x-2 text-xs font-bold tracking-widest uppercase text-gray-400 hover:text-white transition-colors group"
          >
            <span className="group-hover:-translate-y-1 transition-transform duration-300">
              Linkedin
            </span>
          </a>
        </div>
      </div>
    </div>
  );
};
