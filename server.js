const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const bcrypt = require('bcryptjs');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors()); // Pour gérer les problèmes CORS

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '', // VIDE sur xampp
  database: 'cda1512' // Nom de ma base de données
});

db.connect(err => {
  if (err) {
    console.error('Erreur de connexion à la base de données:', err);
    process.exit(1);
  }
  console.log('Connecté à la base de données MySQL');
});


// Route de connexion
app.post('/login', (req, res) => {
  const { email, password } = req.body;

  // Validation des entrées
  if (!email || !password) {
    return res.status(400).send({ message: 'Email et mot de passe requis' });
  }

  // Vérifier que l'email a un format valide
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).send({ message: 'Email invalide' });
  }

  // Vérifier que le mot de passe respecte une certaine complexité (par exemple, au moins 8 caractères)
  if (password.length < 8) {
    return res.status(400).send({ message: 'Le mot de passe doit contenir au moins 8 caractères' });
  }

  const query = 'SELECT * FROM utilisateur WHERE email = ?';
  db.query(query, [email], async (err, results) => {
    if (err) {
      return res.status(500).send({ message: 'Erreur du serveur', error: err });
    }

    if (results.length === 0) {
      return res.status(401).send({ message: 'Email ou mot de passe incorrect' });
    }

    const user = results[0];
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).send({ message: 'Email ou mot de passe incorrect' });
    }

    res.send({ userId: user.id });
  });
});


// Route pour récupérer les commandes de l'utilisateur connecté
app.get('/orders', (req, res) => {
  const userId = req.query.userId; // Récupère l'ID utilisateur de la requête

  if (!userId) {
    return res.status(400).send({ message: 'ID utilisateur requis' });
  }

  const query = 'SELECT * FROM commandes WHERE utilisateur_id = ?'; // Utilisation de l'ID utilisateur pour filtrer les commandes
  db.query(query, [userId], (err, results) => {
    if (err) {
      return res.status(500).send({ message: 'Erreur du serveur', error: err });
    }

    res.send({ orders: results });
  });
});

// Route pour récupérer les détails d'une commande spécifique
app.get('/order/:id', (req, res) => {
  const orderId = req.params.id;

  const query = `
    SELECT c.*, cl.*, p.* 
    FROM commandes c 
    JOIN commande_ligne cl ON c.id = cl.commande_id 
    JOIN produit p ON cl.produit_id = p.id 
    WHERE c.id = ?
  `;
  db.query(query, [orderId], (err, results) => {
    if (err) {
      return res.status(500).send({ message: 'Erreur du serveur', error: err });
    }

    if (results.length === 0) {
      return res.status(404).send({ message: 'Commande non trouvée' });
    }

    res.send({ order: results });
  });
});

app.get('/user', (req, res) => {
  const userId = req.query.userId; // Récupère l'ID utilisateur de la requête
  console.log(`Requête pour récupérer les détails de l'utilisateur avec l'ID: ${userId}`);

  if (!userId) {
    return res.status(400).send({ message: 'ID utilisateur requis' });
  }

  const query = 'SELECT * FROM utilisateur WHERE id = ?';
  db.query(query, [userId], (err, results) => {
    if (err) {
      console.error('Erreur lors de la requête à la base de données:', err);
      return res.status(500).send({ message: 'Erreur du serveur', error: err });
    }

    if (results.length === 0) {
      console.log('Utilisateur non trouvé');
      return res.status(404).send({ message: 'Utilisateur non trouvé' });
    }

    console.log('Utilisateur trouvé:', results[0]);
    res.send({ user: results[0] });
  });
});


// Route pour récupérer les messages de l'utilisateur connecté
app.get('/messages', (req, res) => {
  const userId = req.query.userId; // Récupère l'ID utilisateur de la requête

  if (!userId) {
    return res.status(400).send({ message: 'ID utilisateur requis' });
  }
  const query = `
    SELECT m.*, ue.nom AS expediteur_nom, ud.nom AS destinataire_nom 
    FROM messages m 
    JOIN utilisateur ue ON m.expediteur_id = ue.id 
    JOIN utilisateur ud ON m.destinataire_id = ud.id 
    WHERE m.expediteur_id = ? OR m.destinataire_id = ? 
    ORDER BY m.created_at ASC
  `;

  db.query(query, [userId, userId], (err, results) => {
    if (err) {
      return res.status(500).send({ message: 'Erreur du serveur', error: err });
    }

    res.send({ messages: results });
  });
});



app.post('/messages', (req, res) => {
  const { expediteur_id, title, message } = req.body;

  if (!expediteur_id || !message || !title) {
    return res.status(400).send({ message: 'Toutes les informations sont requises' });
  }

  console.log('Reçu:', { expediteur_id, title, message }); // Vérifiez les données reçues

  // Récupérer employe_id de l'utilisateur connecté
  const userQuery = 'SELECT employe_id FROM utilisateur WHERE id = ?';
  db.query(userQuery, [expediteur_id], (err, userResults) => {
    if (err) {
      console.error('Erreur lors de la récupération de employe_id:', err); // Log pour le débogage
      return res.status(500).send({ message: 'Erreur du serveur', error: err });
    }

    if (userResults.length === 0) {
      return res.status(404).send({ message: 'Utilisateur non trouvé' });
    }

    const destinataire_id = userResults[0].employe_id;

    console.log('employe_id récupéré:', destinataire_id); // Vérifiez le destinataire_id

    if (!destinataire_id) {
      return res.status(400).send({ message: "L'utilisateur n'a pas d'employé assigné" });
    }

    const messageQuery = 'INSERT INTO messages (expediteur_id, destinataire_id, title, message, created_at, is_read) VALUES (?, ?, ?, ?, NOW(), 0)';
    db.query(messageQuery, [expediteur_id, destinataire_id, title, message], (err, results) => {
      if (err) {
        console.error('Erreur lors de l\'insertion du message:', err); // Log pour le débogage
        return res.status(500).send({ message: 'Erreur du serveur', error: err });
      }

      res.send({ message: 'Message envoyé avec succès' });
    });
  });
});

app.listen(3000, () => {
  console.log('Serveur démarré sur le port 3000');
});