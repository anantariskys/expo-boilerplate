import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Button } from '@/src/components/Button';
import { useAuthStore } from '@/src/store/useAuthStore';
import { useTheme } from '@/src/hooks/useTheme';

export default function HomeRoute() {
  const { user, logout } = useAuthStore();
  const { colors, spacing } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.title, { color: colors.text }]}>Welcome back, {user?.name}!</Text>
      <Text style={[styles.subtitle, { color: colors.textMuted, marginBottom: spacing.xl }]}>
        This is the Home Tab.
      </Text>
      <Button 
        title="Logout" 
        onPress={logout} 
        style={{ backgroundColor: colors.danger, paddingHorizontal: spacing.xl }} 
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 8, textAlign: 'center' },
  subtitle: { fontSize: 16, textAlign: 'center' },
});
