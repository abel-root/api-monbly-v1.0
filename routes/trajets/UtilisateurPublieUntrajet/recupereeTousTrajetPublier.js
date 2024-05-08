const recupereeTousTrajetPublierCTRL = require("../../../controllers/conducteurcreatetrajet/utilisateur/recupereeTousTrajetPublierCTRL")

const recupereeTousTrajetPublier=(app)=>{
    app.get('/monbly/trajet/publier',recupereeTousTrajetPublierCTRL)
}
module.exports=recupereeTousTrajetPublier