import React, { useState, useEffect, useMemo } from 'react';
import Navbar from './components/Navbar.tsx';
import GameCard from './components/GameCard.tsx';
import GamePlayer from './components/GamePlayer.tsx';
import { Game, Category } from './types.ts';

const CATEGORIES: Category[] = ['All', 'Action', 'Puzzle', 'Arcade', 'Sports', 'Strategy'];

const App: React.FC = () => {
  const [games, setGames] = useState<Game[]>([]);
  const [selectedGame, setSelectedGame] = useState<Game | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<Category>('All');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadGames = async () => {
      try {
        const response = await fetch('./games.json');
        if (!response.ok) throw new Error('Failed to fetch games data');
        const data = await response.json();
        setGames(data as Game[]);
      } catch (error) {
        console.error('Error loading games:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadGames();
  }, []);

  const filteredGames = useMemo(() => {
    return games.filter(game => {
      const matchesSearch = game.title.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = activeCategory === 'All' || game.category === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [games, searchQuery, activeCategory]);

  const handlePlayGame = (game: Game) => {
    setSelectedGame(game);
  };

  const handleBackToHome = () => {
    setSelectedGame(null);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar onHomeClick={handleBackToHome} />

      <main className="flex-1">
        {selectedGame ? (
          <GamePlayer game={selectedGame} onBack={handleBackToHome} />
        ) : (
          <div className="animate-in fade-in duration-500">
            {/* Hero Section */}
            <section className="relative py-12 px-4 sm:px-8 overflow-hidden">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none opacity-20">
                <div className="absolute top-[-10%] left-[20%] w-[40%] h-[40%] bg-indigo-600 rounded-full blur-[120px]"></div>
                <div className="absolute bottom-[-10%] right-[20%] w-[40%] h-[40%] bg-cyan-600 rounded-full blur-[120px]"></div>
              </div>

              <div className="max-w-7xl mx-auto relative z-10 text-center">
                <h1 className="font-gaming text-4xl sm:text-6xl font-bold mb-4 tracking-tighter">
                  LEVEL UP YOUR <br />
                  <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
                    GAMING EXPERIENCE
                  </span>
                </h1>
                <p className="text-slate-400 max-w-2xl mx-auto mb-8 text-lg">
                  Access the web's best unblocked games. Zero blocks, zero lag, all fun. 
                  Play straight from your browser.
                </p>

                <div className="max-w-xl mx-auto relative">
                  <input
                    type="text"
                    placeholder="Search for a game..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-slate-800/50 border border-slate-700 rounded-2xl py-4 pl-12 pr-4 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all backdrop-blur-sm"
                  />
                  <svg 
                    className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-500"
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
              </div>
            </section>

            {/* Category Filter */}
            <section className="max-w-7xl mx-auto px-4 sm:px-8 mb-8">
              <div className="flex items-center gap-2 overflow-x-auto pb-4 no-scrollbar">
                {CATEGORIES.map(category => (
                  <button
                    key={category}
                    onClick={() => setActiveCategory(category)}
                    className={`px-6 py-2 rounded-full text-sm font-semibold transition-all whitespace-nowrap ${
                      activeCategory === category 
                        ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30' 
                        : 'bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </section>

            {/* Games Grid */}
            <section className="max-w-7xl mx-auto px-4 sm:px-8 pb-20">
              {isLoading ? (
                <div className="flex justify-center py-20">
                   <div className="w-12 h-12 border-4 border-indigo-500/20 border-t-indigo-500 rounded-full animate-spin"></div>
                </div>
              ) : filteredGames.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {filteredGames.map(game => (
                    <GameCard 
                      key={game.id} 
                      game={game} 
                      onPlay={handlePlayGame} 
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-20">
                  <div className="inline-block p-4 rounded-full bg-slate-800 mb-4 text-slate-500">
                    <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 9.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="font-gaming text-xl font-bold text-slate-300">No games found</h3>
                  <p className="text-slate-500">Try a different search term or category.</p>
                </div>
              )}
            </section>
          </div>
        )}
      </main>

      {!selectedGame && (
        <footer className="bg-slate-900 border-t border-slate-800 py-12 px-4 sm:px-8">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex flex-col items-center md:items-start">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-6 h-6 bg-indigo-600 rounded flex items-center justify-center">
                  <span className="font-gaming font-bold text-white text-xs">N</span>
                </div>
                <span className="font-gaming text-lg font-bold tracking-tighter text-white">
                  NOVAARCADE
                </span>
              </div>
              <p className="text-slate-500 text-sm text-center md:text-left">
                Your daily dose of unblocked web games.<br />
                © 2024 NovaArcade. All rights reserved.
              </p>
            </div>
            
            <div className="flex gap-8">
              <a href="#" className="text-slate-500 hover:text-indigo-400 transition-colors">Privacy</a>
              <a href="#" className="text-slate-500 hover:text-indigo-400 transition-colors">Terms</a>
              <a href="#" className="text-slate-500 hover:text-indigo-400 transition-colors">Discord</a>
            </div>
          </div>
        </footer>
      )}
    </div>
  );
};

export default App;