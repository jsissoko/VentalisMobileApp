import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, StyleSheet, FlatList, Text } from 'react-native';
import axios from 'axios';

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
      const response = await axios.post('http://localhost:3000/messages', {
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
        renderItem={({ item }) => (
          <View style={styles.message}>
            <Text style={styles.messageTitle}>{item.title}</Text>
            <Text>{item.message}</Text>
            <Text style={styles.messageInfo}>
              De: {item.expediteur_nom} à: {item.destinataire_nom} le: {new Date(item.created_at).toLocaleString()}
            </Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
  },
  message: {
    padding: 12,
    marginVertical: 8,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 4,
  },
  messageTitle: {
    fontWeight: 'bold',
  },
  messageInfo: {
    fontSize: 12,
    color: 'gray',
  },
});

export default AdvisorsScreen;
