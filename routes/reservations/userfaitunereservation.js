const auth = require("../../auth/auth");
const userfaitunereservationControllers = require("../../controllers/reservation/userfaitunereservationControllers");

const userfaitunereservation=(app)=>{
    app.post('/v1/:voyageurId/:trajetId/:vehiculeId/reservation',auth,userfaitunereservationControllers)
}
module.exports=userfaitunereservation;