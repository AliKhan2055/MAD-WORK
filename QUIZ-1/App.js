// App.js 
// ... (imports remain the same)
import CourseSelectionScreen from './screens/CourseSelectionScreen'; 
// ...

const Stack = createNativeStackNavigator();

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // ... (checkLoginStatus useEffect remains the same)
  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const storedLogin = await AsyncStorage.getItem('isLoggedIn');
        if (storedLogin === 'true') {
          setIsLoggedIn(true);
        }
      } catch (e) {
        console.error("Failed to read login status:", e);
      } finally {
        setIsLoading(false);
      }
    };
    checkLoginStatus();
  }, []);
  // ...

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={isLoggedIn ? "CourseSelection" : "Login"}>
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Register" component={RegisterScreen} options={{ title: 'Create Account' }} />
        {/* NEW SCREEN */}
        <Stack.Screen name="CourseSelection" component={CourseSelectionScreen} options={{ headerShown: false }} /> 
        {/* Dashboard now requires params */}
        <Stack.Screen name="Dashboard" component={DashboardScreen} options={{ title: 'Course Dashboard' }} />
        <Stack.Screen name="TeacherProfile" component={TeacherProfileScreen} options={{ title: 'Teacher Profile' }} />
        <Stack.Screen name="TakeAttendance" component={StudentsScreen} options={{ title: 'Take Attendance' }} />
        <Stack.Screen name="AddStudent" component={AddStudentScreen} options={{ title: 'Add Students to Course' }} />
        <Stack.Screen name="AttendanceRecord" component={AttendanceRecordScreen} options={{ title: 'Attendance Summary' }} />
        <Stack.Screen name="AttendanceDetail" component={AttendanceDetailScreen} options={{ title: 'Daily Details' }} /> 
      </Stack.Navigator>
    </NavigationContainer>
  );
}
// ... (styles remain the same)
export default App;