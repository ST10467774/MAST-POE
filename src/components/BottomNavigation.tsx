import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { useThemeContext } from '../../styles/ThemeContext';
import { colors } from '../../styles/colors';

interface BottomNavigationProps {
  currentScreen: string;
  onNavigate: (screen: string) => void;
  favoriteCount: number;
}

export function BottomNavigation({ currentScreen, onNavigate, favoriteCount }: BottomNavigationProps) {
  const { colorScheme } = useThemeContext();
  const styles = getStyles(colorScheme);

  const navItems = [
    { id: 'home', icon: 'home', label: 'Home' },
    { id: 'search', icon: 'search', label: 'Search' },
    { id: 'favorites', icon: 'heart', label: 'Favorites', count: favoriteCount },
    { id: 'settings', icon: 'settings', label: 'Settings' },
  ];

  return (
    <View style={styles.container}>
      {navItems.map((item) => {
        const isActive = currentScreen === item.id;
        return (
          <TouchableOpacity key={item.id} style={styles.navItem} onPress={() => onNavigate(item.id)}>
            <Icon name={item.icon} size={24} color={isActive ? colors[colorScheme].primary : colors[colorScheme].text} />
            <Text style={[styles.label, isActive && styles.activeLabel]}>{item.label}</Text>
            {item.count !== undefined && item.count > 0 && (
              <View style={styles.badge}>
                <Text style={styles.badgeText}>{item.count}</Text>
              </View>
            )}
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const getStyles = (colorScheme: 'light' | 'dark') => StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: colors[colorScheme].card,
    borderTopWidth: 1,
    borderTopColor: colors[colorScheme].border,
    height: 60,
  },
  navItem: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  label: {
    fontSize: 12,
    color: colors[colorScheme].text,
  },
  activeLabel: {
    color: colors[colorScheme].primary,
  },
  badge: {
    position: 'absolute',
    top: -4,
    right: 10,
    backgroundColor: 'red',
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
});