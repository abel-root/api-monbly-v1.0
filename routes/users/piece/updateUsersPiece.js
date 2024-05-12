const auth=require('../../../auth/auth');
const updateUsersControllersPiece = require('../../../controllers/piece/updateUsersControllersPiece');
const upload=require('../../../upload');
const updateUsersPiece=(app)=>{

    app.put('/v1/users/:userId/piece/:id',auth,upload.fields([{ name: 'recto', maxCount: 1 }, { name: 'verso', maxCount: 1 }]),updateUsersControllersPiece)
}
module.exports=updateUsersPiece;