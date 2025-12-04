// screens/HomeScreen.js
import React, { useState, useMemo, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity, Image, ImageBackground } from 'react-native'; 
import Icon from 'react-native-vector-icons/Ionicons';
import { useSafeAreaInsets } from 'react-native-safe-area-context'; 
import axios from 'axios';

// 💡 API CHANGE: **USE YOUR LOCAL IP ADDRESS HERE**
const API_BASE_URL = 'http://192.168.137.95:3000/api'; 

const BRAND_ORDER = ['Nike', 'Puma', 'FILA', 'Adidas'];

const ProductCard = ({ product, navigation }) => (
    <TouchableOpacity 
        key={product._id} 
        style={styles.productCard}
        onPress={() => navigation.navigate('ProductDetails', { product })}
    >
        <Image source={{ uri: product.image_url }} style={styles.productImage} resizeMode="contain" />
        <View style={styles.productInfo}>
            <Text style={styles.productBrand}>{product.brand}</Text>
            <Text style={styles.productName}>{product.name}</Text>
            <Text style={styles.productPrice}>${product.price.toFixed(2)}</Text>
        </View>
        <TouchableOpacity style={styles.addToCartButton}>
            <Icon name="add" size={18} color="#000" />
        </TouchableOpacity>
    </TouchableOpacity>
);

const BrandSection = ({ brand, products, navigation }) => {
    if (products.length === 0) return null;

    return (
        <View style={styles.brandSectionContainer}>
            <Text style={styles.brandSectionTitle}>{brand} Collection</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalProductScroll}>
                {products.map((product) => (
                    <ProductCard key={product._id} product={product} navigation={navigation} />
                ))}
            </ScrollView>
        </View>
    );
};


