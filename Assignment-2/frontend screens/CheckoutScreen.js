// CheckoutScreen.js
import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const CheckoutScreen = ({ route, navigation }) => {
  const { total } = route.params || { total: 320.00 }; // Default total
  const [shippingAddress, setShippingAddress] = useState("123 Sneaker St, Comfort City, CA 90210");
  const [paymentMethod, setPaymentMethod] = useState("Credit Card");

  const handlePlaceOrder = () => {
    // Logic to process the order (simplified)
    navigation.navigate('OrderConfirmation', { orderTotal: total });
  };

  const DetailRow = ({ label, value }) => (
    <View style={styles.detailRow}>
      <Text style={styles.detailLabel}>{label}</Text>
      <Text style={styles.detailValue}>{value}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back-outline" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Checkout</Text>
        <View style={{ width: 24 }} />
      </View>
      
      <ScrollView style={styles.scrollView}>
        
        {/* Shipping Details Section */}
        <Text style={styles.sectionTitle}>Shipping Details</Text>
        <View style={styles.card}>
          <TextInput
            style={styles.input}
            placeholder="Full Name"
            placeholderTextColor="#aaa"
            defaultValue="Alex Smith"
          />
          <TextInput
            style={styles.input}
            placeholder="Address"
            placeholderTextColor="#aaa"
            value={shippingAddress}
            onChangeText={setShippingAddress}
            multiline
          />
          <TextInput
            style={styles.input}
            placeholder="Phone Number"
            placeholderTextColor="#aaa"
            defaultValue="+1 (281) 602-9912"
            keyboardType="phone-pad"
          />
        </View>

        {/* Payment Method Section */}
        <Text style={styles.sectionTitle}>Payment Method</Text>
        <View style={styles.card}>
          {['Credit Card', 'PayPal', 'Apple Pay'].map((method) => (
            <TouchableOpacity 
              key={method}
              style={styles.paymentOption}
              onPress={() => setPaymentMethod(method)}
            >
              <Text style={styles.paymentText}>{method}</Text>
              <Icon 
                name={paymentMethod === method ? "radio-button-on" : "radio-button-off"} 
                size={20} 
                color={paymentMethod === method ? "#66ff00" : "#aaa"} 
              />
            </TouchableOpacity>
          ))}
        </View>

        {/* Order Summary */}
        <Text style={styles.sectionTitle}>Order Summary</Text>
        <View style={styles.card}>
            <DetailRow label="Subtotal" value={`$${(total - 25).toFixed(2)}`} />
            <DetailRow label="Shipping" value="$25.00" />
            <View style={styles.divider} />
            <DetailRow label="Total" value={`$${total.toFixed(2)}`} />
        </View>

      </ScrollView>

      <TouchableOpacity
        style={styles.placeOrderButton}
        onPress={handlePlaceOrder}
      >
        <Text style={styles.buttonText}>Place Order - ${total.toFixed(2)}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#121212' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 20, paddingTop: 60 },
  headerTitle: { color: '#fff', fontSize: 20, fontWeight: 'bold' },
  scrollView: { flex: 1, paddingHorizontal: 20 },
  sectionTitle: { color: '#fff', fontSize: 18, fontWeight: 'bold', marginTop: 20, marginBottom: 10 },
  card: { backgroundColor: '#222', borderRadius: 15, padding: 15, marginBottom: 10 },
  input: { backgroundColor: '#333', color: '#fff', padding: 15, borderRadius: 10, marginBottom: 10, fontSize: 16 },
  paymentOption: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: '#333' },
  paymentText: { color: '#fff', fontSize: 16 },
  detailRow: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 5 },
  detailLabel: { color: '#aaa', fontSize: 16 },
  detailValue: { color: '#fff', fontSize: 16, fontWeight: '600' },
  divider: { borderBottomWidth: 1, borderBottomColor: '#333', marginVertical: 10 },
  placeOrderButton: { backgroundColor: '#66ff00', paddingVertical: 18, marginHorizontal: 20, marginBottom: 30, borderRadius: 12, justifyContent: 'center', alignItems: 'center' },
  buttonText: { color: '#000', fontSize: 18, fontWeight: 'bold' },
});

export default CheckoutScreen;