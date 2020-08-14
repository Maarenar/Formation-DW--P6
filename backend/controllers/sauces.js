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

exports.likeSauce = (req, res, next) => {

    switch (req.body.like) {
      case 0:
        Sauce.findOne({ _id: req.params.id })
          .then((sauce) => {
            if (sauce.usersLiked.find(user => user === req.body.userId)) {
              Sauce.updateOne({ _id: req.params.id }, {
                $inc: { likes: -1 },
                $pull: { usersLiked: req.body.userId },
                _id: req.params.id
              })
                .then(() => { res.status(201).json({ message: 'Ton avis a été pris en compte!' }); })
                .catch((error) => { res.status(400).json({ error: error }); });
  
            } if (sauce.usersDisliked.find(user => user === req.body.userId)) {
              Sauce.updateOne({ _id: req.params.id }, {
                $inc: { dislikes: -1 },
                $pull: { usersDisliked: req.body.userId },
                _id: req.params.id
              })
                .then(() => { res.status(201).json({ message: 'ok...' }); })
                .catch((error) => { res.status(400).json({ error: error }); });
            }
          })
          .catch((error) => { res.status(404).json({ error: error }); });
        break;
      case 1:
        Sauce.updateOne({ _id: req.params.id }, {
          $inc: { likes: 1 },
          $push: { usersLiked: req.body.userId },
          _id: req.params.id
        })
          .then(() => { res.status(201).json({ message: 'Like added!' }); })
          .catch((error) => { res.status(400).json({ error: error }); });
        break;
      case -1:
        Sauce.updateOne({ _id: req.params.id }, {
          $inc: { dislikes: 1 },
          $push: { usersDisliked: req.body.userId },
          _id: req.params.id
        })
          .then(() => { res.status(201).json({ message: 'Ok... it\'\s your right...' }) })
          .catch((error) => { res.status(400).json({ error: error }) });
        break;
      default:
        console.error('Bad request')
    }
  };