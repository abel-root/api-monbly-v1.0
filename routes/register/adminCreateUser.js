const auth = require("../../auth/auth");
const adminCreateUserCTRL = require("../../controllers/Register/adminCreateUserCTRL");

const adminCreateUser=(app)=>{
    app.post('/v1/superadmin/users/:userId',auth,adminCreateUserCTRL)
}
module.exports=adminCreateUser;