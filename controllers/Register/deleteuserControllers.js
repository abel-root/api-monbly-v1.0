const {User}=require('../../models');
const deleteuserControllers=async(req,res)=>{
    const {id}=req.params;
    await User.destroy({
        where:{
            id:parseInt(id)
        }
    }).then(_=>{
        const message =`L'utilisateur a été supprimer !`;
        res.status(200).json({message})
    }).catch((err)=>{
        const message =`Échec survenue depuis le serveur.`;
        res.status(500).json({message,donnees:err})
    })
}
module.exports=deleteuserControllers;