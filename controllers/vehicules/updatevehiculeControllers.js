const {Vehicule,Trajet}=require('../../models');
const path = require('path');
const fs = require('fs');
const updatevehiculeControllers=async(req,res)=>{

    const {conducteurId,id}=req.params;

    const vehiculeDa={
        modele:req.body.modele,
        immatriculation:req.body.immatriculation,
        nb_places:parseInt(req.body.nb_places)
    }

   // console.log(vehiculeDa)
   
    if(req.file){
        const { originalname, path: pathName, size } = req.file;
                const image = fs.readFileSync(pathName);
                if (!image || image.length === 0) {
                    return res.status(400).json({ error: 'Les données de l\'image sont manquantes.' });
                }
                const fileExtension = path.extname(originalname);
                const fileNamePrefix = req.file.fieldname;
    
                const newFileName = `${fileNamePrefix}-${new Date().getTime()}${fileExtension}`;
                const newFilePath = path.join('assets/vehicules/', newFileName);
                fs.renameSync(pathName, newFilePath);
    
                // userData.pieceIdentiteRecto = pieceIdentiteRecto;
                vehiculeDa.image = newFileName;
    }

    await Vehicule.update(vehiculeDa,{
        where:{
            id:parseInt(id),
            userId:parseInt(conducteurId)
        }
    }).then((_)=>{
        const message=`Mise à jour effectuée avec succès !`;
        res.status(200).json({message});
    }).catch((err)=>{
        const message=`Echec de mise à jour coté serveur!`;
        res.status(500).json({message,donnees:err});
    });

}
module.exports=updatevehiculeControllers;