const auth = require("../../auth/auth");
const effectuerUnPaiementControllers = require("../../controllers/wallet/effectuerUnPaiementControllers");

const effectuerUnPaiement=(app)=>{
    app.post('/v1/wallet/:userId/paiement',auth,effectuerUnPaiementControllers)
}
module.exports=effectuerUnPaiement;