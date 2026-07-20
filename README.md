# 🚀 Enterprise Expo Boilerplate

A production-ready, feature-sliced, scalable boilerplate for React Native and Expo. Designed with the perspective of a 10+ YOE Senior Mobile Engineer.

## ✨ Features

- **Routing & Navigation**: Fully typed file-based routing using [Expo Router](https://docs.expo.dev/router/introduction/). Includes automated Auth Guards to protect screens without white-screen flashes.
- **State Management (Client)**: [Zustand](https://github.com/pmndrs/zustand) + `expo-secure-store` for persistent, hardware-encrypted global states (e.g., Auth Sessions).
- **State Management (Server)**: [TanStack React Query](https://tanstack.com/query/latest) for declarative, cached, and robust data fetching.
- **Form Validation**: [React Hook Form](https://react-hook-form.com/) combined with [Zod](https://zod.dev/) for type-safe and performant forms.
- **Design System & Theming**: Completely dynamic Dark/Light mode engine without any hardcoded values. Centralized `colors`, `spacing`, `typography`, and `radius`.
- **Internationalization (i18n)**: Ready-to-use global translations powered by `i18next` and auto-detected by `expo-localization`.
- **API Interceptors**: Pre-configured `Axios` instance that automatically injects JWT tokens and handles global `401 Unauthorized` auto-logout.
- **Orchestration**: Seamless Splash Screen handling (`expo-splash-screen`) tied with Asynchronous Font Loading (`expo-font`) to prevent unstyled flashes.

## 📂 Architecture (Feature-Sliced Design)

This boilerplate avoids massive "spaghetti" folders by embracing a modular, feature-centric architecture:

```text
src/
├── components/       # Reusable global UI components (Input, Button, dll)
├── config/           # Environment variables & constants
├── features/         # Modules separated by business logic (auth, home, dll)
│   └── auth/         # Example feature module
│       ├── api/      # Feature-specific API calls
│       ├── components# Feature-specific UI
│       ├── hooks/    # Feature-specific custom hooks
│       └── screens/  # Feature screen layouts
├── hooks/            # Global custom hooks (useTheme, dll)
├── i18n/             # Localization JSONs and config
├── lib/              # Third-party library integrations (Axios interceptor)
├── providers/        # Global React Context providers (QueryClient, SafeArea)
├── store/            # Global Zustand stores (useAuthStore)
├── theme/            # Centralized Design System tokens (Colors, Spacing, dll)
└── utils/            # Helper functions (Storage adapter)
```

## 🛠 Getting Started

### 1. Installation

Clone the repository and install the dependencies:

```bash
npm install
```

### 2. Environment Variables

Copy the example environment file and fill in your API URLs:

```bash
cp .env.example .env
```

### 3. Run the App

Start the Expo Metro Bundler:

```bash
npm run start
```
- Press `a` to open on Android.
- Press `i` to open on iOS.

## 🎨 Theming System

Never hardcode styles! Always use the `useTheme` hook to ensure your UI adapts perfectly to user preferences (Dark/Light Mode).

```tsx
import { StyleSheet, View, Text } from 'react-native';
import { useTheme } from '@/src/hooks/useTheme';
import { theme } from '@/src/theme';

export function MyComponent() {
  const { colors } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={{ color: colors.text }}>Hello World</Text>
    </View>
  );
}

// Gunakan object 'theme' statis untuk tata letak (ukuran, jarak)
const styles = StyleSheet.create({
  container: {
    padding: theme.spacing.m,
    borderRadius: theme.radius.l,
  }
});
```

## 🔐 Authentication Flow

1. User submits the `LoginForm` (Validated dynamically via Zod).
2. The `useLogin` hook triggers the API call.
3. Upon success, the Token is saved to `useAuthStore` (Physically encrypted in the OS via SecureStore).
4. `RootLayout` (`app/_layout.tsx`) detects the state change and automatically redirects the user to the `(main)` tab group.
5. All subsequent API calls will automatically attach this Token. If the Token expires, the user is automatically logged out.
