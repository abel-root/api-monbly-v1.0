const { User} = require('../../models');

const adminCreateUserCTRL=async(req,res)=>{
    const {userId}=req.params;
try {
    const userData = {
        profil: req.body.profil,
    };
    

   await User.update(userData,{
    where: {
        id: parseInt(userId)
    }

   }).then(async(_) => {
        const message = 'Cet utilisateur est maintenant admin !';
        res.status(200).json({message});
    }).catch((err) => {
        const message = 'Echec de la création du compte utilisateur.';
        res.status(500).json({ message, donnees: err });
    });
} catch (err) {
    const message = 'Une erreur s\'est produite lors du traitement de la requête.';
    res.status(500).json({ message, donnees: err });
}
}
module.exports=adminCreateUserCTRL;