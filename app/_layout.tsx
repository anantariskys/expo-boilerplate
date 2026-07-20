import { useEffect } from 'react';
import { Stack as ExpoStack, useRouter as useExpoRouter, useSegments as useExpoSegments, useRootNavigationState } from 'expo-router';
import { AppProvider } from '@/src/providers';
import { StatusBar } from 'expo-status-bar';
import { useAuthStore } from '@/src/store/useAuthStore';
import * as SplashScreen from 'expo-splash-screen';
import { useFonts } from 'expo-font';
import Ionicons from '@expo/vector-icons/Ionicons';

// Initialize i18n before app renders
import '@/src/i18n';

// 1. Ekspor Error Boundary bawaan dari Expo Router untuk menangkap UI Crashes
export { ErrorBoundary } from 'expo-router';

// 2. Mencegah Splash Screen tertutup otomatis sebelum sistem siap
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const { isAuthenticated } = useAuthStore();
  const segments = useExpoSegments();
  const router = useExpoRouter();
  const navigationState = useRootNavigationState();

  // 3. Memuat Custom Fonts (misal: Icon fonts agar tidak berkedip saat pertama kali render)
  const [fontsLoaded, fontError] = useFonts({
    ...Ionicons.font,
  });

  // Lempar error font ke ErrorBoundary jika gagal dimuat
  useEffect(() => {
    if (fontError) throw fontError;
  }, [fontError]);

  // Efek Kedua: Auth Guard dan Menutup Splash Screen
  useEffect(() => {
    // Pastikan Font dan Navigasi sudah 100% siap
    if (!fontsLoaded || !navigationState?.key) return;

    const inAuthGroup = segments[0] === '(auth)';

    if (!isAuthenticated && !inAuthGroup) {
      router.replace('/(auth)/login');
    } else if (isAuthenticated && inAuthGroup) {
      router.replace('/(main)');
    }

    // PENTING: Sembunyikan Splash Screen SETELAH routing selesai menentukan arah
    SplashScreen.hideAsync();
  }, [isAuthenticated, segments, navigationState?.key, fontsLoaded]);

  if (!fontsLoaded) {
    // Return null membiarkan Splash Screen Native tetap tampil
    return null; 
  }

  return (
    <AppProvider>
      <StatusBar style="auto" />
      <ExpoStack screenOptions={{ headerShown: false }}>
        <ExpoStack.Screen name="(auth)" />
        <ExpoStack.Screen name="(main)" />
      </ExpoStack>
    </AppProvider>
  );
}
