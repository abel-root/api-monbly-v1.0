const {Piece}=require('../../models');
const path = require('path');
const fs = require('fs');
const { ValidationError } = require('sequelize');
const updateUsersControllersPiece=async(req,res)=>{
    const id=req.params.id;
    const userId=req.params.userId;
   
    const userDataPiece = {
        retro:"",
        verso:""
    };
  
    if(req.files){
       
        if(req.files["recto"][0]){
            const { originalname, path: pathName, size } = req.files["recto"][0];
            const pieceIdentiteRecto = fs.readFileSync(pathName);
            if (!pieceIdentiteRecto || pieceIdentiteRecto.length === 0) {
                return res.status(400).json({ error: 'Les données de l\'image sont manquantes.' });
            }
            const fileExtension = path.extname(originalname);
            const fileNamePrefix = req.files["recto"][0].fieldname;
    
            const newFileName = `${fileNamePrefix}-${new Date().getTime()}${fileExtension}`;
            const newFilePath = path.join('assets/pieces/', newFileName);
            fs.renameSync(pathName, newFilePath);
            
            // userData.pieceIdentiteRecto = pieceIdentiteRecto;
            userDataPiece.retro = newFileName;
            console.log(userDataPiece)
        }
    
        if(req.files["verso"][0]){
            const { originalname, path: pathName, size } = req.files["verso"][0];
            const pieceIdentiteVerso = fs.readFileSync(pathName);
            if (!pieceIdentiteVerso || pieceIdentiteVerso.length === 0) {
                return res.status(400).json({ error: 'Les données de l\'image sont manquantes.' });
            }
            const fileExtension = path.extname(originalname);
            const fileNamePrefix = req.files["verso"][0].fieldname;
    
            const newFileName = `${fileNamePrefix}-${new Date().getTime()}${fileExtension}`;
            const newFilePath = path.join('assets/pieces/', newFileName);
            fs.renameSync(pathName, newFilePath);
    
            // userData.pieceIdentiteVerso = pieceIdentiteVerso;
            userDataPiece.verso = newFileName;
        }
    }
    //console.log(userDataPiece)

    await Piece.update(userDataPiece, {
        where: {
          id: parseInt(id),
          userId: parseInt(userId)
        }
      }).then((_)=>{
        const message=`Les données on a été mis à jour !`
        res.status(200).json({message})
    }).catch((err)=>{
        if(err instanceof ValidationError){
            return res.status(500).json({ message: err.message, donnees: err });
        }
        const message=`Echec de mis à jour des données !`
        res.status(500).json({message,donnees:err})
    });
}
module.exports=updateUsersControllersPiece;