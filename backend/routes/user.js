const express = require('express');// importation de Express
const router = express.Router();// création d'un router user

const userCtrl = require('../controllers/user');// importation du controller user

router.post('/signup', userCtrl.signup); // création d'une route pour créer un nouvel utilisateur
router.post('/login', userCtrl.login); // création d'une route pour que l'utilisateur se connecte

module.exports = router;// on exporte le router user