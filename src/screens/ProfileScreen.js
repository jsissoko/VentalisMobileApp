// ProfileScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import axios from 'axios';

const ProfileScreen = ({ userId }) => {
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
    return <Text>Chargement...</Text>;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profil</Text>
      <Text>Nom: {user.nom}</Text>
      <Text>Email: {user.email}</Text>
      <Text>Prénom: {user.prenom}</Text>
      <Text>Ville: {user.ville}</Text>
      <Text>Pays: {user.pays}</Text>
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
});

export default ProfileScreen;
