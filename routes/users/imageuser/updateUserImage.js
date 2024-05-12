const auth = require("../../../auth/auth");
const updateUserImageControllers = require("../../../controllers/imageProfile/updateUserImageControllers");
const upload = require("../../../upload");

const updateUserImage=(app)=>{
    app.put('/v1/user/:userId/profil/:id',auth,upload.single("profil"),updateUserImageControllers)
}
module.exports=updateUserImage;