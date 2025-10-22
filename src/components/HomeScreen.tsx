import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Image, FlatList } from 'react-native';
import { useThemeContext } from '../../styles/ThemeContext';
import { colors } from '../../styles/colors';
import Icon from 'react-native-vector-icons/Feather';

interface MenuItem {
  id: string;
  dishName: string;
  price: number;
  image?: string;
  description?: string;
  course?: string;
  prepTime?: string;
}

const DEFAULT_PLACEHOLDER = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="400" height="400"><rect fill="%23f3f4f6" width="100%" height="100%"/><text x="50%" y="50%" fill="%23909ca3" font-family="Arial" font-size="24" text-anchor="middle" dy=".3em">No image</text></svg>';

type ImageWithFallbackProps = {
  src?: string | undefined;
  alt?: string;
  style?: any;
  fallback?: string;
};

function ImageWithFallback({ src, alt, style, fallback }: ImageWithFallbackProps) {
  const [currentSrc, setCurrentSrc] = useState<{ uri: string } | null>(src ? { uri: src } : null);
  const handleError = () => {
    const next = fallback || DEFAULT_PLACEHOLDER;
    if (currentSrc?.uri !== next) setCurrentSrc({ uri: next });
  };
  return <Image source={currentSrc} style={style} onError={handleError} />;
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
  const { colorScheme } = useThemeContext();
  const styles = getStyles(colorScheme);

  const averagePrice = menuItems.length > 0
    ? menuItems.reduce((sum, item) => sum + item.price, 0) / menuItems.length
    : 0;

  const featuredItems = menuItems;

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
        <View style={styles.headerLeft}>
          <Icon name="coffee" size={28} color={colors[colorScheme].text} />
          <View>
            <Text style={styles.headerTitle}>Chef Christoffel</Text>
            <Text style={styles.headerSubtitle}>Private Dining Experiences</Text>
          </View>
        </View>
        <TouchableOpacity onPress={onFilter}>
          <Icon name="sliders" size={20} color={colors[colorScheme].text} />
        </TouchableOpacity>
      </View>

      <View style={styles.statsContainer}>
        <View style={styles.statCard}>
          <Text style={styles.statLabel}>Total Dishes</Text>
          <Text style={styles.statValue}>{menuItems.length}</Text>
        </View>
        <View style={styles.statCard}>
          <View style={styles.statLabelContainer}>
            <Icon name="trending-up" size={16} color={colors[colorScheme].primary} />
            <Text style={styles.statLabel}>Avg. Price</Text>
          </View>
          <Text style={styles.statValue}>R{averagePrice.toFixed(0)}</Text>
        </View>
      </View>

      <View style={styles.menuSection}>
        <View style={styles.menuHeader}>
          <View>
            <Text style={styles.menuTitle}>Featured Menu</Text>
            <Text style={styles.menuSubtitle}>Curated dining experiences</Text>
          </View>
          <TouchableOpacity style={styles.addButton} onPress={onAddNew}>
            <Icon name="plus" size={16} color={colors.dark.text} />
            <Text style={styles.addButtonText}>Add</Text>
          </TouchableOpacity>
        </View>

        {featuredItems.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Icon name="coffee" size={64} color={colors[colorScheme].primary} />
            <Text style={styles.emptyText}>No menu items yet</Text>
            <Text style={styles.emptySubtitle}>Start building your menu by adding items</Text>
            <TouchableOpacity style={styles.addButton} onPress={onAddNew}>
              <Icon name="plus" size={16} color={colors.dark.text} />
              <Text style={styles.addButtonText}>Add Menu Item</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <FlatList
            data={featuredItems}
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
    paddingBottom: 32,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerLeft: {
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
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 24,
    marginTop: -16,
  },
  statCard: {
    backgroundColor: colors[colorScheme].card,
    borderRadius: 12,
    padding: 16,
    flex: 1,
    marginHorizontal: 8,
    borderWidth: 1,
    borderColor: colors[colorScheme].border,
    alignItems: 'center',
  },
  statLabelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: colors[colorScheme].text,
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors[colorScheme].text,
  },
  menuSection: {
    padding: 24,
  },
  menuHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  menuTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors[colorScheme].text,
  },
  menuSubtitle: {
    fontSize: 14,
    color: colors[colorScheme].text,
  },
  addButton: {
    backgroundColor: colors[colorScheme].primary,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    gap: 4,
  },
  addButtonText: {
    color: colors.dark.text,
    fontWeight: 'bold',
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
    marginBottom: 16,
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