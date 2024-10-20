import { Stack } from "expo-router";
import { AuthProvider } from '@/app/auth/AuthProvider';
import HeaderRight from '@/components/title-logout'

export default function RootLayout() {
  return (
    <AuthProvider>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
      </Stack>
    </AuthProvider>
  );
}
