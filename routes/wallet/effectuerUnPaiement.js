const auth = require("../../auth/auth");
const effectuerUnPaiementControllers = require("../../controllers/wallet/effectuerUnPaiementControllers");

const effectuerUnPaiement=(app)=>{
    app.post('/monbly/wallet/:userId/paiement',auth,effectuerUnPaiementControllers)
}
module.exports=effectuerUnPaiement;