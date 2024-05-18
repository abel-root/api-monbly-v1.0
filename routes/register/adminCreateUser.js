const auth = require("../../auth/auth");

const adminCreateUser=(app)=>{
    app.post('/v1/superadmin/users/:adminId',auth,)
}
module.exports=adminCreateUser;