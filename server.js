const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.json());

// Configurer la connexion à la base de données
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '', // Remplacez par votre mot de passe
    database: 'cda1512' // Nom de votre base de données
});

db.connect(err => {
    if (err) {
        console.error('Erreur de connexion à la base de données:', err);
        return;
    }
    console.log('Connecté à la base de données MySQL');
});

// Exemple de route pour obtenir des produits
app.get('/api/produits', (req, res) => {
    const query = 'SELECT * FROM produit';
    db.query(query, (err, results) => {
        if (err) {
            console.error('Erreur lors de l\'exécution de la requête:', err);
            res.status(500).json({ error: 'Erreur serveur' });
            return;
        }
        res.json(results);
    });
});


app.get('/api/messages', (req, res) => {
    const query = 'SELECT * FROM messages';
    db.query(query, (err, results) => {
        if (err) {
            console.error('Erreur lors de l\'exécution de la requête:', err);
            res.status(500).json({ error: 'Erreur serveur' });
            return;
        }
        res.json(results);
    });
});

app.listen(port, () => {
    console.log(`Serveur backend lancé sur le port ${port}`);
});