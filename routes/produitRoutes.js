const express = require('express');
const { getProduits, getProduitById, createCommande, sendMessage } = require('../controllers/produitController');

const router = express.Router();

router.get('/produits', getProduits);
router.get('/produits/:id', getProduitById);
router.post('/checkout', createCommande);
router.post('/messages', sendMessage);

module.exports = router;
