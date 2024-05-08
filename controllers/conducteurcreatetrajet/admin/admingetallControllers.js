const { Op } = require('sequelize');
const {Trajet}=require('../../../models')
const admingetallControllers=async(req,res)=>{

    const limit=parseInt(req.query.limit) || 5;
    const page=parseInt(req.query.page) || 1;
    const offset=(page-1)*limit;
    const sortBy=req.query.sortBy || "ASC"
    const date=req.query.date;
    if(date==null){
        await Trajet.findAll(
            {
                include:["user","vehicule"],
                limit:parseInt(limit),
                offset:offset,
                order:[['depart', sortBy], ['arrivee', sortBy], ['date', sortBy], ['heure', sortBy]]
        }
            ).then((trajets)=>{
    
            if(trajets){
                const message=`La liste des trajets a été recupéré avec succès !`
                res.status(200).json({message,donnees:trajets})
            }else{
                const message=`Aucun trajet n'a été trouvé dans la base de bonnée !`
                res.status(400).json({message});
            }
        }).catch((err)=>{
            const message=`Echec de recupération des trjets !`
            res.status(500).json({message,donnees:err})
        })
    }else{
        await Trajet.findAndCountAll({
            include:["user","vehicule"],
            where:{
                date: { [Op.like]: `%${date}%` }
            },
            limit:limit,
            offset:offset,
            order:[['depart', sortBy], ['arrivee', sortBy], ['date', sortBy], ['heure', sortBy]]

        }).then(({count, rows})=>{
            if(!rows || rows.length === 0){
                return res.status(404).json({message:"Aucun utilisateur trouvé dans la base de données",donnees:rows})
            }

            if(date.length>=1){
                const message=`Il y a ${count} ${count<2?"utilisateur trouvé":"utilisateurs trouvés"}`
                res.status(200).json({message,donnees:rows})
            }else{
                return res.status(404).json({message:"Entrer au moins deux caractères !"})
            }
        }).catch((err)=>{
            const message=`Echec de récuperation coté serveur!`
            res.status(500).json({message,donnees:err})
        })
    } 
    
}
module.exports=admingetallControllers;