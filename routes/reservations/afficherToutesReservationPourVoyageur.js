const auth = require("../../auth/auth");
const afficherToutesReservationPourVoyageurControllers = require("../../controllers/reservation/afficherToutesReservationPourVoyageurControllers");

const afficherToutesReservationPourVoyageur=(app)=>{
    app.get('/v1/:voyageurId/reservation/all',auth,afficherToutesReservationPourVoyageurControllers)
}
module.exports=afficherToutesReservationPourVoyageur;