const {Tag}=require('../../models');

const updateTaggControllers=async(req,res)=>{

    const {id}=req.params;
    await Tag.update({
        isTagger:req.body.isTagger==null?"true":req.body.isTagger
    },{
        where:{
            id:parseInt(id)
        }
    }).then((user)=>{
        const message=`Le tag a été mise a jour !`;
        res.status(200).json({message,donnees:user})
    }).catch((err)=>{
        const message=`Échec de mise a jour !`;
        res.status(500).json({message,donnees:err})
    })
}
module.exports=updateTaggControllers;