import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import axios from 'axios';

const ProductDetailScreen = ({ route, navigation }) => {
  const { productId } = route.params;
  const [product, setProduct] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:5000/api/produits/${productId}`)
      .then(response => {
        setProduct(response.data);
      })
      .catch(error => {
        console.error('Erreur lors de la récupération du produit:', error);
      });
  }, [productId]);

  if (!product) {
    return (
      <View style={styles.container}>
        <Text>Chargement...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{product.nom}</Text>
      <Text style={styles.price}>${product.prix}</Text>
      <Button title="Acheter" onPress={() => {/* logiqe d'achat */}} />
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
  price: {
    fontSize: 20,
    color: '#888',
    marginBottom: 20,
  },
});

export default ProductDetailScreen;
