// screens/WelcomeScreen.js
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';

const WelcomeScreen = ({ navigation }) => {
  return (
    <ImageBackground
      // FIX: Using a direct URL for the background image
      source={{ uri: 'https://media.about.nike.com/img/5593cfa7-39ca-407f-a2f2-4347be5c2d96/su24-peg41-volt-womens-hero-re.jpg?m=eyJlZGl0cyI6eyJqcGVnIjp7InF1YWxpdHkiOjEwMH0sIndlYnAiOnsicXVhbGl0eSI6MTAwfSwiZXh0cmFjdCI6eyJsZWZ0IjowLCJ0b3AiOjAsIndpZHRoIjozMDAwLCJoZWlnaHQiOjIyNTB9LCJyZXNpemUiOnsid2lkdGgiOjEwODB9fX0%3D&s=b0eabd10a75573d93ff49fa921d2f4a493bf50fa739649632d114c80d2f95b85' }} 
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.overlay} />
      <View style={styles.content}>
        <Text style={styles.subtitle}>Your choice</Text>
        <Text style={styles.title}>for comfort.</Text>
        <TouchableOpacity
          style={styles.button}
          // The target screen name must match the name in App.js: "Login"
          onPress={() => navigation.navigate('Login')} 
        >
          <Text style={styles.buttonText}>Let's start</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.4)', // Dark overlay for better text contrast
  },
  content: {
    padding: 30,
    paddingBottom: 60,
  },
  subtitle: {
    color: '#fff',
    fontSize: 24,
    fontWeight: '300',
  },
  title: {
    color: '#fff',
    fontSize: 38,
    fontWeight: '700',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#66ff00', // Neon Green
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#000',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default WelcomeScreen;