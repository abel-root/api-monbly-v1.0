const {ImageUser,User}=require('../../models');
const path = require('path');
const fs = require('fs');
const { ValidationError } = require('sequelize');

const updateUserImageControllers=async(req,res)=>{

    const {userId,id}=req.params;

    try {
        const user = await User.findOne({
            where: {
                id: parseInt(userId)
            }
        });
       // console.log(user);
        if (!user) {
            const message = 'Cet utilisateur est introuvable';
            return res.status(404).json({ message });
        }

        

        const { originalname, path: pathName, size } = req.files;
            const image = fs.readFileSync(pathName);
            if (!image || image.length === 0) {
                return res.status(400).json({ error: 'Les données de l\'image sont manquantes.' });
            }
            const fileExtension = path.extname(originalname);
            const fileNamePrefix = req.file.fieldname;

            const newFileName = `${fileNamePrefix}-${new Date().getTime()}${fileExtension}`;
            const newFilePath = path.join('assets/users/', newFileName);
            fs.renameSync(pathName, newFilePath);

            // userData.pieceIdentiteRecto = pieceIdentiteRecto;
            //Data.image = newFileName;


            //console.log(Data);

        await ImageUser.update({image:newFileName},
            {
                where:{
                    id: parseInt(id),
                    userId: parseInt(userId)
                  }
            }
            ).then((image) => {
                const message = 'Les données ont été ajoutées avec succès';
                res.status(200).json({ message, donnees: image });
            }).catch((err) => {
                if (err instanceof ValidationError) {
                    return res.status(400).json({ message: err.message, donnees: err });
                }
                const message = "Echec d'ajout des données";
                res.status(500).json({ message, donnees: err });
            });
    } catch (err) {
        const message = 'Une erreur s\'est produite lors du traitement de la requête.';
        res.status(500).json({ message, donnees: err });
    }
}
module.exports=updateUserImageControllers;