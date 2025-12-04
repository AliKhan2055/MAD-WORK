// screens/AttendanceDetailScreen.js

import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator, Alert } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons'; 

const API_BASE_URL = 'http://192.168.100.2:5000'; 

const AttendanceDetailScreen = ({ route }) => {
  const { date, courseId, displayDate } = route.params;
  const [details, setDetails] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchAttendanceDetails = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/api/attendance/details/${date}/${courseId}`);
      const data = await response.json();
      setDetails(data);
    } catch (error) {
      console.error('Error fetching attendance details:', error);
      Alert.alert('Error', 'Could not load daily attendance details.');
    } finally {
      setIsLoading(false);
    }
  }, [date, courseId]);

  useFocusEffect(
    useCallback(() => {
      fetchAttendanceDetails();
    }, [fetchAttendanceDetails])
  );

  const renderDetailItem = ({ item }) => {
    const isPresent = item.status === 'P';
    const iconName = isPresent ? 'checkmark-circle' : 'close-circle';
    const iconColor = isPresent ? '#5CB85C' : '#FF416C';

    return (
      <View style={styles.detailItem}>
        <View style={styles.studentInfo}>
          <Text style={styles.rollNo}>#{item.rollNo}</Text>
          <Text style={styles.name}>{item.name}</Text>
        </View>
        <Ionicons name={iconName} size={30} color={iconColor} />
      </View>
    );
  };

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
        <Text style={styles.headerText}>Records for: {displayDate}</Text>
      </View>
      <FlatList
        data={details}
        renderItem={renderDetailItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.list}
        ListEmptyComponent={<Text style={styles.emptyText}>No student records found for this date.</Text>}
      />
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
    padding: 15,
    backgroundColor: '#4A90E2',
    alignItems: 'center',
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    marginBottom: 10,
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  list: {
    padding: 10,
  },
  detailItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 15,
    marginVertical: 6,
    borderRadius: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  studentInfo: {
    flex: 1,
  },
  rollNo: {
    fontSize: 12,
    color: '#888',
  },
  name: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 50,
    fontSize: 16,
    color: '#888',
  }
});

export default AttendanceDetailScreen;