const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const produitRoutes = require('./routes/produitRoutes');
const db = require('./config/db');

const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.json());

// Utilisation des routes
app.use('/api', produitRoutes);

app.listen(port, () => {
  console.log(`Serveur backend lancé sur le port ${port}`);
});
