import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import axios from 'axios';
import theme from '../theme';  // Assurez-vous que ce chemin est correct

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
    return <ActivityIndicator size="large" color={theme.colors.primary} />;
  }

  return (
    <View style={styles.container}>
      {orderDetails ? (
        <>
          <Text style={styles.title}>Détails de la commande</Text>
          <Text style={styles.text}>ID: {orderDetails[0].id}</Text>
          <Text style={styles.text}>Date: {orderDetails[0].date}</Text>
          <Text style={styles.text}>Status: {orderDetails[0].status}</Text>
          <Text style={styles.text}>Total: {orderDetails[0].total}</Text>
          <Text style={styles.text}>Pays: {orderDetails[0].pays}</Text>
          <Text style={styles.text}>Ville: {orderDetails[0].ville}</Text>
          <Text style={styles.text}>Code Postal: {orderDetails[0].code_postal}</Text>
          <Text style={styles.text}>Nom Rue: {orderDetails[0].nom_rue}</Text>
          <Text style={styles.text}>Numéro Rue: {orderDetails[0].numero_rue}</Text>
          <Text style={styles.text}>Informations Supplémentaires: {orderDetails[0].informations_sup}</Text>
          <Text style={styles.text}>Matricule Commande: {orderDetails[0].matricule_cmd}</Text>
          <Text style={styles.title}>Produits</Text>
          {orderDetails.map((item, index) => (
            <View key={index} style={styles.product}>
              <Text style={styles.text}>Produit: {item.produit_nom}</Text>
              <Text style={styles.text}>Quantité: {item.quantite}</Text>
              <Text style={styles.text}>Prix: {item.prix}</Text>
            </View>
          ))}
        </>
      ) : (
        <Text style={styles.text}>Commande non trouvée</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: theme.spacing.medium,
    backgroundColor: theme.colors.secondary,
  },
  title: {
    fontSize: theme.fontSize.large,
    fontWeight: 'bold',
    marginBottom: theme.spacing.medium,
    color: theme.colors.primary,
    fontFamily: theme.fonts.cursive,
  },
  text: {
    fontSize: theme.fontSize.medium,
    color: theme.colors.black,
    fontFamily: theme.fonts.serif,
    marginBottom: theme.spacing.small,
  },
  product: {
    marginTop: theme.spacing.medium,
    padding: theme.spacing.medium,
    borderWidth: 1,
    borderColor: theme.colors.primary,
    borderRadius: 8,
    backgroundColor: theme.colors.secondary,
  },
});

export default OrderDetailsScreen;
