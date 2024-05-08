const {User}=require('../../models');
const admingetOneuserControllers=async(req,res)=>{
    const {id}=req.params;

    await User.findByPk(parseInt(id),{include:["piece","imageUser","vehicule","trajet","tag"]}).then((user)=>{
        if(user==null){
            const message =`L'utilisateur n'a pas été trouver.`;
            return res.status(400).json({message,donnees:user})
        }
        const message =`L'utilisateur a été récupéré avec succès.`;
        res.status(200).json({message,donnees:user})
    }).catch((err)=>{
        const message =`Échec de récupération des données de cet utilisateur.`;
        res.status(500).json({message,donnees:err})
    })
}
module.exports=admingetOneuserControllers;