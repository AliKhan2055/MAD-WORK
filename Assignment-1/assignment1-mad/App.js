import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CreatePostScreen from './screens/CreatePostScreen';
import HomeFeedScreen from './screens/HomeFeedScreen';
import LoginSignupScreen from './screens/LoginSignupScreen';
import ProfileScreen from './screens/ProfileScreen';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="LoginSignup">
        <Stack.Screen name="LoginSignup" component={LoginSignupScreen} options={{ title: 'Login / Signup' }} />
        <Stack.Screen name="HomeFeed" component={HomeFeedScreen} options={{ title: 'Home Feed' }} />
        <Stack.Screen name="CreatePost" component={CreatePostScreen} options={{ title: 'Create Post' }} />
        <Stack.Screen name="Profile" component={ProfileScreen} options={{ title: 'Profile' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;