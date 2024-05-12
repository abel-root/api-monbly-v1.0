const auth = require("../../auth/auth");
const conducteurAfficherTousCestrajetReserveControllers = require("../../controllers/reservation/conducteurAfficherTousCestrajetReserveControllers");

const conducteurAfficherTousCestrajetReserve=(app)=>{
    app.get('/v1/:conducteurId/reservation',auth,conducteurAfficherTousCestrajetReserveControllers)
}
module.exports=conducteurAfficherTousCestrajetReserve;