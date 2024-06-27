import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

const CheckoutScreen = ({ route, navigation }) => {
  const { productId } = route.params;

  const handleCheckout = () => {
    // Ajouter la logique de paiement ici
    alert('Paiement effectué pour le produit ' + productId);
    navigation.navigate('Products');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Checkout</Text>
      <Text>Produit ID: {productId}</Text>
      <Button title="Payer" onPress={handleCheckout} />
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

export default CheckoutScreen;
