const {Reservevation,ImageUser}=require('../../models')
const afficherToutesReservationPourVoyageurControllers=async(req,res)=>{
    const {voyageurId}=req.params;
    const limit = parseInt(req.query.limit) || 5;
    const page = parseInt(req.query.page) || 1;
    const sortBy = req.query.sortBy || "ASC";
    const offset = (page - 1) * limit;
    
    await Reservevation.findAll({
        include:["paiement","trajet","voyageur"],
        where:{
            userId:parseInt(voyageurId)
        },
        limit:limit,
        offset:offset,
        order:[["createdAt",sortBy]]
    }).then(async(reserv)=>{
        for(let reservation of reserv){
            let profilVoyageur=await ImageUser.findByPk(reservation.userId);
            reservation.dataValues.profilVoyageur = profilVoyageur;
            
            let profilConducteur=await ImageUser.findByPk(reservation.trajet.userId);
            reservation.dataValues.profilConducteur = profilConducteur;
        }
        const message =`La liste des reservation a été récupérée avec sucès`
        res.status(200).json({message,donnees:reserv})
    }).catch((err)=>{
        const message =`Échec de récupération des données `
        res.status(200).json({message,donnees:err})
    })

}
module.exports=afficherToutesReservationPourVoyageurControllers;