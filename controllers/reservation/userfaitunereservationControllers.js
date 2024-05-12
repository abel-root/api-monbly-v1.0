const {Reservevation,Vehicule,Trajet}=require('../../models')
const userfaitunereservationControllers=async(req,res)=>{
    const { voyageurId, trajetId, vehiculeId } = req.params;
    const { nombresPlace } = req.body;
    try {
        const vehicule = await Vehicule.findOne({
            where: {
                id: parseInt(vehiculeId)
            }
        });

        if (!vehicule) {
            const message = `Ce véhicule n'existe pas.`;
            return res.status(404).json({ message });
        }

        const trajet = await Trajet.findByPk(parseInt(trajetId));

        if (nombresPlace<=0){
            const message = `Vous ne pouvez pas réserver ${nombresPlace} place.`;
            return res.status(400).json({ message });
        }

        //|| trajet.place_restantes < nombresPlace 

        if (trajet.nombre_places < nombresPlace ) {
            const message = `Ce véhicule ne dispose pas de ce nombre de places.`;
            return res.status(400).json({ message });
        }

       
        if (trajet.place_restantes < nombresPlace || trajet.place_restantes <=0) {
            const message = `Ce véhicule ne dispose que de ${trajet.place_restantes} ${trajet.place_restantes<2 ? "place restantante pour ce trajet":"places restantantes pour ce trajet"}`;
            return res.status(400).json({ message });
        }
        

        const reservation = await Reservevation.create({
            userId: parseInt(voyageurId),
            trajet_id: parseInt(trajetId),
            nombresPlace,
            statut: "en_attente",
            redirection: "paiement",
            montantTotal: parseFloat(trajet.montant) * nombresPlace
        });

        
       

        await Trajet.update({
            place_occupees: trajet.place_occupees + nombresPlace,
            place_restantes: trajet.place_restantes - nombresPlace 
        }, {
            where: {
                id: trajet.id
            }
        });

        //monatant total du trajet 
        const montantTotal = parseFloat(trajet.montant) * nombresPlace;
        
        
        
        const message = `Réservation effectuée avec succès !`;
        res.status(200).json({ message, donnees: { ...reservation.toJSON(), montantTotal } });
    } catch (error) {
        const message = `Échec de la réservation.`;
        res.status(500).json({ message, donnees: error });
    }
}
module.exports=userfaitunereservationControllers;