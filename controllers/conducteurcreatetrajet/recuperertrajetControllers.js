const { Op } = require('sequelize');
const {Trajet,ImageUser}=require('../../models');
const recuperertrajetControllers=async(req,res)=>{
    const arrivee=req.query.arrivee;
    const heure=req.query.heure;
    const depart=req.query.depart;
    const date=req.query.date;
    const limit=req.query.limit || 5;
    const page=parseInt(req.query.page) || 1
    const  sortBy=req.query.sortBy || "ASC"


    const {conducteurId}=req.params;
    const offset=( page - 1 ) * limit;
    //console.log(heure,date)
    let profilUser=await ImageUser.findOne({
        where:{
            userId: parseInt(conducteurId)
        }
    });

    let whereClause = {};
    
    if(depart==null && arrivee==null && heure==null && date==null){
        await Trajet.findAll({
            include:["user","vehicule"],
            where:{
                userId:parseInt(conducteurId)
            },
            limit:parseInt(limit),
            offset:offset,
            order:[['depart', sortBy], ['arrivee', sortBy], ['date', sortBy], ['heure', sortBy]]

        }).then((trajets)=>{
            if(trajets){
                for(let trajet of trajets){
                    trajet.dataValues.profilUser = profilUser;
                }
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
        if (depart) {
            whereClause.depart = { [Op.like]: `%${depart}%` };
        }
        if (heure) {
            whereClause.heure = { [Op.like]: `%${heure}%` };
        }
        if (date) {
            whereClause.date = { [Op.like]: `%${date}%` };
        }
        if (arrivee) {
            whereClause.arrivee = { [Op.like]: `%${arrivee}%` };
        }
        await Trajet.findAndCountAll({
            include :["user","vehicule"],
            where:whereClause,
             order: [['depart', sortBy], ['arrivee', sortBy], ['date', sortBy], ['heure', sortBy]],
            limit:parseInt(limit),
            offset:offset
          }).then(({ count, rows })=>{
                // console.log(rows);
                // console.log(count);
                if(rows==null ){
                    return res.status(400).json({message:"Aucun trajet n'a été trouvé dans la base de données",donnees:rows})
                }

                if(depart.length>=2 || arrivee.length>=2 || heure.length>=2 || date.length>=2){
                    for(let trajet of rows){
                        trajet.dataValues.profilUser = profilUser;
                    }
                    const message=`Il y a ${count} ${count<2?"trajet trouvé":"trajets trouvés"}`
                    res.status(200).json({message,donnees:rows})
                }else{
                    return res.status(400).json({message:"Entrer au moins deux caractères !"})
                }
          }).catch((error)=>{
            const message=`Echec de récuperation !`
            res.status(500).json({message,donnees:error})
        });
          
    }
}
module.exports=recuperertrajetControllers;