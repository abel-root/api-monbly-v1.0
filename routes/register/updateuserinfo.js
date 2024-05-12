const auth = require("../../auth/auth");
const updateuserinfoControllers = require("../../controllers/Register/updateuserinfoControllers");

const updateuserinfo=(app)=>{
    app.put('/v1/user/update/:id',auth,updateuserinfoControllers);
}
module.exports=updateuserinfo;