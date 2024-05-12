const auth = require("../../auth/auth");
const deleteUserAvisCRTL = require("../../controllers/AvisUsers/deleteUserAvisCRTL");

const deleteUserAvis=(app)=>{
    app.delete('/v1/:avisId/avis',auth,deleteUserAvisCRTL);
}
module.exports=deleteUserAvis;