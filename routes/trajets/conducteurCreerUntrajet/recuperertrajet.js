const auth = require("../../../auth/auth");
const recuperertrajetControllers = require("../../../controllers/conducteurcreatetrajet/recuperertrajetControllers");

const recuperertrajet=(app)=>{
    app.get('/v1/:conducteurId/gettrajet/all',auth ,recuperertrajetControllers);
}
module.exports=recuperertrajet;