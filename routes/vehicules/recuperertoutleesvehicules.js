const auth = require("../../auth/auth")
const recuperertoutleesvehiculesControllers = require("../../controllers/vehicules/recuperertoutleesvehiculesControllers")

const recuperertoutleesvehicules=(app)=>{
    app.get('/monbly/:conducteurId/vehicule/all',auth,recuperertoutleesvehiculesControllers)
}
module.exports=recuperertoutleesvehicules