const {Tag,User}=require('../../models')

const createTageController=async(req,res)=>{
    const {conducteurId}=req.params;

    const user=await User.findByPk(conducteurId);

    if(user && user.profil=="conducteur"){
        await Tag.create({
            isTagger:true
            ,
            conducteurId:parseInt(conducteurId)
        }).then((tag)=>{
            const message=`Vous avez creer un tag pour l'utilisateur dont l'ID est ${parseInt(conducteurId)}`
            res.status(201).json({message,donnees:tag})
        }).catch((err)=>{
            const message=`Échec de création de tag pour cet utilisateur !`;
            res.status(500).json({message,donnees:err})
        })
    }else{
        const message=`Imposible d'accorder un tag à cet utilisateur car il n'a pas le profile conducteur`
        res.status(201).json({message})
    }
    
}
module.exports=createTageController