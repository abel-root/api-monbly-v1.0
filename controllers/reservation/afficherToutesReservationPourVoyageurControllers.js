const {Reservevation}=require('../../models')
const afficherToutesReservationPourVoyageurControllers=async(req,res)=>{
    const {voyageurId}=req.params;
    const limit = parseInt(req.query.limit) || 5;
    const page = parseInt(req.query.page) || 1;
    const sortBy = req.query.sortBy || "ASC";
    const offset = (page - 1) * limit;
    
    await Reservevation.findAll({
        include:["paiement"],
        where:{
            userId:parseInt(voyageurId)
        },
        limit:limit,
        offset:offset,
        order:[["createdAt",sortBy]]
    }).then((reserv)=>{
        const message =`La liste des reservation a été récupérée avec sucès`
        res.status(200).json({message,donnees:reserv})
    }).catch((err)=>{
        const message =`Échec de récupération des données `
        res.status(200).json({message,donnees:err})
    })

}
module.exports=afficherToutesReservationPourVoyageurControllers;