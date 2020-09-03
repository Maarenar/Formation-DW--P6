const express = require('express'); //importation d'Express

/**
 * importation de packages
 */
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');
const validation = require('express-validator');

/**
 * Creation de l'application Express
 */
const app = express();


/**
 * Définition des routes
 */
const sauceRoutes = require('./routes/sauces');
const userRoutes = require('./routes/user');

/**
 * Connexion à la base de données
 */
mongoose.connect('mongodb+srv://userAddandOther:YQM9KH7cOF7uOvcf@cluster0.zohcq.mongodb.net/<dbname>?retryWrites=true&w=majority',
    { useNewUrlParser: true,
    useUnifiedTopology: true})
    .then(() => console.log('Connexion a MongoDB reussie!'))
    .catch(() => console.log('Erreur de connexion')); 


/**
 * Ajout d'un middleware definissant des headers de requête pour éviter les erreur CORS
 */
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

/**
 * Définition des middlewares
 */

app.use(bodyParser.json());
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/api/sauces', sauceRoutes);
app.use('/api/auth', userRoutes);




module.exports = app;// on exporte l'application