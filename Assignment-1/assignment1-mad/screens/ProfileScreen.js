import { LinearGradient } from 'expo-linear-gradient';
import { Image, Platform, ScrollView, StyleSheet, Text, View } from 'react-native';

const user = {
  name: 'Your Name',
  skills: ['React Native', 'Guitar', 'Photography'],
  bio: 'A passionate developer and musician looking to share my skills with the world. I enjoy collaborating on projects and helping others grow their skills.',
  profileImage: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'
};

const ProfileScreen = () => {
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#4a008a', '#9c27b0']} // Dark purple to lighter purple gradient
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.background}
      />
      
      {/* White Text Logo and Tagline */}
      <View style={styles.headerContent}>
        <Text style={styles.mainTitle}>SkillSwap.</Text>
        <Text style={styles.tagline}>learn, teach, grow together</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scroll}>
        <View style={styles.card}>
          <Image source={{ uri: user.profileImage }} style={styles.profileImage} />
          <Text style={styles.name}>{user.name}</Text>
          <Text style={styles.bio}>{user.bio}</Text>

          <View style={styles.skillsSection}>
            <Text style={styles.skillsTitle}>My Skills</Text>
            <View style={styles.skillsContainer}>
              {user.skills.map((skill, index) => (
                <View key={index} style={styles.skillBadge}>
                  <Text style={styles.skillText}>{skill}</Text>
                </View>
              ))}
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  headerContent: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 60 : 40,
    width: '100%',
    alignItems: 'center',
    zIndex: 1,
  },
  mainTitle: {
    fontSize: 40,
    fontWeight: '900',
    color: '#fff', // White title text
    letterSpacing: -1,
  },
  tagline: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.8)',
    marginTop: 5,
    textTransform: 'lowercase',
  },
  scroll: {
    flexGrow: 1,
    padding: 24,
    justifyContent: 'center',
    paddingTop: Platform.OS === 'ios' ? 160 : 180,
  },
  card: {
    backgroundColor: '#ffffff', // White card background
    borderRadius: 16,
    padding: 24,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 12,
    elevation: 6,
    alignItems: 'center',
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 16,
    borderWidth: 3,
    borderColor: '#9c27b0', // Lighter purple border
  },
  name: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333', // Dark text for readability
    marginBottom: 8,
    textAlign: 'center',
  },
  bio: {
    fontSize: 16,
    color: '#666', // Slightly lighter dark text
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 22,
  },
  skillsSection: {
    width: '100%',
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
    paddingTop: 24,
  },
  skillsTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 12,
    textAlign: 'center',
  },
  skillsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 8,
  },
  skillBadge: {
    backgroundColor: '#9c27b0', // Purple skill badges
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    margin: 4,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
  },
  skillText: {
    color: '#fff', // White text on purple badge
    fontSize: 14,
    fontWeight: '500',
  },
});

export default ProfileScreen;