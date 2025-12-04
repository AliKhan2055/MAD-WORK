import React, { useState, useCallback } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ScrollView,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';

const categories = ['Programming', 'Music', 'Art', 'Fitness', 'Languages', 'Other'];

const CreatePostScreen = ({ navigation }) => {
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handlePostSkill = useCallback(async () => {
    if (!title || !description) {
      alert('Please fill out all fields.');
      return;
    }

    const newPost = {
      id: Date.now(), // Unique ID for the new post
      user: 'Current User', // Placeholder for the user's name
      time: 'Just now',
      category: selectedCategory,
      title: title,
      description: description,
      isExpanded: false,
    };

    try {
      // Fetch the current skills data from AsyncStorage
      const storedSkills = await AsyncStorage.getItem('skillsData');
      const skillsArray = storedSkills ? JSON.parse(storedSkills) : [];
      
      // Add the new post to the beginning of the array
      const newSkillsArray = [newPost, ...skillsArray];
      
      // Save the updated array back to AsyncStorage
      await AsyncStorage.setItem('skillsData', JSON.stringify(newSkillsArray));
      
      // Navigate back to the previous screen (Home)
      navigation.goBack();
      
    } catch (e) {
      console.error('Failed to save new post', e);
      alert('Failed to save your post. Please try again.');
    }
  }, [title, description, selectedCategory, navigation]);

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <LinearGradient
        colors={['#4a008a', '#9c27b0']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.headerBackground}
      />
      
      <View style={styles.headerContent}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Text style={styles.backButtonText}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Create Offer</Text>
      </View>

      <ScrollView style={styles.content}>
        <Text style={styles.label}>Skill Category</Text>
        <View style={styles.categoryContainer}>
          {categories.map((cat) => (
            <TouchableOpacity
              key={cat}
              style={[
                styles.categoryButton,
                selectedCategory === cat && styles.selectedCategory,
              ]}
              onPress={() => setSelectedCategory(cat)}
            >
              <Text style={[
                styles.categoryText,
                selectedCategory === cat && styles.selectedCategoryText,
              ]}>
                {cat}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.label}>Skill Title</Text>
        <TextInput
          style={styles.input}
          placeholder="e.g., Python Tutoring for Beginners"
          placeholderTextColor="#999"
          value={title}
          onChangeText={setTitle}
          maxLength={60}
        />
        <Text style={styles.charCount}>{title.length}/60</Text>

        <Text style={styles.label}>Description</Text>
        <TextInput
          style={[styles.input, styles.descriptionInput]}
          placeholder="Describe what you're offering, your experience, availability, etc."
          placeholderTextColor="#999"
          value={description}
          onChangeText={setDescription}
          multiline
          maxLength={500}
        />
        <Text style={styles.charCount}>{description.length}/500</Text>
      </ScrollView>

      <View style={styles.postButtonContainer}>
        <TouchableOpacity
          style={styles.postButton}
          onPress={handlePostSkill}
        >
          <Text style={styles.postButtonText}>Post Skill Offer</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f4f9',
  },
  headerBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: Platform.OS === 'ios' ? 120 : 100,
  },
  headerContent: {
    marginTop: Platform.OS === 'ios' ? 50 : 30,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
  },
  backButton: {
    padding: 10,
  },
  backButtonText: {
    fontSize: 24,
    color: '#fff',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginLeft: 10,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  categoryContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 20,
  },
  categoryButton: {
    backgroundColor: '#fff',
    borderColor: '#ccc',
    borderWidth: 1,
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 20,
    marginRight: 10,
    marginBottom: 10,
  },
  selectedCategory: {
    backgroundColor: '#4a008a',
    borderColor: '#4a008a',
  },
  categoryText: {
    color: '#555',
  },
  selectedCategoryText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 15,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#ddd',
    marginBottom: 5,
  },
  descriptionInput: {
    height: 150,
    textAlignVertical: 'top',
  },
  charCount: {
    textAlign: 'right',
    fontSize: 12,
    color: '#999',
    marginBottom: 20,
  },
  postButtonContainer: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
    backgroundColor: '#f4f4f9',
  },
  postButton: {
    backgroundColor: '#4a008a',
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  postButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default CreatePostScreen;