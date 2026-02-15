
export interface Game {
  id: string;
  title: string;
  category: string;
  description: string;
  thumbnail: string;
  iframeUrl: string;
  isFeatured?: boolean;
}

export type Category = 'All' | 'Action' | 'Puzzle' | 'Arcade' | 'Sports' | 'Strategy';
