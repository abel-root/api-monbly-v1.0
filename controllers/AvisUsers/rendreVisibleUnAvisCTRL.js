const {AvisUser}=require('../../models')
const rendreVisibleUnAvisCTRL=async(req,res)=>{
    const {id}=req.params;
    
   
        await AvisUser.update({isVisible:"Yes"},{
            where:{
                id:parseInt(id)
            }
        }).then((_)=>{
            const message=`Le commentaire est visible`;
            res.status(200).json({message});
        }).catch((err)=>{
            const message=`Modiffication impossible`;
            res.status(500).json({message,donnees:err});
        })
   
   
}
module.exports=rendreVisibleUnAvisCTRL;