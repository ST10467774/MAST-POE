import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { useThemeContext } from '../../styles/ThemeContext';
import { colors } from '../../styles/colors';
import Icon from 'react-native-vector-icons/Feather';

interface MenuItem {
  id: string;
  dishName: string;
  description?: string;
  course: string;
  price: number;
  allergens: string[];
  image?: string;
  prepTime?: string;
}

interface FilterMenuProps {
  menuItems: MenuItem[];
  favorites: Set<string>;
  onBack: () => void;
  onViewDetails: (item: MenuItem) => void;
  onToggleFavorite: (id: string) => void;
}

export function FilterMenu({ menuItems, favorites, onBack, onViewDetails, onToggleFavorite }: FilterMenuProps) {
  const { colorScheme } = useThemeContext();
  const styles = getStyles(colorScheme);

  const [selectedCourse, setSelectedCourse] = useState<string>('All');
  const [priceRange, setPriceRange] = useState<number[]>([0, 1000]);
  const [selectedAllergens, setSelectedAllergens] = useState<string[]>([]);

  const courses = ['All', 'Starters', 'Mains', 'Dessert'];
  const allergens = ['Dairy', 'Eggs', 'Fish', 'Shellfish', 'Gluten', 'Nuts', 'Soy'];

  const toggleAllergen = (allergen: string) => {
    setSelectedAllergens(prev =>
      prev.includes(allergen)
        ? prev.filter(a => a !== allergen)
        : [...prev, allergen]
    );
  };

  const clearFilters = () => {
    setSelectedCourse('All');
    setPriceRange([0, 1000]);
    setSelectedAllergens([]);
  };

  const filteredItems = menuItems.filter(item => {
    const courseMatch = selectedCourse === 'All' || item.course === selectedCourse;
    const priceMatch = item.price >= priceRange[0] && item.price <= priceRange[1];
    const allergenMatch = selectedAllergens.length === 0 ||
      !item.allergens.some(a => selectedAllergens.includes(a));

    return courseMatch && priceMatch && allergenMatch;
  });

  const renderItem = ({ item }: { item: MenuItem }) => (
    <TouchableOpacity style={styles.card} onPress={() => onViewDetails(item)}>
      {/* ... card content ... */}
    </TouchableOpacity>
  );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
          <Icon name="arrow-left" size={24} color={colors[colorScheme].text} />
        </TouchableOpacity>
        <Icon name="sliders" size={28} color={colors[colorScheme].text} />
        <View>
          <Text style={styles.headerTitle}>Filter Menu</Text>
          <Text style={styles.headerSubtitle}>{filteredItems.length} items found</Text>
        </View>
      </View>
      <TouchableOpacity onPress={clearFilters} style={styles.clearButton}>
        <Text style={styles.clearButtonText}>Clear All Filters</Text>
      </TouchableOpacity>

      <View style={styles.content}>
        <View style={styles.filterCard}>
          <Text style={styles.filterTitle}>Course Type</Text>
          <View style={styles.badgeContainer}>
            {courses.map((course) => (
              <TouchableOpacity key={course} onPress={() => setSelectedCourse(course)} style={[styles.badge, selectedCourse === course && styles.activeBadge]}>
                <Text style={selectedCourse === course ? styles.activeBadgeText : styles.badgeText}>{course}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.filterCard}>
          <Text style={styles.filterTitle}>Price Range</Text>
          {/* Slider component needs to be implemented or replaced */}
          <View style={styles.priceRangeContainer}>
            <Text style={styles.priceText}>R{priceRange[0]}</Text>
            <Text style={styles.priceText}>to</Text>
            <Text style={styles.priceText}>R{priceRange[1]}</Text>
          </View>
        </View>

        <View style={styles.filterCard}>
          <Text style={styles.filterTitle}>Exclude Allergens</Text>
          <View style={styles.badgeContainer}>
            {allergens.map((allergen) => (
              <TouchableOpacity key={allergen} onPress={() => toggleAllergen(allergen)} style={[styles.badge, selectedAllergens.includes(allergen) && styles.activeAllergenBadge]}>
                <Text style={selectedAllergens.includes(allergen) ? styles.activeBadgeText : styles.allergenBadgeText}>{allergen}</Text>
              </TouchableOpacity>
            ))}
          </View>
          {selectedAllergens.length > 0 && (
            <Text style={styles.infoText}>Excluding items with: {selectedAllergens.join(', ')}</Text>
          )}
        </View>

        <View>
          <Text style={styles.resultsTitle}>Filtered Results ({filteredItems.length})</Text>
          {filteredItems.length === 0 ? (
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>No items match your filters</Text>
              <TouchableOpacity onPress={clearFilters} style={styles.clearButtonAlt}>
                <Text style={styles.clearButtonAltText}>Clear Filters</Text>
              </TouchableOpacity>
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
      </View>
    </ScrollView>
  );
}

const getStyles = (colorScheme: 'light' | 'dark') => StyleSheet.create({
  container: { flex: 1, backgroundColor: colors[colorScheme].background },
  header: { backgroundColor: colors[colorScheme].primary, padding: 24, flexDirection: 'row', alignItems: 'center', gap: 12 },
  backButton: { marginRight: 8 },
  headerTitle: { fontSize: 24, fontWeight: 'bold', color: colors[colorScheme].text },
  headerSubtitle: { fontSize: 14, color: colors[colorScheme].text },
  clearButton: { backgroundColor: 'rgba(255, 255, 255, 0.1)', borderWidth: 1, borderColor: 'rgba(255, 255, 255, 0.3)', padding: 8, borderRadius: 8, margin: 24, alignItems: 'center' },
  clearButtonText: { color: 'white', fontWeight: 'bold' },
  content: { paddingHorizontal: 24, gap: 24 },
  filterCard: { backgroundColor: colors[colorScheme].card, borderRadius: 12, padding: 16, borderWidth: 1, borderColor: colors[colorScheme].border },
  filterTitle: { fontSize: 18, fontWeight: 'bold', color: colors[colorScheme].text, marginBottom: 12 },
  badgeContainer: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  badge: { paddingVertical: 8, paddingHorizontal: 16, borderRadius: 20, borderWidth: 1, borderColor: colors[colorScheme].primary },
  activeBadge: { backgroundColor: colors[colorScheme].primary },
  badgeText: { color: colors[colorScheme].primary },
  activeBadgeText: { color: colors.dark.text },
  priceRangeContainer: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 12 },
  priceText: { fontSize: 16, color: colors[colorScheme].text },
  activeAllergenBadge: { backgroundColor: '#b91c1c' },
  allergenBadgeText: { color: '#b91c1c' },
  infoText: { fontSize: 12, color: colors[colorScheme].text, marginTop: 8 },
  resultsTitle: { fontSize: 18, fontWeight: 'bold', color: colors[colorScheme].text, marginBottom: 16 },
  emptyContainer: { alignItems: 'center', paddingVertical: 48 },
  emptyText: { fontSize: 16, color: colors[colorScheme].text, marginBottom: 16 },
  clearButtonAlt: { borderWidth: 1, borderColor: colors[colorScheme].primary, padding: 12, borderRadius: 8 },
  clearButtonAltText: { color: colors[colorScheme].primary, fontWeight: 'bold' },
  card: { flex: 1 },
});