// screens/RegisterScreen.js
import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert, ActivityIndicator, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_BASE_URL = 'http://192.168.100.2:5000'; // ⭐ CHECK YOUR IP

const RegisterScreen = ({ navigation }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [courseName, setCourseName] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleRegister = async () => {
    if (!name || !email || !password || !courseName) {
      Alert.alert('Error', 'All fields are required.');
      return;
    }
    if (password.length < 6) {
        Alert.alert('Error', 'Password must be at least 6 characters long.');
        return;
    }

    setIsLoading(true);

    try {
      const response = await fetch(`${API_BASE_URL}/api/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password, courseName }),
      });

      const data = await response.json();

      if (response.status === 201 && data.success) {
        // Save user data and login status
        await AsyncStorage.setItem('isLoggedIn', 'true');
        await AsyncStorage.setItem('userData', JSON.stringify(data.user));

        Alert.alert('Registration Successful', `Welcome, ${data.user.name}! You are now teaching ${data.user.courseName}.`);
        navigation.replace('Dashboard');
      } else {
        Alert.alert('Registration Failed', data.message || 'An error occurred during registration.');
      }
    } catch (error) {
      console.error('Registration error:', error);
      Alert.alert('Network Error', 'Could not connect to the server. Check your IP/port.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView 
      style={styles.container} 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.logo}>New Teacher Signup</Text>
        
        <View style={styles.inputView}>
          <TextInput
            style={styles.inputText}
            placeholder="Full Name"
            placeholderTextColor="#003f5c"
            onChangeText={setName}
            value={name}
            autoCapitalize="words"
          />
        </View>
        <View style={styles.inputView}>
          <TextInput
            style={styles.inputText}
            placeholder="School Email"
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
            placeholder="Password (min 6 chars)"
            placeholderTextColor="#003f5c"
            onChangeText={setPassword}
            value={password}
          />
        </View>
        <View style={styles.inputView}>
          <TextInput
            style={styles.inputText}
            placeholder="Course Name (e.g., Grade 9 Math)"
            placeholderTextColor="#003f5c"
            onChangeText={setCourseName}
            value={courseName}
            autoCapitalize="sentences"
          />
        </View>

        <TouchableOpacity 
          style={styles.registerBtn} 
          onPress={handleRegister}
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.registerText}>REGISTER & LOGIN</Text>
          )}
        </TouchableOpacity>
        
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.loginLink}>Already have an account? Go to Login</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContent: {
    padding: 20,
    alignItems: 'center',
    paddingTop: 50,
  },
  logo: {
    fontWeight: 'bold',
    fontSize: 24,
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
  registerBtn: {
    width: '90%',
    backgroundColor: '#5CB85C', // Green for register
    borderRadius: 25,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30,
    marginBottom: 10,
  },
  registerText: {
    color: 'white',
    fontWeight: 'bold',
  },
  loginLink: {
    color: '#4A90E2',
    marginTop: 15,
  },
});

export default RegisterScreen;