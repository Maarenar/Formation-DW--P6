const Sauce = require('../models/sauces');
const fs = require('fs');

exports.createSauce = (req, res, next) => {
    const sauceObject = JSON.parse(req.body.sauce);
    delete sauceObject._id;
    const sauce = new Sauce({
        ...sauceObject,
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    });
    sauce.save()
        .then(() => res.status(201).json({ message : 'La sauce a été créée ! '}))
        .catch(() => res.status(400).json({error}));
};

exports.modifySauce = (req,res,next) => {
    const sauceObject = req.file ?
    {
        ...JSON.parse(req.body.sauce),
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : { ...req.body };
    Sauce.updateOne({ _id: req.params.id}, { ...sauceObject, _id: req.params.id})
    .then(() => res.status(200).json({ message : 'La sauce a été modifiée' }))
    .catch(error => res.status(400).json({error}));
};

exports.deleteSauce = (req, res, next) => {
    Sauce.findOne({ _id: req.params.id})
        .then(sauce => {
            const filename = sauce.imageUrl.split('/images/')[1];
            fs.unlink(`images/${filename}`, () => {
            Sauce.deleteOne({ _id: req.params.id })
                .then(() => res.status(200).json({ message: 'La sauce a été supprimée !'}))
                .catch(error => res.status(400).json({ error }));
            });
        })
        .catch(error => res.status(500).json({ error }));
};

exports.getOneSauce = (req, res, next) => {
    Sauce.findOne({ _id: req.params.id })
      .then(sauce => res.status(200).json(sauce))
      .catch(error => res.status(404).json({ error }));
  };

exports.getAllSauce = (req, res, next) => {
    Sauce.find()
     .then(sauces => res.status(200).json(sauces))
     .catch(error => res.status(400).json({error}));
   };

/*
let usersLiked = [];
let usersDisliked = [];

-----LIKE------
exports.likeSauce = clique sur le bouton like
    si user neutre au sujet de la sauce -> ajoute un like
    if (!user_id in usersLiked && !user_id in usersDisliked){
        --> ajoute le user_id dans le tableau usersLiked de cette sauce// usersLiked.push(user_id);
        --> increment de 1 le number likes de la sauce // likes =+ 1;
        --> icone like devient coloree
    }

   si user aime deja la sauce -> annule le like
        --> retire le user_id dans le tableau usersLiked de cette sauce
        --> decremente de 1 le number likes de la sauce 
        --> icone like redevient blanche

   si user n'aimait pas la sauce -> annule le dislike et ajoute un like
        --> ajoute le user_id dans le tableau usersLiked de cette sauce
        --> retire le user_id du tableau usersDisliked de cette sauce
        --> increment de 1 le number likes de la sauce
        --> decrement de -1 de number dislikes de la sauce
        --> icone like devient coloree, icone dislike redevient blanche 

-----DISLIKE-----
exports.dislikeSauce = clique sur le bouton dislike

    si user neutre au sujet de la sauce -> ajoute un dislike
        --> ajoute le user_id dans le tableau usersDisliked de cette sauce
        --> increment de -1 le number dislikes de la sauce 
        --> icone like devient coloree

    si user n'aimait deja pas la sauce -> annule le dislike
        --> retire le user_id du tableau usersDisliked de cette sauce
        --> decrement de -1 le tableau usersDisliked de cette sauce
        --> icone dislike redevient blanche
 

   si user aime deja la sauce -> annule le like et ajoute un dislike
        --> retire le user_id dans le tableau usersLiked de cette sauce
        --> ajoute le user_id dans le tableau usersDisliked de cette sauce
        --> decremente de 1 le number likes de la sauce 
        --> incremente de -1 le number de dislikes de la sauce
        --> icone like redevient blanche, icone dislike devient coloree
*/