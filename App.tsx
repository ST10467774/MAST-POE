import React, { useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  TextInput,
  ScrollView,
  StyleSheet,
  Image,
  Alert,
  Platform,
} from 'react-native';
import { ThemeProvider, useThemeContext } from './styles/ThemeContext';
import { colors } from './styles/colors';
import { HomeScreen } from './src/components/HomeScreen';
import { AddMenuItem } from './src/components/AddMenuItems';
import { MenuItemDetails } from './src/components/MenuDetails';
import { FavoritesScreen } from './src/components/FavoritesScreen';
import { FilterMenu } from './src/components/FilterMenu';
import { SearchScreen } from './src/components/SearchScreen';
import { SettingsScreen } from './src/components/SettingsScreen';
import { BottomNavigation } from './src/components/BottomNavigation';

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
    calories: number | string;
    protein: string | number;
    carbs: string | number;
    fat: string | number;
  };
  winePairing?: string;
}

type NavScreen = 'home' | 'add' | 'details' | 'filter' | 'search' | 'favorites' | 'settings';

const Main = () => {
  const { colorScheme } = useThemeContext();
  const [currentScreen, setCurrentScreen] = useState<NavScreen>('home');
  const [selectedMenuItem, setSelectedMenuItem] = useState<MenuItem | null>(null);
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [settings, setSettings] = useState({ currency: 'ZAR', notifications: true, dietaryPreferences: [] as string[] });

  const [menuItems, setMenuItems] = useState<MenuItem[]>([
    {
      id: '1',
      dishName: 'Pan-Seared Kingklip',
      description: 'Delicate kingklip fillet with lemon butter sauce, seasonal vegetables, and herb-roasted potatoes',
      course: 'Mains',
      price: 385,
      image: 'https://images.unsplash.com/photo-1758384077218-fa3c83d112e8?auto=format&fit=crop&w=1080&q=80',
      prepTime: '35 min',
      servings: 1,
      allergens: ['Fish', 'Dairy'],
      nutritionalInfo: { calories: 420, protein: '38g', carbs: '22g', fat: '18g' },
      winePairing: 'Chardonnay or Sauvignon Blanc',
    },
  ]);

  const addMenuItem = (item: Omit<MenuItem, 'id'>) => {
    const newItem: MenuItem = { ...item, id: Date.now().toString() };
    setMenuItems((s) => [...s, newItem]);
    setCurrentScreen('home');
  };

  const removeMenuItem = (id: string) => {
    setMenuItems((s) => s.filter((it) => it.id !== id));
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
    setFavorites((prev) => {
      const copy = new Set(prev);
      if (copy.has(id)) copy.delete(id);
      else copy.add(id);
      return copy;
    });
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
        return <AddMenuItem onAdd={addMenuItem} onCancel={() => setCurrentScreen('home')} />;
      case 'details':
        return selectedMenuItem ? (
          <MenuItemDetails item={selectedMenuItem} isFavorite={favorites.has(selectedMenuItem.id)} onBack={() => setCurrentScreen('home')} onToggleFavorite={toggleFavorite} onRemove={removeMenuItem} />
        ) : null;
      case 'favorites':
        return (
          <FavoritesScreen
            menuItems={menuItems.filter(item => favorites.has(item.id))}
            favorites={favorites}
            onViewDetails={viewDetails}
            onToggleFavorite={toggleFavorite}
          />
        );
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

  const styles = getStyles(colorScheme);

  return (
    <View style={styles.appContainer}>
      {renderScreen()}
      <BottomNavigation currentScreen={currentScreen} onNavigate={(s) => setCurrentScreen(s as NavScreen)} favoriteCount={favorites.size} />
    </View>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <Main />
    </ThemeProvider>
  );
}

const getStyles = (colorScheme: 'light' | 'dark') => StyleSheet.create({
  appContainer: { flex: 1, backgroundColor: colors[colorScheme].background },
  screen: { flex: 1 },
  header: { padding: 12, backgroundColor: colors[colorScheme].primary, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  headerTitle: { fontSize: 20, fontWeight: '700', color: colors[colorScheme].text },
  headerActions: { flexDirection: 'row', alignItems: 'center', gap: Platform.OS === 'web' ? undefined : 8 },
  headerButton: { padding: 8, backgroundColor: colors[colorScheme].card, borderRadius: 6, marginLeft: 8 },
  addButton: { backgroundColor: colors[colorScheme].primary, paddingHorizontal: 12 },
  bottomNav: { height: 56, borderTopWidth: 1, borderTopColor: colors[colorScheme].border, flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', backgroundColor: colors[colorScheme].card },
  navItem: { padding: 8 },
  navItemActive: { fontWeight: '700', color: colors[colorScheme].primary },
  card: { flexDirection: 'row', padding: 12, marginVertical: 6, backgroundColor: colors[colorScheme].card, borderRadius: 8, elevation: 2, shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 6, alignItems: 'center' },
  cardTitle: { fontSize: 16, fontWeight: '600', color: colors[colorScheme].text },
  cardMeta: { color: '#6b7280' },
  cardActions: { marginLeft: 12, alignItems: 'center', justifyContent: 'center' },
  iconButton: { padding: 8, borderRadius: 6, backgroundColor: colors[colorScheme].card },
  formGroup: { marginBottom: 12 },
  label: { marginBottom: 6, fontSize: 12, color: '#374151' },
  input: { borderWidth: 1, borderColor: colors[colorScheme].border, borderRadius: 8, padding: 10, backgroundColor: colors[colorScheme].card, color: colors[colorScheme].text },
  primaryButton: { backgroundColor: colors[colorScheme].primary, padding: 12, alignItems: 'center', borderRadius: 8 },
  outlineButton: { borderWidth: 1, borderColor: colors[colorScheme].border, padding: 12, alignItems: 'center', borderRadius: 8 },
  footerClose: { padding: 12, alignItems: 'center' },
});