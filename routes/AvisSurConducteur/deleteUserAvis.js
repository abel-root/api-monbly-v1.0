const auth = require("../../auth/auth");
const deleteUserAvisCRTL = require("../../controllers/AvisUsers/deleteUserAvisCRTL");

const deleteUserAvis=(app)=>{
    app.delete('/monbly/:avisId/avis',auth,deleteUserAvisCRTL);
}
module.exports=deleteUserAvis;