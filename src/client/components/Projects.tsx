import React, { useRef } from 'react';
import { useOnScreen } from '../hooks/useOnScreen';
import { ArrowUpRight } from 'lucide-react';

import nepaliCalendarSmall from '../assets/nepcal_small.jpg';
import nepaliCalendarMedium from '../assets/nepcal_medium.jpg';
import nepaliCalendarLarge from '../assets/nepcal_large.jpg';
import rubiksCubeSmall from '../assets/rubiks_cube_small.jpg';
import rubiksCubeMedium from '../assets/rubiks_cube_medium.jpg';
import rubiksCubeLarge from '../assets/rubiks_cube_large.jpg';
import wordleSmall from '../assets/wordle_small.jpg';
import wordleMedium from '../assets/wordle_medium.jpg';
import wordleLarge from '../assets/wordle_large.jpg';
import latexTemplateSmall from '../assets/latextemplate_small.jpg';
import latexTemplateMedium from '../assets/latextemplate_medium.jpg';
import latexTemplateLarge from '../assets/latextemplate_large.jpg';

interface Project {
  title: string;
  category: string;
  image: string;
  srcSet?: string;
  link: string;
  tags: string[];
  description?: string;
}

const projects: Project[] = [
  {
    title: "Nepali Calendar Plugin",
    category: "DankMaterialShell",
    link: "https://github.com/AC17dollars/dms-nepali-calendar",
    image: nepaliCalendarLarge,
    srcSet: `${nepaliCalendarSmall} 400w, ${nepaliCalendarMedium} 800w, ${nepaliCalendarLarge} 1200w`,
    tags: ["QML", "DankMaterialShell", "Nepali Calendar"],
    description: "A Nepali calendar plugin for DankMaterialShell, made in QML."
  },
  {
    title: "Vision Cube",
    category: "Computer Vision",
    link: "https://github.com/ac17dollars/vision-cube",
    image: rubiksCubeLarge,
    srcSet: `${rubiksCubeSmall} 400w, ${rubiksCubeMedium} 800w, ${rubiksCubeLarge} 1200w`,
    tags: ["C#", "YOLOv8", "Computer Vision"],
    description: "A mechanical Rubik's Cube solver built using YOLOv8 and C# for GUI."
  },
  {
    title: "Wordle Clone",
    category: "Cross-platform",
    link: "https://github.com/ac17dollars/cpp-wordle-clone",
    image: wordleLarge,
    srcSet: `${wordleSmall} 400w, ${wordleMedium} 800w, ${wordleLarge} 1200w`,
    tags: ["C++", "wxWidgets", "GUI"],
    description: "A desktop Wordle clone built from scratch in C++, featuring a native GUI."
  },
  {
    title: "IOE LaTeX Template",
    category: "Academic Tools",
    link: "https://github.com/AC17dollars/thapathali-report-latex-template",
    image: latexTemplateLarge,
    srcSet: `${latexTemplateSmall} 400w, ${latexTemplateMedium} 800w, ${latexTemplateLarge} 1200w`,
    tags: ["TeX", "Automation", "Open Source"],
    description: "Project report template for students of Thapathali Campus (IOE TU), standardized for technical excellence."
  }
];

const ProjectCard: React.FC<{ project: Project; index: number }> = ({ project, index }) => {
  const ref = useRef<HTMLDivElement>(null);
  const isVisible = useOnScreen(ref, 0.2);

  return (
    <div
      ref={ref}
      className={`group relative mb-24 md:mb-32 transition-all duration-1000 ease-out transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <div className="relative overflow-hidden rounded-sm bg-brand-dim/20">
        <div className="absolute inset-0 bg-brand-accent/0 group-hover:bg-brand-accent/5 transition-colors duration-500 z-10"></div>
        <img
          src={project.image}
          srcSet={project.srcSet}
          sizes="(max-width: 768px) 100vw, 70vw"
          alt={project.title}
          className="w-full h-[50vh] md:h-[70vh] object-cover grayscale-0 md:grayscale group-hover:grayscale-0 transition-all duration-700 ease-in-out scale-100 group-hover:scale-105"
        />

        {/* Hover overlay info */}
        <div className="absolute top-6 right-6 z-20 opacity-100 md:opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white text-black rounded-full p-3 block hover:scale-110 active:scale-95 transition-transform duration-200"
          >
            <ArrowUpRight className="w-5 h-5" />
          </a>
        </div>
      </div>

      <div className="mt-6 flex flex-col md:flex-row md:items-start justify-between">
        <div>
          <h3 className="text-3xl md:text-4xl font-sans font-bold text-white mb-2">{project.title}</h3>
          <div className="flex flex-wrap gap-2 md:gap-4 text-xs font-mono uppercase tracking-widest text-gray-500">
            {project.tags.map((tag, i) => (
              <span key={i}>
                {tag} {i < project.tags.length - 1 && <span className="text-gray-700 mx-1">/</span>}
              </span>
            ))}
          </div>
        </div>

        {project.description && (
          <div className="mt-4 md:mt-0 max-w-md">
            <p className="text-gray-400 text-sm leading-relaxed">{project.description}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export const Projects: React.FC = () => {
  return (
    <section id="projects" className="relative py-20 px-6 md:px-12 bg-brand-dark">
      <div className="max-w-7xl mx-auto">
        <div className="mb-20 flex items-center space-x-4">
          <span className="text-brand-accent font-serif italic text-xl">02</span>
          <span className="h-px bg-white/20 w-20"></span>
          <h2 className="text-xs font-bold tracking-[0.2em] uppercase text-white">Selected Projects</h2>
        </div>

        <div className="flex flex-col">
          {projects.map((project, index) => (
            <ProjectCard key={project.title} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};
