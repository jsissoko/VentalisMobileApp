import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import axios from 'axios';

const OrderDetailsScreen = ({ route }) => {
  const { orderId } = route.params;
  const [orderDetails, setOrderDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/order/${orderId}`);
        setOrderDetails(response.data.order);
      } catch (error) {
        console.error('Error fetching order details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrderDetails();
  }, [orderId]);

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <View style={styles.container}>
      {orderDetails ? (
        <>
          <Text style={styles.title}>Détails de la commande</Text>
          <Text>ID: {orderDetails[0].id}</Text>
          <Text>Date: {orderDetails[0].date}</Text>
          <Text>Status: {orderDetails[0].status}</Text>
          <Text>Total: {orderDetails[0].total}</Text>
          <Text>Pays: {orderDetails[0].pays}</Text>
          <Text>Ville: {orderDetails[0].ville}</Text>
          <Text>Code Postal: {orderDetails[0].code_postal}</Text>
          <Text>Nom Rue: {orderDetails[0].nom_rue}</Text>
          <Text>Numéro Rue: {orderDetails[0].numero_rue}</Text>
          <Text>Informations Supplémentaires: {orderDetails[0].informations_sup}</Text>
          <Text>Matricule Commande: {orderDetails[0].matricule_cmd}</Text>
          <Text style={styles.title}>Produits</Text>
          {orderDetails.map((item, index) => (
            <View key={index} style={styles.product}>
              <Text>Produit: {item.produit_nom}</Text>
              <Text>Quantité: {item.quantite}</Text>
              <Text>Prix: {item.prix}</Text>
            </View>
          ))}
        </>
      ) : (
        <Text>Commande non trouvée</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  product: {
    marginTop: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
  },
});

export default OrderDetailsScreen;
