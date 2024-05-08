const auth = require("../../auth/auth");
const deleteuserControllers = require("../../controllers/Register/deleteuserControllers");

const deleteuser=(app)=>{
    app.delete('/monbly/user/delete/:id',auth,deleteuserControllers)
}
module.exports=deleteuser;