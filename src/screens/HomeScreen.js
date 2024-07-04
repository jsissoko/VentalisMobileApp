import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';

const HomeScreen = () => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Bienvenue à Ventalis</Text>
        <Text style={styles.description}>
          Vous êtes dans votre espace abonné. Ici, vous pouvez accéder à vos commandes, consulter vos informations personnelles et contacter nos conseillers.
        </Text>
      </View>
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: 'https://via.placeholder.com/300' }}
          style={styles.image}
        />
        <Image
          source={{ uri: 'https://via.placeholder.com/300' }}
          style={styles.image}
        />
        <Image
          source={{ uri: 'https://via.placeholder.com/300' }}
          style={styles.image}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f9f9f9',
  },
  header: {
    marginBottom: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    color: '#666',
  },
  imageContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  image: {
    width: '100%',
    height: 200,
    marginBottom: 10,
    borderRadius: 10,
  },
});

export default HomeScreen;
