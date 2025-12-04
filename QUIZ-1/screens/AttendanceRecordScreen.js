// screens/AttendanceRecordScreen.js - MODIFIED

// ... (imports remain the same)

const AttendanceRecordScreen = ({ route, navigation }) => {
  const { courseId } = route.params; // Get courseId from route.params

  // ... (state hooks remain the same)

  const fetchAttendanceSummary = useCallback(async () => {
    setIsLoading(true);
    try {
      // Use courseId from route.params
      if (!courseId) {
        Alert.alert('Error', 'Course ID missing. Cannot fetch records.');
        return;
      }

      const response = await fetch(`${API_BASE_URL}/api/attendance/summary/${courseId}`);
      // ... (rest of logic remains the same)
    } catch (error) {
      // ... (error handling remains the same)
    } finally {
      setIsLoading(false);
    }
  }, [courseId]); // Add courseId as dependency

  // ... (useFocusEffect and renderSummaryItem remain the same)

  // ... (rest of component logic remains the same)
};

export default AttendanceRecordScreen;