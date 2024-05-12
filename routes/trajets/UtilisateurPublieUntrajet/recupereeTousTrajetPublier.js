const recupereeTousTrajetPublierCTRL = require("../../../controllers/conducteurcreatetrajet/utilisateur/recupereeTousTrajetPublierCTRL")

const recupereeTousTrajetPublier=(app)=>{
    app.get('/v1/trajet/publier',recupereeTousTrajetPublierCTRL)
}
module.exports=recupereeTousTrajetPublier