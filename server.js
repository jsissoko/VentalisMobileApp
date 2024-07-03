const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const bcrypt = require('bcryptjs');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'cda1512'
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
  const userId = req.query.userId;

  if (!userId) {
    return res.status(400).send({ message: 'ID utilisateur requis' });
  }

  const query = 'SELECT * FROM commandes WHERE utilisateur_id = ?';
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
    SELECT 
      c.id, c.date, c.status, c.total, c.pays, c.ville, c.code_postal, c.nom_rue, c.numero_rue, c.utilisateur_id, c.informations_sup, c.matricule_cmd,
      cl.quantite, cl.prix, p.nom AS produit_nom
    FROM 
      commandes c
    JOIN 
      commande_ligne cl ON c.id = cl.commande_id
    JOIN 
      produit p ON cl.produit_id = p.id
    WHERE 
      c.id = ?
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

app.listen(3000, () => {
  console.log('Serveur démarré sur le port 3000');
});


// Route pour récupérer les informations de l'utilisateur connecté
app.get('/user', (req, res) => {
  const userId = req.query.userId; // Récupère l'ID utilisateur de la requête

  if (!userId) {
    return res.status(400).send({ message: 'ID utilisateur requis' });
  }

  const query = 'SELECT * FROM utilisateur WHERE id = ?';
  db.query(query, [userId], (err, results) => {
    if (err) {
      return res.status(500).send({ message: 'Erreur du serveur', error: err });
    }

    if (results.length === 0) {
      return res.status(404).send({ message: 'Utilisateur non trouvé' });
    }

    res.send({ user: results[0] });
  });
});
