// App.js
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context'; 

// Import all screen components
import WelcomeScreen from './screens/WelcomeScreen'; 
import LoginScreen from './screens/LoginScreen'; 
import HomeScreen from './screens/HomeScreen';
import ProductDetailsScreen from './screens/ProductDetailsScreen';
import CartScreen from './screens/CartScreen';
import CheckoutScreen from './screens/CheckoutScreen';
import OrderConfirmationScreen from './screens/OrderConfirmationScreen';
import ProfileScreen from './screens/ProfileScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <SafeAreaProvider> 
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Welcome" // App starts here
          screenOptions={{
            headerShown: false, // Hide the default header
            contentStyle: { backgroundColor: '#121212' } // Set background for all screens
          }}
        >
          {/* Auth Flow */}
          <Stack.Screen name="Welcome" component={WelcomeScreen} />
          <Stack.Screen name="Login" component={LoginScreen} />

          {/* Main App Flow - Navigation Target for Login/Welcome */}
          <Stack.Screen name="Home" component={HomeScreen} />
          
          {/* Detailed and Checkout Screens */}
          <Stack.Screen name="ProductDetails" component={ProductDetailsScreen} />
          <Stack.Screen name="Cart" component={CartScreen} />
          <Stack.Screen name="Checkout" component={CheckoutScreen} />
          <Stack.Screen name="OrderConfirmation" component={OrderConfirmationScreen} />
          <Stack.Screen name="Profile" component={ProfileScreen} />

        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}