// screens/ProductDetailsScreen.js

import React from 'react';

import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';



const ProductDetailsScreen = ({ route, navigation }) => {

  const { product } = route.params || {

    product: {

      name: 'Air Max Plus Comfort',

      price: '$175',

      // FIX: Using a direct URL as a fallback image

      image: { uri: 'https://static.nike.com/a/images/t_web_pdp_535_v2/f_auto/9d916799-8093-40c6-8aa7-6fcbcc582719/NIKE+STELLAR+RIDE+%28GS%29.png' }

    }

  };

 

  const colors = ['#66ff00', '#f00', '#00f', '#fff']; // Neon green, Red, Blue, White



  return (

    <View style={styles.container}>

      <ScrollView>

        <View style={styles.header}>

          <TouchableOpacity onPress={() => navigation.goBack()}>

            <Icon name="arrow-back-outline" size={24} color="#fff" />

          </TouchableOpacity>

          <TouchableOpacity>

            <Icon name="heart-outline" size={24} color="#fdf9f9ff" />

          </TouchableOpacity>

        </View>



        <View style={styles.productCard}>

          <Image source={product.image} style={styles.productImage} resizeMode="contain" />

          <View style={styles.infoBox}>

            <Text style={styles.categoryTag}>Sport</Text>

            <Text style={styles.rating}>⭐ 4.5</Text>

          </View>



          <Text style={styles.productName}>{product.name}</Text>

          <Text style={styles.productPrice}>{product.price}</Text>



          <View style={styles.colorSelection}>

            <Text style={styles.colorTitle}>Select Color</Text>

            <View style={styles.colorChips}>

              {colors.map((color, index) => (

                <TouchableOpacity key={index} style={[styles.colorChip, { backgroundColor: color }]}>

                  {color === '#66ff00' && <Icon name="checkmark" size={14} color="#000" />}

                </TouchableOpacity>

              ))}

            </View>

          </View>



          <Text style={styles.descriptionTitle}>Description</Text>

          <Text style={styles.description}>

            Experience a sleek and modern way to browse, buy, and manage your sneaker collection with this immersive shopping app. Designed for comfort and style.

          </Text>



          <Text style={styles.reviewsTitle}>Reviews (150)</Text>

          {/* Simplified Review Section */}

          <View style={styles.reviewCard}>

            <Text style={styles.reviewText}>"Best sneakers I've ever owned. Super comfortable for long runs!" - Jane Doe</Text>

          </View>

        </View>

      </ScrollView>



      <TouchableOpacity

        style={styles.addToCartButton}

        onPress={() => navigation.navigate('Cart', { addedProduct: product })}

      >

        <Text style={styles.buttonText}>Order now</Text>

        <Icon name="arrow-forward" size={20} color="#000" style={{ marginLeft: 10 }} />

      </TouchableOpacity>

    </View>

  );

};



const styles = StyleSheet.create({

  container: { flex: 1, backgroundColor: '#121212' },

  header: { flexDirection: 'row', justifyContent: 'space-between', padding: 20, paddingTop: 60, backgroundColor: '#121212' },

  productCard: { padding: 20 },

  productImage: { width: '100%', height: 250, transform: [{ rotate: '-15deg' }], marginVertical: 10 },

  infoBox: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 },

  categoryTag: { backgroundColor: '#333', color: '#fff', paddingHorizontal: 10, paddingVertical: 5, borderRadius: 15, fontSize: 12 },

  rating: { color: '#fff', fontSize: 14 },

  productName: { color: '#fff', fontSize: 32, fontWeight: 'bold', marginTop: 10 },

  productPrice: { color: '#66ff00', fontSize: 28, fontWeight: 'bold', marginBottom: 20 },

  colorSelection: { marginBottom: 20 },

  colorTitle: { color: '#fff', fontSize: 16, fontWeight: 'bold', marginBottom: 10 },

  colorChips: { flexDirection: 'row' },

  colorChip: { width: 30, height: 30, borderRadius: 15, marginRight: 10, justifyContent: 'center', alignItems: 'center', borderWidth: 2, borderColor: 'transparent' },

  descriptionTitle: { color: '#fff', fontSize: 16, fontWeight: 'bold', marginTop: 10, marginBottom: 5 },

  description: { color: '#aaa', lineHeight: 22, marginBottom: 20 },

  reviewsTitle: { color: '#fff', fontSize: 16, fontWeight: 'bold', marginBottom: 10 },

  reviewCard: { backgroundColor: '#222', padding: 15, borderRadius: 10 },

  reviewText: { color: '#fff', fontSize: 14, fontStyle: 'italic' },

  addToCartButton: { flexDirection: 'row', backgroundColor: '#66ff00', paddingVertical: 18, margin: 20, borderRadius: 12, justifyContent: 'center', alignItems: 'center' },

  buttonText: { color: '#000', fontSize: 18, fontWeight: 'bold' },

});



export default ProductDetailsScreen;