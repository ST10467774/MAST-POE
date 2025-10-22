import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, TextInput, Alert } from 'react-native';
import { useThemeContext } from '../../styles/ThemeContext';
import { colors } from '../../styles/colors';
import Icon from 'react-native-vector-icons/Feather';

interface AddMenuItemProps {
  onAdd: (item: {
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
  }) => void;
  onCancel: () => void;
}

export function AddMenuItem({ onAdd, onCancel }: AddMenuItemProps) {
  const { colorScheme } = useThemeContext();
  const styles = getStyles(colorScheme);

  const [dishName, setDishName] = useState('');
  const [description, setDescription] = useState('');
  const [course, setCourse] = useState('');
  const [price, setPrice] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [prepTime, setPrepTime] = useState('');
  const [servings, setServings] = useState('1');
  const [calories, setCalories] = useState('');
  const [protein, setProtein] = useState('');
  const [carbs, setCarbs] = useState('');
  const [fat, setFat] = useState('');
  const [winePairing, setWinePairing] = useState('');
  const [allergens, setAllergens] = useState<string[]>([]);

  const courses = ['Starters', 'Mains', 'Dessert'];
  const commonAllergens = ['Dairy', 'Eggs', 'Fish', 'Shellfish', 'Gluten', 'Nuts', 'Soy'];

  const toggleAllergen = (allergen: string) => {
    setAllergens(prev =>
      prev.includes(allergen)
        ? prev.filter(a => a !== allergen)
        : [...prev, allergen]
    );
  };

  const handleSubmit = () => {
    if (!dishName.trim() || !description.trim() || !course || !price || !prepTime) {
      Alert.alert('Validation Error', 'Please fill in all required fields');
      return;
    }

    const priceNumber = parseFloat(price);
    if (isNaN(priceNumber) || priceNumber <= 0) {
      Alert.alert('Validation Error', 'Please enter a valid price');
      return;
    }

    onAdd({
      dishName: dishName.trim(),
      description: description.trim(),
      course,
      price: priceNumber,
      image: imageUrl || 'https://images.unsplash.com/photo-1698653223689-24b0bfd5150b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGVmJTIwY29va2luZyUyMHJlc3RhdXJhbnR8ZW58MXx8fHwxNzYwOTE2Mjg2fDA&ixlib=rb-4.1.0&q=80&w=1080',
      prepTime: prepTime.trim(),
      servings: parseInt(servings) || 1,
      allergens,
      nutritionalInfo: {
        calories: parseInt(calories) || 0,
        protein: protein || '0g',
        carbs: carbs || '0g',
        fat: fat || '0g',
      },
      winePairing: winePairing.trim() || undefined,
    });
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onCancel} style={styles.backButton}>
          <Icon name="arrow-left" size={24} color={colors[colorScheme].text} />
        </TouchableOpacity>
        <Icon name="coffee" size={28} color={colors[colorScheme].text} />
        <View>
          <Text style={styles.headerTitle}>Add Menu Item</Text>
          <Text style={styles.headerSubtitle}>Create a new dish</Text>
        </View>
      </View>

      <View style={styles.form}>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Basic Information</Text>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Dish Name *</Text>
            <TextInput style={styles.input} value={dishName} onChangeText={setDishName} placeholder="e.g., Grilled Kingklip" />
          </View>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Description *</Text>
            <TextInput style={[styles.input, styles.textarea]} value={description} onChangeText={setDescription} placeholder="Describe your dish..." multiline />
          </View>
          <View style={styles.row}>
            <View style={[styles.inputGroup, { flex: 1 }]}>
              <Text style={styles.label}>Course *</Text>
              {/* Replace with a custom picker */}
              <TextInput style={styles.input} value={course} onChangeText={setCourse} placeholder="Select" />
            </View>
            <View style={[styles.inputGroup, { flex: 1 }]}>
              <Text style={styles.label}>Price (ZAR) *</Text>
              <View style={styles.priceInputContainer}>
                <Text style={styles.currencySymbol}>R</Text>
                <TextInput style={[styles.input, styles.priceInput]} value={price} onChangeText={setPrice} placeholder="0.00" keyboardType="numeric" />
              </View>
            </View>
          </View>
          <View style={styles.row}>
            <View style={[styles.inputGroup, { flex: 1 }]}>
              <Text style={styles.label}>Prep Time *</Text>
              <TextInput style={styles.input} value={prepTime} onChangeText={setPrepTime} placeholder="e.g., 30 min" />
            </View>
            <View style={[styles.inputGroup, { flex: 1 }]}>
              <Text style={styles.label}>Servings</Text>
              <TextInput style={styles.input} value={servings} onChangeText={setServings} keyboardType="numeric" />
            </View>
          </View>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Image URL</Text>
            <View style={styles.row}>
              <TextInput style={[styles.input, { flex: 1 }]} value={imageUrl} onChangeText={setImageUrl} placeholder="https://..." />
              <TouchableOpacity style={styles.uploadButton}>
                <Icon name="upload" size={20} color={colors[colorScheme].text} />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Allergens</Text>
          <View style={styles.badgeContainer}>
            {commonAllergens.map((allergen) => (
              <TouchableOpacity key={allergen} onPress={() => toggleAllergen(allergen)} style={[styles.badge, allergens.includes(allergen) && styles.activeBadge]}>
                <Text style={allergens.includes(allergen) ? styles.activeBadgeText : styles.badgeText}>{allergen}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Nutritional Info</Text>
          <View style={styles.row}>
            <View style={[styles.inputGroup, { flex: 1 }]}>
              <Text style={styles.label}>Calories</Text>
              <TextInput style={styles.input} value={calories} onChangeText={setCalories} placeholder="0" keyboardType="numeric" />
            </View>
            <View style={[styles.inputGroup, { flex: 1 }]}>
              <Text style={styles.label}>Protein</Text>
              <TextInput style={styles.input} value={protein} onChangeText={setProtein} placeholder="0g" />
            </View>
          </View>
          <View style={styles.row}>
            <View style={[styles.inputGroup, { flex: 1 }]}>
              <Text style={styles.label}>Carbs</Text>
              <TextInput style={styles.input} value={carbs} onChangeText={setCarbs} placeholder="0g" />
            </View>
            <View style={[styles.inputGroup, { flex: 1 }]}>
              <Text style={styles.label}>Fat</Text>
              <TextInput style={styles.input} value={fat} onChangeText={setFat} placeholder="0g" />
            </View>
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Wine Pairing</Text>
          <TextInput style={styles.input} value={winePairing} onChangeText={setWinePairing} placeholder="e.g., Sauvignon Blanc" />
        </View>

        <View style={styles.buttonGroup}>
          <TouchableOpacity style={styles.saveButton} onPress={handleSubmit}>
            <Icon name="save" size={20} color={colors.dark.text} />
            <Text style={styles.saveButtonText}>Save Menu Item</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.cancelButton} onPress={onCancel}>
            <Text style={styles.cancelButtonText}>Cancel</Text>
          </TouchableOpacity>
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
  header: {
    backgroundColor: colors[colorScheme].primary,
    padding: 24,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  backButton: {
    marginRight: 8,
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
  form: {
    padding: 24,
    gap: 24,
  },
  card: {
    backgroundColor: colors[colorScheme].card,
    borderRadius: 12,
    padding: 20,
    borderWidth: 1,
    borderColor: colors[colorScheme].border,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors[colorScheme].text,
    marginBottom: 16,
  },
  inputGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    color: colors[colorScheme].text,
    marginBottom: 8,
  },
  input: {
    backgroundColor: colors[colorScheme].background,
    borderWidth: 1,
    borderColor: colors[colorScheme].border,
    borderRadius: 8,
    padding: 12,
    color: colors[colorScheme].text,
  },
  textarea: {
    height: 100,
    textAlignVertical: 'top',
  },
  row: {
    flexDirection: 'row',
    gap: 16,
  },
  priceInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors[colorScheme].background,
    borderWidth: 1,
    borderColor: colors[colorScheme].border,
    borderRadius: 8,
  },
  currencySymbol: {
    paddingLeft: 12,
    color: colors[colorScheme].text,
  },
  priceInput: {
    flex: 1,
    borderWidth: 0,
  },
  uploadButton: {
    borderWidth: 1,
    borderColor: colors[colorScheme].border,
    borderRadius: 8,
    padding: 12,
    justifyContent: 'center',
  },
  badgeContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  badge: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors[colorScheme].primary,
  },
  activeBadge: {
    backgroundColor: colors[colorScheme].primary,
  },
  badgeText: {
    color: colors[colorScheme].primary,
  },
  activeBadgeText: {
    color: colors.dark.text,
  },
  buttonGroup: {
    gap: 12,
  },
  saveButton: {
    backgroundColor: colors[colorScheme].primary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 8,
    gap: 8,
  },
  saveButtonText: {
    color: colors.dark.text,
    fontWeight: 'bold',
    fontSize: 16,
  },
  cancelButton: {
    borderWidth: 1,
    borderColor: colors[colorScheme].border,
    alignItems: 'center',
    padding: 16,
    borderRadius: 8,
  },
  cancelButtonText: {
    color: colors[colorScheme].text,
    fontWeight: 'bold',
    fontSize: 16,
  },
});