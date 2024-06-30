const {Reservevation,ImageUser}=require('../../models')
const voyageeurGetOneReservationControllers=async(req,res)=>{
    const {voyageurId,id}=req.params;

    await Reservevation.findOne(
        {
            include:["paiement","voyageur","trajet"],
            where:{
                userId:parseInt(voyageurId),
                id:parseInt(id)
            }
        }
    ).then(async(reserve)=>{
       
            let profilVoyageur=await ImageUser.findByPk(reserve.userId);
            reserve.dataValues.profilVoyageur = profilVoyageur;

            let profilConducteur=await ImageUser.findByPk(reserve.trajet.userId);
            reserve.dataValues.profilConducteur = profilConducteur;
        
        const message=`La liste de reservation a été récupérée avec succè.`;
        res.status(200).json({message,donnees:reserve});
    }).catch((err)=>{
        const message=`Échec de récupération.`;
        res.status(500).json({message,donnees:err});
    })
}
module.exports=voyageeurGetOneReservationControllers;