const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const bcrypt = require('bcryptjs');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors()); // Ajoutez cette ligne pour gérer les problèmes CORS

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '', // Remplacez par votre mot de passe
  database: 'cda1512' // Nom de votre base de données
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
  
  if (!email || !password) {
    return res.status(400).send({ message: 'Email et mot de passe requis' });
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

app.listen(3000, () => {
  console.log('Serveur démarré sur le port 3000');
});
