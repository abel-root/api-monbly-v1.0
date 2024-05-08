const {AvisUser}=require('../../models')

const recupereeAvisVisibleCRTL=async(req,res)=>{
    await AvisUser.findAll({
        include:"user",
        where:{
            isVisible:"Yes"
        }
    }).then((raview)=>{
        const message=`La liste des commentaires.`
        res.status(200).json({message,donnees:raview});
    }).catch((err)=>{
        const message=`Echec de récupération.`
        res.status(500).json({message,donnees:err});
    })
}
module.exports=recupereeAvisVisibleCRTL;