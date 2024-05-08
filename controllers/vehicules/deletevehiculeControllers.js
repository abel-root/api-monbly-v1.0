const {Vehicule}=require('../../models')
const deletevehiculeControllers=async(req,res)=>{
    const {conducteurId,id}=req.params;

    await Vehicule.destroy({
        where:{
            id:parseInt(id),
            userId:parseInt(conducteurId)
        }
    }).then((_)=>{
        const message="Le vehicule a été supprimer avec succès !";
        res.status(200).json({message})
    }).catch((err)=>{
        const message="Echec de suppression !";
        res.status(500).json({message,donnees:err});
    })

}
module.exports=deletevehiculeControllers;