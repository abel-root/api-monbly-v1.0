const auth = require("../../auth/auth");
const recupereeAvisVisibleCRTL = require("../../controllers/AvisUsers/recupereeAvisVisibleCRTL");

const recupereeAvisVisible=(app)=>{
    app.get('/v1/avis/visible',auth,recupereeAvisVisibleCRTL)
}
module.exports=recupereeAvisVisible;