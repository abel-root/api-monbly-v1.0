const auth = require("../../../auth/auth");
const conductercreattrajetController = require("../../../controllers/conducteurcreatetrajet/conductercreattrajetController");

const conductercreattrajet=(app)=>{
    app.post('/v1/:conducteurId/createtrajet',auth,conductercreattrajetController);
}
module.exports=conductercreattrajet;