const auth = require("../../auth/auth");
const afficherTousLesReservationsEnAttenteControllers = require("../../controllers/reservation/afficherTousLesReservationsEnAttenteControllers");

const afficherTousLesReservationsEnAttente=(app)=>{
    app.get('/monbly/reservation/:conducteurId/enattente',auth,afficherTousLesReservationsEnAttenteControllers)
}
module.exports=afficherTousLesReservationsEnAttente;