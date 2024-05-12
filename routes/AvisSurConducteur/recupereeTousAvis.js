const auth = require("../../auth/auth");
const recupereeTousAvisCTRL = require("../../controllers/AvisUsers/recupereeTousAvisCTRL");

const recupereeTousAvis=(app)=>{
    app.get('/v1/avis/all',auth,recupereeTousAvisCTRL)
}
module.exports=recupereeTousAvis;