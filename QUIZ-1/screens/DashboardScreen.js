// screens/DashboardScreen.js - Updated to use route.params

// ... (imports remain the same)
import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, ActivityIndicator, Alert } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import InfoCard from '../components/InfoCard'; 

const API_BASE_URL = 'http://192.168.100.2:5000'; 

const DashboardScreen = ({ route, navigation }) => {
  // Get course and teacher info from navigation parameters
  const { courseId, courseName, teacherId, teacherName } = route.params;

  const [totalStudents, setTotalStudents] = useState(0);
  const [attendanceSummary, setAttendanceSummary] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchDashboardData = useCallback(async () => {
    setIsLoading(true);
    try {
        // 1. Fetch Total Students (using courseId from route.params)
        const studentResponse = await fetch(`${API_BASE_URL}/api/students/${courseId}`);
        const studentData = await studentResponse.json();
        setTotalStudents(studentData.length);

        // 2. Fetch Attendance Summary (using courseId from route.params)
        const summaryResponse = await fetch(`${API_BASE_URL}/api/attendance/summary/${courseId}`);
        const summaryData = await summaryResponse.json();
        setAttendanceSummary(summaryData);
        
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      Alert.alert('Error', 'Could not load course data.');
    } finally {
      setIsLoading(false);
    }
  }, [courseId]); // Dependency on courseId ensures data refreshes when switching courses

  useFocusEffect(
    useCallback(() => {
      fetchDashboardData();
    }, [fetchDashboardData])
  );

  const today = new Date().toISOString().split('T')[0];
  const todaySummary = attendanceSummary.find(s => s.date === today);

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity 
        onPress={() => navigation.navigate('TeacherProfile', { teacherId })} 
        style={styles.header}
      >
        <Text style={styles.greetingText}>Hello, {teacherName}! 👋</Text>
        <Text style={styles.courseText}>Course: {courseName}</Text>
        <Text style={styles.profileLink}>View My Courses/Profile</Text>
      </TouchableOpacity>

      <View style={styles.summaryContainer}>
        {/* InfoCards remain the same */}
      </View>

      <View style={styles.actionsContainer}>
        {/* Pass course-specific details to child screens */}
        <TouchableOpacity style={styles.actionButton} onPress={() => navigation.navigate('TakeAttendance', { courseId, courseName })}>
          <Text style={styles.buttonText}>✏️ Take Attendance</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton} onPress={() => navigation.navigate('AttendanceRecord', { courseId, courseName })}>
          <Text style={styles.buttonText}>📊 View Records</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton} onPress={() => navigation.navigate('AddStudent', { courseId, courseName })}>
          <Text style={styles.buttonText}>🧑‍🎓 Add Students</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.actionButton, styles.changeCourseButton]} onPress={() => navigation.navigate('CourseSelection')}>
          <Text style={[styles.buttonText, { color: '#4A90E2' }]}>Change Course</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};
// ... (styles remain the same)
const styles = StyleSheet.create({
    // ... (All previous styles)
    changeCourseButton: {
        borderColor: '#4A90E2',
        borderWidth: 1,
        marginTop: 20,
    }
});
export default DashboardScreen;