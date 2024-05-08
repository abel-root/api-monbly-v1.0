const {Wallet}=require('../../models')
const effectuerUnPaiementControllers=async(req,res)=>{
    const {userId}=req.params;
    const amount=req.body.balance

    //permettre à l'utilisateur d'effectuer un paiement avec son wallet
    const wallet = await Wallet.findOne({ where: { userId } });
  
        if (wallet) {
          if(amount<=wallet.balance){

            await Wallet.update({balance:wallet.balance -= amount},{
              where:{
                  id:wallet.id,
                  userId:userId
              }
            }).then((_)=>{
              
              const message=`Paiement éffectuer avec succèss`
               res.status(200).json({message,donnees:wallet});
            }).catch((err)=>{
              const message='Une erreur est survenue lors de la facturation.'
              res.status(500).json({ message ,donnees:err});
            }) 
           
          } else {
            const message=`solde insufisant `;
            res.status(401).json({message});
           
          }
          }else{
            res.status(404).json({ error: 'Portefeuille non trouvé.' });
          }
}
module.exports=effectuerUnPaiementControllers;