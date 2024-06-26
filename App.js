import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import axios from 'axios';

const App = () => {
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
          <View style={styles.productItem}>
            <Text style={styles.productName}>{item.nom}</Text>
            <Text style={styles.productPrice}>${item.prix}</Text>
          </View>
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

export default App;
