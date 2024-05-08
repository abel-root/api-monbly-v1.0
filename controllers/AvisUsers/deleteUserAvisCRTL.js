const {AvisUser}=require('../../models')

const deleteUserAvisCRTL=async(req,res)=>{
    const avisId = parseInt(req.params.avisId);

    await AvisUser.destroy({
        where: { id: avisId }
    }).then(() => {
        const message = `Avis supprimé avec succès`;
        res.status(200).json({ message });
    }).catch((err) => {
        const message = `Échec de la suppression de l'avis`;
        res.status(500).json({ message, donnees: err });
    });
    
}
module.exports=deleteUserAvisCRTL;