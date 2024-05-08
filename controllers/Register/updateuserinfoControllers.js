const {User}=require('../../models');
const updateuserinfoControllers=async(req,res)=>{
    const {id}=req.params;

    await User.update(req.body,{
        where:{
            id:parseInt(id)
        }
    }).then((_)=>{
        const message=` Les données utilisateurs ont été mise à jour avec succès.`
        res.status(200).json({message});
    }).catch((err)=>{
        const message=` Échec de mise à jour coté serveur`;
        res.status(500).json({message,donnees:err});
    })
}
module.exports=updateuserinfoControllers;