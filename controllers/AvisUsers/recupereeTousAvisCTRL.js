const {AvisUser}=require('../../models')
const recupereeTousAvisCTRL=async(req,res)=>{
    
    await AvisUser.findAll({
        include:"user",
    }).then((raview)=>{
        const message =`Tous les commentaires ont été récupéré`;
        res.status(200).json({message,donnees:raview});
    }).catch((err)=>{
        const message =`Echec de récupération.`;
        res.status(500).json({message,donnees:err});
    })
    
}
module.exports=recupereeTousAvisCTRL;