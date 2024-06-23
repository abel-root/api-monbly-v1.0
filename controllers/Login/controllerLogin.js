const {User}=require('../../models');
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken')
const privateKey=require('../../auth/private_key')
const controllerLogin=async(req,res)=>{
    await User.findOne({
         where:{
            tels:req.body.tels
         }
     }).then(async(user)=>{
         if(!user){
             const message="Ce compte n'hesiste pas !"
             return res.status(404).json({message,donnees:user})
         }
         await bcrypt.compare(req.body.password,user.password).then((isPasswordValide)=>{
             if(!isPasswordValide){
                 const message = `Mot de passe incorrect! échec de connection`;
                 return res.status(401).json({ message, donnees: user });
             }
 
             const token = jwt.sign(
                 {
                   userId: user.id,
                   profil: user.profil,
                   email:user.email,
                   tels:user.tels,
                   
                 },
                 privateKey,
                 { expiresIn: '4h' }
               );
 
               const message = `${user.genre=="homme"?"M.":user.genre=="Homme"?"M.":"Mme" } ${user.nom} Vous avez été connecté avec succès !`;
               return res.status(200).json({ message, access_token:token });
         })
     }).catch((error) => {
         const message = `Une erreur s'est produite lors de la recherche de l'utilisateur.`;
         res.status(500).json({ message, donnees: error });
       });
}
module.exports=controllerLogin;