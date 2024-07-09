import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, StyleSheet, FlatList, Text } from 'react-native';
import axios from 'axios';
import theme from '../theme'; // Assurez-vous que ce chemin est correct

const AdvisorsScreen = ({ userId }) => {
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  const fetchMessages = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/messages?userId=${userId}`);
      setMessages(response.data.messages);
    } catch (error) {
      console.error('Erreur lors de la récupération des messages:', error);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, [userId]);

  const sendMessage = async () => {
    try {
      await axios.post('http://localhost:3000/messages', {
        expediteur_id: userId,
        title,
        message
      });
      setTitle('');
      setMessage('');
      fetchMessages(); // Re-fetch messages after sending a new one
    } catch (error) {
      console.error('Erreur lors de l\'envoi du message:', error);
    }
  };

  const renderItem = ({ item }) => {
    const isSentByUser = item.expediteur_id === userId;
    const messageStyle = isSentByUser ? styles.sentMessage : styles.receivedMessage;

    return (
      <View style={[styles.message, messageStyle]}>
        <Text style={styles.messageTitle}>{item.title}</Text>
        <Text>{item.message}</Text>
        <Text style={styles.messageInfo}>
          De: {item.expediteur_nom} à: {item.destinataire_nom} le: {new Date(item.created_at).toLocaleString()}
        </Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Titre"
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        style={styles.input}
        placeholder="Message"
        value={message}
        onChangeText={setMessage}
      />
      <Button title="Envoyer" onPress={sendMessage} />

      <FlatList
        data={messages}
        keyExtractor={item => item.id.toString()}
        renderItem={renderItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: theme.spacing.medium,
  },
  input: {
    height: 40,
    borderColor: theme.colors.primary,
    borderWidth: 1,
    marginBottom: theme.spacing.medium,
    paddingHorizontal: theme.spacing.small,
  },
  message: {
    padding: theme.spacing.medium,
    marginVertical: theme.spacing.small,
    borderWidth: 1,
    borderRadius: 4,
  },
  sentMessage: {
    borderColor: theme.colors.primary,
    backgroundColor: theme.colors.secondary,
  },
  receivedMessage: {
    borderColor: theme.colors.tertiary,
    backgroundColor: theme.colors.quaternary,
  },
  messageTitle: {
    fontWeight: 'bold',
    marginBottom: theme.spacing.small,
  },
  messageInfo: {
    fontSize: theme.fontSize.small,
    color: theme.colors.gray,
    marginTop: theme.spacing.small,
  },
});

export default AdvisorsScreen;
