import React from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { useThemeContext } from '../../styles/ThemeContext';
import { colors } from '../../styles/colors';
import Icon from 'react-native-vector-icons/Feather';

interface SettingsScreenProps {
  settings: {
    currency: string;
    notifications: boolean;
    dietaryPreferences: string[];
  };
  onUpdateSettings: (settings: any) => void;
}

export function SettingsScreen({ settings, onUpdateSettings }: SettingsScreenProps) {
  const { colorScheme, setColorScheme } = useThemeContext();
  const dietaryOptions = ['Vegetarian', 'Vegan', 'Gluten-Free', 'Dairy-Free', 'Nut-Free', 'Halal', 'Kosher'];

  const toggleDietaryPreference = (pref: string) => {
    const newPrefs = settings.dietaryPreferences.includes(pref)
      ? settings.dietaryPreferences.filter(p => p !== pref)
      : [...settings.dietaryPreferences, pref];

    onUpdateSettings({ ...settings, dietaryPreferences: newPrefs });
  };

  const styles = getStyles(colorScheme);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Icon name="settings" size={28} color={colors[colorScheme].text} />
        <View>
          <Text style={styles.headerTitle}>Settings</Text>
          <Text style={styles.headerSubtitle}>Customize your experience</Text>
        </View>
      </View>

      <View style={styles.content}>
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Icon name="settings" size={20} color={colors[colorScheme].primary} />
            <Text style={styles.cardTitle}>General</Text>
          </View>

          <View style={styles.cardContent}>
            <View style={styles.row}>
              <View style={styles.rowLabel}>
                <Icon name="moon" size={16} color={colors[colorScheme].text} />
                <Text style={styles.labelText}>Theme</Text>
              </View>
              <View style={styles.themeSwitcher}>
                <TouchableOpacity onPress={() => setColorScheme('light')} style={[styles.themeButton, colorScheme === 'light' && styles.activeThemeButton]}>
                  <Icon name="sun" size={16} color={colorScheme === 'light' ? colors.dark.text : colors.light.text} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setColorScheme('dark')} style={[styles.themeButton, colorScheme === 'dark' && styles.activeThemeButton]}>
                  <Icon name="moon" size={16} color={colorScheme === 'dark' ? colors.light.text : colors.dark.text} />
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.separator} />

            <View style={styles.row}>
              <View style={styles.rowLabel}>
                <Icon name="dollar-sign" size={16} color={colors[colorScheme].text} />
                <Text style={styles.labelText}>Currency</Text>
              </View>
              {/* Add your currency picker here */}
            </View>

            <View style={styles.separator} />

            <View style={styles.row}>
              <View style={styles.rowLabel}>
                <Icon name="bell" size={16} color={colors[colorScheme].text} />
                <Text style={styles.labelText}>Notifications</Text>
              </View>
              {/* Add your switch here */}
            </View>
          </View>
        </View>

        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Icon name="coffee" size={20} color={colors[colorScheme].primary} />
            <Text style={styles.cardTitle}>Dietary Preferences</Text>
          </View>
          <Text style={styles.cardDescription}>Select your dietary requirements to see relevant dishes</Text>
          <View style={styles.badgeContainer}>
            {dietaryOptions.map((pref) => (
              <TouchableOpacity key={pref} onPress={() => toggleDietaryPreference(pref)} style={[styles.badge, settings.dietaryPreferences.includes(pref) && styles.activeBadge]}>
                <Text style={settings.dietaryPreferences.includes(pref) ? styles.activeBadgeText : styles.badgeText}>{pref}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Icon name="info" size={20} color={colors[colorScheme].primary} />
            <Text style={styles.cardTitle}>About</Text>
          </View>
          <View style={styles.aboutContainer}>
            <Icon name="user" size={48} color={colors[colorScheme].primary} />
            <View style={styles.aboutTextContainer}>
              <Text style={styles.aboutTitle}>Chef Christoffel</Text>
              <Text style={styles.aboutDescription}>Premium private dining experiences tailored to your preferences. Showcasing the finest South African and international cuisine with exceptional service.</Text>
            </View>
          </View>
          <View style={styles.separator} />
          <View style={styles.versionContainer}>
            <View>
              <Text style={styles.versionLabel}>Version</Text>
              <Text style={styles.versionText}>1.0.0</Text>
            </View>
            <View>
              <Text style={styles.versionLabel}>Platform</Text>
              <Text style={styles.versionText}>Mobile App</Text>
            </View>
          </View>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>Portfolio of Evidence Project</Text>
          <Text style={styles.footerSubtitle}>Cross-platform Menu Management System</Text>
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
    paddingBottom: 32,
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
    gap: 24,
  },
  card: {
    backgroundColor: colors[colorScheme].card,
    borderRadius: 12,
    padding: 20,
    borderWidth: 1,
    borderColor: colors[colorScheme].border,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 16,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors[colorScheme].text,
  },
  cardContent: {
    gap: 16,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  rowLabel: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  labelText: {
    fontSize: 16,
    color: colors[colorScheme].text,
  },
  themeSwitcher: {
    flexDirection: 'row',
    backgroundColor: colors[colorScheme].border,
    borderRadius: 8,
  },
  themeButton: {
    padding: 8,
    borderRadius: 6,
  },
  activeThemeButton: {
    backgroundColor: colors[colorScheme].primary,
  },
  separator: {
    height: 1,
    backgroundColor: colors[colorScheme].border,
  },
  cardDescription: {
    fontSize: 14,
    color: colors[colorScheme].text,
    marginBottom: 16,
  },
  badgeContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  badge: {
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 16,
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
    color: colors[colorScheme].text,
  },
  aboutContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
  },
  aboutTextContainer: {
    flex: 1,
  },
  aboutTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors[colorScheme].text,
    marginBottom: 4,
  },
  aboutDescription: {
    fontSize: 14,
    color: colors[colorScheme].text,
    lineHeight: 20,
  },
  versionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  versionLabel: {
    fontSize: 14,
    color: colors[colorScheme].text,
  },
  versionText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: colors[colorScheme].text,
  },
  footer: {
    alignItems: 'center',
    paddingVertical: 16,
  },
  footerText: {
    fontSize: 14,
    color: colors[colorScheme].text,
  },
  footerSubtitle: {
    fontSize: 12,
    color: colors[colorScheme].text,
    marginTop: 4,
  },
});