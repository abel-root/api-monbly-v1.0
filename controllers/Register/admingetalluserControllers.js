const { Op } = require('sequelize');
const {User}=require('../../models');
const admingetalluserControllers=async(req,res)=>{
    const name=req.query.name
    const limit=req.query.limit || 5
    const page = parseInt(req.query.page) || 1;
    const offset = (page - 1) * parseInt(limit);
    const sortBy = req.query.sortBy || 'ASC';

    if(name==null){
        await User.findAll({
            include :["piece","imageUser","vehicule","trajet"],
            limit:parseInt(limit),
            offset:offset,
            order: [['nom', sortBy]],
        }).then((user)=>{
            if(user==null){
                const message ="Il n'y a pas d'utilisateur inscrit."
                res.status(400).json({message,donnees:user});
            }
            const message ="Les données utilisateur ont été recupérées aveec succès !"
            res.status(200).json({message,donnees:user});
        }).catch((err)=>{
            const message ="Echec de récupération des données."
            res.status(500).json({message,donnees:err});
        })
    }else{
        await User.findAndCountAll({
            include :["piece","imageUser","tag"],
            where: {
                nom: {
                  [Op.like]: `%${name}%`
                },
              },
              offset: offset,
              order: [['nom', sortBy]],
              limit:parseInt(limit)
        }).then(({ count, rows })=>{
            if(rows==null ){
                return res.status(400).json({message:"Aucun utilisateur trouvé dans la base de données",donnees:rows})
            }

            if(name.length>=1){
                const message=`Il y a ${count} ${count<2?"utilisateur trouvé":"utilisateurs trouvés"}`
                res.status(200).json({message,donnees:rows})
            }else{
                return res.status(400).json({message:"Entrer au moins deux caractères !"})
            }
        }).catch((err)=>{
            const message=`Echec de récuperation !`
            res.status(500).json({message,donnees:err})
        })
    }
    
}
module.exports=admingetalluserControllers;