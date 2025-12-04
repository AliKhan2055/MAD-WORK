// screens/StudentsScreen.js (Take Attendance) - MODIFIED

// ... (imports remain the same)

const StudentsScreen = ({ route, navigation }) => {
  const { courseId, courseName } = route.params; // Get courseId from route.params

  // ... (state hooks remain the same)

  const fetchStudents = useCallback(async () => {
    setIsLoading(true);
    try {
      // Use courseId from route.params
      if (!courseId) {
        Alert.alert('Error', 'Course ID missing.');
        return;
      }

      // 1. Fetch Students
      const studentResponse = await fetch(`${API_BASE_URL}/api/students/${courseId}`);
      // ... (rest of logic remains the same)
      
      // 2. Pre-fill attendance with saved records
      const detailsResponse = await fetch(`${API_BASE_URL}/api/attendance/details/${today}/${courseId}`);
      // ... (rest of logic remains the same)

    } catch (error) {
      // ... (error handling remains the same)
    } finally {
      setIsLoading(false);
    }
  }, [today, courseId]); // Add courseId as dependency

  // ... (useFocusEffect and other functions remain the same)

  const handleSaveAttendance = async () => {
    // ... (check students.length remains the same)
    
    setIsSaving(true);
    
    // ... (records formatting remains the same)

    try {
      // Use courseId from route.params
      const response = await fetch(`${API_BASE_URL}/api/attendance/${courseId}`, {
        // ... (rest of fetch options remains the same)
      });
      // ... (rest of save logic remains the same)
    } catch (error) {
      // ... (error handling remains the same)
    } finally {
      setIsSaving(false);
    }
  };

  // ... (renderStudentItem remains the same)

  if (isLoading) {
    // ... (loading view remains the same)
  }

  return (
    <View style={styles.screenContainer}>
      <Text style={styles.courseHeader}>{courseName}</Text> {/* Display Course Name */}
      <Text style={styles.dateHeader}>Date: {today}</Text>
      {/* ... (FlatList and save button remain the same) */}
    </View>
  );
};

// ... (styles remain the same, add courseHeader style)
const styles = StyleSheet.create({
  // ... (previous styles)
  courseHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingTop: 10,
    backgroundColor: '#fff',
    color: '#4A90E2',
  },
  dateHeader: {
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
    paddingBottom: 15,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
});

export default StudentsScreen;