const auth = require("../../auth/auth");
const utilisaterFaitDonneAvisSurtrajetCTR = require("../../controllers/AvisUsers/utilisaterFaitDonneAvisSurtrajetCTR");

const utilisaterFaitDonneAvisSurtrajet=(app)=>{
    app.post('/monbly/:userId/:trajetId/avis',auth,utilisaterFaitDonneAvisSurtrajetCTR);

}
module.exports=utilisaterFaitDonneAvisSurtrajet;