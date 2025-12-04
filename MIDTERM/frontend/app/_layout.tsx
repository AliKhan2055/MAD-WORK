import { Stack } from 'expo-router';
import { Colors } from '../constants/colors';
import { StatusBar } from 'expo-status-bar';

export default function RootLayout() {
  return (
    <>
      {/* Ensures time/battery are light text */}
      <StatusBar style="light" /> 
      
      <Stack
        screenOptions={{
          headerStyle: {
            backgroundColor: Colors.card, // Dark header background
          },
          headerTintColor: Colors.text, // White title/back button
          contentStyle: {
            backgroundColor: Colors.background, // Dark app background
          },
        }}
      >
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen
          name="menu"
          options={{
            title: 'Full Menu',
            presentation: 'modal', // Nice slide-up effect
          }}
        />
      </Stack>
    </>
  );
}