// src/screens/LoginScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import axios from 'axios';
import theme from '../theme';

const LoginScreen = ({ navigation, setIsAuthenticated, setUserId }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:3000/login', {
        email,
        password,
      });

      if (response.data.userId) {
        setUserId(response.data.userId);
        setIsAuthenticated(true);
        navigation.navigate('Orders');
      } else {
        alert('Email ou mot de passe incorrect');
      }
    } catch (error) {
      console.error(error);
      alert('Erreur lors de la connexion');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Connexion</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Mot de passe"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button title="Se connecter" onPress={handleLogin} color={theme.colors.accent} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.spacing.medium,
    backgroundColor: theme.colors.secondary,
  },
  title: {
    fontSize: theme.fontSize.large,
    color: theme.colors.primary,
    marginBottom: theme.spacing.large,
    fontFamily: theme.fonts.cursive,
  },
  input: {
    width: '100%',
    padding: theme.spacing.small,
    marginVertical: theme.spacing.small,
    borderWidth: 1,
    borderColor: theme.colors.primary,
    borderRadius: 4,
    backgroundColor: theme.colors.secondary,
  },
});

export default LoginScreen;
