const auth = require("../../auth/auth");
const facturationReservationCTRL = require("../../controllers/paiement/facturationReservationCTRL");

const facturationReservation=(app)=>{
    app.post('/monbly/:voyageurId/:reservationId/payer',auth,facturationReservationCTRL);
}
module.exports=facturationReservation;