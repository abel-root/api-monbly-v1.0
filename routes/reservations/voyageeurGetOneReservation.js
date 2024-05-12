const auth = require("../../auth/auth");
const voyageeurGetOneReservationControllers = require("../../controllers/reservation/voyageeurGetOneReservationControllers");

const voyageeurGetOneReservation=(app)=>{
    app.get("/v1/:voyageurId/reservation/:id",auth,voyageeurGetOneReservationControllers)

}
module.exports=voyageeurGetOneReservation;