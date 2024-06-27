import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import axios from 'axios';
import ProductItem from '../components/ProductItem';

const ProductListScreen = ({ navigation }) => {
  const [produits, setProduits] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/produits')
      .then(response => {
        setProduits(response.data);
      })
      .catch(error => {
        console.error('Erreur lors de la récupération des produits:', error);
      });
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mes Produits :</Text>
      <FlatList
        data={produits}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => navigation.navigate('ProductDetail', { productId: item.id })}>
            <ProductItem produit={item} />
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5fcff',
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
});

export default ProductListScreen;
