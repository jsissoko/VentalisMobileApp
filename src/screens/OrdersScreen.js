// src/screens/OrdersScreen.js

import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import axios from 'axios';

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
          <Text>Description: {order.description}</Text>
          <Text>Date: {order.date}</Text>
          <Text>Status: {order.status}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    marginBottom: 24,
  },
  order: {
    width: '100%',
    padding: 16,
    marginVertical: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
  },
});

export default OrdersScreen;
