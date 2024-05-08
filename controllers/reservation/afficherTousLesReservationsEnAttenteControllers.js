const {Reservevation,Trajet}=require('../../models');
const afficherTousLesReservationsEnAttenteControllers=async(req,res)=>{
    const limit = parseInt(req.query.limit) || 5;
    const page = parseInt(req.query.page) || 1;
    const sortBy = req.query.sortBy || "ASC";
    const offset = (page - 1) * limit;
    const {conducteurId}=req.params;

    try {
        const reservations = await Reservevation.findAll({
            include:["paiement"],
            where: {
                statut: "en_attente"
            },
            limit: limit,
            offset: offset,
            order: [["createdAt", sortBy]]
        });
    
        if (reservations && reservations.length > 0) {
            const trajetIds = reservations.map(reservation => reservation.trajet_id);
            const trajets = await Trajet.findAll({
                where: {
                    id: trajetIds,
                    userId: parseInt(conducteurId)
                }
            });
    
            if (trajets && trajets.length > 0) {
                const message = `La liste des réservations en attente a été récupérée avec succès !`;
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
module.exports=afficherTousLesReservationsEnAttenteControllers