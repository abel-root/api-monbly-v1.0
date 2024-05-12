const auth = require("../../auth/auth");
const modifyPasswordCTRL = require("../../controllers/Register/modifyPasswordCTRL");

const modifyPassword=(app)=>{
    app.put('/v1/modify/password/:id',auth,modifyPasswordCTRL);
}
module.exports=modifyPassword;