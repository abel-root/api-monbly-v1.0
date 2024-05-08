const auth = require("../../auth/auth");
const conducteuerAccepteReservationControllers = require("../../controllers/reservation/conducteuerAccepteReservationControllers");

const conducteuerAccepteReservation=(app)=>{
    app.put('/monbly/reservation/:id/acceptee',auth,conducteuerAccepteReservationControllers)
}
module.exports=conducteuerAccepteReservation;