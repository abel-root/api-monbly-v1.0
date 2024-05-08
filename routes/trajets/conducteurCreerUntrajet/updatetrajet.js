const auth = require("../../../auth/auth");
const updatetrajetControllers = require("../../../controllers/conducteurcreatetrajet/updatetrajetControllers");

const updatetrajet=(app)=>{
    app.put('/monbly/:conducteurId/trajet/:id',auth,updatetrajetControllers);
}
module.exports=updatetrajet;