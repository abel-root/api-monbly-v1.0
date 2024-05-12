const auth = require("../../../auth/auth");
const recuperOnetrajetparconducteurControllers = require("../../../controllers/conducteurcreatetrajet/recuperOnetrajetparconducteurControllers");

const recuperOnetrajetparconducteur=(app)=>{
    app.get('/v1/:conducteurId/trajet/:id',auth,recuperOnetrajetparconducteurControllers)
}
module.exports=recuperOnetrajetparconducteur;