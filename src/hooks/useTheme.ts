
import { useColorScheme } from 'react-native';
import { theme } from '../theme';

export function useTheme() {
  const colorScheme = useColorScheme();
  
  // Nantinya bisa ditambahkan logika dark mode/light mode yang lebih kompleks di sini
  const isDarkMode = colorScheme === 'dark';

  return {
    ...theme,
    // Jika Anda ingin warna yang dinamis berdasarkan tema (contoh)
    // activeColors: isDarkMode ? darkColors : theme.colors
  };
}
