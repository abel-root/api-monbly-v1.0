const {Trajet}=require('../../models');
const conducteurDeletetrajetController=async(req,res)=>{
    const {conducteurId,id}=req.params;

    await Trajet.destroy({
        where: {
          id: parseInt(id),
          userId:parseInt(conducteurId)
        }
      }).then((_)=>{
        const message=`Le trajet a été suprimer avec succès !`
        res.status(200).json({message});
      }).catch((err)=>{
            const message=`Échec de superssion du trajet !`
            res.status(500).json({message,donnees:err});
      })
}
module.exports=conducteurDeletetrajetController;