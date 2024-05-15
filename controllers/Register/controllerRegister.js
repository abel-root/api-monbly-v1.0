const { User,Wallet} = require('../../models');
const bcrypt = require('bcrypt');
const path = require('path');
const fs = require('fs');
const { ValidationError } = require('sequelize');

const controllerRegister=async(req,res)=>{

    //vérification si le numéro den téléphone exixte déjà.
 const verifyUserTels=  await User.findOne({
        where:{
            tels: req.body.tels
        }
    })

    if(verifyUserTels){
        const message=`Le numéro de téléphone que vous avez enregiustrer existe déjà !`
        return res.status(400).json({message});
    }


    //Vérification si l'email est unique 

    const verifyUserEmail=await User.findOne({
        where:{
            email:req.body.email
        }
    })
    
    if(verifyUserEmail){
        const message=`Cet email est déjà associé à un autre compte !`
        return res.status(400).json({message});
    }

     if (!/^\d{4}$/.test(req.body.password)) {
         return res.status(400).json({message: "Le mot de passe doit être composé de 4 chiffres."})
      }

      if (/(.).*\1/.test(req.body.password)) {
        return res.status(400).json({message: 'Le mot de passe ne doit pas contenir de chiffres répétés.'})
      }

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
            res.status(201).json({ message, donnees: user });
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