const auth = require("../../auth/auth");
const rechargerMonWalletControllers = require("../../controllers/wallet/rechargerMonWalletControllers");

const rechargerMonWallet=(app)=>{
    app.post('/monbly/wallet/:userId/deposit',auth,rechargerMonWalletControllers)
}
module.exports=rechargerMonWallet;