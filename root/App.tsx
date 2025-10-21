import { useState } from 'react';
import { HomeScreen } from './components/HomeScreen';
import { AddMenuItem } from './components/AddMenuItem';
import { MenuItemDetails } from './components/MenuItemDetails';
import { FilterMenu } from './components/FilterMenu';
import { SearchScreen } from './components/SearchScreen';
import { FavoritesScreen } from './components/FavoritesScreen';
import { SettingsScreen } from './components/SettingsScreen';
import { BottomNavigation } from './components/BottomNavigation';

export interface MenuItem {
  id: string;
  dishName: string;
  description: string;
  course: string;
  price: number;
  image: string;
  prepTime: string;
  servings: number;
  allergens: string[];
  nutritionalInfo: {
    calories: number;
    protein: string;
    carbs: string;
    fat: string;
  };
  winePairing?: string;
}

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<'home' | 'add' | 'details' | 'filter' | 'search' | 'favorites' | 'settings'>('home');
  const [selectedMenuItem, setSelectedMenuItem] = useState<MenuItem | null>(null);
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [settings, setSettings] = useState({
    currency: 'ZAR',
    notifications: true,
    dietaryPreferences: [] as string[],
  });

  const [menuItems, setMenuItems] = useState<MenuItem[]>([
    {
      id: '1',
      dishName: 'Pan-Seared Kingklip',
      description: 'Delicate kingklip fillet with lemon butter sauce, seasonal vegetables, and herb-roasted potatoes',
      course: 'Mains',
      price: 385,
      image: 'https://images.unsplash.com/photo-1758384077218-fa3c83d112e8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnb3VybWV0JTIwZmlzaCUyMGRpc2glMjBwbGF0ZWR8ZW58MXx8fHwxNzYwOTU0MDcxfDA&ixlib=rb-4.1.0&q=80&w=1080',
      prepTime: '35 min',
      servings: 1,
      allergens: ['Fish', 'Dairy'],
      nutritionalInfo: {
        calories: 420,
        protein: '38g',
        carbs: '22g',
        fat: '18g',
      },
      winePairing: 'Chardonnay or Sauvignon Blanc',
    },
    {
      id: '2',
      dishName: 'Wagyu Beef Tenderloin',
      description: 'Premium wagyu beef with red wine reduction, truffle mashed potatoes, and grilled asparagus',
      course: 'Mains',
      price: 890,
      image: 'https://images.unsplash.com/photo-1689672234865-aac481f62587?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiZWVmJTIwc3RlYWslMjBmaW5lJTIwZGluaW5nfGVufDF8fHx8MTc2MDk1NDA3Mnww&ixlib=rb-4.1.0&q=80&w=1080',
      prepTime: '40 min',
      servings: 1,
      allergens: ['Dairy'],
      nutritionalInfo: {
        calories: 650,
        protein: '52g',
        carbs: '28g',
        fat: '35g',
      },
      winePairing: 'Cabernet Sauvignon or Malbec',
    },
    {
      id: '3',
      dishName: 'Chocolate Fondant',
      description: 'Rich dark chocolate lava cake with vanilla bean ice cream and raspberry coulis',
      course: 'Dessert',
      price: 165,
      image: 'https://images.unsplash.com/photo-1722673353577-350697f89b31?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaG9jb2xhdGUlMjBkZXNzZXJ0JTIwcGxhdGVkfGVufDF8fHx8MTc2MDg1ODQwNnww&ixlib=rb-4.1.0&q=80&w=1080',
      prepTime: '25 min',
      servings: 1,
      allergens: ['Eggs', 'Dairy', 'Gluten'],
      nutritionalInfo: {
        calories: 485,
        protein: '8g',
        carbs: '58g',
        fat: '24g',
      },
      winePairing: 'Port or Late Harvest Dessert Wine',
    },
    {
      id: '4',
      dishName: 'Grilled Lobster Tail',
      description: 'Butter-poached lobster tail with garlic herb butter, lemon risotto, and microgreens',
      course: 'Mains',
      price: 725,
      image: 'https://images.unsplash.com/photo-1711989874707-6a5ffe1798c5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsb2JzdGVyJTIwc2VhZm9vZCUyMGZpbmUlMjBkaW5pbmd8ZW58MXx8fHwxNzYwOTU0MDczfDA&ixlib=rb-4.1.0&q=80&w=1080',
      prepTime: '30 min',
      servings: 1,
      allergens: ['Shellfish', 'Dairy'],
      nutritionalInfo: {
        calories: 380,
        protein: '42g',
        carbs: '24g',
        fat: '12g',
      },
      winePairing: 'Champagne or White Burgundy',
    },
    {
      id: '5',
      dishName: 'Herb-Crusted Lamb Rack',
      description: 'Rosemary and garlic crusted lamb with mint jus, roasted root vegetables, and dauphinoise potatoes',
      course: 'Mains',
      price: 595,
      image: 'https://images.unsplash.com/photo-1608502735811-0affbb61f260?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsYW1iJTIwY2hvcHMlMjBnb3VybWV0fGVufDF8fHx8MTc2MDk1NDA3M3ww&ixlib=rb-4.1.0&q=80&w=1080',
      prepTime: '45 min',
      servings: 1,
      allergens: ['Dairy', 'Gluten'],
      nutritionalInfo: {
        calories: 720,
        protein: '48g',
        carbs: '32g',
        fat: '42g',
      },
      winePairing: 'Shiraz or Bordeaux Blend',
    },
    {
      id: '6',
      dishName: 'Crème Brûlée',
      description: 'Classic vanilla bean custard with caramelized sugar crust and fresh berries',
      course: 'Dessert',
      price: 145,
      image: 'https://images.unsplash.com/photo-1593469348361-5ca3b78288f0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcmVtZSUyMGJydWxlZSUyMGRlc3NlcnR8ZW58MXx8fHwxNzYwOTQ1NzE3fDA&ixlib=rb-4.1.0&q=80&w=1080',
      prepTime: '20 min',
      servings: 1,
      allergens: ['Eggs', 'Dairy'],
      nutritionalInfo: {
        calories: 340,
        protein: '6g',
        carbs: '38g',
        fat: '18g',
      },
      winePairing: 'Moscato or Sweet Riesling',
    },
    {
      id: '7',
      dishName: 'Smoked Salmon Tartare',
      description: 'House-smoked salmon with avocado, capers, dill crème fraîche, and crispy crostini',
      course: 'Starters',
      price: 215,
      image: 'https://images.unsplash.com/photo-1760903124403-9d0d36867720?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzYWxtb24lMjBhcHBldGl6ZXIlMjBnb3VybWV0fGVufDF8fHx8MTc2MDk1NDA3NHww&ixlib=rb-4.1.0&q=80&w=1080',
      prepTime: '15 min',
      servings: 1,
      allergens: ['Fish', 'Dairy', 'Gluten'],
      nutritionalInfo: {
        calories: 285,
        protein: '18g',
        carbs: '12g',
        fat: '18g',
      },
      winePairing: 'Prosecco or Pinot Grigio',
    },
    {
      id: '8',
      dishName: 'Truffle Tagliatelle',
      description: 'Fresh pasta with black truffle, wild mushrooms, parmesan cream sauce, and microherbs',
      course: 'Mains',
      price: 425,
      image: 'https://images.unsplash.com/photo-1694004601053-41926bf4a38a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwYXN0YSUyMHRydWZmbGUlMjBmaW5lJTIwZGluaW5nfGVufDF8fHx8MTc2MDk1NDA3NHww&ixlib=rb-4.1.0&q=80&w=1080',
      prepTime: '25 min',
      servings: 1,
      allergens: ['Eggs', 'Dairy', 'Gluten'],
      nutritionalInfo: {
        calories: 520,
        protein: '22g',
        carbs: '58g',
        fat: '22g',
      },
      winePairing: 'Pinot Noir or Barolo',
    },
    {
      id: '9',
      dishName: 'Confit Duck Breast',
      description: 'Slow-cooked duck breast with orange glaze, wild rice pilaf, and glazed root vegetables',
      course: 'Mains',
      price: 485,
      image: 'https://images.unsplash.com/photo-1728158416906-ab55ee95bea5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkdWNrJTIwY29uZml0JTIwZ291cm1ldHxlbnwxfHx8fDE3NjA5NTQ3MDZ8MA&ixlib=rb-4.1.0&q=80&w=1080',
      prepTime: '50 min',
      servings: 1,
      allergens: ['Dairy'],
      nutritionalInfo: {
        calories: 580,
        protein: '42g',
        carbs: '35g',
        fat: '28g',
      },
      winePairing: 'Pinot Noir or Burgundy',
    },
    {
      id: '10',
      dishName: 'Seared Scallops',
      description: 'Pan-seared scallops with cauliflower purée, crispy pancetta, and brown butter sauce',
      course: 'Starters',
      price: 295,
      image: 'https://images.unsplash.com/photo-1698434939525-dd584e446a29?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzY2FsbG9wcyUyMGZpbmUlMjBkaW5pbmd8ZW58MXx8fHwxNzYwODY5NjU1fDA&ixlib=rb-4.1.0&q=80&w=1080',
      prepTime: '20 min',
      servings: 1,
      allergens: ['Shellfish', 'Dairy'],
      nutritionalInfo: {
        calories: 320,
        protein: '28g',
        carbs: '18g',
        fat: '16g',
      },
      winePairing: 'Chardonnay or Champagne',
    },
    {
      id: '11',
      dishName: 'Tuna Tartare',
      description: 'Fresh yellowfin tuna with sesame, ginger, soy dressing, avocado, and wonton crisps',
      course: 'Starters',
      price: 265,
      image: 'https://images.unsplash.com/photo-1636871522968-9de4fa3a5702?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0dW5hJTIwdGFydGFyZSUyMGFwcGV0aXplcnxlbnwxfHx8fDE3NjA5NTQ3MDZ8MA&ixlib=rb-4.1.0&q=80&w=1080',
      prepTime: '15 min',
      servings: 1,
      allergens: ['Fish', 'Soy', 'Gluten'],
      nutritionalInfo: {
        calories: 245,
        protein: '32g',
        carbs: '14g',
        fat: '8g',
      },
      winePairing: 'Sauvignon Blanc or Sake',
    },
    {
      id: '12',
      dishName: 'Tiramisu',
      description: 'Classic Italian dessert with espresso-soaked ladyfingers, mascarpone cream, and cocoa powder',
      course: 'Dessert',
      price: 155,
      image: 'https://images.unsplash.com/photo-1743297907361-d64dca3f657d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0aXJhbWlzdSUyMGRlc3NlcnQlMjBwbGF0ZWR8ZW58MXx8fHwxNzYwOTU0NzA3fDA&ixlib=rb-4.1.0&q=80&w=1080',
      prepTime: '30 min',
      servings: 1,
      allergens: ['Eggs', 'Dairy', 'Gluten'],
      nutritionalInfo: {
        calories: 395,
        protein: '9g',
        carbs: '42g',
        fat: '20g',
      },
      winePairing: 'Vin Santo or Marsala',
    },
    {
      id: '13',
      dishName: 'Pork Belly',
      description: 'Crispy pork belly with apple compote, creamy polenta, and crackling',
      course: 'Mains',
      price: 445,
      image: 'https://images.unsplash.com/photo-1749294241404-916a9a7f3d44?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb3JrJTIwYmVsbHklMjBmaW5lJTIwZGluaW5nfGVufDF8fHx8MTc2MDk1NDcwN3ww&ixlib=rb-4.1.0&q=80&w=1080',
      prepTime: '55 min',
      servings: 1,
      allergens: ['Dairy'],
      nutritionalInfo: {
        calories: 680,
        protein: '38g',
        carbs: '40g',
        fat: '38g',
      },
      winePairing: 'Riesling or Chardonnay',
    },
    {
      id: '14',
      dishName: 'Wild Mushroom Risotto',
      description: 'Creamy arborio rice with porcini, shiitake mushrooms, truffle oil, and parmesan',
      course: 'Mains',
      price: 365,
      image: 'https://images.unsplash.com/photo-1624968814155-236efede1cec?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyaXNvdHRvJTIwbXVzaHJvb20lMjBnb3VybWV0fGVufDF8fHx8MTc2MDk1NDcwOHww&ixlib=rb-4.1.0&q=80&w=1080',
      prepTime: '35 min',
      servings: 1,
      allergens: ['Dairy', 'Gluten'],
      nutritionalInfo: {
        calories: 465,
        protein: '16g',
        carbs: '62g',
        fat: '18g',
      },
      winePairing: 'Pinot Grigio or White Burgundy',
    },
  ]);

  const addMenuItem = (item: Omit<MenuItem, 'id'>) => {
    const newItem: MenuItem = {
      ...item,
      id: Date.now().toString(),
    };
    setMenuItems([...menuItems, newItem]);
    setCurrentScreen('home');
  };

  const removeMenuItem = (id: string) => {
    setMenuItems(menuItems.filter(item => item.id !== id));
    if (selectedMenuItem?.id === id) {
      setSelectedMenuItem(null);
      setCurrentScreen('home');
    }
  };

  const viewDetails = (item: MenuItem) => {
    setSelectedMenuItem(item);
    setCurrentScreen('details');
  };

  const toggleFavorite = (id: string) => {
    const newFavorites = new Set(favorites);
    if (newFavorites.has(id)) {
      newFavorites.delete(id);
    } else {
      newFavorites.add(id);
    }
    setFavorites(newFavorites);
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'home':
        return (
          <HomeScreen
            menuItems={menuItems}
            favorites={favorites}
            onAddNew={() => setCurrentScreen('add')}
            onViewDetails={viewDetails}
            onToggleFavorite={toggleFavorite}
            onFilter={() => setCurrentScreen('filter')}
          />
        );
      case 'add':
        return (
          <AddMenuItem
            onAdd={addMenuItem}
            onCancel={() => setCurrentScreen('home')}
          />
        );
      case 'details':
        return selectedMenuItem ? (
          <MenuItemDetails
            item={selectedMenuItem}
            isFavorite={favorites.has(selectedMenuItem.id)}
            onBack={() => setCurrentScreen('home')}
            onToggleFavorite={toggleFavorite}
            onRemove={removeMenuItem}
          />
        ) : null;
      case 'filter':
        return (
          <FilterMenu
            menuItems={menuItems}
            favorites={favorites}
            onBack={() => setCurrentScreen('home')}
            onViewDetails={viewDetails}
            onToggleFavorite={toggleFavorite}
          />
        );
      case 'search':
        return (
          <SearchScreen
            menuItems={menuItems}
            favorites={favorites}
            onViewDetails={viewDetails}
            onToggleFavorite={toggleFavorite}
          />
        );
      case 'favorites':
        return (
          <FavoritesScreen
            menuItems={menuItems.filter(item => favorites.has(item.id))}
            favorites={favorites}
            onViewDetails={viewDetails}
            onToggleFavorite={toggleFavorite}
          />
        );
      case 'settings':
        return (
          <SettingsScreen
            settings={settings}
            onUpdateSettings={setSettings}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-orange-50">
      {renderScreen()}
      <BottomNavigation
        currentScreen={currentScreen}
        onNavigate={(screen) => setCurrentScreen(screen as any)}
        favoriteCount={favorites.size}
      />
    </div>
  );
}
    