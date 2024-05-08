const auth = require("../../auth/auth");
const afficherToutesReservationPourVoyageurControllers = require("../../controllers/reservation/afficherToutesReservationPourVoyageurControllers");

const afficherToutesReservationPourVoyageur=(app)=>{
    app.get('/monbly/:voyageurId/reservation/all',auth,afficherToutesReservationPourVoyageurControllers)
}
module.exports=afficherToutesReservationPourVoyageur;