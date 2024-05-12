const auth = require("../../auth/auth");
const afficherContenuWalletControllers = require("../../controllers/wallet/afficherContenuWalletControllers");

const afficherContenuWallet=(app)=>{
    app.get("/v1/wallet/:userId/solde",auth,afficherContenuWalletControllers);
}
module.exports=afficherContenuWallet;