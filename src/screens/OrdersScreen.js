import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import axios from 'axios';

const OrdersScreen = ({ userId }) => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/orders?userId=${userId}`);
        setOrders(response.data.orders);
      } catch (error) {
        console.error(error);
      }
    };

    fetchOrders();
  }, [userId]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mes Commandes</Text>
      {orders.map(order => (
        <View key={order.id} style={styles.order}>
          <Text>{order.description}</Text>
          <Text>{order.date}</Text>
          <Text>{order.status}</Text>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
