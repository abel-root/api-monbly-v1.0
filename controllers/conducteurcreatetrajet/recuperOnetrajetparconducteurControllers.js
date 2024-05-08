const {Trajet,User}=require('../../models');
const recuperOnetrajetparconducteurControllers=async(req,res)=>{
    const {conducteurId, id}=req.params;
    
    try {
        const trajet = await Trajet.findOne({
            include:["vehicule"],
            where: {
                id: parseInt(id),
                userId: parseInt(conducteurId)
            }
        });

        if (!trajet) {
            const message = `Ce trajet est introuvable.`;
            return res.status(404).json({ message, donnees: trajet });
        }

        const message = `Le trajet a été récupéré avec succès !`;
        res.status(200).json({ message, donnees: trajet });
    } catch (err) {
        const message = `Échec de récupération du trajet depuis le serveur.`;
        res.status(500).json({ message, donnees: err });
    }
}
module.exports=recuperOnetrajetparconducteurControllers;