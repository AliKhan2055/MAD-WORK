// screens/LoginScreen.js
import React, { useState } from 'react'; 
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ImageBackground } from 'react-native';

const LoginScreen = ({ navigation }) => {
    // State is kept for input handling, but logic bypasses credentials check
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
        // Core logic: Navigates to Home immediately, replacing the current screen
        navigation.replace('Home'); 
    };

    // Placeholder image URL - REPLACE THIS WITH YOUR IMAGE URL
    const BACKGROUND_IMAGE_URI = 'https://media.about.nike.com/img/5593cfa7-39ca-407f-a2f2-4347be5c2d96/su24-peg41-volt-womens-hero-re.jpg?m=eyJlZGl0cyI6eyJqcGVnIjp7InF1YWxpdHkiOjEwMH0sIndlYnAiOnsicXVhbGl0eSI6MTAwfSwiZXh0cmFjdCI6eyJsZWZ0IjowLCJ0b3AiOjAsIndpZHRoIjozMDAwLCJoZWlnaHQiOjIyNTB9LCJyZXNpemUiOnsid2lkdGgiOjEwODB9fX0%3D&s=b0eabd10a75573d93ff49fa921d2f4a493bf50fa739649632d114c80d2f95b85'; 

    return (
        <ImageBackground 
            source={{ uri: BACKGROUND_IMAGE_URI }} 
            style={styles.imageBackground}
            resizeMode="cover"
        >
            {/* Dark overlay for better text readability */}
            <View style={styles.overlay} />

            <View style={styles.contentContainer}>
                {/* Title */}
                <Text style={styles.title}>Welcome Back</Text>
                
                {/* Instruction line */}
                <Text style={styles.instruction}>Login to continue your shopping.</Text>
                
                {/* Removed: <Text style={styles.subtitle}>Enter anything to sign in and explore the latest collection.</Text> */}

                <TextInput
                    style={styles.input}
                    placeholder="Email Address"
                    placeholderTextColor="#aaa"
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    autoCapitalize="none"
                />
                <TextInput
                    style={styles.input}
                    placeholder="Password"
                    placeholderTextColor="#aaa"
                    secureTextEntry
                    value={password}
                    onChangeText={setPassword}
                />
                
                <TouchableOpacity 
                    style={styles.loginButton} 
                    onPress={handleLogin}
                >
                    <Text style={styles.buttonText}>
                        LOG IN {/* Changed button text */}
                    </Text>
                </TouchableOpacity>

                {/* Sign Up link */}
                <TouchableOpacity 
                    style={styles.textButton} 
                    onPress={() => navigation.navigate('Welcome')} // Navigating to Welcome as a placeholder for a SignUp screen
                >
                    <Text style={styles.signUpText}>
                        Don't have an account? <Text style={styles.signUpLink}>Sign up</Text>
                    </Text>
                </TouchableOpacity>
            </View>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    imageBackground: {
        flex: 1,
        width: '100%',
        height: '100%',
    },
    overlay: {
        // Dark semi-transparent layer over the image
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(18, 18, 18, 0.75)', 
    },
    contentContainer: { 
        flex: 1,
        justifyContent: 'center', 
        alignItems: 'center', 
        padding: 30,
    },
    title: { 
        fontSize: 40, 
        color: '#fff', 
        fontWeight: '900', 
        marginBottom: 5,
        letterSpacing: 1.5,
    },
    instruction: {
        fontSize: 18,
        color: '#66ff00', 
        fontWeight: '600',
        marginBottom: 50, // Increased bottom margin slightly after removing subtitle
    },
    input: { 
        width: '100%', 
        height: 50, 
        backgroundColor: 'rgba(255, 255, 255, 0.1)', 
        borderRadius: 8, 
        color: '#fff', 
        paddingHorizontal: 15, 
        marginBottom: 15,
        borderWidth: 1,
        borderColor: '#66ff00', 
        fontSize: 16,
    },
    loginButton: { 
        backgroundColor: '#66ff00', 
        padding: 15, 
        borderRadius: 8, 
        width: '100%', 
        alignItems: 'center', 
        justifyContent: 'center',
        marginTop: 30,
        height: 55, 
    },
    buttonText: { 
        color: '#000', 
        fontWeight: '900', 
        fontSize: 18,
        letterSpacing: 0.5,
    },
    textButton: {
        marginTop: 20,
    },
    signUpText: {
        color: '#aaa', 
        fontSize: 14,
    },
    signUpLink: {
        color: '#66ff00', 
        fontWeight: 'bold',
        textDecorationLine: 'underline',
    }
});

export default LoginScreen;