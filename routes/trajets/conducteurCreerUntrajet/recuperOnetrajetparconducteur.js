const auth = require("../../../auth/auth");
const recuperOnetrajetparconducteurControllers = require("../../../controllers/conducteurcreatetrajet/recuperOnetrajetparconducteurControllers");

const recuperOnetrajetparconducteur=(app)=>{
    app.get('/monbly/:conducteurId/trajet/:id',auth,recuperOnetrajetparconducteurControllers)
}
module.exports=recuperOnetrajetparconducteur;