const auth = require("../../auth/auth");
const facturationReservationCTRL = require("../../controllers/paiement/facturationReservationCTRL");

const facturationReservation=(app)=>{
    app.post('/v1/:voyageurId/:reservationId/payer',auth,facturationReservationCTRL);
}
module.exports=facturationReservation;