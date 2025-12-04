import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRoute } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { useEffect, useState, useCallback } from 'react';
import {
  FlatList,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

// Dummy data with details and an initial state for expansion
const dummySkillsData = [
  {
    id: 1,
    user: 'Muhammad Rameez',
    time: '2 hours ago',
    category: 'Gaming',
    title: 'PUBG Master',
    description:
      'Offering lessons to improve your skills in PUBG Mobile. Learn advanced strategies, map awareness, and pro-level shooting techniques. From beginner to master in a few sessions.',
    isExpanded: false,
  },
  {
    id: 2,
    user: 'Abdul Basit',
    time: '1 day ago',
    category: 'Web Development',
    title: 'Web Developer - Frontend and Backend',
    description:
      'Professional web developer with 10+ years experience offering lessons for all skill levels. Learn frontend and backend development from scratch.',
    isExpanded: false,
  },
  {
    id: 3,
    user: 'Muhammad Ali',
    time: '3 days ago',
    category: 'Cybersecurity',
    title: 'Ethical Hacking',
    description:
      'Learn the fundamentals of cybersecurity and ethical hacking. Protect your own systems by understanding how hackers think and operate. This course is for security enthusiasts and professionals.',
    isExpanded: false,
  },
  {
    id: 4,
    user: 'Fatima',
    time: '4 days ago',
    category: 'Languages',
    title: 'French Conversation',
    description:
      'Improve your French conversational skills with native speaker. We will focus on speaking practice, vocabulary building, and pronunciation in a relaxed environment.',
    isExpanded: false,
  },
];

const HomeScreen = ({ navigation }) => {
  const [skills, setSkills] = useState([]);

  // Load data from AsyncStorage and combine with dummy data
  const loadSkills = useCallback(async () => {
    try {
      const storedSkills = await AsyncStorage.getItem('skillsData');
      const storedData = storedSkills ? JSON.parse(storedSkills) : [];
      
      const combinedData = [...storedData, ...dummySkillsData];
      
      // Filter out duplicates based on a unique key
      const uniqueSkills = combinedData.reduce((acc, current) => {
        const x = acc.find(item => item.id === current.id);
        if (!x) {
          return acc.concat([current]);
        } else {
          return acc;
        }
      }, []);

      setSkills(uniqueSkills);
    } catch (e) {
      console.error('Failed to load skills from storage', e);
      setSkills(dummySkillsData);
    }
  }, []);

  // Use the focus listener to reload data every time the screen is focused
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      loadSkills();
    });

    return unsubscribe;
  }, [navigation, loadSkills]);

  // Function to clear all stored data in AsyncStorage
  const clearSkillsData = async () => {
    try {
      await AsyncStorage.removeItem('skillsData');
      console.log('Skills data cleared successfully!');
      // After clearing, reset the state to dummy data
      setSkills(dummySkillsData);
    } catch (e) {
      console.error('Failed to clear skills data from storage', e);
    }
  };

  // Function to toggle the expanded state of a skill item
  const handleToggleDetails = (id) => {
    setSkills(
      skills.map((skill) =>
        skill.id === id ? { ...skill, isExpanded: !skill.isExpanded } : skill
      )
    );
  };

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <View>
          <Text style={styles.userName}>{item.user}</Text>
          <Text style={styles.timeAgo}>{item.time}</Text>
        </View>
        <Text style={styles.categoryTag}>{item.category}</Text>
      </View>
      <Text style={styles.skillTitle}>{item.title}</Text>

      {/* Conditional rendering for details based on isExpanded state */}
      {item.isExpanded && (
        <>
          <Text style={styles.description}>{item.description}</Text>
          <TouchableOpacity onPress={() => handleToggleDetails(item.id)}>
            <Text style={styles.hideDetailsText}>Hide Details</Text>
          </TouchableOpacity>
        </>
      )}

      {/* Show View Details link if not expanded */}
      {!item.isExpanded && (
        <TouchableOpacity onPress={() => handleToggleDetails(item.id)}>
          <Text style={styles.viewDetailsText}>View Details</Text>
        </TouchableOpacity>
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#4a008a', '#9c27b0']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.headerBackground}
      />
      
      <View style={styles.headerContent}>
        <Text style={styles.availableSkillsTitle}>Available Skills</Text>
        <TouchableOpacity
          style={styles.profileButtonTop}
          onPress={() => navigation.navigate('Profile')}
        >
          <Text style={styles.profileButtonTextTop}>Profile</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        <FlatList
          data={skills}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.listContent} 
        />
      </View>

      <View style={styles.createPostButtonContainer}>
        <TouchableOpacity
          style={styles.createPostButton}
          onPress={() => navigation.navigate('CreatePost')}
        >
          <Text style={styles.createPostButtonText}>Create Post</Text>
        </TouchableOpacity>
        {/* Button to clear local storage */}
        <TouchableOpacity
          style={styles.clearDataButton}
          onPress={clearSkillsData}
        >
          <Text style={styles.clearDataButtonText}>Clear Stored Data</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F4F9',
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
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  availableSkillsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  profileButtonTop: {
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 12,
  },
  profileButtonTextTop: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  content: {
    flex: 1,
    paddingTop: 10,
    paddingHorizontal: 15,
  },
  listContent: {
    paddingBottom: 80,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 18,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
    marginBottom: 15,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  userName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  timeAgo: {
    fontSize: 12,
    color: '#888',
  },
  categoryTag: {
    backgroundColor: '#E6E6FA',
    color: '#4a008a',
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 15,
    fontSize: 12,
    fontWeight: 'bold',
  },
  skillTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    color: '#555',
    lineHeight: 20,
    marginBottom: 10,
  },
  viewDetailsText: {
    fontSize: 14,
    color: '#4a008a',
    fontWeight: '600',
    marginTop: 5,
  },
  hideDetailsText: {
    fontSize: 14,
    color: '#FF6347',
    fontWeight: '600',
    marginTop: 5,
  },
  createPostButtonContainer: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    // Add flexDirection to arrange buttons side by side
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  createPostButton: {
    backgroundColor: '#4a008a',
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
    flex: 1, // Make this button take up space
    marginRight: 10, // Add some space between buttons
  },
  createPostButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  clearDataButton: {
    backgroundColor: '#d32f2f', // A different color for visibility
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
    flex: 0.5, // Make this button smaller
  },
  clearDataButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
    textAlign: 'center',
  },
});

export default HomeScreen;