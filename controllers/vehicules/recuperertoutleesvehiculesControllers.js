const {Vehicule}=require('../../models');
const recuperertoutleesvehiculesControllers=async(req,res)=>{
const {conducteurId}=req.params;
const limit=parseInt(req.query.limit) || 5;
const page=parseInt(req.query.page) || 1;
const offset=(page-1)*limit;
const sortBy=req.query.sortBy || "ASC"

    await Vehicule.findAll({
        where:{
            userId:parseInt(conducteurId)
        },
        limit:limit,
        offset:offset,
        order:[["modele",sortBy]]
    }).then((vehicule)=>{
        if(vehicule){
            const message=`La liste des véhicules a été recupéré avec succès !`;
            res.status(200).json({message,donnees:vehicule});
        }else{
            const message=`Aucun vehicule n'a été trouvé dans la base de données !`;
            res.status(400).json({message});
        }
    }).catch((err)=>{
            const message=`Echec de recupération !`;
            res.status(400).json({message,donnees:err});
    })
}
module.exports=recuperertoutleesvehiculesControllers;