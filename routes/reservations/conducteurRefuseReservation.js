const auth = require("../../auth/auth");
const conducteurRefuseReservationControllers = require("../../controllers/reservation/conducteurRefuseReservationControllers");

const conducteurRefuseReservation=(app)=>{
    app.put('/v1/reservation/:id/refusee',auth,conducteurRefuseReservationControllers)
}
module.exports=conducteurRefuseReservation;