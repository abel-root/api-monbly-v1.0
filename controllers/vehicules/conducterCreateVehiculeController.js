const {Vehicule,Trajet}=require('../../models');
const path = require('path');
const fs = require('fs');

const conducterCreateVehiculeController=async(req,res)=>{
    const { conducterId } = req.params;

    try {
        // Vérifier si l'utilisateur a déjà créé un véhicule
        const user = await Vehicule.findOne({
            where: {
                userId: parseInt(conducterId)
            }
        });
    
        if (user) {
            const message = `Vous avez déjà créé un véhicule !`;
            return res.status(400).json({ message });
        }
    
        // Créer un nouveau véhicule
        const vehiculeData = {
            modele: req.body.modele,
            immatriculation: req.body.immatriculation,
            nb_places: parseInt(req.body.nb_places),
            placesrestant: parseInt(req.body.nb_places),
            userId: parseInt(conducterId),
        };
    
        // Gérer l'image du véhicule
        const { originalname, path: pathName } = req.file;
        const image = fs.readFileSync(pathName);
        if (!image || image.length === 0) {
            return res.status(400).json({ error: 'Les données de l\'image sont manquantes.' });
        }
        const fileExtension = path.extname(originalname);
        const fileNamePrefix = req.file.fieldname;
        const newFileName = `${fileNamePrefix}-${new Date().getTime()}${fileExtension}`;
        const newFilePath = path.join('assets/vehicules/', newFileName);
        fs.renameSync(pathName, newFilePath);
        vehiculeData.image = newFileName;
    
        // Créer le véhicule dans la base de données
        const vehicule = await Vehicule.create(vehiculeData);
    
        // Mettre à jour les trajets avec le nouvel ID du véhicule
        await Trajet.update(
            { 
                vehiculeId: vehicule.id,
                place_restantes:vehicule.nb_places,
                nombre_places:vehicule.nb_places
             },
            { where: { userId: conducterId, vehiculeId: null } }
        );
    
        // Répondre avec succès
        const message = `Le véhicule a été créé avec succès!`;
        res.status(201).json({ message, donnees: vehicule });
    } catch (err) {
        // Gérer les erreurs
        const message = `Échec de création du véhicule !`;
        res.status(500).json({ message, donnees: err });
    }
    
}
module.exports=conducterCreateVehiculeController;