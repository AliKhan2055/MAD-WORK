// OrderConfirmationScreen.js
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const OrderConfirmationScreen = ({ route, navigation }) => {
  const { orderTotal } = route.params || { orderTotal: 320.00 };

  const DetailRow = ({ label, value }) => (
    <View style={styles.detailRow}>
      <Text style={styles.detailLabel}>{label}</Text>
      <Text style={styles.detailValue}>{value}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Icon name="checkmark-circle-sharp" size={100} color="#66ff00" style={styles.icon} />
        <Text style={styles.title}>Order Placed Successfully!</Text>
        <Text style={styles.subtitle}>Your order #XYZ-789-ABC has been confirmed and is being prepared for shipment.</Text>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Order Summary</Text>
          <DetailRow label="Order ID" value="XYZ-789-ABC" />
          <DetailRow label="Date" value="Oct 25, 2025" />
          <DetailRow label="Estimated Delivery" value="Nov 1, 2025" />
          <View style={styles.divider} />
          <DetailRow label="Total Amount Paid" value={`$${orderTotal.toFixed(2)}`} />
        </View>
        
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Shipping To</Text>
          <Text style={styles.shippingText}>Alex Smith</Text>
          <Text style={styles.shippingText}>123 Sneaker St, Comfort City, CA 90210</Text>
        </View>

        <TouchableOpacity 
          style={[styles.button, styles.primaryButton]}
          onPress={() => navigation.navigate('Profile')}
        >
          <Text style={styles.primaryButtonText}>View Order History</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.button}
          onPress={() => navigation.navigate('Home')}
        >
          <Text style={styles.secondaryButtonText}>Continue Shopping</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#121212' },
  scrollContent: { padding: 20, alignItems: 'center' },
  icon: { marginVertical: 40 },
  title: { color: '#fff', fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginBottom: 10 },
  subtitle: { color: '#aaa', fontSize: 16, textAlign: 'center', marginBottom: 30 },
  card: { backgroundColor: '#222', borderRadius: 15, padding: 20, width: '100%', marginBottom: 20 },
  cardTitle: { color: '#fff', fontSize: 18, fontWeight: 'bold', marginBottom: 10 },
  detailRow: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 5 },
  detailLabel: { color: '#aaa', fontSize: 16 },
  detailValue: { color: '#fff', fontSize: 16, fontWeight: '600' },
  divider: { borderBottomWidth: 1, borderBottomColor: '#333', marginVertical: 10 },
  shippingText: { color: '#fff', fontSize: 16, lineHeight: 24 },
  button: { paddingVertical: 15, borderRadius: 12, width: '100%', alignItems: 'center', marginTop: 15 },
  primaryButton: { backgroundColor: '#66ff00' },
  primaryButtonText: { color: '#000', fontSize: 18, fontWeight: 'bold' },
  secondaryButtonText: { color: '#66ff00', fontSize: 18, fontWeight: 'bold' },
});

export default OrderConfirmationScreen;