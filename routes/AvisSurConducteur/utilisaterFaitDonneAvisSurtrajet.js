const auth = require("../../auth/auth");
const utilisaterFaitDonneAvisSurtrajetCTR = require("../../controllers/AvisUsers/utilisaterFaitDonneAvisSurtrajetCTR");

const utilisaterFaitDonneAvisSurtrajet=(app)=>{
    app.post('/v1/:userId/:trajetId/avis',auth,utilisaterFaitDonneAvisSurtrajetCTR);

}
module.exports=utilisaterFaitDonneAvisSurtrajet;