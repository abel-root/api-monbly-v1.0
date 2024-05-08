const {User}=require('../../models')
const bcrypt=require('bcrypt')
const modifyPasswordCTRL=async(req,res)=>{
    const {id}=req.params;

    const user=await User.findOne({
        where:{
            email:req.body.email,
            tels:req.body.tels
        }
    })
    
    if(!user){
        return res.status(404).json({message:`Cet utilisateur n'exixte pas.`})
    }

    if (!/^\d{4}$/.test(req.body.password)) {
        return res.status(400).json({message: "Le mot de passe doit être composé de 4 chiffres."})
     }

     if (/(.).*\1/.test(req.body.password)) {
       return res.status(400).json({message: 'Le mot de passe ne doit pas contenir de chiffres répétés.'})
     }
     
   //verification du mot de passe avant la modification ***
    if(req.body.password == req.body.confirmPassword){
        await User.update({
            password: await bcrypt.hash(req.body.password, 10)
        },{
            where:{
                id:parseInt(id)
            }
        }).then(_=>{
            const message=`Mot de passe modifier avec succès.`;
            res.status(200).json({message})
        }).catch((error)=>{
            const message =`Échec de modification du mot de passe.`;
            res.status(500).json({message,donnees:error});
        })
    }else{
        const message=`La confirmation du mot de passe est incorrect .`
        res.status(400).json({message})
    }

    
    
}

module.exports=modifyPasswordCTRL;