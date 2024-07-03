import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import axios from 'axios';

const ProfileScreen = ({ userId }) => {
  const [userDetails, setUserDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/user?userId=${userId}`);
        setUserDetails(response.data.user);
      } catch (error) {
        console.error('Error fetching user details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserDetails();
  }, [userId]);

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <View style={styles.container}>
      {userDetails ? (
        <>
          <Text style={styles.title}>Mon Profil</Text>
          <Text>Prénom: {userDetails.prenom}</Text>
          <Text>Nom: {userDetails.nom}</Text>
          <Text>Email: {userDetails.email}</Text>
          <Text>Pays: {userDetails.pays}</Text>
          <Text>Ville: {userDetails.ville}</Text>
          <Text>Nom Rue: {userDetails.nom_rue}</Text>
          <Text>Numéro Rue: {userDetails.numero_rue}</Text>
          <Text>Téléphone: {userDetails.telephone}</Text>
        </>
      ) : (
        <Text>Utilisateur non trouvé</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
});

export default ProfileScreen;
