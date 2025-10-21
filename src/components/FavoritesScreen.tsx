import { Heart } from 'lucide-react';
interface MenuItem {
  id: string;
  image?: string;
  dishName: string;
  description?: string;
  price: number;
  prepTime?: string;
  course?: string;
}
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Card } from './ui/card';
import React, { useState } from 'react';

/**
 * Small ImageWithFallback component to avoid missing module error.
 * Props:
 *  - src?: string | undefined
 *  - alt?: string
 *  - className?: string
 *
 * Renders an img and falls back to a simple placeholder SVG when the image fails to load.
 */
export function ImageWithFallback({ src, alt = '', className }: { src?: string; alt?: string; className?: string }) {
  const [failed, setFailed] = useState(false);

  if (!src || failed) {
    return (
      <div
        className={className}
        role="img"
        aria-label={alt}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#f3f4f6',
        }}
      >
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
          <path d="M21 19V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14" stroke="#d1d5db" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M7 13l2.5 3.01L13 11l4 6" stroke="#d1d5db" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
    );
  }

  return <img src={src} alt={alt} className={className} onError={() => setFailed(true)} />;
}

interface FavoritesScreenProps {
  menuItems: MenuItem[];
  favorites: Set<string>;
  onViewDetails: (item: MenuItem) => void;
  onToggleFavorite: (id: string) => void;
}

export function FavoritesScreen({ menuItems, favorites, onViewDetails, onToggleFavorite }: FavoritesScreenProps) {
  return (
    <div className="max-w-md mx-auto min-h-screen bg-white shadow-2xl pb-20">
      {/* Header */}
      <div className="bg-gradient-to-r from-amber-600 to-orange-600 text-white p-6">
        <div className="flex items-center gap-3">
          <Heart className="w-7 h-7 fill-white" />
          <div>
            <h1 className="text-2xl">Favorites</h1>
            <p className="text-amber-100 text-sm">{menuItems.length} saved item{menuItems.length !== 1 ? 's' : ''}</p>
          </div>
        </div>
      </div>

      <div className="p-6">
        {menuItems.length === 0 ? (
          <div className="text-center py-16">
            <Heart className="w-16 h-16 mx-auto text-amber-300 mb-4" />
            <p className="text-gray-500 mb-2">No favorites yet</p>
            <p className="text-sm text-gray-400">
              Tap the heart icon on any dish to save it here
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4">
            {menuItems.map((item) => (
              <Card
                key={item.id}
                className="overflow-hidden hover:shadow-xl transition-all cursor-pointer border-amber-100 group"
                onClick={() => onViewDetails(item)}
              >
                <div className="relative aspect-square">
                  <ImageWithFallback
                    src={item.image}
                    alt={item.dishName}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleFavorite(item.id);
                    }}
                    className="absolute top-2 right-2 bg-white/90 hover:bg-white shadow-md"
                  >
                    <Heart
                      className={`w-4 h-4 ${
                        favorites.has(item.id)
                          ? 'fill-red-500 text-red-500'
                          : 'text-gray-600'
                      }`}
                    />
                  </Button>
                  <Badge className="absolute bottom-2 left-2 bg-amber-600 text-white border-0">
                    {item.course}
                  </Badge>
                </div>
                <div className="p-3">
                  <h3 className="text-sm mb-1 line-clamp-1">{item.dishName}</h3>
                  <p className="text-xs text-gray-600 mb-2 line-clamp-2">{item.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-amber-700">R{item.price.toFixed(2)}</span>
                    <span className="text-xs text-gray-500">{item.prepTime}</span>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
