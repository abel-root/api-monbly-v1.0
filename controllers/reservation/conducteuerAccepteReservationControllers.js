const {Reservevation}=require('../../models')
const conducteuerAccepteReservationControllers=async(req,res)=>{

    const { id } = req.params;

try {
    const updatedRows = await Reservevation.update(
        { statut: "acceptee" },
        { where: { id: parseInt(id) } }
    );

    if (updatedRows > 0) {
        const message = `Réservation acceptée avec succès.`;
        res.status(200).json({ message });
    } else {
        const message = `La réservation avec l'ID ${id} n'existe pas.`;
        res.status(404).json({ message });
    }
} catch (err) {
    const message = `Échec d'acceptation de la réservation côté serveur.`;
    res.status(500).json({ message, donnees: err });
}

}
module.exports=conducteuerAccepteReservationControllers;