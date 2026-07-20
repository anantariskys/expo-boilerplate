import { useEffect, useState } from 'react';
import { Stack as ExpoStack, useRouter as useExpoRouter, useSegments as useExpoSegments, useRootNavigationState } from 'expo-router';
import { AppProvider } from '@/src/providers';
import { StatusBar } from 'expo-status-bar';
import { useAuthStore } from '@/src/store/useAuthStore';
import * as SplashScreen from 'expo-splash-screen';

// 1. Ekspor Error Boundary bawaan dari Expo Router untuk menangkap UI Crashes
export { ErrorBoundary } from 'expo-router';

// 2. Mencegah Splash Screen tertutup otomatis sebelum sistem siap
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const { isAuthenticated } = useAuthStore();
  const segments = useExpoSegments();
  const router = useExpoRouter();
  const navigationState = useRootNavigationState();
  const [isAppReady, setIsAppReady] = useState(false);

  // Efek Pertama: Inisialisasi Aplikasi (Font, dsb)
  useEffect(() => {
    if (!navigationState?.key) return;

    const prepareApp = async () => {
      try {
        // Contoh tempat memuat custom font atau data inisial lainnya:
        // await Font.loadAsync(customFonts);
      } catch (e) {
        console.warn(e);
      } finally {
        setIsAppReady(true);
      }
    };

    prepareApp();
  }, [navigationState?.key]);

  // Efek Kedua: Auth Guard dan Menutup Splash Screen
  useEffect(() => {
    if (!isAppReady || !navigationState?.key) return;

    const inAuthGroup = segments[0] === '(auth)';

    if (!isAuthenticated && !inAuthGroup) {
      router.replace('/(auth)/login');
    } else if (isAuthenticated && inAuthGroup) {
      router.replace('/(main)');
    }

    // PENTING: Sembunyikan Splash Screen SETELAH routing selesai menentukan arah
    SplashScreen.hideAsync();
  }, [isAuthenticated, segments, navigationState?.key, isAppReady]);

  if (!isAppReady) {
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
