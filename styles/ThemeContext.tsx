import React, { createContext, useContext } from 'react';
import { useTheme, ColorScheme } from './useTheme';

interface ThemeContextType {
  colorScheme: ColorScheme;
  setColorScheme: (colorScheme: ColorScheme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { colorScheme, setColorScheme } = useTheme();

  return (
    <ThemeContext.Provider value={{ colorScheme, setColorScheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useThemeContext = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useThemeContext must be used within a ThemeProvider');
  }
  return context;
};