const HomeScreen = ({ navigation }) => {
    const insets = useSafeAreaInsets();
    
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    // 'All' is now only used to skip the initial filtering for the product grouping logic
    const [selectedBrand, setSelectedBrand] = useState('All'); 

    const BACKGROUND_IMAGE_URI = 'https://media.about.nike.com/img/5593cfa7-39ca-407f-a2f2-4347be5c2d96/su24-peg41-volt-womens-hero-re.jpg?m=eyJlZGl0cyI6eyJqcGVnIjp7InF1YWxpdHkiOjEwMH0sIndlYnAiOnsicXVhbGl0eSI6MTAwfSwiZXh0cmFjdCI6eyJsZWZ0IjowLCJ0b3AiOjAsIndpZHRoIjozMDAwLCJoZWlnaHQiOjIyNTB9LCJyZXNpemU6eyJ3aWR0aCI6MTA4MH19fX0%3D&s=b0eabd10a75573d93ff49fa921d2f4a49632d114c80d2f95b85';
    
    const fetchProducts = async () => {
        setLoading(true);
        try {
            const url = `${API_BASE_URL}/products`;
            const response = await axios.get(url);
            setProducts(response.data); 
        } catch (error) {
            console.error('Failed to fetch products:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts(); 
    }, []);

    // 🌟 THE FILTERING AND GROUPING LOGIC
    const { filteredAndGroupedProducts, filteredProductCount } = useMemo(() => {
        let currentProducts = products;
        const query = searchQuery.toLowerCase();
        
        // 1. Filter by Search Query (Product Name or Brand Name)
        if (query.length > 0) {
            currentProducts = currentProducts.filter(
                product => 
                    (product.name && product.name.toLowerCase().includes(query)) || 
                    (product.brand && product.brand.toLowerCase().includes(query))
            );
        }

        // 2. Group the remaining products by brand
        const grouped = currentProducts.reduce((acc, product) => {
            if (!product.brand) return acc;
            
            // Ultra-Robust Cleaning is still applied here to match the group key to the data
            const cleanedBrand = product.brand.replace(/[^a-zA-Z0-9\s]/g, '').trim();
            const brandKey = cleanedBrand; 

            if (!acc[brandKey]) {
                acc[brandKey] = [];
            }
            acc[brandKey].push(product);
            return acc;
        }, {});
        
        return {
            filteredAndGroupedProducts: grouped,
            filteredProductCount: currentProducts.length
        };
    }, [products, searchQuery]);


    // 3. Simple filter applied to the grouped results based on the Chip
    // Note: If selectedBrand is 'All', it iterates over all groups.
    const finalRenderGroups = useMemo(() => {
        if (selectedBrand === 'All') {
            return filteredAndGroupedProducts;
        }

        // Apply a direct filter on the grouped object keys
        const selectedBrandKey = selectedBrand.replace(/[^a-zA-Z0-9\s]/g, '').trim();

        if (filteredAndGroupedProducts[selectedBrandKey]) {
            return { [selectedBrandKey]: filteredAndGroupedProducts[selectedBrandKey] };
        }
        return {}; // Return empty object if brand is selected but no products found
        
    }, [filteredAndGroupedProducts, selectedBrand]);


    // Helper to render the chip buttons
    const renderBrandChip = (brand) => (
        <TouchableOpacity 
            key={brand} 
            style={[
                styles.storeChip, 
                selectedBrand === brand ? styles.selectedStoreChip : {}
            ]}
            onPress={() => setSelectedBrand(brand === selectedBrand ? 'All' : brand)}
        >
            <Text style={[
                styles.storeText, 
                selectedBrand === brand ? styles.selectedStoreText : {}
            ]}>
                {brand}
            </Text>
        </TouchableOpacity>
    );

    // Get the keys in the predefined order
    const renderBrandsInOrder = BRAND_ORDER.filter(brand => finalRenderGroups[brand] || selectedBrand === brand);
    
    // Calculate the total count for the title when a specific brand is selected
    const finalCount = selectedBrand === 'All' 
        ? filteredProductCount 
        : (finalRenderGroups[selectedBrand] ? finalRenderGroups[selectedBrand].length : 0);

    return (
        <ImageBackground 
            source={{ uri: BACKGROUND_IMAGE_URI }} 
            style={styles.container} 
            resizeMode="cover"
        >
            <View style={styles.overlay} /> 

            <View style={{ flex: 1 }}>
                
                {/* Header */}
                <View style={[styles.header, { paddingTop: insets.top + 20 }]}>
                    <View>
                        <Text style={styles.greeting}>Alex Smith</Text>
                        <Text style={styles.exploreText}>Explore new</Text>
                        <Text style={styles.collectionText}>collections</Text>
                    </View>
                    <Image 
                        source={{ uri: 'https://i.pravatar.cc/150?img=1' }} 
                        style={styles.profileImage}
                    />
                </View>

                {/* Search Bar */}
                <View style={styles.searchBar}>
                    <Icon name="search" size={20} color="#66ff00" style={styles.searchIcon} />
                    <TextInput
                        placeholder="Search sneakers by name or brand..."
                        placeholderTextColor="#aaa"
                        style={styles.searchInput}
                        value={searchQuery}
                        onChangeText={setSearchQuery} 
                    />
                    {searchQuery.length > 0 && (
                        <TouchableOpacity onPress={() => setSearchQuery('')} style={styles.clearButton}>
                            <Icon name="close-circle" size={20} color="#aaa" />
                        </TouchableOpacity>
                    )}
                </View>

                <ScrollView style={styles.scrollContent}>
                    {/* BRAND FILTER CHIPS */}
                    <Text style={styles.sectionTitle}>Filter by Brand</Text>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.storeLogos}>
                        {renderBrandChip('All')}
                        {renderBrandChip('Nike')}
                        {renderBrandChip('Puma')}
                        {renderBrandChip('FILA')}
                        {renderBrandChip('Adidas')}
                    </ScrollView>

                    <Text style={styles.sectionTitle}>
                        {loading 
                            ? 'Loading...'
                            : (searchQuery.length > 0 || selectedBrand !== 'All' 
                                ? `${finalCount} Results for ${selectedBrand}` 
                                : 'Featured Brands')}
                    </Text>
                    
                    {/* PRODUCT SECTIONS RENDERED HERE */}
                    {loading ? (
                        <Text style={styles.loadingText}>Fetching products from server...</Text>
                    ) : (
                        <>
                            {Object.keys(finalRenderGroups).length > 0 ? (
                                // Render each brand section separately
                                renderBrandsInOrder.map(brand => (
                                    <BrandSection 
                                        key={brand}
                                        brand={brand}
                                        products={finalRenderGroups[brand] || []}
                                        navigation={navigation}
                                    />
                                ))
                            ) : (
                                <Text style={styles.noResultsText}>No products found matching your criteria.</Text>
                            )}
                        </>
                    )}
                    
                    <View style={{ height: 85 + insets.bottom }} /> 
                </ScrollView>
                
                {/* Bottom Navigation Bar */}
                <View style={[styles.bottomNav, { paddingBottom: insets.bottom }]}>
                    <TouchableOpacity style={styles.navButton} onPress={() => navigation.navigate('Home')}>
                        <Icon name="home" size={25} color="#66ff00" />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.navButton} onPress={() => navigation.navigate('Cart')}>
                        <Icon name="bag-handle-outline" size={25} color="#aaa" />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.navButton} onPress={() => navigation.navigate('Profile')}>
                        <Icon name="person-outline" size={25} color="#aaa" />
                    </TouchableOpacity>
                </View>

            </View>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, }, 
    overlay: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(18, 18, 18, 0.75)', },
    header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, paddingBottom: 20 },
    greeting: { color: '#aaa', fontSize: 14 },
    exploreText: { color: '#fff', fontSize: 28, fontWeight: '300' },
    collectionText: { color: '#fff', fontSize: 28, fontWeight: 'bold' },
    profileImage: { width: 40, height: 40, borderRadius: 20, borderWidth: 2, borderColor: '#66ff00' },
    searchBar: { flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(34, 34, 34, 0.8)', borderRadius: 12, paddingHorizontal: 15, marginHorizontal: 20, marginBottom: 20 },
    searchIcon: { marginRight: 10 },
    searchInput: { flex: 1, color: '#fff', height: 50 },
    clearButton: { padding: 8 },
    scrollContent: { flex: 1, paddingHorizontal: 20 },
    sectionTitle: { color: '#fff', fontSize: 18, fontWeight: 'bold', marginBottom: 15, marginTop: 10 },
    storeLogos: { flexDirection: 'row', marginBottom: 20 },
    storeChip: { backgroundColor: 'rgba(34, 34, 34, 0.9)', paddingVertical: 8, paddingHorizontal: 15, borderRadius: 20, marginRight: 10 },
    selectedStoreChip: { backgroundColor: '#66ff00' },
    storeText: { color: '#fff', fontWeight: 'bold' },
    selectedStoreText: { color: '#000' },

    // NEW STYLES for Brand Sections
    brandSectionContainer: { marginBottom: 20, },
    brandSectionTitle: { color: '#fff', fontSize: 22, fontWeight: 'bold', marginBottom: 15 },
    horizontalProductScroll: { marginBottom: 10, },

    // Product Card is now inside a horizontal ScrollView, so its width needs to be fixed.
    productCard: { width: 160, backgroundColor: 'rgba(34, 34, 34, 0.9)', borderRadius: 15, marginRight: 15, padding: 10, position: 'relative' }, 
    productImage: { width: '100%', height: 100, marginBottom: 10 },
    productInfo: { flex: 1, paddingHorizontal: 5 },
    productBrand: { color: '#66ff00', fontSize: 10, fontWeight: '600', marginBottom: 2 },
    productName: { color: '#fff', fontSize: 14, fontWeight: '600', marginBottom: 5 },
    productPrice: { color: '#66ff00', fontSize: 16, fontWeight: 'bold' },
    addToCartButton: { position: 'absolute', bottom: 10, right: 10, backgroundColor: '#66ff00', width: 30, height: 30, borderRadius: 15, justifyContent: 'center', alignItems: 'center' },
    noResultsText: { color: '#aaa', textAlign: 'center', marginTop: 30, fontSize: 16 },
    loadingText: { color: '#fff', textAlign: 'center', marginTop: 30, fontSize: 16, fontStyle: 'italic' }, 
    bottomNav: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: 'rgba(28, 28, 28, 0.95)',
        position: 'absolute', 
        bottom: 0,
        left: 0,
        right: 0,
        height: 60,
        elevation: 10, 
        shadowColor: '#000', 
        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: 0.8,
        shadowRadius: 5,
    },
    navButton: {
        paddingHorizontal: 15,
        paddingVertical: 10,
    }
});

export default HomeScreen;