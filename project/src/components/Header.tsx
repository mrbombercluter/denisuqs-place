import React, { useState, useEffect } from 'react';
import { Cpu, Shield, FileText, Star, Users } from 'lucide-react';
import { AdminPanel } from './AdminPanel';
import { Reviews } from './Reviews';
import { TOS } from './TOS';

export const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [showAdminPanel, setShowAdminPanel] = useState(false);
  const [showReviews, setShowReviews] = useState(false);
  const [showTOS, setShowTOS] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrolled]);

  // Prevent devtools
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        (e.key === 'F12') ||
        ((e.ctrlKey || e.metaKey) && (e.shiftKey && e.key === 'I' || e.key === 'u'))
      ) {
        e.preventDefault();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 w-full transition-all duration-300 z-50 ${
          scrolled
            ? 'bg-black/80 backdrop-blur-md shadow-lg shadow-cyan-500/10'
            : 'bg-transparent'
        }`}
      >
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center">
            <Cpu
              size={28}
              className="text-cyan-400 animate-pulse mr-2"
              strokeWidth={1.5}
            />
            <div className="flex flex-col">
              <h1 className="text-xl md:text-2xl font-bold tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600">
                DENISUQ
              </h1>
              <p className="text-xs text-cyan-300 -mt-1 tracking-widest">CONFIGURATIONS</p>
            </div>
          </div>
          <nav>
            <ul className="flex gap-6 items-center">
              <li>
                <button
                  onClick={() => setShowTOS(true)}
                  className="flex items-center gap-2 text-sm uppercase tracking-wider hover:text-cyan-400 transition-colors relative group"
                >
                  <FileText size={16} />
                  TOS
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-cyan-400 transition-all duration-300 group-hover:w-full"></span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => setShowAdminPanel(true)}
                  className="flex items-center gap-2 text-sm uppercase tracking-wider hover:text-cyan-400 transition-colors relative group"
                >
                  <Shield size={16} />
                  Admin Panel
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-cyan-400 transition-all duration-300 group-hover:w-full"></span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => setShowReviews(true)}
                  className="flex items-center gap-2 text-sm uppercase tracking-wider hover:text-cyan-400 transition-colors relative group"
                >
                  <Star size={16} />
                  Reviews
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-cyan-400 transition-all duration-300 group-hover:w-full"></span>
                </button>
              </li>
              <li>
                <a
                  href="#configs"
                  className="text-sm uppercase tracking-wider hover:text-cyan-400 transition-colors relative group"
                >
                  Configs
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-cyan-400 transition-all duration-300 group-hover:w-full"></span>
                </a>
              </li>
              <li>
                <a
                  href="#about"
                  className="text-sm uppercase tracking-wider hover:text-cyan-400 transition-colors relative group"
                >
                  About
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-cyan-400 transition-all duration-300 group-hover:w-full"></span>
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </header>
      <AdminPanel isOpen={showAdminPanel} onClose={() => setShowAdminPanel(false)} />
      <Reviews isOpen={showReviews} onClose={() => setShowReviews(false)} />
      <TOS isOpen={showTOS} onClose={() => setShowTOS(false)} />
    </>
  );
};