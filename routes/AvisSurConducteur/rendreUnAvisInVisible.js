const auth = require("../../auth/auth");
const rendreUnAvisInVisibleCRTL = require("../../controllers/AvisUsers/rendreUnAvisInVisibleCRTL");

const rendreUnAvisInVisible=(app)=>{
    app.put('/v1/avis/:id/invisible',auth,rendreUnAvisInVisibleCRTL)
}
module.exports=rendreUnAvisInVisible;