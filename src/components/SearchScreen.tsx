import React, { useState } from 'react';
import { Search, Heart, X } from 'lucide-react';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Card } from './ui/card';

type ImageWithFallbackProps = React.ImgHTMLAttributes<HTMLImageElement> & { fallbackSrc?: string };

export const ImageWithFallback: React.FC<ImageWithFallbackProps> = ({ src, alt, fallbackSrc, onError, ...props }) => {
  const [imgSrc, setImgSrc] = useState<string | undefined>(src as string | undefined);

  return (
    <img
      src={imgSrc || fallbackSrc || '/placeholder.png'}
      alt={alt}
      onError={(e) => {
        if (imgSrc === fallbackSrc || imgSrc === '/placeholder.png') return;
        setImgSrc(fallbackSrc || '/placeholder.png');
        if (onError) onError(e);
      }}
      {...props}
    />
  );
};

interface MenuItem {
  id: string;
  dishName: string;
  description: string;
  course: string;
  image: string;
  price: number;
  prepTime: string;
}

interface SearchScreenProps {
  menuItems: MenuItem[];
  favorites: Set<string>;
  onViewDetails: (item: MenuItem) => void;
  onToggleFavorite: (id: string) => void;
}

export function SearchScreen({ menuItems, favorites, onViewDetails, onToggleFavorite }: SearchScreenProps) {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredItems = menuItems.filter(item =>
    item.dishName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.course.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="max-w-md mx-auto min-h-screen bg-white shadow-2xl pb-20">
      {/* Header */}
      <div className="bg-gradient-to-r from-amber-600 to-orange-600 text-white p-6 sticky top-0 z-10">
        <div className="flex items-center gap-3 mb-4">
          <Search className="w-7 h-7" />
          <div>
            <h1 className="text-2xl">Search Menu</h1>
            <p className="text-amber-100 text-sm">Find your perfect dish</p>
          </div>
        </div>

        {/* Search Input */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-amber-700" />
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search dishes, courses..."
            className="pl-10 pr-10 bg-white text-gray-900 placeholder:text-gray-500 border-white/30 focus:border-white h-12"
          />
          {searchQuery && (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSearchQuery('')}
              className="absolute right-1 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
            >
              <X className="w-4 h-4" />
            </Button>
          )}
        </div>

        {searchQuery && (
          <p className="text-amber-100 text-sm mt-3">
            {filteredItems.length} result{filteredItems.length !== 1 ? 's' : ''} found
          </p>
        )}
      </div>

      <div className="p-6">
        {!searchQuery ? (
          <div className="text-center py-16">
            <Search className="w-16 h-16 mx-auto text-amber-300 mb-4" />
            <p className="text-gray-500 mb-2">Start searching</p>
            <p className="text-sm text-gray-400">
              Search by dish name, description, or course
            </p>
          </div>
        ) : filteredItems.length === 0 ? (
          <div className="text-center py-16">
            <Search className="w-16 h-16 mx-auto text-gray-300 mb-4" />
            <p className="text-gray-500 mb-2">No results found</p>
            <p className="text-sm text-gray-400">
              Try a different search term
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4">
            {filteredItems.map((item) => (
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
