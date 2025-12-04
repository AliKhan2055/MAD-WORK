// screens/AddStudentScreen.js - MODIFIED

// ... (imports remain the same)

const AddStudentScreen = ({ route, navigation }) => {
  const { courseId, courseName } = route.params; // Get courseId from route.params

  // ... (state hooks remain the same)

  const handleAddStudent = async () => {
    // ... (input validation remains the same)

    setIsLoading(true);

    try {
      // Directly use courseId from route.params
      if (!courseId) {
        Alert.alert('Error', 'Course ID missing. Cannot add student.');
        return;
      }

      const response = await fetch(`${API_BASE_URL}/api/students/${courseId}`, {
        // ... (rest of fetch options remains the same)
      });
      // ... (rest of logic remains the same)
    } catch (error) {
      // ... (error handling remains the same)
    } finally {
      setIsLoading(false);
    }
  };

  // ... (GenderOption and render logic remains the same)

  return (
    <KeyboardAvoidingView 
      style={styles.container} 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.title}>Enroll New Student to:</Text>
        <Text style={styles.courseTitle}>{courseName}</Text> {/* Display Course Name */}
        {/* ... (input fields and buttons remain the same) */}
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

// ... (styles remain the same, add courseTitle style)
const styles = StyleSheet.create({
  // ... (previous styles)
  courseTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
    marginBottom: 30,
  }
});

export default AddStudentScreen;