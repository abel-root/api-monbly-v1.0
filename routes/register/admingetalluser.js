const auth = require("../../auth/auth");
const admingetalluserControllers = require("../../controllers/Register/admingetalluserControllers");

const admingetalluser=(app)=>{
    app.get('/v1/users',auth,admingetalluserControllers);
}
module.exports=admingetalluser;