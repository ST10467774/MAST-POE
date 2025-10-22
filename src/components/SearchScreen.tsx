import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Image, FlatList, TextInput } from 'react-native';
import { useThemeContext } from '../../styles/ThemeContext';
import { colors } from '../../styles/colors';
import Icon from 'react-native-vector-icons/Feather';

interface MenuItem {
  id: string;
  dishName: string;
  description: string;
  course: string;
  image: string;
  price: number;
  prepTime: string;
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

interface SearchScreenProps {
  menuItems: MenuItem[];
  favorites: Set<string>;
  onViewDetails: (item: MenuItem) => void;
  onToggleFavorite: (id: string) => void;
}

export function SearchScreen({ menuItems, favorites, onViewDetails, onToggleFavorite }: SearchScreenProps) {
  const { colorScheme } = useThemeContext();
  const styles = getStyles(colorScheme);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredItems = menuItems.filter(item =>
    item.dishName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.course.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
        <Icon name="search" size={28} color={colors[colorScheme].text} />
        <View>
          <Text style={styles.headerTitle}>Search Menu</Text>
          <Text style={styles.headerSubtitle}>Find your perfect dish</Text>
        </View>
      </View>

      <View style={styles.searchContainer}>
        <View style={styles.searchInputContainer}>
          <Icon name="search" size={20} color={colors[colorScheme].primary} style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholder="Search dishes, courses..."
            placeholderTextColor={colors[colorScheme].text}
          />
          {searchQuery ? (
            <TouchableOpacity onPress={() => setSearchQuery('')} style={styles.clearIcon}>
              <Icon name="x" size={16} color={colors[colorScheme].text} />
            </TouchableOpacity>
          ) : null}
        </View>
        {searchQuery && (
          <Text style={styles.resultsText}>
            {filteredItems.length} result{filteredItems.length !== 1 ? 's' : ''} found
          </Text>
        )}
      </View>

      <View style={styles.content}>
        {!searchQuery ? (
          <View style={styles.emptyContainer}>
            <Icon name="search" size={64} color={colors[colorScheme].primary} />
            <Text style={styles.emptyText}>Start searching</Text>
            <Text style={styles.emptySubtitle}>Search by dish name, description, or course</Text>
          </View>
        ) : filteredItems.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Icon name="search" size={64} color={colors[colorScheme].border} />
            <Text style={styles.emptyText}>No results found</Text>
            <Text style={styles.emptySubtitle}>Try a different search term</Text>
          </View>
        ) : (
          <FlatList
            data={filteredItems}
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
  container: { flex: 1, backgroundColor: colors[colorScheme].background },
  header: { backgroundColor: colors[colorScheme].primary, padding: 24, flexDirection: 'row', alignItems: 'center', gap: 12 },
  headerTitle: { fontSize: 24, fontWeight: 'bold', color: colors[colorScheme].text },
  headerSubtitle: { fontSize: 14, color: colors[colorScheme].text },
  searchContainer: { padding: 24 },
  searchInputContainer: { flexDirection: 'row', alignItems: 'center', backgroundColor: colors[colorScheme].card, borderRadius: 12, borderWidth: 1, borderColor: colors[colorScheme].border },
  searchIcon: { padding: 12 },
  searchInput: { flex: 1, paddingVertical: 12, color: colors[colorScheme].text },
  clearIcon: { padding: 12 },
  resultsText: { fontSize: 14, color: colors[colorScheme].text, marginTop: 12 },
  content: { paddingHorizontal: 24 },
  emptyContainer: { alignItems: 'center', paddingVertical: 64 },
  emptyText: { fontSize: 16, color: colors[colorScheme].text, marginTop: 16 },
  emptySubtitle: { fontSize: 14, color: colors[colorScheme].text, marginTop: 4 },
  card: { backgroundColor: colors[colorScheme].card, borderRadius: 12, borderWidth: 1, borderColor: colors[colorScheme].border, overflow: 'hidden', marginBottom: 16, width: '48%' },
  cardImageContainer: { position: 'relative', aspectRatio: 1 },
  cardImage: { width: '100%', height: '100%' },
  favoriteButton: { position: 'absolute', top: 8, right: 8, backgroundColor: 'rgba(255, 255, 255, 0.8)', padding: 4, borderRadius: 16 },
  courseBadge: { position: 'absolute', bottom: 8, left: 8, backgroundColor: colors[colorScheme].primary, paddingVertical: 2, paddingHorizontal: 8, borderRadius: 6 },
  courseBadgeText: { color: colors.dark.text, fontSize: 12, fontWeight: 'bold' },
  cardContent: { padding: 12 },
  cardTitle: { fontSize: 14, fontWeight: 'bold', color: colors[colorScheme].text, marginBottom: 4 },
  cardDescription: { fontSize: 12, color: colors[colorScheme].text, marginBottom: 8 },
  cardFooter: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  price: { fontSize: 14, fontWeight: 'bold', color: colors[colorScheme].primary },
  prepTime: { fontSize: 12, color: colors[colorScheme].text },
});