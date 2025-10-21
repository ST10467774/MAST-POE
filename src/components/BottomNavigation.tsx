import { Home, Search, Heart, Settings } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';

interface BottomNavigationProps {
  currentScreen: string;
  onNavigate: (screen: string) => void;
  favoriteCount: number;
}

export function BottomNavigation({ currentScreen, onNavigate, favoriteCount }: BottomNavigationProps) {
  const navItems = [
    { id: 'home', icon: Home, label: 'Home' },
    { id: 'search', icon: Search, label: 'Search' },
    { id: 'favorites', icon: Heart, label: 'Favorites', count: favoriteCount },
    { id: 'settings', icon: Settings, label: 'Settings' },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white border-t border-amber-100 shadow-lg z-50">
      <div className="flex items-center justify-around p-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentScreen === item.id;

          return (
            <Button
              key={item.id}
              variant="ghost"
              onClick={() => onNavigate(item.id)}
              className={`flex flex-col items-center gap-1 h-auto py-2 px-4 rounded-lg transition-all ${
                isActive
                  ? 'text-amber-700 bg-amber-50'
                  : 'text-gray-600 hover:text-amber-700 hover:bg-amber-50/50'
              }`}
            >
              <div className="relative">
                <Icon className={`w-6 h-6 ${isActive ? 'fill-amber-700' : ''}`} />
                {item.count !== undefined && item.count > 0 && (
                  <Badge className="absolute -top-2 -right-2 bg-red-500 text-white border-0 h-5 w-5 flex items-center justify-center p-0 text-xs">
                    {item.count}
                  </Badge>
                )}
              </div>
              <span className="text-xs">{item.label}</span>
            </Button>
          );
        })}
      </div>
    </div>
  );
}
