// screens/CartScreen.js
import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

// Corrected Cart Initialization Data (using URIs)

const initialCart = [
  // When using a web image, the 'source' prop in the <Image> component 
  // expects an object: { uri: '...' }.
  
  { 
    id: '1', 
    name: 'Air Max Plus Comfort', 
    price: 175, 
    quantity: 1, 
    // Use 'imageUri' as the key to hold the web link
    imageUri: 'https://static.nike.com/a/images/t_web_pdp_535_v2/f_auto/40941857-a0c6-4332-ba26-e35de6c56dc4/WMNS+NIKE+AIR+WINFLO+11.png' 
  }, 
  { 
    id: '2', 
    name: 'Zoom Runner X', 
    price: 120, 
    quantity: 2, 
    imageUri: 'https://static.nike.com/a/images/t_web_pdp_535_v2/f_auto/3bca6e2a-432f-4c77-a8b0-12640909708b/JA+3.png'
  },
];

const CartScreen = ({ navigation }) => {
  const [cartItems, setCartItems] = useState(initialCart);

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = 25.00;
  const total = subtotal + shipping;

  const updateQuantity = (id, change) => {
    setCartItems(currentItems => 
      currentItems.map(item => 
        item.id === id 
          ? { ...item, quantity: Math.max(1, item.quantity + change) } 
          : item
      )
    );
  };

  const removeItem = (id) => {
    setCartItems(currentItems => currentItems.filter(item => item.id !== id));
  };

  const CartItem = ({ item }) => (
    <View style={styles.cartItem}>
      <Image source={item.image} style={styles.cartItemImage} resizeMode="contain" />
      <View style={styles.itemDetails}>
        <Text style={styles.itemName}>{item.name}</Text>
        <Text style={styles.itemPrice}>${item.price.toFixed(2)}</Text>
      </View>
      <View style={styles.quantityControl}>
        <TouchableOpacity onPress={() => updateQuantity(item.id, -1)}>
          <Icon name="remove-circle-outline" size={24} color="#66ff00" />
        </TouchableOpacity>
        <Text style={styles.itemQuantity}>{item.quantity}</Text>
        <TouchableOpacity onPress={() => updateQuantity(item.id, 1)}>
          <Icon name="add-circle-outline" size={24} color="#66ff00" />
        </TouchableOpacity>
      </View>
      <TouchableOpacity onPress={() => removeItem(item.id)} style={styles.removeButton}>
          <Icon name="close-circle-outline" size={20} color="#aaa" />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back-outline" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Shopping cart</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView style={styles.scrollView}>
        {cartItems.map(item => <CartItem key={item.id} item={item} />)}
      </ScrollView>

      <View style={styles.priceSummary}>
        <View style={styles.priceRow}>
          <Text style={styles.summaryText}>Subtotal</Text>
          <Text style={styles.summaryValue}>${subtotal.toFixed(2)}</Text>
        </View>
        <View style={styles.priceRow}>
          <Text style={styles.summaryText}>Shipping</Text>
          <Text style={styles.summaryValue}>${shipping.toFixed(2)}</Text>
        </View>
        <View style={[styles.priceRow, styles.totalRow]}>
          <Text style={styles.totalText}>Total</Text>
          <Text style={styles.totalValue}>${total.toFixed(2)}</Text>
        </View>
      </View>

      <TouchableOpacity
        style={styles.checkoutButton}
        onPress={() => navigation.navigate('Checkout', { total })}
      >
        <Text style={styles.buttonText}>Proceed to checkout</Text>
      </TouchableOpacity>
    </View>
  );
};
// ... (styles remain the same)
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#121212' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 20, paddingTop: 60 },
  headerTitle: { color: '#fff', fontSize: 20, fontWeight: 'bold' },
  scrollView: { flex: 1, paddingHorizontal: 20 },
  cartItem: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#222', borderRadius: 15, padding: 10, marginBottom: 15 },
  cartItemImage: { width: 60, height: 60, marginRight: 15 },
  itemDetails: { flex: 1 },
  itemName: { color: '#fff', fontSize: 14, fontWeight: '600', marginBottom: 5 },
  itemPrice: { color: '#aaa', fontSize: 14 },
  quantityControl: { flexDirection: 'row', alignItems: 'center', marginRight: 10 },
  itemQuantity: { color: '#fff', marginHorizontal: 10, fontSize: 16, fontWeight: 'bold' },
  removeButton: { position: 'absolute', top: 5, right: 5 },
  priceSummary: { backgroundColor: '#222', padding: 20, margin: 20, borderRadius: 15 },
  priceRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 },
  summaryText: { color: '#aaa', fontSize: 16 },
  summaryValue: { color: '#fff', fontSize: 16, fontWeight: '600' },
  totalRow: { borderTopWidth: 1, borderTopColor: '#333', marginTop: 10, paddingTop: 10 },
  totalText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
  totalValue: { color: '#66ff00', fontSize: 20, fontWeight: 'bold' },
  checkoutButton: { backgroundColor: '#66ff00', paddingVertical: 18, marginHorizontal: 20, marginBottom: 30, borderRadius: 12, justifyContent: 'center', alignItems: 'center' },
  buttonText: { color: '#000', fontSize: 18, fontWeight: 'bold' },
});

export default CartScreen;