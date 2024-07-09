import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import axios from 'axios';

const ProfileScreen = ({ userId, onLogout }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/user?userId=${userId}`);
        setUser(response.data.user);
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    };

    fetchUserDetails();
  }, [userId]);

  if (!user) {
    return <Text style={styles.loadingText}>Chargement...</Text>;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profil</Text>
      <Text style={styles.label}>Nom: <Text style={styles.value}>{user.nom}</Text></Text>
      <Text style={styles.label}>Email: <Text style={styles.value}>{user.email}</Text></Text>
      <Text style={styles.label}>Prénom: <Text style={styles.value}>{user.prenom}</Text></Text>
      <Text style={styles.label}>Ville: <Text style={styles.value}>{user.ville}</Text></Text>
      <Text style={styles.label}>Pays: <Text style={styles.value}>{user.pays}</Text></Text>
      <Button title="Se déconnecter" onPress={onLogout} color="#FFAEBC" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#FFFFFF',
  },
  title: {
    fontSize: 32,
    marginBottom: 24,
    fontFamily: 'Great Vibes, cursive',
    color: '#0033CC',
  },
  label: {
    fontSize: 18,
    marginBottom: 8,
    fontFamily: 'Playfair Display, serif',
    color: '#000000',
  },
  value: {
    fontWeight: 'bold',
    fontFamily: 'Island Moments, cursive',
    color: '#FFAEBC',
  },
  loadingText: {
    fontSize: 24,
    color: '#0033CC',
    fontFamily: 'Playfair Display, serif',
  },
});

export default ProfileScreen;
