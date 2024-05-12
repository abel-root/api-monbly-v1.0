const auth = require("../../../auth/auth");
const deleteuserprofilControllers = require("../../../controllers/imageProfile/deleteuserprofilControllers");

const  deleteuserprofil=(app)=>{
    app.delete("/v1/user/:userId/profil/:id",auth,deleteuserprofilControllers)
}
module.exports=deleteuserprofil;