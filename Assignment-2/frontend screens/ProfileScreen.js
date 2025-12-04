// ProfileScreen.js
import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const ProfileScreen = ({ navigation }) => {
  const settingsOptions = [
    { name: 'Edit Profile', icon: 'person-outline' },
    { name: 'Shipping Addresses', icon: 'location-outline' },
    { name: 'Payment Methods', icon: 'card-outline' },
    { name: 'My Reviews', icon: 'star-half-outline' },
  ];

  const OrderHistoryItem = ({ id, date, total, status }) => (
    <View style={styles.orderCard}>
      <Text style={styles.orderId}>Order #{id}</Text>
      <View style={styles.orderDetailRow}>
        <Text style={styles.orderDate}>{date}</Text>
        <Text style={styles.orderStatus}>{status}</Text>
      </View>
      <Text style={styles.orderTotal}>Total: <Text style={styles.orderTotalValue}>${total}</Text></Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back-outline" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Profile</Text>
        <TouchableOpacity>
          <Icon name="log-out-outline" size={24} color="#66ff00" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scrollView}>
        
        {/* User Info Card */}
        <View style={styles.userInfoCard}>
          <Image 
            source={{ uri: 'https://i.pravatar.cc/150?img=1' }}
            style={styles.profileImage}
          />
          <Text style={styles.userName}>Alex Smith</Text>
          <Text style={styles.userEmail}>alex.smith@example.com</Text>
        </View>

        {/* Settings/Options Section */}
        <Text style={styles.sectionTitle}>Account Settings</Text>
        <View style={styles.settingsCard}>
          {settingsOptions.map((option, index) => (
            <TouchableOpacity key={index} style={styles.settingRow}>
              <Icon name={option.icon} size={20} color="#66ff00" style={{ marginRight: 15 }} />
              <Text style={styles.settingText}>{option.name}</Text>
              <Icon name="chevron-forward-outline" size={20} color="#aaa" style={{ marginLeft: 'auto' }} />
            </TouchableOpacity>
          ))}
        </View>

        {/* Order History Section */}
        <Text style={styles.sectionTitle}>Order History</Text>
        <OrderHistoryItem id="XYZ-789-ABC" date="Oct 25, 2025" total="320.00" status="Delivered" />
        <OrderHistoryItem id="ABC-456-DEF" date="Sep 10, 2025" total="175.00" status="Shipped" />
        <OrderHistoryItem id="JKL-123-MNO" date="Aug 01, 2025" total="499.99" status="Cancelled" />

      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#121212' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 20, paddingTop: 60 },
  headerTitle: { color: '#fff', fontSize: 20, fontWeight: 'bold' },
  scrollView: { flex: 1, paddingHorizontal: 20 },
  userInfoCard: { alignItems: 'center', padding: 20, marginBottom: 20 },
  profileImage: { width: 80, height: 80, borderRadius: 40, borderWidth: 3, borderColor: '#66ff00', marginBottom: 10 },
  userName: { color: '#fff', fontSize: 22, fontWeight: 'bold' },
  userEmail: { color: '#aaa', fontSize: 14, marginBottom: 20 },
  sectionTitle: { color: '#fff', fontSize: 18, fontWeight: 'bold', marginTop: 10, marginBottom: 10 },
  settingsCard: { backgroundColor: '#222', borderRadius: 15, marginBottom: 20, paddingHorizontal: 15 },
  settingRow: { flexDirection: 'row', alignItems: 'center', paddingVertical: 15, borderBottomWidth: 1, borderBottomColor: '#333' },
  settingText: { color: '#fff', fontSize: 16 },
  orderCard: { backgroundColor: '#222', borderRadius: 15, padding: 15, marginBottom: 10 },
  orderId: { color: '#fff', fontSize: 16, fontWeight: 'bold', marginBottom: 5 },
  orderDetailRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 5 },
  orderDate: { color: '#aaa', fontSize: 14 },
  orderStatus: { color: '#66ff00', fontSize: 14, fontWeight: 'bold' },
  orderTotal: { color: '#fff', fontSize: 16, marginTop: 5 },
  orderTotalValue: { color: '#66ff00', fontWeight: 'bold' },
});

export default ProfileScreen;