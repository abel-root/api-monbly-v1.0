const auth = require("../../auth/auth");
const voyageurAnnuleUneReservationCTRL = require("../../controllers/reservation/voyageurAnnuleUneReservationCTRL");

const voyageurAnnuleUneReservation=(app)=>{
    app.put('/v1/:voyageurId/:reservationId/cancel',auth,voyageurAnnuleUneReservationCTRL)
}
module.exports=voyageurAnnuleUneReservation;