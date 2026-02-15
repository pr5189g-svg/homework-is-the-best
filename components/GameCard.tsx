import React from 'react';
import { Game } from '../types.ts';

interface GameCardProps {
  game: Game;
  onPlay: (game: Game) => void;
}

const GameCard: React.FC<GameCardProps> = ({ game, onPlay }) => {
  return (
    <div 
      className="group relative bg-slate-800/50 rounded-xl overflow-hidden border border-slate-700 hover:border-indigo-500 transition-all duration-300 hover:-translate-y-1 cursor-pointer"
      onClick={() => onPlay(game)}
    >
      <div className="aspect-video relative overflow-hidden">
        <img 
          src={game.thumbnail} 
          alt={game.title}
          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-60"></div>
        {game.isFeatured && (
          <span className="absolute top-2 left-2 px-2 py-1 bg-amber-500 text-[10px] font-bold uppercase rounded text-slate-900">
            Featured
          </span>
        )}
      </div>
      
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-gaming text-lg font-bold group-hover:text-indigo-400 transition-colors">
            {game.title}
          </h3>
          <span className="text-[10px] bg-slate-700 text-slate-300 px-2 py-0.5 rounded-full uppercase tracking-wider">
            {game.category}
          </span>
        </div>
        <p className="text-slate-400 text-sm line-clamp-2 leading-relaxed">
          {game.description}
        </p>
      </div>

      <div className="absolute bottom-4 right-4 translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
        <button className="bg-indigo-600 hover:bg-indigo-500 text-white p-2 rounded-lg shadow-lg shadow-indigo-600/20">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default GameCard;