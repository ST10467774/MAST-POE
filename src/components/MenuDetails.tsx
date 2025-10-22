import React from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Image, Alert } from 'react-native';
import { useThemeContext } from '../../styles/ThemeContext';
import { colors } from '../../styles/colors';
import Icon from 'react-native-vector-icons/Feather';

interface MenuItem {
  id: string;
  image: string;
  dishName: string;
  course: string;
  prepTime: string;
  servings: number;
  price: number;
  nutritionalInfo: {
    calories: number | string;
    protein: number | string;
    carbs: number | string;
    fat: number | string;
  };
  description: string;
  winePairing?: string;
  allergens: string[];
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

interface MenuItemDetailsProps {
  item: MenuItem;
  isFavorite: boolean;
  onBack: () => void;
  onToggleFavorite: (id: string) => void;
  onRemove: (id: string) => void;
}

export function MenuItemDetails({ item, isFavorite, onBack, onToggleFavorite, onRemove }: MenuItemDetailsProps) {
  const { colorScheme } = useThemeContext();
  const styles = getStyles(colorScheme);

  const handleRemove = () => {
    Alert.alert(
      'Remove Item',
      'Are you sure you want to remove this item?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Remove', style: 'destructive', onPress: () => onRemove(item.id) },
      ]
    );
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.heroContainer}>
        <ImageWithFallback src={item.image} style={styles.heroImage} />
        <View style={styles.heroOverlay} />
        <View style={styles.topBar}>
          <TouchableOpacity onPress={onBack} style={styles.iconButton}>
            <Icon name="arrow-left" size={24} color={colors[colorScheme].text} />
          </TouchableOpacity>
          <View style={styles.topBarActions}>
            <TouchableOpacity onPress={() => onToggleFavorite(item.id)} style={styles.iconButton}>
              <Icon name="heart" size={24} color={isFavorite ? 'red' : colors[colorScheme].text} />
            </TouchableOpacity>
            <TouchableOpacity onPress={handleRemove} style={styles.iconButton}>
              <Icon name="trash-2" size={24} color="red" />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.heroInfo}>
          <View style={styles.courseBadge}>
            <Text style={styles.courseBadgeText}>{item.course}</Text>
          </View>
          <Text style={styles.dishName}>{item.dishName}</Text>
          <View style={styles.detailsRow}>
            <View style={styles.detailItem}>
              <Icon name="clock" size={16} color="white" />
              <Text style={styles.detailText}>{item.prepTime}</Text>
            </View>
            <View style={styles.detailItem}>
              <Icon name="users" size={16} color="white" />
              <Text style={styles.detailText}>{item.servings} serving{item.servings > 1 ? 's' : ''}</Text>
            </View>
          </View>
        </View>
      </View>

      <View style={styles.content}>
        <View style={styles.priceSection}>
          <View>
            <Text style={styles.priceLabel}>Price per serving</Text>
            <Text style={styles.price}>R{item.price.toFixed(2)}</Text>
          </View>
          <View style={styles.caloriesSection}>
            <Icon name="flame" size={20} color={colors[colorScheme].primary} />
            <View>
              <Text style={styles.caloriesLabel}>Calories</Text>
              <Text style={styles.caloriesValue}>{item.nutritionalInfo.calories}</Text>
            </View>
          </View>
        </View>

        <View style={styles.separator} />

        <View>
          <Text style={styles.sectionTitle}>Description</Text>
          <Text style={styles.description}>{item.description}</Text>
        </View>

        {item.winePairing && (
          <View style={styles.winePairingCard}>
            <Icon name="wine" size={24} color={colors[colorScheme].primary} />
            <View>
              <Text style={styles.winePairingLabel}>Recommended Wine Pairing</Text>
              <Text style={styles.winePairingValue}>{item.winePairing}</Text>
            </View>
          </View>
        )}

        {item.allergens.length > 0 && (
          <View>
            <Text style={styles.sectionTitle}>Allergens</Text>
            <View style={styles.badgeContainer}>
              {item.allergens.map((allergen) => (
                <View key={allergen} style={styles.allergenBadge}>
                  <Text style={styles.allergenBadgeText}>{allergen}</Text>
                </View>
              ))}
            </View>
          </View>
        )}

        <View>
          <Text style={styles.sectionTitle}>Nutritional Information</Text>
          <View style={styles.nutritionCard}>
            <View style={styles.nutritionGrid}>
              <View style={styles.nutritionItem}>
                <Text style={styles.nutritionValue}>{item.nutritionalInfo.calories}</Text>
                <Text style={styles.nutritionLabel}>Calories</Text>
              </View>
              <View style={styles.nutritionItem}>
                <Text style={styles.nutritionValue}>{item.nutritionalInfo.protein}</Text>
                <Text style={styles.nutritionLabel}>Protein</Text>
              </View>
              <View style={styles.nutritionItem}>
                <Text style={styles.nutritionValue}>{item.nutritionalInfo.carbs}</Text>
                <Text style={styles.nutritionLabel}>Carbs</Text>
              </View>
              <View style={styles.nutritionItem}>
                <Text style={styles.nutritionValue}>{item.nutritionalInfo.fat}</Text>
                <Text style={styles.nutritionLabel}>Fat</Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const getStyles = (colorScheme: 'light' | 'dark') => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors[colorScheme].background,
  },
  heroContainer: {
    height: 320,
  },
  heroImage: {
    width: '100%',
    height: '100%',
  },
  heroOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  topBar: {
    position: 'absolute',
    top: 40,
    left: 16,
    right: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  topBarActions: {
    flexDirection: 'row',
    gap: 12,
  },
  iconButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    padding: 8,
    borderRadius: 20,
  },
  heroInfo: {
    position: 'absolute',
    bottom: 24,
    left: 24,
    right: 24,
  },
  courseBadge: {
    backgroundColor: colors[colorScheme].primary,
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 6,
    alignSelf: 'flex-start',
    marginBottom: 12,
  },
  courseBadgeText: {
    color: colors.dark.text,
    fontWeight: 'bold',
  },
  dishName: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 8,
  },
  detailsRow: {
    flexDirection: 'row',
    gap: 16,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  detailText: {
    color: 'white',
    fontSize: 14,
  },
  content: {
    padding: 24,
    gap: 24,
  },
  priceSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  priceLabel: {
    fontSize: 14,
    color: colors[colorScheme].text,
    marginBottom: 4,
  },
  price: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors[colorScheme].primary,
  },
  caloriesSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: colors[colorScheme].card,
    padding: 12,
    borderRadius: 12,
  },
  caloriesLabel: {
    fontSize: 12,
    color: colors[colorScheme].text,
  },
  caloriesValue: {
    fontSize: 14,
    fontWeight: 'bold',
    color: colors[colorScheme].text,
  },
  separator: {
    height: 1,
    backgroundColor: colors[colorScheme].border,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors[colorScheme].text,
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    color: colors[colorScheme].text,
  },
  winePairingCard: {
    backgroundColor: colors[colorScheme].card,
    borderWidth: 1,
    borderColor: colors[colorScheme].border,
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  winePairingLabel: {
    fontSize: 14,
    color: colors[colorScheme].text,
  },
  winePairingValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors[colorScheme].text,
  },
  badgeContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  allergenBadge: {
    backgroundColor: '#fee2e2',
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 16,
  },
  allergenBadgeText: {
    color: '#b91c1c',
  },
  nutritionCard: {
    backgroundColor: colors[colorScheme].card,
    borderWidth: 1,
    borderColor: colors[colorScheme].border,
    borderRadius: 12,
    padding: 16,
  },
  nutritionGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  nutritionItem: {
    width: '48%',
    backgroundColor: colors[colorScheme].background,
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 8,
  },
  nutritionValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors[colorScheme].primary,
    marginBottom: 4,
  },
  nutritionLabel: {
    fontSize: 12,
    color: colors[colorScheme].text,
  },
});