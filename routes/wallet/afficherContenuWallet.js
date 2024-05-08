const auth = require("../../auth/auth");
const afficherContenuWalletControllers = require("../../controllers/wallet/afficherContenuWalletControllers");

const afficherContenuWallet=(app)=>{
    app.get("/monbly/wallet/:userId/solde",auth,afficherContenuWalletControllers);
}
module.exports=afficherContenuWallet;