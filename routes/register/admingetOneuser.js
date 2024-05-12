const auth = require("../../auth/auth")
const admingetOneuserControllers = require("../../controllers/Register/admingetOneuserControllers")

const admingetOneuser=(app)=>{
    app.get('/v1/user/:id',auth,admingetOneuserControllers);
}
module.exports=admingetOneuser