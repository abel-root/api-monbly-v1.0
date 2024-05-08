const { User,Wallet} = require('../../models');
const bcrypt = require('bcrypt');
const path = require('path');
const fs = require('fs');
const { ValidationError } = require('sequelize');

const controllerRegister=async(req,res)=>{

    try {
        const userData = {
            nom: req.body.nom,
            prenoms: req.body.prenoms,
            profil: req.body.profil==null?"voyageur":req.body.profil,
            genre: req.body.genre,
            email: req.body.email,
            password: await bcrypt.hash(req.body.password, 10),
            pays: req.body.pays,
            tels: req.body.tels,
            dateNaissance: req.body.dateNaissance,
        };
        
        

       await User.create(userData).then(async(user) => {
            const message = 'Le compte utilisateur a été créé !';
            await Wallet.create({ userId: user.id, balance: 0 })
            res.status(200).json({ message, donnees: user });
        }).catch((err) => {
            if (err instanceof ValidationError) {
                return res.status(500).json({ message: err.message, donnees: err });
            }
            const message = 'Echec de la création du compte utilisateur.';
            res.status(500).json({ message, donnees: err });
        });
    } catch (err) {
        const message = 'Une erreur s\'est produite lors du traitement de la requête.';
        res.status(500).json({ message, donnees: err });
    }
}
module.exports=controllerRegister;