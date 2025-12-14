import { Image } from 'expo-image';
import { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';

import { HelloWave } from '@/components/hello-wave';
import ParallaxScrollView from '@/components/parallax-scroll-view';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Link } from 'expo-router';

type Product = {
  id: number;
  title: string;
  price: number;
  description: string;
  image: string;
};

export default function HomeScreen() {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch('https://fakestoreapi.com/products/2');
        const data = await response.json();
        setProduct(data);
      } catch (error) {
        console.error('Error fetching product:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, []);

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('@/assets/images/partial-react-logo.png')}
          style={styles.reactLogo}
        />
      }
    >
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Welcome!</ThemedText>
        <HelloWave />
      </ThemedView>

      {/* PRODUCT SECTION */}
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Product from API</ThemedText>

        {loading && <ThemedText>Loading...</ThemedText>}

        {product && (
          <>
            <Image
              source={{ uri: product.image }}
              style={styles.productImage}
              contentFit="contain"
            />
            <ThemedText type="defaultSemiBold">{product.title}</ThemedText>
            <ThemedText>💲 {product.price}</ThemedText>
            <ThemedText>{product.description}</ThemedText>
          </>
        )}
      </ThemedView>

      {/* EXISTING CONTENT */}
      <ThemedView style={styles.stepContainer}>
        <Link href="/modal">
          <Link.Trigger>
            <ThemedText type="subtitle">Explore More</ThemedText>
          </Link.Trigger>
        </Link>
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 12,
    marginBottom: 16,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
  productImage: {
    width: '100%',
    height: 200,
    borderRadius: 8,
  },
});
