const { connect } = require("mongoose"); 

const mongoose = require('mongoose');// importation de mongoose
const uniqueValidator = require('mongoose-unique-validator'); // importation du package mongoose unique validator

const userSchema = mongoose.Schema({
    email: { type : String, required : true, unique : true},
    password: {type : String, required : true}
});

userSchema.plugin(uniqueValidator); // on utilise mongoose-unique-validator pour valider qu'il n'y a pas 2 users
                                    // avec le même email

module.exports = mongoose.model('User', userSchema); // on exporte le schéma de données