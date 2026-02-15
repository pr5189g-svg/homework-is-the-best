import React from 'react';
import { html } from 'htm/react';

const Navbar = ({ onHomeClick }) => {
  return html`
    <nav className="sticky top-0 z-50 bg-slate-900/80 backdrop-blur-md border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div 
            className="flex items-center gap-2 cursor-pointer group"
            onClick=${onHomeClick}
          >
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center group-hover:bg-indigo-500 transition-colors">
              <span className="font-gaming font-bold text-white">N</span>
            </div>
            <span className="font-gaming text-xl font-bold tracking-tighter bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">
              NOVAARCADE
            </span>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <button 
                onClick=${onHomeClick}
                className="text-slate-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors"
              >
                Games
              </button>
              <a href="#" className="text-slate-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors">Categories</a>
              <a href="#" className="text-slate-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors">About</a>
            </div>
          </div>
        </div>
      </div>
    </nav>
  `;
};

export default Navbar;