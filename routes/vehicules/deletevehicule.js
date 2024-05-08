const auth = require("../../auth/auth");
const deletevehiculeControllers = require("../../controllers/vehicules/deletevehiculeControllers");

const deletevehicule=(app)=>{
    app.delete("/monbly/:conducteurId/vehicule/:id",auth,deletevehiculeControllers)
}
module.exports=deletevehicule;