const auth = require("../../auth/auth");
const recupereeAvisVisibleCRTL = require("../../controllers/AvisUsers/recupereeAvisVisibleCRTL");

const recupereeAvisVisible=(app)=>{
    app.get('/monbly/avis/visible',auth,recupereeAvisVisibleCRTL)
}
module.exports=recupereeAvisVisible;