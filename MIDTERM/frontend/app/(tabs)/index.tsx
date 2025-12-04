import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  Alert,
  ActivityIndicator,
  Text,
  Pressable, // Import Pressable!
} from 'react-native';
import { useRouter } from 'expo-router';
import API_URL from '../../apiConfig';
import { Colors } from '../../constants/colors'; // Import our colors

export default function HomeScreen() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const showFullMenu = () => {
    router.push('/menu');
  };

  const surpriseMe = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/menu/random`);
      if (!response.ok) {
        const err = await response.json();
        throw new Error(err.message || 'Network response was not ok');
      }
      const item = await response.json();

      Alert.alert(
        "Your Surprise Item!",
        `${item.name}\n(${item.category})\nRs. ${item.price.toFixed(2)}`,
        [{ text: 'OK' }]
      );
    } catch (error: any) {
      Alert.alert("Error", error.message || "Could not fetch a surprise item.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to the</Text>
      <Text style={styles.brand}>Daily Grind</Text>

      {loading && <ActivityIndicator size="large" color={Colors.primary} style={styles.loader} />}

      <View style={styles.buttonContainer}>
        {/* Button 1: Full Menu (Primary) */}
        <Pressable
          style={({ pressed }) => [
            styles.button,
            styles.buttonPrimary,
            pressed && styles.buttonPressed,
          ]}
          onPress={showFullMenu}
          disabled={loading}
        >
          <Text style={[styles.buttonText, styles.buttonTextPrimary]}>
            View Full Menu
          </Text>
        </Pressable>

        {/* Button 2: Surprise Me (Secondary) */}
        <Pressable
          style={({ pressed }) => [
            styles.button,
            styles.buttonSecondary,
            pressed && styles.buttonPressed,
          ]}
          onPress={surpriseMe}
          disabled={loading}
        >
          <Text style={[styles.buttonText, styles.buttonTextSecondary]}>
            Surprise Me!
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: Colors.background, // Use dark background
  },
  title: {
    fontSize: 24,
    fontWeight: '300', // Lighter font
    color: Colors.textSecondary,
  },
  brand: {
    fontSize: 40,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: 60,
  },
  buttonContainer: {
    width: '90%',
  },
  button: {
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 30, // Rounded pill shape
    alignItems: 'center',
    marginVertical: 10,
    borderWidth: 1,
  },
  buttonPrimary: {
    backgroundColor: Colors.primary, // Solid color
    borderColor: Colors.primary,
  },
  buttonSecondary: {
    backgroundColor: 'transparent', // "Ghost" button
    borderColor: Colors.primary, // Accent border
  },
  buttonPressed: {
    opacity: 0.7, // Feedback on press
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  buttonTextPrimary: {
    color: '#FFFFFF', // White text on solid button
  },
  buttonTextSecondary: {
    color: Colors.primary, // Accent text on ghost button
  },
  loader: {
    position: 'absolute',
  },
});