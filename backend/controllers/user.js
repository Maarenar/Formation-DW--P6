const bcrypt = require('bcrypt');//importation de bcrypt
const jwt = require('jsonwebtoken');// importation de jsonwebtoken
const User = require('../models/user');// importation du schéma de donnees user

exports.signup = (req,res,next) => {
    bcrypt.hash(req.body.password, 10)// on crypte le mot de passe
    .then(hash => {
        const user = new User ({ // on crée une nouvelle instance de la classe User
            email : req.body.email,
            password : hash
        });
        user.save()// on enregistre les données de l'utilisatuer dans la base de données
            .then(() => res.status(201).json({ message : 'L\'utilisateur a été créé !' }))
            .catch(error => res.status(400).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));

};

exports.login = (req,res,next) => {
    User.findOne({ email : req.body.email })//on recherche l'email dans la base de données
    .then(user => {
        if (!user) {
            return res.status(401).json({ error : 'Utilisateur inconnu!'})
        }
        bcrypt.compare(req.body.password, user.password)// on compare les mots de passe
        .then(valid => {
            if(!valid){
                return res.status(401).json({ error : 'Mot de passe incorrect!'})
            }
            res.status(200).json({// on renvoie un token valable 24h
                userId: user._id,
                token: jwt.sign(
                    { userId: user._id },
                    'RANDOM_TOKEN_SECRET',
                    { expiresIn: '24h' },
                )
            })
        })
        .catch(error => res.status(500).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));

};