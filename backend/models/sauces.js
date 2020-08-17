const mongoose = require ('mongoose');// importation de mongoose

/**
 * Création d'un schema de données pour l'objet Sauce
 */
const sauceSchema = mongoose.Schema({
    userId : { type : String, required : true},
    name : { type : String, required : true},
    manufacturer : { type : String, required : true},
    description : { type : String, required : true},
    mainPepper : { type : String, required : true},
    imageUrl : { type : String, required : true},
    heat : { type : Number, required : true },
    likes : { type : Number, required : false},
    dislikes : { type : Number, required : false},
    usersLiked : { type : Array, required : false},
    usersDisliked : { type : Array, required : false},
});

module.exports = mongoose.model('sauce', sauceSchema); // on exporte le schéma de données