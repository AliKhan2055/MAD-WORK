// screens/LoginScreen.js
import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_BASE_URL = 'http://192.168.100.2:5000'; // ⭐ CHECK YOUR IP

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('teacher@school.edu'); // Default for quick login
  const [password, setPassword] = useState('password');     // Default for quick login
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please enter both email and password.');
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch(`${API_BASE_URL}/api/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (data.success) {
        // Save user data and login status
        await AsyncStorage.setItem('isLoggedIn', 'true');
        await AsyncStorage.setItem('userData', JSON.stringify(data.user));

        Alert.alert('Login Successful', `Welcome, ${data.user.name}!`);
        navigation.replace('Dashboard');
      } else {
        Alert.alert('Login Failed', data.message || 'Invalid credentials.');
      }
    } catch (error) {
      console.error('Login error:', error);
      Alert.alert('Network Error', 'Could not connect to the server. Check your IP/port.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>Attendance Tracker 📚</Text>
      <View style={styles.inputView}>
        <TextInput
          style={styles.inputText}
          placeholder="Email..."
          placeholderTextColor="#003f5c"
          onChangeText={setEmail}
          value={email}
          keyboardType="email-address"
          autoCapitalize="none"
        />
      </View>
      <View style={styles.inputView}>
        <TextInput
          style={styles.inputText}
          secureTextEntry
          placeholder="Password..."
          placeholderTextColor="#003f5c"
          onChangeText={setPassword}
          value={password}
        />
      </View>
      
      <TouchableOpacity 
        style={styles.loginBtn} 
        onPress={handleLogin}
        disabled={isLoading}
      >
        {isLoading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.loginText}>LOGIN</Text>
        )}
      </TouchableOpacity>
      
      <TouchableOpacity onPress={() => navigation.navigate('Register')}>
        <Text style={styles.signupText}>New Teacher? Register Here</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  logo: {
    fontWeight: 'bold',
    fontSize: 30,
    color: '#4A90E2',
    marginBottom: 40,
  },
  inputView: {
    width: '90%',
    backgroundColor: '#E6EFFF',
    borderRadius: 25,
    height: 50,
    marginBottom: 20,
    justifyContent: 'center',
    padding: 20,
  },
  inputText: {
    height: 50,
    color: '#003f5c',
  },
  loginBtn: {
    width: '90%',
    backgroundColor: '#4A90E2',
    borderRadius: 25,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40,
    marginBottom: 10,
  },
  loginText: {
    color: 'white',
    fontWeight: 'bold',
  },
  signupText: {
    color: '#4A90E2',
    marginTop: 15,
  },
});

export default LoginScreen;