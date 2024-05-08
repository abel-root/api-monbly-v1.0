const auth = require("../../../auth/auth");
const conducteurDeletetrajetController = require("../../../controllers/conducteurcreatetrajet/conducteurDeletetrajetController");

const conducteurDeletetrajet=(app)=>{
    app.delete('/monbly/:conducteurId/trajet/:id',auth,conducteurDeletetrajetController)
}
module.exports=conducteurDeletetrajet;