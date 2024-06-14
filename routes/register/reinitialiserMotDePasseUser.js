const reinitialiserMotDePasseUserCTRL = require("../../controllers/Register/reinitialiserMotDePasseUserCTRL");

const reinitialiserMotDePasseUser=(app)=>{

    app.put('/v1/reinitialiser/password',reinitialiserMotDePasseUserCTRL)
}
module.exports=reinitialiserMotDePasseUser;