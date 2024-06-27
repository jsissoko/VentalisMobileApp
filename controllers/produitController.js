const db = require('../config/db');

exports.getProduits = (req, res) => {
  const query = 'SELECT * FROM produit';
  db.query(query, (err, results) => {
    if (err) {
      console.error('Erreur lors de l\'exécution de la requête:', err);
      res.status(500).json({ error: 'Erreur serveur' });
      return;
    }
    res.json(results);
  });
};

exports.getProduitById = (req, res) => {
  const query = 'SELECT * FROM produit WHERE id = ?';
  db.query(query, [req.params.id], (err, results) => {
    if (err) {
      console.error('Erreur lors de l\'exécution de la requête:', err);
      res.status(500).json({ error: 'Erreur serveur' });
      return;
    }
    res.json(results[0]);
  });
};

exports.createCommande = (req, res) => {
  const { productId } = req.body;
  const query = 'INSERT INTO commandes (produit_id) VALUES (?)';
  db.query(query, [productId], (err, results) => {
    if (err) {
      console.error('Erreur lors de la création de la commande:', err);
      res.status(500).json({ error: 'Erreur serveur' });
      return;
    }
    res.status(201).json({ message: 'Commande créée avec succès' });
  });
};

exports.sendMessage = (req, res) => {
  const { message } = req.body;
  const query = 'INSERT INTO messages (contenu) VALUES (?)';
  db.query(query, [message], (err, results) => {
    if (err) {
      console.error('Erreur lors de l\'envoi du message:', err);
      res.status(500).json({ error: 'Erreur serveur' });
      return;
    }
    res.status(201).json({ message: 'Message envoyé avec succès' });
  });
};
