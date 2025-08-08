import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Slot } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';
import "../global.css";

import { useColorScheme } from '@/hooks/useColorScheme';

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    ManropeBold: require('../assets/fonts/Manrope-Bold.ttf'),
    ManropeExtraBold: require('../assets/fonts/Manrope-ExtraBold.ttf'),
    ManropeExtraLight: require('../assets/fonts/Manrope-ExtraLight.ttf'),
    ManropeLight: require('../assets/fonts/Manrope-Light.ttf'),
    ManropeMedium: require('../assets/fonts/Manrope-Medium.ttf'),
    ManropeRegular: require('../assets/fonts/Manrope-Regular.ttf'),
    ManropeSemiBold: require('../assets/fonts/Manrope-SemiBold.ttf'),
  });

  if (!loaded) {
    // Async font loading only occurs in development.
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Slot />
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
