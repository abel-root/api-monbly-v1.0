const auth = require("../../../auth/auth");
const deleteuserprofilControllers = require("../../../controllers/imageProfile/deleteuserprofilControllers");

const  deleteuserprofil=(app)=>{
    app.delete("/monbly/user/:userId/profil/:id",auth,deleteuserprofilControllers)
}
module.exports=deleteuserprofil;