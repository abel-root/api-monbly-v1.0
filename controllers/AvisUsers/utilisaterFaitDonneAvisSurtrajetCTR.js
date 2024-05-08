const {AvisUser,User,Trajet}=require('../../models')
const utilisaterFaitDonneAvisSurtrajetCTR=async(req,res)=>{
    const {userId, trajetId}=req.params;
    const user=await User.findByPk(userId);
    const trajet=await Trajet.findByPk(trajetId);
    const avisData={
        userId:user.id,
        trajetId:trajet.id,
        point: req.body.point, // en pourcentage
        comment:req.body.comment,
        isVisible:"No" // c'est l'admin qui le rend visible après vérification
    }
    if(user || trajet ){

        await AvisUser.create(avisData).then((avis)=>{
            const message=`Avis créé avec succès.`
            res.status(201).json({message,donnees:avis});
        }).catch((err)=>{
            const message=`Echec de soumissions`
            res.status(500).json({message,donnees:err});
        })
    }else{
        const message=`Utlisateur ou trajet introuvable `
        res.status(404).json({message});
    }
}
module.exports=utilisaterFaitDonneAvisSurtrajetCTR