const {Reservevation,Trajet,ImageUser}=require('../../models')
const conducteurAfficherTousCestrajetReserveControllers=async(req,res)=>{
    const limit = parseInt(req.query.limit) || 5;
    const page = parseInt(req.query.page) || 1;
    const sortBy = req.query.sortBy || "ASC";
    const offset = (page - 1) * limit;

    const {conducteurId}=req.params;
    //let trajet=[];
try {
    const reservations = await Reservevation.findAll({
        include:["paiement","voyageur","trajet"],
        limit: limit,
        offset: offset,
        order: [["createdAt", sortBy]]
    });
    
//console.log(reservations);

    if (reservations && reservations.length > 0) {
        const trajetIds = reservations.map(reservation => reservation.trajet_id);
        
        const trajets = await Trajet.findAll({
            where: {
                id: trajetIds,
                userId: parseInt(conducteurId)
            }
        });
        if (trajets && trajets.length > 0) {

            for(let reservation of reservations){
                let profilVoyageur=await ImageUser.findByPk(reservation.userId);
                reservation.dataValues.profilVoyageur = profilVoyageur;

                let profilConducteur=await ImageUser.findByPk(reservation.trajet.userId);
                reservation.dataValues.profilConducteur = profilConducteur;
            }

            const message = `La liste des trajets réservé a été récupérée avec succès !`;
            res.status(200).json({ message, donnees: reservations });
        } else {
            const message = `Aucun trajet trouvé correspondant à l'ID du conducteur fourni.`;
            res.status(404).json({ message });
        }
    } else {
        const message = `Aucune réservation en attente trouvée.`;
        res.status(404).json({ message });
    }
} catch (err) {
    const message = `Échec de récupération côté serveur !`;
    res.status(500).json({ message, donnees: err });
}


}
module.exports=conducteurAfficherTousCestrajetReserveControllers;