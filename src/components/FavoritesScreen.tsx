import React from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Image, FlatList } from 'react-native';
import { useThemeContext } from '../../styles/ThemeContext';
import { colors } from '../../styles/colors';
import Icon from 'react-native-vector-icons/Feather';

interface MenuItem {
  id: string;
  image?: string;
  dishName: string;
  description?: string;
  price: number;
  prepTime?: string;
  course?: string;
}

const ImageWithFallback = ({ src, alt, style, ...props }: any) => {
  const placeholder =
    'data:image/svg+xml;utf8,' +
    encodeURIComponent(
      `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="600"><rect width="100%" height="100%" fill="#f3f4f6"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="#9ca3af" font-family="Arial, sans-serif" font-size="24">Image not available</text></svg>`
    );

  return (
    <Image
      source={{ uri: src || placeholder }}
      style={style}
      onError={(e) => {
        const t = e.nativeEvent.source as any;
        if (t.uri !== placeholder) {
          t.uri = placeholder;
        }
      }}
      {...props}
    />
  );
};

interface FavoritesScreenProps {
  menuItems: MenuItem[];
  favorites: Set<string>;
  onViewDetails: (item: MenuItem) => void;
  onToggleFavorite: (id: string) => void;
}

export function FavoritesScreen({ menuItems, favorites, onViewDetails, onToggleFavorite }: FavoritesScreenProps) {
  const { colorScheme } = useThemeContext();
  const styles = getStyles(colorScheme);

  const renderItem = ({ item }: { item: MenuItem }) => (
    <TouchableOpacity style={styles.card} onPress={() => onViewDetails(item)}>
      <View style={styles.cardImageContainer}>
        <ImageWithFallback src={item.image} style={styles.cardImage} />
        <TouchableOpacity
          style={styles.favoriteButton}
          onPress={(e) => {
            e.stopPropagation();
            onToggleFavorite(item.id);
          }}
        >
          <Icon name="heart" size={16} color={favorites.has(item.id) ? 'red' : colors[colorScheme].text} />
        </TouchableOpacity>
        <View style={styles.courseBadge}>
          <Text style={styles.courseBadgeText}>{item.course}</Text>
        </View>
      </View>
      <View style={styles.cardContent}>
        <Text style={styles.cardTitle}>{item.dishName}</Text>
        <Text style={styles.cardDescription} numberOfLines={2}>{item.description}</Text>
        <View style={styles.cardFooter}>
          <Text style={styles.price}>R{item.price.toFixed(2)}</Text>
          <Text style={styles.prepTime}>{item.prepTime}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Icon name="heart" size={28} color={colors[colorScheme].text} />
        <View>
          <Text style={styles.headerTitle}>Favorites</Text>
          <Text style={styles.headerSubtitle}>{menuItems.length} saved item{menuItems.length !== 1 ? 's' : ''}</Text>
        </View>
      </View>

      <View style={styles.content}>
        {menuItems.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Icon name="heart" size={64} color={colors[colorScheme].primary} />
            <Text style={styles.emptyText}>No favorites yet</Text>
            <Text style={styles.emptySubtitle}>Tap the heart icon on any dish to save it here</Text>
          </View>
        ) : (
          <FlatList
            data={menuItems}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            numColumns={2}
            columnWrapperStyle={{ justifyContent: 'space-between' }}
          />
        )}
      </View>
    </ScrollView>
  );
}

const getStyles = (colorScheme: 'light' | 'dark') => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors[colorScheme].background,
  },
  header: {
    backgroundColor: colors[colorScheme].primary,
    padding: 24,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors[colorScheme].text,
  },
  headerSubtitle: {
    fontSize: 14,
    color: colors[colorScheme].text,
  },
  content: {
    padding: 24,
  },
  emptyContainer: {
    alignItems: 'center',
    paddingVertical: 64,
  },
  emptyText: {
    fontSize: 16,
    color: colors[colorScheme].text,
    marginTop: 16,
  },
  emptySubtitle: {
    fontSize: 14,
    color: colors[colorScheme].text,
    marginTop: 4,
  },
  card: {
    backgroundColor: colors[colorScheme].card,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors[colorScheme].border,
    overflow: 'hidden',
    marginBottom: 16,
    width: '48%',
  },
  cardImageContainer: {
    position: 'relative',
    aspectRatio: 1,
  },
  cardImage: {
    width: '100%',
    height: '100%',
  },
  favoriteButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    padding: 4,
    borderRadius: 16,
  },
  courseBadge: {
    position: 'absolute',
    bottom: 8,
    left: 8,
    backgroundColor: colors[colorScheme].primary,
    paddingVertical: 2,
    paddingHorizontal: 8,
    borderRadius: 6,
  },
  courseBadgeText: {
    color: colors.dark.text,
    fontSize: 12,
    fontWeight: 'bold',
  },
  cardContent: {
    padding: 12,
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: colors[colorScheme].text,
    marginBottom: 4,
  },
  cardDescription: {
    fontSize: 12,
    color: colors[colorScheme].text,
    marginBottom: 8,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  price: {
    fontSize: 14,
    fontWeight: 'bold',
    color: colors[colorScheme].primary,
  },
  prepTime: {
    fontSize: 12,
    color: colors[colorScheme].text,
  },
});