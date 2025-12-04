// screens/TeacherProfileScreen.js - MODIFIED for Multi-Course

// ... (imports remain the same)

const TeacherProfileScreen = ({ route }) => {
  const { teacherId } = route.params; // Get teacherId from route.params

  // ... (state hooks remain the same)

  const fetchProfileData = useCallback(async () => {
    setIsLoading(true);
    try {
      if (!teacherId) {
        Alert.alert('Error', 'Teacher ID missing.');
        return;
      }

      // Fetch detailed profile data from the server using the teacherId
      const response = await fetch(`${API_BASE_URL}/api/profile/${teacherId}`);
      // ... (rest of logic remains the same)
      
      const data = await response.json();
      setProfile(data);

    } catch (error) {
      // ... (error handling remains the same)
    } finally {
      setIsLoading(false);
    }
  }, [teacherId]); // Dependency on teacherId

  // ... (useFocusEffect remains the same)

  // ... (loading and error checks remain the same)

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        {/* ... (card content remains the same) */}
      </View>

      <View style={styles.infoSection}>
        <Text style={styles.sectionTitle}>Summary</Text>
        <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Total Courses Taught:</Text>
            <Text style={styles.infoValue}>{profile.totalCourses}</Text>
        </View>
        <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Total Students Across All Courses:</Text>
            <Text style={styles.infoValue}>{profile.totalStudents}</Text>
        </View>
      </View>
      
      <View style={styles.courseSection}>
        <Text style={styles.sectionTitle}>Courses</Text>
        {profile.courseList.map((courseName, index) => (
            <Text key={index} style={styles.courseItemText}>
                • {courseName}
            </Text>
        ))}
      </View>
    </View>
  );
};

// ... (styles remain the same, add courseSection and courseItemText styles)
const styles = StyleSheet.create({
  // ... (previous styles)
  courseSection: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    marginTop: 20,
    elevation: 2,
  },
  courseItemText: {
    fontSize: 16,
    color: '#333',
    paddingVertical: 5,
  }
});

export default TeacherProfileScreen;