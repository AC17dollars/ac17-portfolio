import React, { useState, useEffect } from "react";

export const Navigation: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const navbarHeight = 100;
      const elementPosition =
        element.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - navbarHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  const links = [
    { label: "ABOUT", id: "about" },
    { label: "RESUME", id: "resume" },
    { label: "WORK", id: "projects" },
    { label: "CONTACT", id: "contact" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 w-full flex justify-between items-center p-6 md:p-10 z-50 transition-all duration-500 ${scrolled ? "bg-brand-dark/80 backdrop-blur-md py-4" : ""}`}
    >
      <div className="font-sans font-bold text-xl tracking-tighter text-white mix-blend-difference z-50">
        AC
      </div>

      <ul className="flex space-x-8 text-xs md:text-sm font-sans tracking-widest uppercase font-medium mix-blend-difference z-50">
        {links.map((link) => (
          <li key={link.label}>
            <button
              onClick={() => scrollToSection(link.id)}
              className="text-gray-300 hover:text-cyan-200 transition-colors duration-300"
            >
              {link.label}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};
