import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import API_URL from '../apiConfig'; // This will work now

// DEFINE THE TYPE FOR A MENU ITEM
interface MenuItem {
  _id: string;
  name: string;
  category: string;
  price: number;
  inStock: boolean;
}

export default function MenuScreen() {
  const [menu, setMenu] = useState<MenuItem[]>([]); // Use the type
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const response = await fetch(`${API_URL}/menu`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data: MenuItem[] = await response.json(); // Use the type
        setMenu(data);
      } catch (error) {
        Alert.alert("Error", "Could not fetch the menu. Is the server running?");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchMenu();
  }, []);

  // TELL RENDERITEM WHAT 'item' IS
  const renderItem = ({ item }: { item: MenuItem }) => (
    <View style={styles.itemContainer}>
      <View style={styles.itemDetails}>
        <Text style={styles.itemName}>{item.name}</Text>
        <Text style={styles.itemCategory}>{item.category}</Text>
      </View>
      <View style={styles.itemPrice}>
        <Text style={styles.priceText}>Rs. {item.price.toFixed(2)}</Text>
        {!item.inStock && <Text style={styles.outOfStock}>Out of Stock</Text>}
      </View>
    </View>
  );

  if (loading) {
    return <ActivityIndicator size="large" style={styles.loader} />;
  }

  return (
    <FlatList
      data={menu}
      renderItem={renderItem}
      keyExtractor={(item) => item._id}
      style={styles.list}
    />
  );
}

// (Styles are the same as before)
const styles = StyleSheet.create({
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  list: {
    backgroundColor: '#f9f9f9',
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    backgroundColor: '#fff',
  },
  itemDetails: {
    flex: 1,
  },
  itemName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  itemCategory: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  itemPrice: {
    alignItems: 'flex-end',
  },
  priceText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
  outOfStock: {
    fontSize: 12,
    color: 'red',
    fontStyle: 'italic',
  }
});