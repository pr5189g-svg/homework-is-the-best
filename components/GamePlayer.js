import React, { useState } from 'react';
import { html } from 'htm/react';

const GamePlayer = ({ game, onBack }) => {
  const [isLoading, setIsLoading] = useState(true);

  return html`
    <div className="fixed inset-0 z-[60] bg-slate-950 flex flex-col">
      <div className="h-16 bg-slate-900 border-b border-slate-800 flex items-center justify-between px-4 sm:px-8">
        <div className="flex items-center gap-4">
          <button 
            onClick=${onBack}
            className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors group"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 transform group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            <span className="hidden sm:inline font-medium">Back to Games</span>
          </button>
          <div className="w-px h-6 bg-slate-700 hidden sm:block"></div>
          <h2 className="font-gaming text-lg font-bold text-indigo-400 truncate max-w-[200px] sm:max-w-none">
            ${game.title}
          </h2>
        </div>
        
        <div className="flex items-center gap-2">
          <button 
            onClick=${() => window.location.reload()}
            className="p-2 text-slate-400 hover:text-white transition-colors"
            title="Reload Game"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
          </button>
          <button 
            className="bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-1.5 rounded-lg text-sm font-bold transition-all shadow-lg shadow-indigo-600/20"
            onClick=${() => {
              const elem = document.getElementById('game-iframe');
              if (elem?.requestFullscreen) {
                elem.requestFullscreen();
              }
            }}
          >
            Fullscreen
          </button>
        </div>
      </div>

      <div className="flex-1 relative bg-black">
        ${isLoading ? html`
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-950 z-10">
            <div className="w-16 h-16 border-4 border-indigo-500/20 border-t-indigo-500 rounded-full animate-spin mb-4"></div>
            <p className="font-gaming text-slate-400 animate-pulse">Loading ${game.title}...</p>
          </div>
        ` : null}
        <iframe
          id="game-iframe"
          src=${game.iframeUrl}
          className="w-full h-full border-none"
          title=${game.title}
          onLoad=${() => setIsLoading(false)}
          allow="autoplay; fullscreen; pointer-lock"
        />
      </div>
    </div>
  `;
};

export default GamePlayer;