const auth = require("../../auth/auth")
const admingetOneuserControllers = require("../../controllers/Register/admingetOneuserControllers")

const admingetOneuser=(app)=>{
    app.get('/monbly/user/:id',auth,admingetOneuserControllers);
}
module.exports=admingetOneuser