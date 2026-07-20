
import { useColorScheme } from 'react-native';
import { theme } from '../theme';

export function useTheme() {
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === 'dark';

  // Pilih palet warna berdasarkan mode yang aktif di device
  const activeColors = isDarkMode ? theme.colors.dark : theme.colors.light;

  return {
    ...theme,
    colors: activeColors, // Override warna global dengan warna aktif
    isDarkMode,
  };
}
