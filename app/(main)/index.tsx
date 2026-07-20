import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Button } from '@/src/components/Button';
import { useAuthStore } from '@/src/store/useAuthStore';
import { useTheme } from '@/src/hooks/useTheme';

export default function HomeRoute() {
  const { user, logout } = useAuthStore();
  const { colors, spacing } = useTheme();
  const { t, i18n } = useTranslation();

  const toggleLanguage = () => {
    const newLang = i18n.language === 'en' ? 'id' : 'en';
    i18n.changeLanguage(newLang);
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.title, { color: colors.text }]}>{t('home.welcome')}, {user?.name}!</Text>
      <Text style={[styles.subtitle, { color: colors.textMuted, marginBottom: spacing.xl }]}>
        {t('home.subtitle')}
      </Text>
      
      <Button 
        title={i18n.language === 'en' ? 'Ubah ke Bahasa Indonesia' : 'Switch to English'} 
        onPress={toggleLanguage} 
        style={{ backgroundColor: colors.info, paddingHorizontal: spacing.xl, marginBottom: spacing.m }} 
      />

      <Button 
        title={t('home.logoutButton')} 
        onPress={logout} 
        style={{ backgroundColor: colors.danger, paddingHorizontal: spacing.xl }} 
      />
    </View>
  );
}

import { theme } from '@/src/theme';

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: theme.spacing.l },
  title: { fontSize: theme.typography.sizes.xl, fontWeight: theme.typography.weights.bold as any, marginBottom: theme.spacing.s, textAlign: 'center' },
  subtitle: { fontSize: theme.typography.sizes.m, textAlign: 'center' },
});
