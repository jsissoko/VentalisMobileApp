import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

const MessageScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Messages</Text>
      <Button title="Retour aux produits" onPress={() => navigation.navigate('Products')} />
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

export default MessageScreen;
