const {Tag}=require('../../models')
const deleteTaggControllers=async(req,res)=>{
    const {id}=req.params;
    await Tag.destroy({
        where:{
            id:parseInt(id)
        }
    }).then((_)=>{
        const message=`Le tag a été supprimer !`;
        res.status(200).json({message})
    }).catch((err)=>{
        const message=`Échec de supperssion du tag !`;
        res.status(500).json({message,donnees:err})
    })
}
module.exports=deleteTaggControllers