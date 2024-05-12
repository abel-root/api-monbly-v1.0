const {User,Reservevation,Recue,Trajet}=require('../../models');
const recupereeRecueCTRL=async(req,res)=>{
    const { userId } = req.params;
    try {
        const recues = await Recue.findAll({
            include: ["reservation"],
            where: {
                voyageurId: parseInt(userId)
            }
        });

        console.log(recues);

        if (!recues || recues.length === 0) {
            const message = `Aucun reçu trouvé pour cet utilisateur.`;
            return res.status(404).json({ message });
        }

        const reservations = [];
        const conducteurs = [];

        for (let i = 0; i < recues.length; i++) {
            const recue = recues[i];

            const reservation = await Reservevation.findOne({
                where: {
                    id: parseInt(recue.reservationId)
                }
            });

            if (!reservation) {
                const message = `Aucune réservation trouvée pour ce reçu.`;
                return res.status(404).json({ message });
            }

            reservations.push(reservation);

            const conducteur = await User.findOne({
                where: {
                    id: parseInt(recue.conducteurId),
                    profil: "conducteur"
                }
            });

            if (!conducteur) {
                const message = `Aucun conducteur trouvé pour ce reçu.`;
                return res.status(404).json({ message });
            }

            conducteurs.push(conducteur);
        }

        const trajetsIds = reservations.map(reservation => reservation.trajet_id);
        const trajets = await Trajet.findAll({
            where: {
                id: trajetsIds
            }
        });

        if (!trajets || trajets.length === 0) {
            const message = `Aucun trajet trouvé pour ces réservations.`;
            return res.status(404).json({ message });
        }

        const message = `Il y a ${recues.length} ${recues.length > 1 ? "reçus" : "reçu"} récupéré(s) avec succès.`;
        res.status(200).json({ message, donnees: recues, reservations, conducteurs, trajets });
    } catch (err) {
        const message = 'Échec du traitement de la requête.';
        res.status(500).json({ message, donnees: err.message });
    }
}
module.exports=recupereeRecueCTRL;