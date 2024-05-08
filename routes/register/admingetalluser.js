const auth = require("../../auth/auth");
const admingetalluserControllers = require("../../controllers/Register/admingetalluserControllers");

const admingetalluser=(app)=>{
    app.get('/monbly/users/all',auth,admingetalluserControllers);
}
module.exports=admingetalluser;