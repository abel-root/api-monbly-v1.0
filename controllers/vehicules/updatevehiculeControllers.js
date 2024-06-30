const {Vehicule,Trajet}=require('../../models');
const path = require('path');
const fs = require('fs');
const updatevehiculeControllers=async(req,res)=>{

    const {conducteurId,id}=req.params;
    let place=parseInt(req.body.nb_places);
    let modele=req.body.modele;
    let immatriculation=req.body.immatriculation
    const vehiculeDa={};
    try{
        
        place && (vehiculeDa.nb_places = place);
        modele &&(vehiculeDa.modele=modele);
        immatriculation&&(vehiculeDa.immatriculation=immatriculation);
        
      
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
        let vehiculeOne=  await Vehicule.findOne({
            where:{
                id:parseInt(id),
                userId:parseInt(conducteurId)
            }
        });
    
        if(!vehiculeOne){
            return res.status(404).json({message:`Ce véhicule est introuvable !`})
        }
        
        let updateVehicule=  await Vehicule.update(vehiculeDa,{
            where:{
                id:parseInt(id),
                userId:parseInt(conducteurId)
            }
        });
        if(updateVehicule[0]>0){
            if(place){
                if(place>vehiculeOne.nb_places){
                    //le nombre de place à changer ; mais augmenter (place-vehiculeOne.nb_places)
                    let trajets= await Trajet.findAll({
                        where:{
                            vehiculeId: vehiculeOne.id,
                            userId:parseInt(conducteurId)
                        }
                    })
                    
                    for (let trajet of trajets) {
                        // Créer dynamiquement l'objet de mise à jour
                        let updateValues = {
                            nombre_places: place
                        };
                    
                        if (trajet.place_occupees == 0) {
                            updateValues.place_restantes = place;
                        } else {
                            updateValues.place_restantes = trajet.place_restantes + (place - vehiculeOne.nb_places);
                        }
                    
                        // Mise à jour du trajet
                        await Trajet.update(updateValues, {
                            where: {
                                id: trajet.id
                            }
                        });
                    }
                
                   // console.log(JSON.stringify(dataValuesArray, null, 2));
                    
                }else if(place<vehiculeOne.nb_places){
                    // le nombre de place à changer; mais diminuer(place-vehiculeOne.nb_places)
                    let trajets= await Trajet.findAll({
                        where:{
                            vehiculeId: vehiculeOne.id,
                            userId:parseInt(conducteurId)
                        }
                    })
                    //const dataValuesArray = trajets.map(trajet => trajet.dataValues);
                   
                    for (let trajet of trajets) {
                        // Créer dynamiquement l'objet de mise à jour
                        let updateValues = {
                            nombre_places: place
                        };
                    
                        if (trajet.place_occupees == 0) {
                            updateValues.place_restantes = place;
                        } else {
                            if((trajet.place_restantes + (place - vehiculeOne.nb_places))>=trajet.place_occupees){
                                updateValues.place_restantes = trajet.place_restantes + (place - vehiculeOne.nb_places);
                            }
                           
                        }
                    
                        // Mise à jour du trajet
                        await Trajet.update(updateValues, {
                            where: {
                                id: trajet.id
                            }
                        });
                    }
                
                  

                }else{
                    //le nombre de place a été modifier mais sa valeur l'a pas changer (place-vehiculeOne.nb_places)
                    let trajets= await Trajet.findAll({
                        where:{
                            vehiculeId: vehiculeOne.id,
                            userId:parseInt(conducteurId)
                        }
                    })
                   // const dataValuesArray = trajets.map(trajet => trajet.dataValues);
                    
                   
                   for (let trajet of trajets) {
                    // Créer dynamiquement l'objet de mise à jour
                    let updateValues = {
                        nombre_places: place
                    };
                
                    if (trajet.place_occupees == 0) {
                        updateValues.place_restantes = place;
                    } else {
                        updateValues.place_restantes = trajet.place_restantes + (place - vehiculeOne.nb_places);
                    }
                
                    // Mise à jour du trajet
                    await Trajet.update(updateValues, {
                        where: {
                            id: trajet.id
                        }
                    });
                }
                
                   // console.log(JSON.stringify(dataValuesArray, null, 2));
                }
            }
            const message=`Mise à jour effectuée avec succès !`;
            res.status(200).json({message,donnees:updateVehicule});
        }
        
    }catch(err){
        const message=`Echec de mise à jour coté serveur!`;
        res.status(500).json({message,donnees:err});
    };

}
module.exports=updatevehiculeControllers;