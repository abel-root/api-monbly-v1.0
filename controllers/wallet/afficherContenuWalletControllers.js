const {Wallet}=require('../../models')
const afficherContenuWalletControllers=async(req,res)=>{
    const {userId}=req.params;
    await Wallet.findAll({
        where:{
            userId:userId
        }
    }).then((wallet)=>{
        const message=`Soldes récupéré avec seccès.`
        res.status(200).json({message,donnees:wallet})
    }).catch((error)=>{
        const message=`Echec de récupération.`
        res.status(200).json({message,donnees:error})
    })
}
module.exports=afficherContenuWalletControllers;