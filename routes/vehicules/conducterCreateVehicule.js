const auth = require("../../auth/auth");
const conducterCreateVehiculeController = require("../../controllers/vehicules/conducterCreateVehiculeController");
const upload = require("../../upload");

const conducterCreateVehicule=(app)=>{
    app.post('/monbly/:conducterId/vehicule',auth,upload.single("imageVehicule"),conducterCreateVehiculeController)
}
module.exports=conducterCreateVehicule;