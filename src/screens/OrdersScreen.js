// src/screens/OrdersScreen.js

import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import axios from 'axios';
import theme from '../theme';

const OrdersScreen = ({ navigation, userId }) => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/orders?userId=${userId}`);
        console.log('Orders response:', response.data);
        setOrders(response.data.orders);
      } catch (error) {
        console.error(error);
      }
    };

    fetchOrders();
  }, [userId]);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Mes Commandes</Text>
      {orders.map(order => (
        <TouchableOpacity
          key={order.id}
          style={styles.order}
          onPress={() => navigation.navigate('OrderDetails', { orderId: order.id })}
        >
          <Text style={styles.orderText}>Description: {order.description}</Text>
          <Text style={styles.orderText}>Date: {order.date}</Text>
          <Text style={styles.orderText}>Status: {order.status}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
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
    marginBottom: theme.spacing.large,
    color: theme.colors.primary,
    fontFamily: theme.fonts.cursive,
  },
  order: {
    width: '100%',
    padding: theme.spacing.medium,
    marginVertical: theme.spacing.small,
    borderWidth: 1,
    borderColor: theme.colors.primary,
    borderRadius: 4,
    backgroundColor: theme.colors.secondary,
  },
  orderText: {
    fontSize: theme.fontSize.medium,
    color: theme.colors.black,
    fontFamily: theme.fonts.serif,
  },
});

export default OrdersScreen;
