const {Reservevation,Trajet}=require('../../models')
const conducteurRefuseReservationControllers=async(req,res)=>{
    const {id}=req.params;

    try {
        const updatedRows = await Reservevation.update(
            { statut: "refusee" ,
            redirection:"liste_vehicules"
        },
            { where: { id: parseInt(id) } }
        );

        const reservation= await Reservevation.findOne({
            where:
                {id:parseInt(id)}
            
        })

        const trajet = await Trajet.findByPk(parseInt(reservation.trajet_id));
        if (updatedRows > 0) {
            await Trajet.update({
                place_occupees: trajet.place_occupees - reservation.nombresPlace,
                place_restantes: trajet.place_restantes + reservation.nombresPlace 
            }, {
                where: {
                    id: trajet.id
                }
            });
            const message = `Réservation refusée avec succès.`;
            res.status(200).json({ message,donnees: reservation});
        } else {
            const message = `La réservation avec l'ID ${id} n'existe pas.`;
            res.status(404).json({ message });
        }
    } catch (err) {
        const message = `Échec d'acceptation de la réservation côté serveur.`;
        res.status(500).json({ message, donnees: err });
    }
}
module.exports=conducteurRefuseReservationControllers;