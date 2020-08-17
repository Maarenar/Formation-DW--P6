const express = require('express'); // importation de Express
const router = express.Router();// définition d'un router sauces

const sauceCtrl = require('../controllers/sauces'); // importation du controller sauce
const auth = require('../middleware/auth'); // importation du middleware auth
const multer = require('../middleware/multer-config'); // importation du middleware multer-confirg

router.post('/', auth, multer, sauceCtrl.createSauce); // création d'une route pour créer un nouvelle sauce
router.put('/:id', auth, multer, sauceCtrl.modifySauce); // création d'une route pour modifier un sauce
router.delete('/:id', auth, sauceCtrl.deleteSauce); // création d'une route pour supprimer une sauce
router.get('/:id', auth, sauceCtrl.getOneSauce); // création d'une route pour afficher une sauce donnée
router.get('/', auth, sauceCtrl.getAllSauce); // création d'une route pour afficher toutes les sauces
router.post('/:id/like', auth, sauceCtrl.likeSauce); // création d'une route pour enregistrer les likes/dislikes
                                                     // dd'une sauce donnée   

module.exports = router;// on export le router sauces