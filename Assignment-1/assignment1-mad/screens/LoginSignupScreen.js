import { useState } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import { LinearGradient } from 'expo-linear-gradient';

const LoginSignupScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignup, setIsSignup] = useState(false);

  const handleSubmit = () => {
    if (!email || !password) {
      Alert.alert('Missing Fields', 'Please fill in both email and password.');
      return;
    }

    // Dummy authentication logic
    console.log(`${isSignup ? 'Signing up' : 'Logging in'} with`, { email, password });
    navigation.navigate('HomeFeed');
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={styles.container}
    >
      <LinearGradient
        colors={['#4a008a', '#9c27b0']} // Dark purple to lighter purple gradient
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.background}
      />
      <View style={styles.formContainer}>
        {/* White Text Logo (SkillSwap.) */}
        <View style={styles.logoAndTaglineContainer}>
          <Text style={styles.logoText}>SkillSwap.</Text>
          <Text style={styles.taglineText}>learn, teach, grow together</Text>
        </View>

        <Text style={styles.title}>{isSignup ? 'Create Account' : 'Welcome Back'}</Text>
        <Text style={styles.subtitle}>
          {isSignup ? 'Join us and start learning' : 'Log in to continue'}
        </Text>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor="rgba(255, 255, 255, 0.7)" // White with transparency
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor="rgba(255, 255, 255, 0.7)" // White with transparency
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
        </View>

        <TouchableOpacity style={styles.primaryButton} onPress={handleSubmit}>
          <Text style={styles.primaryButtonText}>{isSignup ? 'Sign Up' : 'Log In'}</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => setIsSignup(!isSignup)}>
          <Text style={styles.switchText}>
            {isSignup ? 'Already have an account?' : "Don't have an account?"}
            <Text style={styles.switchLink}> {isSignup ? 'Log In' : 'Sign Up'}</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  formContainer: {
    flex: 1,
    justifyContent: 'center',
    padding: 24,
  },
  logoAndTaglineContainer: {
    alignItems: 'center',
    marginBottom: 60, // Increased margin for the logo/tagline block
  },
  logoText: {
    fontSize: 55,
    fontWeight: '900',
    color: '#ffffff', // White logo text
    letterSpacing: -1.5,
  },
  taglineText: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.8)', // Slightly transparent white tagline
    marginTop: 5,
    textTransform: 'lowercase',
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: '#ffffff', // White title text
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.8)', // White subtitle text with transparency
    textAlign: 'center',
    marginBottom: 40,
  },
  inputContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)', // Semi-transparent white background for inputs
    borderRadius: 12,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)', // Semi-transparent white border
  },
  input: {
    height: 55,
    paddingHorizontal: 16,
    color: '#ffffff', // White input text
    fontSize: 16,
  },
  primaryButton: {
    backgroundColor: '#ffffff', // White background for the button
    paddingVertical: 18,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 24,
  },
  primaryButtonText: {
    color: '#4a008a', // Dark purple text for the button
    fontWeight: '700',
    fontSize: 18,
  },
  switchText: {
    color: 'rgba(255, 255, 255, 0.8)', // White switch text with transparency
    textAlign: 'center',
    fontSize: 14,
  },
  switchLink: {
    fontWeight: 'bold',
    color: '#ffffff', // Pure white for the link part
  },
});

export default LoginSignupScreen;