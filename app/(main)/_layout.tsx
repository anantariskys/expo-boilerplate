import { Tabs } from 'expo-router';
import { useTheme } from '@/src/hooks/useTheme';
import { Ionicons } from '@expo/vector-icons'; // Jika expo/vector-icons tersedia, sering kali bawaan expo

export default function MainLayout() {
  const { colors } = useTheme();

  return (
    <Tabs
      screenOptions={{
        headerStyle: { backgroundColor: colors.background },
        headerTintColor: colors.text,
        tabBarStyle: { backgroundColor: colors.background },
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textMuted,
      }}
    >
      <Tabs.Screen 
        name="index" 
        options={{ 
          title: 'Home',
          tabBarIcon: ({ color, size }) => <Ionicons name="home-outline" size={size} color={color} />
        }} 
      />
      <Tabs.Screen 
        name="about" 
        options={{ 
          title: 'About',
          tabBarIcon: ({ color, size }) => <Ionicons name="information-circle-outline" size={size} color={color} />
        }} 
      />
    </Tabs>
  );
}
