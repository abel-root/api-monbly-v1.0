const auth = require("../../../../auth/auth");
const admingetallControllers = require("../../../../controllers/conducteurcreatetrajet/admin/admingetallControllers");

const admingetall=(app)=>{
    app.get("/monbly/admin/all/trajet",auth,admingetallControllers)
}
module.exports=admingetall;