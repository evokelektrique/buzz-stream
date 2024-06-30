import AuthProvider from "@/src/providers/AuthProvider";
import QueryProvider from "@/src/providers/QueryProvider";
import { useFonts } from "expo-font";
import { Redirect, Slot, SplashScreen, Stack } from "expo-router";
import { useEffect } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [fontsLoaded, fontsError] = useFonts({
    DMSans: require("@/assets/fonts/DMSans-VariableFont.ttf"),
    DMSansItalic: require("@/assets/fonts/DMSans-VariableFont.ttf"),
  });

  useEffect(() => {
    if (fontsLoaded || fontsError) {
      // Hide the splash screen after the fonts have loaded (or an error was returned) and the UI is ready.
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontsError]);

  // Prevent rendering until the font has loaded or an error was returned
  if (!fontsLoaded && !fontsError) {
    return null;
  }

  return <Layout />;
}

const Layout = () => {
  return (
    <AuthProvider>
      <QueryProvider>
        <SafeAreaProvider>
          <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="index" options={{ title: "INDEX" }} />
            <Stack.Screen name="(auth)" />
            <Stack.Screen name="(tabs)" />
            <Stack.Screen name="(modals)" />
          </Stack>
        </SafeAreaProvider>
      </QueryProvider>
    </AuthProvider>
  );
};
