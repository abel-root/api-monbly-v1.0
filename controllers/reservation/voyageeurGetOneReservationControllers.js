const {Reservevation}=require('../../models')
const voyageeurGetOneReservationControllers=async(req,res)=>{
    const {voyageurId,id}=req.params;

    await Reservevation.findOne(
        {
            include:["paiement"],
            where:{
                userId:parseInt(voyageurId),
                id:parseInt(id)
            }
        }
    ).then((reserve)=>{
        const message=`La liste de reservation a été récupérée avec succè.`;
        res.status(200).json({message,donnees:reserve});
    }).catch((err)=>{
        const message=`Échec de récupération.`;
        res.status(500).json({message,donnees:err});
    })
}
module.exports=voyageeurGetOneReservationControllers;