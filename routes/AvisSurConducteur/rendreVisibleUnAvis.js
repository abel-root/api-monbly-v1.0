const auth = require("../../auth/auth");
const rendreVisibleUnAvisCTRL = require("../../controllers/AvisUsers/rendreVisibleUnAvisCTRL");

const rendreVisibleUnAvis=(app)=>{
    app.put('/v1/avis/:id/visible',auth,rendreVisibleUnAvisCTRL)
}
module.exports=rendreVisibleUnAvis;