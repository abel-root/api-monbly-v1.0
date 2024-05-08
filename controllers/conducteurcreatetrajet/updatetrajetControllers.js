const {Trajet}=require("../../models")
const updatetrajetControllers=async(req,res)=>{
    const {conducteurId,id}=req.params;
    await Trajet.update(req.body, {
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