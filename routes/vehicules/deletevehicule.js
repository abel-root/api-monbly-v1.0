const auth = require("../../auth/auth");
const deletevehiculeControllers = require("../../controllers/vehicules/deletevehiculeControllers");

const deletevehicule=(app)=>{
    app.delete("/v1/:conducteurId/vehicule/:id",auth,deletevehiculeControllers)
}
module.exports=deletevehicule;