import { ChefHat, TrendingUp, List, Plus, SlidersHorizontal, Heart } from 'lucide-react';
import React from 'react';

/**
 * Minimal local Button replacement to avoid missing import for './ui/button'.
 * Accepts variant and size props used in this screen and forwards native button props.
 */
type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'ghost' | 'default';
  size?: 'icon' | 'sm' | 'default';
  className?: string;
};

export const Button: React.FC<ButtonProps> = ({ variant, size, className = '', children, ...props }) => {
  const base = 'inline-flex items-center justify-center rounded-md font-medium transition';
  const variants: Record<string, string> = {
    ghost: 'bg-transparent',
    default: 'bg-amber-600 text-white'
  };
  const sizes: Record<string, string> = {
    icon: 'p-2',
    sm: 'px-3 py-1.5 text-sm',
    default: 'px-4 py-2'
  };
  const cls = [base, variants[variant ?? 'default'] ?? '', sizes[size ?? 'default'] ?? '', className].filter(Boolean).join(' ');
  return (
    <button className={cls} {...props}>
      {children}
    </button>
  );
};
// Local minimal Badge replacement to avoid missing import for './ui/badge'.
export const Badge: React.FC<React.HTMLAttributes<HTMLSpanElement> & { className?: string }> = ({ children, className = '', ...props }) => {
  const cls = ['inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800', className].filter(Boolean).join(' ');
  return (
    <span className={cls} {...props}>
      {children}
    </span>
  );
};

export const Card: React.FC<React.HTMLAttributes<HTMLDivElement> & { className?: string }> = ({ children, className = '', ...props }) => {
  const cls = ['rounded-lg shadow-sm bg-white', className].filter(Boolean).join(' ');
  return (
    <div className={cls} {...props}>
      {children}
    </div>
  );
};

// Local minimal ImageWithFallback to avoid missing import
export const ImageWithFallback: React.FC<React.ImgHTMLAttributes<HTMLImageElement> & { src?: string | null; fallback?: string; className?: string }> = ({ src, alt, fallback = '', onError, ...props }) => {
  const [current, setCurrent] = React.useState<string | undefined>(src || undefined);
  React.useEffect(() => setCurrent(src || undefined), [src]);

  return (
    <img
      src={current || fallback}
      alt={alt}
      onError={(e) => {
        if (current !== fallback) {
          setCurrent(fallback || undefined);
        }
        if (onError) onError(e as any);
      }}
      {...props}
    />
  );
};

export interface MenuItem {
  id: string;
  dishName: string;
  description: string;
  price: number;
  image?: string;
  course?: string;
  prepTime?: string;
}

interface HomeScreenProps {
  menuItems: MenuItem[];
  favorites: Set<string>;
  onAddNew: () => void;
  onViewDetails: (item: MenuItem) => void;
  onToggleFavorite: (id: string) => void;
  onFilter: () => void;
}

export function HomeScreen({ menuItems, favorites, onAddNew, onViewDetails, onToggleFavorite, onFilter }: HomeScreenProps) {
  const averagePrice = menuItems.length > 0
    ? menuItems.reduce((sum, item) => sum + item.price, 0) / menuItems.length
    : 0;

  const featuredItems = menuItems;

  return (
    <div className="max-w-md mx-auto min-h-screen bg-white shadow-2xl pb-20">
      {/* Header */}
      <div className="bg-gradient-to-r from-amber-600 to-orange-600 text-white p-6 pb-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <ChefHat className="w-8 h-8" />
            <div>
              <h1 className="text-2xl">Chef Christoffel</h1>
              <p className="text-amber-100 text-sm">Private Dining Experiences</p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={onFilter}
            className="text-white hover:bg-white/20"
          >
            <SlidersHorizontal className="w-5 h-5" />
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 gap-4">
          <Card className="bg-white/10 backdrop-blur-sm border-white/20 p-4">
            <p className="text-xs text-amber-100 mb-1">Total Dishes</p>
            <p className="text-2xl">{menuItems.length}</p>
          </Card>
          <Card className="bg-white/10 backdrop-blur-sm border-white/20 p-4">
            <div className="flex items-center gap-2 mb-1">
              <TrendingUp className="w-4 h-4 text-amber-200" />
              <p className="text-xs text-amber-100">Avg. Price</p>
            </div>
            <p className="text-2xl">R{averagePrice.toFixed(0)}</p>
          </Card>
        </div>
      </div>

      {/* Menu Section */}
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-xl text-gray-900">Featured Menu</h2>
            <p className="text-sm text-gray-600">Curated dining experiences</p>
          </div>
          <Button
            onClick={onAddNew}
            size="sm"
            className="bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700"
          >
            <Plus className="w-4 h-4 mr-1" />
            Add
          </Button>
        </div>

        {featuredItems.length === 0 ? (
          <div className="text-center py-16">
            <ChefHat className="w-16 h-16 mx-auto text-amber-300 mb-4" />
            <p className="text-gray-500 mb-2">No menu items yet</p>
            <p className="text-sm text-gray-400 mb-4">
              Start building your menu by adding items
            </p>
            <Button
              onClick={onAddNew}
              className="bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Menu Item
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4">
            {featuredItems.map((item) => (
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
