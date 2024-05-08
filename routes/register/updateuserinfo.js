const auth = require("../../auth/auth");
const updateuserinfoControllers = require("../../controllers/Register/updateuserinfoControllers");

const updateuserinfo=(app)=>{
    app.put('/monbly/user/update/:id',auth,updateuserinfoControllers);
}
module.exports=updateuserinfo;