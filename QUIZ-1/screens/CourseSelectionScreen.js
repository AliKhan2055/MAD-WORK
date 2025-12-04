// screens/CourseSelectionScreen.js

import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert, ActivityIndicator, TextInput, Modal } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_BASE_URL = 'http://192.168.100.2:5000'; 

const CourseSelectionScreen = ({ navigation }) => {
  const [userName, setUserName] = useState('Teacher');
  const [teacherId, setTeacherId] = useState(null);
  const [courses, setCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isCreating, setIsCreating] = useState(false);
  const [newCourseName, setNewCourseName] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  const fetchUserData = useCallback(async () => {
    setIsLoading(true);
    try {
      const userData = JSON.parse(await AsyncStorage.getItem('userData'));
      if (userData) {
        setUserName(userData.name);
        setTeacherId(userData.teacherId);
        setCourses(userData.courses || []);
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
      Alert.alert('Error', 'Could not load user data.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      fetchUserData();
    }, [fetchUserData])
  );
  
  const handleSelectCourse = (course) => {
    // Navigate to Dashboard, passing the selected course details
    navigation.navigate('Dashboard', { 
        courseId: course.id, 
        courseName: course.name,
        teacherId: teacherId,
        teacherName: userName,
    });
  };

  const handleCreateCourse = async () => {
    if (!newCourseName.trim()) {
      Alert.alert('Missing Name', 'Please enter a name for the new course.');
      return;
    }
    if (!teacherId) {
        Alert.alert('Error', 'Teacher ID missing. Please log in again.');
        return;
    }

    setIsCreating(true);

    try {
      const response = await fetch(`${API_BASE_URL}/api/courses/create`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ courseName: newCourseName, teacherId }),
      });

      const data = await response.json();

      if (response.ok) {
        // Update AsyncStorage and local state with the new course
        const currentData = JSON.parse(await AsyncStorage.getItem('userData'));
        const newCourses = [...currentData.courses, data.course];
        await AsyncStorage.setItem('userData', JSON.stringify({...currentData, courses: newCourses}));
        
        setCourses(newCourses);
        Alert.alert('Success', `Course "${newCourseName}" created successfully!`);
        setNewCourseName('');
        setModalVisible(false);
      } else {
        Alert.alert('Error', data.message || 'Failed to create course.');
      }
    } catch (error) {
      console.error('Error creating course:', error);
      Alert.alert('Network Error', 'Could not connect to the server.');
    } finally {
      setIsCreating(false);
    }
  };

  const handleLogout = async () => {
    await AsyncStorage.clear();
    navigation.replace('Login');
  };

  const renderCourseItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.courseItem} 
      onPress={() => handleSelectCourse(item)}
    >
      <Text style={styles.courseName}>{item.name}</Text>
      <Text style={styles.selectText}>Select Course &rarr;</Text>
    </TouchableOpacity>
  );

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.greetingText}>Welcome, {userName}! 👋</Text>
        <Text style={styles.instructionText}>Select a course to manage attendance:</Text>
      </View>

      <FlatList
        data={courses}
        renderItem={renderCourseItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.list}
        ListEmptyComponent={<Text style={styles.emptyText}>No courses assigned. Please create one!</Text>}
      />

      <TouchableOpacity style={styles.createButton} onPress={() => setModalVisible(true)}>
          <Text style={styles.createButtonText}>➕ Create New Course</Text>
      </TouchableOpacity>
      
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutButtonText}>Log Out</Text>
      </TouchableOpacity>

      {/* Modal for creating a new course */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalTitle}>Create New Course</Text>
            <TextInput
              style={styles.modalInput}
              placeholder="Enter Course Name"
              placeholderTextColor="#999"
              onChangeText={setNewCourseName}
              value={newCourseName}
              autoCapitalize="sentences"
            />
            <TouchableOpacity 
                style={styles.modalCreateBtn} 
                onPress={handleCreateCourse} 
                disabled={isCreating}
            >
              {isCreating ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={styles.modalButtonText}>Create Course</Text>
              )}
            </TouchableOpacity>
            <TouchableOpacity 
                style={styles.modalCancelBtn} 
                onPress={() => setModalVisible(false)}
                disabled={isCreating}
            >
              <Text style={styles.modalCancelText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    backgroundColor: '#4A90E2',
    padding: 25,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    marginBottom: 10,
  },
  greetingText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
  },
  instructionText: {
    fontSize: 16,
    color: '#E6EFFF',
  },
  list: {
    padding: 15,
  },
  courseItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 20,
    marginVertical: 8,
    borderRadius: 10,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  courseName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    flex: 1,
  },
  selectText: {
    color: '#4A90E2',
    fontWeight: 'bold',
  },
  createButton: {
    backgroundColor: '#5CB85C',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginHorizontal: 15,
    marginBottom: 10,
  },
  createButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  logoutButton: {
    padding: 15,
    alignItems: 'center',
  },
  logoutButtonText: {
    color: '#FF416C',
    fontSize: 16,
    fontWeight: 'bold',
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 50,
    fontSize: 16,
    color: '#888',
  },
  // Modal Styles
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: '80%',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#4A90E2',
  },
  modalInput: {
    width: '100%',
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    fontSize: 16,
  },
  modalCreateBtn: {
    backgroundColor: '#4A90E2',
    borderRadius: 10,
    padding: 15,
    elevation: 2,
    width: '100%',
    alignItems: 'center',
    marginBottom: 10,
  },
  modalButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  modalCancelBtn: {
    backgroundColor: '#ccc',
    borderRadius: 10,
    padding: 10,
    elevation: 2,
    width: '100%',
    alignItems: 'center',
  },
  modalCancelText: {
    color: '#333',
    fontWeight: 'bold',
  }
});

export default CourseSelectionScreen;