import { useEffect, useState } from 'react';
import { Appearance } from 'react-native';

export type ColorScheme = 'light' | 'dark';

export const useTheme = () => {
  const [colorScheme, setColorScheme] = useState(Appearance.getColorScheme() || 'light');

  useEffect(() => {
    const subscription = Appearance.addChangeListener(({ colorScheme }) => {
      setColorScheme(colorScheme || 'light');
    });

    return () => {
      subscription.remove();
    };
  }, []);

  return { colorScheme, setColorScheme };
};