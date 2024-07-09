// src/screens/HomeScreen.js
import React from 'react';
import { View, Text, ScrollView, StyleSheet, Image } from 'react-native';
import theme from '../theme';

const HomeScreen = () => {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.welcomeText}>Bienvenue à Ventalis</Text>
      <Text style={styles.infoText}>
        Vous êtes dans votre espace abonné. Ici, vous pouvez accéder à vos commandes, consulter les messages de vos conseillers, et bien plus encore.
      </Text>
      <Image style={styles.image} source={{ uri: 'https://via.placeholder.com/150' }} />
      <Image style={styles.image} source={{ uri: 'https://via.placeholder.com/150' }} />
      <Image style={styles.image} source={{ uri: 'https://via.placeholder.com/150' }} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: theme.spacing.medium,
    backgroundColor: theme.colors.secondary,
  },
  welcomeText: {
    fontSize: theme.fontSize.large,
    color: theme.colors.primary,
    marginBottom: theme.spacing.large,
    fontFamily: theme.fonts.cursiveAlt,
  },
  infoText: {
    fontSize: theme.fontSize.medium,
    color: theme.colors.black,
    marginBottom: theme.spacing.medium,
    fontFamily: theme.fonts.serif,
  },
  image: {
    width: '100%',
    height: 150,
    marginBottom: theme.spacing.medium,
  },
});

export default HomeScreen;
