const {Piece, User}=require('../../models');
const deleteuserpieceControllers=async(req,res)=>{
    const {userId,id}=req.params;
    
    try{
        const user = await User.findOne({
            where: {
                id: parseInt(userId)
            }
        });
        
        if (!user) {
            const message = 'Cet utilisateur est introuvable';
            return res.status(404).json({ message });
        }
        
        await Piece.destroy(
            {
                where:{
                    id : parseInt(id),
                    userId:parseInt(user.id)
                }
            }
        ).then((_)=>{
            const message="La piece a été supprimer avec succès."
            res.status(200).json({message})
        }).catch((error)=>{
            const message = "Echec de la requete";
            res.status(500).json({message,donnees:error})
        })
    
    }catch(err){
        const message = 'Une erreur s\'est produite lors du traitement de la requête.';
        res.status(500).json({ message, donnees: err });
    }

}
module.exports=deleteuserpieceControllers;