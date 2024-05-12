const auth = require("../../auth/auth");
const afficherTousLesReservationsEnAttenteControllers = require("../../controllers/reservation/afficherTousLesReservationsEnAttenteControllers");

const afficherTousLesReservationsEnAttente=(app)=>{
    app.get('/v1/reservation/:conducteurId/enattente',auth,afficherTousLesReservationsEnAttenteControllers)
}
module.exports=afficherTousLesReservationsEnAttente;