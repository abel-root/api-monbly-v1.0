const auth = require("../../auth/auth");
const rechargerMonWalletControllers = require("../../controllers/wallet/rechargerMonWalletControllers");

const rechargerMonWallet=(app)=>{
    app.post('/v1/wallet/:userId/deposit',auth,rechargerMonWalletControllers)
}
module.exports=rechargerMonWallet;