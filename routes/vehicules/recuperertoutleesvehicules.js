const auth = require("../../auth/auth")
const recuperertoutleesvehiculesControllers = require("../../controllers/vehicules/recuperertoutleesvehiculesControllers")

const recuperertoutleesvehicules=(app)=>{
    app.get('/v1/:conducteurId/vehicule/all',auth,recuperertoutleesvehiculesControllers)
}
module.exports=recuperertoutleesvehicules