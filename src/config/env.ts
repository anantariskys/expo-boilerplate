/**
 * Centralisasi environment variables.
 * Gunakan awalan EXPO_PUBLIC_ untuk env variables di React Native / Expo.
 */
export const ENV = {
  // Ganti default value dengan yang sesuai atau atur di file .env
  API_URL: process.env.EXPO_PUBLIC_API_URL || 'https://api.example.com',
  APP_NAME: 'Expo Boilerplate',
  ENVIRONMENT: process.env.NODE_ENV || 'development',
  IS_DEV: __DEV__,
};