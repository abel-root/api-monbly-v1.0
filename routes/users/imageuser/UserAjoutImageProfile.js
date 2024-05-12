const ControllerUserImage = require("../../../controllers/imageProfile/ControllerUserImage");
const auth =require('../../../auth/auth');
const upload  =require('../../../upload');
const UserAjoutImageProfile=(app)=>{
    app.post('/v1/user/:userId/image', auth,upload.single('profil'),ControllerUserImage);
}
module.exports=UserAjoutImageProfile;