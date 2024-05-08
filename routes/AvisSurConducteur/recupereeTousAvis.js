const auth = require("../../auth/auth");
const recupereeTousAvisCTRL = require("../../controllers/AvisUsers/recupereeTousAvisCTRL");

const recupereeTousAvis=(app)=>{
    app.get('/monbly/avis/all',auth,recupereeTousAvisCTRL)
}
module.exports=recupereeTousAvis;