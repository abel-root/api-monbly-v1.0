const auth = require("../../auth/auth");
const deleteuserControllers = require("../../controllers/Register/deleteuserControllers");

const deleteuser=(app)=>{
    app.delete('/v1/user/delete/:id',auth,deleteuserControllers)
}
module.exports=deleteuser;