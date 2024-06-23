const {Trajet}=require("../../models")
const updatetrajetControllers=async(req,res)=>{
    const {conducteurId,id}=req.params;

    let montant;

      if(req.body.distance){
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
      }

    let dateNow=req.body.date
     dateNow=dateNow.split('/').join('-')
     //console.log(dateNow);

     const trajetData = {
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

    await Trajet.update(trajetData, {
        where: {
            id: parseInt(id),
            userId:parseInt(conducteurId)
        }
      }).then((_)=>{
        const message=`Le trajet a été modifier avec succès !`;
        res.status(200).json({message});
      }).catch((err)=>{
        const message=`Echec de modification du trajet !`;
        res.status(500).json({message,donnees:err});
      })
}
module.exports=updatetrajetControllers;