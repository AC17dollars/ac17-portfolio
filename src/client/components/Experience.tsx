import React, { useRef } from 'react';
import { useOnScreen } from '../hooks/useOnScreen';

export const Experience: React.FC = () => {
    const ref = useRef<HTMLDivElement>(null);
    const isVisible = useOnScreen(ref, 0.2);

    return (
        <section id="resume" className="py-20 px-6 md:px-12 bg-brand-dark border-t border-white/5">
            <div ref={ref} className="max-w-7xl mx-auto">
                <div className="mb-20 flex items-center space-x-4">
                    <span className="text-brand-accent font-serif italic text-xl">02</span>
                    <span className="h-px bg-white/20 w-20"></span>
                    <h2 className="text-xs font-bold tracking-[0.2em] uppercase text-white">Resume</h2>
                </div>

                <div className={`grid grid-cols-1 md:grid-cols-2 gap-16 transition-all duration-1000 ease-out transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}>
                    {/* Education Column */}
                    <div>
                        <h3 className="text-2xl md:text-3xl font-serif italic text-brand-accent mb-10">Education</h3>

                        <div className="space-y-12">
                            <div className="relative pl-8 border-l border-white/10">
                                <div className="absolute left-[-5px] top-0 w-[9px] h-[9px] rounded-full bg-brand-accent shadow-[0_0_10px_rgba(147,197,253,0.5)]"></div>
                                <h4 className="text-xl font-sans font-bold text-white mb-2">Bachelor of Engineering in Electronics, Communication & Information Engineering</h4>
                                <div className="text-xs font-mono text-gray-500 uppercase tracking-widest mb-4">2021 - 2025</div>
                                <p className="text-sm font-serif italic text-gray-300 mb-2">Thapathali Campus, IOE, TU</p>
                                <p className="text-gray-400 text-sm leading-relaxed">
                                    I have completed Undergraduate Degree in Electronics, Communication & Information Engineering. I obtained 80.01% cumulative percentage.
                                </p>
                            </div>

                            <div className="relative pl-8 border-l border-white/10">
                                <div className="absolute left-[-5px] top-0 w-[9px] h-[9px] rounded-full bg-white/20"></div>
                                <h4 className="text-xl font-sans font-bold text-white mb-2">High School / +2</h4>
                                <div className="text-xs font-mono text-gray-500 uppercase tracking-widest mb-4">2018 - 2020</div>
                                <p className="text-sm font-serif italic text-gray-300 mb-2">Valmiki Shiksha Sadan, NEB</p>
                                <p className="text-gray-400 text-sm leading-relaxed">
                                    I have completed High School studies / +2 certification in Science stream. I obtained 3.82 CGPA.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Experience Column */}
                    <div>
                        <h3 className="text-2xl md:text-3xl font-serif italic text-brand-accent mb-10">Work Experience</h3>

                        <div className="space-y-12">
                            <div className="relative pl-8 border-l border-white/10">
                                <div className="absolute left-[-5px] top-0 w-[9px] h-[9px] rounded-full bg-brand-accent shadow-[0_0_10px_rgba(147,197,253,0.5)]"></div>
                                <h4 className="text-xl font-sans font-bold text-white mb-2">Associate Node Developer</h4>
                                <div className="text-xs font-mono text-gray-500 uppercase tracking-widest mb-4">January 2026 - Present</div>
                                <p className="text-sm font-serif italic text-gray-300 mb-2">E.K. Solutions (EKbana)</p>
                                <p className="text-gray-400 text-sm leading-relaxed">
                                    Building scalable backend systems and high-performance server-side applications using Node.js.
                                </p>
                            </div>

                            <div className="relative pl-8 border-l border-white/10">
                                <div className="absolute left-[-5px] top-0 w-[9px] h-[9px] rounded-full bg-white/20"></div>
                                <h4 className="text-xl font-sans font-bold text-white mb-2">Frontend Developer</h4>
                                <div className="text-xs font-mono text-gray-500 uppercase tracking-widest mb-4">September 2025 - December 2025</div>
                                <p className="text-sm font-serif italic text-gray-300 mb-2">cellapp | Smartpalika</p>
                                <p className="text-gray-400 text-sm leading-relaxed">
                                    Developed responsive and interactive user interfaces for digital solutions.
                                </p>
                            </div>

                            <div className="relative pl-8 border-l border-white/10">
                                <div className="absolute left-[-5px] top-0 w-[9px] h-[9px] rounded-full bg-white/20"></div>
                                <h4 className="text-xl font-sans font-bold text-white mb-2">Software Coordinator</h4>
                                <div className="text-xs font-mono text-gray-500 uppercase tracking-widest mb-4">April 2023 - May 2024</div>
                                <p className="text-sm font-serif italic text-gray-300 mb-2">ECAST, Thapathali</p>
                                <p className="text-gray-400 text-sm leading-relaxed">
                                    Lead in the coordination, development, and implementation of software projects.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
