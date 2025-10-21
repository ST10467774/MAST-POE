import { useState } from 'react';

function HomeScreen(props: {
  menuItems: MenuItem[];
  favorites: Set<string>;
  onAddNew: () => void;
  onViewDetails: (item: MenuItem) => void;
  onToggleFavorite: (id: string) => void;
  onFilter: () => void;
}) {
  const { menuItems, favorites, onAddNew, onViewDetails, onToggleFavorite, onFilter } = props;
  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Menu</h1>
        <div>
          <button onClick={onFilter} className="mr-2 px-3 py-1 bg-gray-200 rounded">Filter</button>
          <button onClick={onAddNew} className="px-3 py-1 bg-blue-500 text-white rounded">Add</button>
        </div>
      </div>
      <ul>
        {menuItems.map(item => (
          <li key={item.id} className="mb-3 p-3 border rounded">
            <div className="flex justify-between">
              <div>
                <div className="font-semibold">{item.dishName}</div>
                <div className="text-sm text-gray-600">{item.course} • {item.price}</div>
              </div>
              <div>
                <button onClick={() => onToggleFavorite(item.id)} className="mr-2">
                  {favorites.has(item.id) ? '★' : '☆'}
                </button>
                <button onClick={() => onViewDetails(item)} className="px-2 py-1 bg-gray-100 rounded">View</button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
function AddMenuItem(props: { onAdd: (item: any) => void; onCancel: () => void }) {
  const { onAdd, onCancel } = props;
  const [dishName, setDishName] = useState('');
  const [description, setDescription] = useState('');
  const [course, setCourse] = useState('Mains');
  const [price, setPrice] = useState<number | string>(0);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const item = {
      dishName,
      description,
      course,
      price: Number(price) || 0,
      image: '',
      prepTime: '',
      servings: 1,
      allergens: [] as string[],
      nutritionalInfo: { calories: 0, protein: '', carbs: '', fat: '' },
    };
    onAdd(item);
  };

  return (
    <div className="p-4 max-w-md">
      <h2 className="text-xl font-semibold mb-2">Add Menu Item</h2>
      <form onSubmit={handleSubmit} className="space-y-2">
        <div>
          <label className="block text-sm">Dish Name</label>
          <input value={dishName} onChange={e => setDishName(e.target.value)} className="w-full border rounded px-2 py-1" />
        </div>
        <div>
          <label className="block text-sm">Description</label>
          <input value={description} onChange={e => setDescription(e.target.value)} className="w-full border rounded px-2 py-1" />
        </div>
        <div>
          <label className="block text-sm">Course</label>
          <select value={course} onChange={e => setCourse(e.target.value)} className="w-full border rounded px-2 py-1">
            <option>Mains</option>
            <option>Starters</option>
            <option>Dessert</option>
          </select>
        </div>
        <div>
          <label className="block text-sm">Price</label>
          <input type="number" value={price} onChange={e => setPrice(e.target.value)} className="w-full border rounded px-2 py-1" />
        </div>
        <div className="flex justify-end space-x-2 pt-2">
          <button type="button" onClick={onCancel} className="px-3 py-1 bg-gray-200 rounded">Cancel</button>
          <button type="submit" className="px-3 py-1 bg-blue-500 text-white rounded">Add</button>
        </div>
      </form>
    </div>
  );
}
function MenuItemDetails(props: {
  item: MenuItem;
  isFavorite: boolean;
  onBack: () => void;
  onToggleFavorite: (id: string) => void;
  onRemove: (id: string) => void;
}) {
  const { item, isFavorite, onBack, onToggleFavorite, onRemove } = props;
  return (
    <div className="p-4 max-w-2xl">
      <button onClick={onBack} className="mb-4 px-3 py-1 bg-gray-200 rounded">Back</button>
      <div className="bg-white p-4 rounded shadow">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-xl font-semibold">{item.dishName}</h2>
            <p className="text-sm text-gray-600">{item.course} • {item.price}</p>
            <p className="mt-2">{item.description}</p>
          </div>
          <div className="ml-4">
            <button onClick={() => onToggleFavorite(item.id)} className="text-2xl">
              {isFavorite ? '★' : '☆'}
            </button>
          </div>
        </div>
        <div className="mt-4 flex space-x-2">
          <button onClick={() => onRemove(item.id)} className="px-3 py-1 bg-red-500 text-white rounded">Remove</button>
          <button onClick={onBack} className="px-3 py-1 bg-gray-200 rounded">Close</button>
        </div>
      </div>
    </div>
  );
}
function FilterMenu(props: {
  menuItems: any[];
  favorites: Set<string>;
  onBack: () => void;
  onViewDetails: (item: any) => void;
  onToggleFavorite: (id: string) => void;
}) {
  const { menuItems, favorites, onBack, onViewDetails, onToggleFavorite } = props;
  return (
    <div className="p-4 max-w-2xl">
      <button onClick={onBack} className="mb-4 px-3 py-1 bg-gray-200 rounded">Back</button>
      <h2 className="text-xl font-semibold mb-2">Filter Menu</h2>
      <div>
        {menuItems.length === 0 ? (
          <p className="text-sm text-gray-600">No items available</p>
        ) : (
          <ul>
            {menuItems.map((item: any) => (
              <li key={item.id} className="mb-3 p-3 border rounded flex justify-between items-center">
                <div>
                  <div className="font-semibold">{item.dishName}</div>
                  <div className="text-sm text-gray-600">{item.course} • {item.price}</div>
                </div>
                <div>
                  <button onClick={() => onToggleFavorite(item.id)} className="mr-2">
                    {favorites.has(item.id) ? '★' : '☆'}
                  </button>
                  <button onClick={() => onViewDetails(item)} className="px-2 py-1 bg-gray-100 rounded">View</button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

// Inline fallback SearchScreen (used when ./components/SearchScreen is not present)
function SearchScreen(props: {
  menuItems: MenuItem[];
  favorites: Set<string>;
  onViewDetails: (item: MenuItem) => void;
  onToggleFavorite: (id: string) => void;
}) {
  const { menuItems, favorites, onViewDetails, onToggleFavorite } = props;
  return (
    <div className="p-4 max-w-2xl">
      <h2 className="text-xl font-semibold mb-2">Search</h2>
      <p className="text-sm text-gray-600">Search component not found; listing all items.</p>
      <ul>
        {menuItems.map(item => (
          <li key={item.id} className="mb-3 p-3 border rounded flex justify-between items-center">
            <div>
              <div className="font-semibold">{item.dishName}</div>
              <div className="text-sm text-gray-600">{item.course} • {item.price}</div>
            </div>
            <div>
              <button onClick={() => onToggleFavorite(item.id)} className="mr-2">
                {favorites.has(item.id) ? '★' : '☆'}
              </button>
              <button onClick={() => onViewDetails(item)} className="px-2 py-1 bg-gray-100 rounded">View</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
function FavoritesScreen(props: {
  menuItems: MenuItem[];
  favorites: Set<string>;
  onViewDetails: (item: MenuItem) => void;
  onToggleFavorite: (id: string) => void;
}) {
  const { menuItems, favorites, onViewDetails, onToggleFavorite } = props;
  return (
    <div className="p-4 max-w-2xl">
      <h2 className="text-xl font-semibold mb-2">Favorites</h2>
      {menuItems.length === 0 ? (
        <p className="text-sm text-gray-600">No favorite items</p>
      ) : (
        <ul>
          {menuItems.map(item => (
            <li key={item.id} className="mb-3 p-3 border rounded flex justify-between items-center">
              <div>
                <div className="font-semibold">{item.dishName}</div>
                <div className="text-sm text-gray-600">{item.course} • {item.price}</div>
              </div>
              <div>
                <button onClick={() => onToggleFavorite(item.id)} className="mr-2">
                  {favorites.has(item.id) ? '★' : '☆'}
                </button>
                <button onClick={() => onViewDetails(item)} className="px-2 py-1 bg-gray-100 rounded">View</button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
function SettingsScreen(props: {
  settings: { currency: string; notifications: boolean; dietaryPreferences: string[] };
  onUpdateSettings: (s: { currency: string; notifications: boolean; dietaryPreferences: string[] }) => void;
}) {
  const { settings, onUpdateSettings } = props;
  const [currency, setCurrency] = useState(settings.currency);
  const [notifications, setNotifications] = useState(settings.notifications);
  const [dietaryPreferences, setDietaryPreferences] = useState<string[]>(settings.dietaryPreferences || []);

  const togglePref = (pref: string) => {
    if (dietaryPreferences.includes(pref)) {
      setDietaryPreferences(dietaryPreferences.filter(p => p !== pref));
    } else {
      setDietaryPreferences([...dietaryPreferences, pref]);
    }
  };

  const handleSave = () => {
    onUpdateSettings({
      currency,
      notifications,
      dietaryPreferences,
    });
  };

  return (
    <div className="p-4 max-w-2xl">
      <h2 className="text-xl font-semibold mb-2">Settings</h2>
      <div className="space-y-3">
        <div>
          <label className="block text-sm mb-1">Currency</label>
          <select value={currency} onChange={e => setCurrency(e.target.value)} className="w-full border rounded px-2 py-1">
            <option value="ZAR">ZAR</option>
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
            <option value="GBP">GBP</option>
          </select>
        </div>

        <div>
          <label className="inline-flex items-center">
            <input type="checkbox" checked={notifications} onChange={e => setNotifications(e.target.checked)} className="form-checkbox mr-2" />
            <span className="text-sm">Enable Notifications</span>
          </label>
        </div>

        <div>
          <div className="block text-sm mb-1">Dietary Preferences</div>
          <div className="flex flex-col space-y-1">
            <label className="inline-flex items-center">
              <input type="checkbox" checked={dietaryPreferences.includes('Vegetarian')} onChange={() => togglePref('Vegetarian')} className="form-checkbox mr-2" />
              <span className="text-sm">Vegetarian</span>
            </label>
            <label className="inline-flex items-center">
              <input type="checkbox" checked={dietaryPreferences.includes('Vegan')} onChange={() => togglePref('Vegan')} className="form-checkbox mr-2" />
              <span className="text-sm">Vegan</span>
            </label>
            <label className="inline-flex items-center">
              <input type="checkbox" checked={dietaryPreferences.includes('Gluten-Free')} onChange={() => togglePref('Gluten-Free')} className="form-checkbox mr-2" />
              <span className="text-sm">Gluten-Free</span>
            </label>
            <label className="inline-flex items-center">
              <input type="checkbox" checked={dietaryPreferences.includes('Dairy-Free')} onChange={() => togglePref('Dairy-Free')} className="form-checkbox mr-2" />
              <span className="text-sm">Dairy-Free</span>
            </label>
          </div>
        </div>

        <div className="flex justify-end space-x-2 pt-2">
          <button type="button" onClick={handleSave} className="px-3 py-1 bg-blue-500 text-white rounded">Save</button>
        </div>
      </div>
    </div>
  );
}

/* Inline BottomNavigation component to avoid external module dependency */
type NavScreen = 'home' | 'add' | 'details' | 'filter' | 'search' | 'favorites' | 'settings';

function BottomNavigation(props: {
  currentScreen: NavScreen;
  onNavigate: (screen: NavScreen) => void;
  favoriteCount: number;
}) {
  const { currentScreen, onNavigate, favoriteCount } = props;

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t">
      <div className="max-w-4xl mx-auto flex justify-around py-2">
        <button
          onClick={() => onNavigate('home')}
          className={currentScreen === 'home' ? 'font-bold' : ''}
        >
          Home
        </button>
        <button
          onClick={() => onNavigate('search')}
          className={currentScreen === 'search' ? 'font-bold' : ''}
        >
          Search
        </button>
        <button
          onClick={() => onNavigate('favorites')}
          className={currentScreen === 'favorites' ? 'font-bold' : ''}
        >
          Favorites ({favoriteCount})
        </button>
        <button
          onClick={() => onNavigate('add')}
          className={currentScreen === 'add' ? 'font-bold' : ''}
        >
          Add
        </button>
        <button
          onClick={() => onNavigate('settings')}
          className={currentScreen === 'settings' ? 'font-bold' : ''}
        >
          Settings
        </button>
      </div>
    </nav>
  );
}

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
