const auth = require("../../auth/auth")
const updatevehiculeControllers = require("../../controllers/vehicules/updatevehiculeControllers")
const upload = require("../../upload")

const updatevehicule=(app)=>{
    app.put('/monbly/:conducteurId/vehicule/:id',auth,upload.single('imageVehicule'),updatevehiculeControllers)
}
module.exports=updatevehicule