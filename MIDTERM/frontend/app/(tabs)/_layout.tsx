import { Tabs } from 'expo-router';

export default function TabLayout() {
  return (
    <Tabs>
      {/* This screen points to your app/(tabs)/index.tsx file.
        It's your "Home" screen with the two buttons.
      */}
      <Tabs.Screen
        name="index"
        options={{ title: 'Coffee Shop' }} 
      />
      
      {/* If you had other tabs, you'd add them here.
      <Tabs.Screen
        name="explore" // would point to app/(tabs)/explore.tsx
        options={{ title: 'Explore' }}
      /> 
      */}
    </Tabs>
  );
}