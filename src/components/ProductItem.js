import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ProductItem = ({ produit }) => {
  return (
    <View style={styles.productItem}>
      <Text style={styles.productName}>{produit.nom}</Text>
      <Text style={styles.productPrice}>${produit.prix}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  productItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    width: '100%',
  },
  productName: {
    fontSize: 18,
  },
  productPrice: {
    fontSize: 16,
    color: '#888',
  },
});

export default ProductItem;
