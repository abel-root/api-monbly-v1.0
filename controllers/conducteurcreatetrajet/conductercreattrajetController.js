const {Trajet,User,Vehicule}=require('../../models')
const conductercreattrajetController=async(req,res)=>{
     const { conducteurId } = req.params;

     //code de verification sur le  montant ici !
     let montant;

        if (req.body.distance >0 && req.body.distance <= 50) {
            montant = (req.body.distance *140 <= req.body.montant && req.body.montant <= req.body.distance * 180);
            if (!montant) {
                return res.status(400).json({ message: `Le montant spécifié n'est pas dans la plage attendue pour la distance fournie (entre ${req.body.distance * 140} FCFA et ${req.body.distance * 180} FCFA).` });
            }
        } else if (req.body.distance > 50) {
            montant = (req.body.distance * 16 <= req.body.montant && req.body.montant <= req.body.distance * 20);
            if (!montant) {
                return res.status(400).json({ message: `Le montant spécifié n'est pas dans la plage attendue pour la distance fournie (entre ${req.body.distance * 16 } FCFA et ${req.body.distance * 20} FCFA).` });
            }
        } else {
            return res.status(400).json({ message: "La distance doit être supérieure à zéro." });
        }

     let dateNow=req.body.date
     dateNow=dateNow.split('/').join('-')
     //console.log(dateNow);

     const trajetData = {
         userId: parseInt(conducteurId),
         depart: req.body.depart,
         arrivee: req.body.arrivee,
         date: dateNow,
         heure: req.body.heure,
         montant: req.body.montant,
         distance: req.body.distance,
         address_depot:req.body.address_depot,
         address_recuperation:req.body.address_recuperation
     };

     if(new Date()>new Date(req.body.date)){
        return res.status(400).json({message:`La date que vous avez entrée ne peut pas être acceptée.`})
     }

     const vehicule=await Vehicule.findOne({
        where:{
            userId:parseInt(conducteurId)
        }
     })

     if(vehicule){
        trajetData.vehiculeId=vehicule.id
        trajetData.nombre_places=vehicule.nb_places
        trajetData.place_restantes=vehicule.nb_places
     }
 
     try {
         const trajet = await Trajet.create(trajetData);
 
         await User.update({
             profil: "conducteur"
         }, {
             where: {
                 id: parseInt(conducteurId)
             }
         });
 
         const message = `Le trajet a été créé avec succès!`;
         res.status(200).json({ message, donnees: trajet });
     } catch (err) {
         const message = `Échec de création du trajet`;
         res.status(500).json({ message, donnees: err });
     }
}
module.exports=conductercreattrajetController;