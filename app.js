const express =require('express');

require('dotenv').config();
const normalizePort = require('./outils/normalizePort');
const bodyParser = require("body-parser");
const cors = require("cors");
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUI = require('swagger-ui-express');
const { swaggerOptions } = require('./swagger');

const app=express();

//swagger doc

const swaggerDocs = swaggerJsDoc(swaggerOptions);

//middleware
app
    .use(express.json())
    .use(express.urlencoded({ extended: true }))
    .use(bodyParser.json())
    .use(cors())
    .use("/assets", express.static("./assets"))
    .use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs));

/*--------------------------------------
            Les routes
-----------------------------------------*/

/*==========================================
            Users endPoint
===========================================*/
 
require('../back_end/routes/register/Login')(app);

require('../back_end/routes/register/Register')(app);
require('../back_end/routes/users/piece/UserAjoutePieceIdentite')(app);
require('../back_end/routes/users/imageuser/UserAjoutImageProfile')(app);
require("../back_end/routes/users/piece/updateUsersPiece")(app);
require('../back_end/routes/users/imageuser/updateUserImage')(app);
require('../back_end/routes/users/piece/deleteuserpiece')(app);
require('../back_end/routes/users/imageuser/deleteuserprofil')(app);
require('../back_end/routes/register/admingetalluser')(app);
require('../back_end/routes/register/admingetOneuser')(app);
require('../back_end/routes/register/updateuserinfo')(app);
require('../back_end/routes/register/deleteuser')(app);

// update user password
require('../back_end/routes/register/modifyPassword')(app);

// Add admin user 
require('../back_end/routes/register/adminCreateUser')(app);

/*==========================================
            Trajet endPoint
===========================================*/
require('../back_end/routes/trajets/conducteurCreerUntrajet/conductercreattrajet')(app);
require('../back_end/routes/trajets/conducteurCreerUntrajet/conducteurDeletetrajet')(app);
require('../back_end/routes/trajets/conducteurCreerUntrajet/updatetrajet')(app);
require('../back_end/routes/trajets/conducteurCreerUntrajet/recuperertrajet')(app);
require('../back_end/routes/trajets/conducteurCreerUntrajet/recuperOnetrajetparconducteur')(app);
require('../back_end/routes/trajets/conducteurCreerUntrajet/admin/admingetall')(app);
require('../back_end/routes/trajets/UtilisateurPublieUntrajet/recupereeTousTrajetPublier')(app);

/*==========================================
            Vehicule endPoint
===========================================*/
require('../back_end/routes/vehicules/conducterCreateVehicule')(app);
require('../back_end/routes/vehicules/updatevehicule')(app);
require('../back_end/routes/vehicules/deletevehicule')(app);
require('../back_end/routes/vehicules/recuperertoutleesvehicules')(app);


/*==========================================
            Reservation endPoint
===========================================*/
require("../back_end/routes/reservations/userfaitunereservation")(app);
require("../back_end/routes/reservations/afficherTousLesReservationsEnAttente")(app);
require("../back_end/routes/reservations/afficherToutesReservationPourVoyageur")(app);
require("../back_end/routes/reservations/voyageeurGetOneReservation")(app);
require("../back_end/routes/reservations/conducteuerAccepteReservation")(app);
require("../back_end/routes/reservations/conducteurRefuseReservation")(app);
require("../back_end/routes/reservations/conducteurAfficherTousCestrajetReserve")(app);


/*==========================================
            Wallet endPoint
===========================================*/
require('../back_end/routes/wallet/afficherContenuWallet')(app);
require('../back_end/routes/wallet/rechargerMonWallet')(app);
require('../back_end/routes/wallet/effectuerUnPaiement')(app);

/*==========================================
            Tag endPoint
===========================================*/
require('../back_end/routes/tag/createTage')(app);
require('../back_end/routes/tag/updateTagg')(app);
require('../back_end/routes/tag/deleteTagg')(app);

/*==========================================
            Avisuser endPoint
===========================================*/
require('../back_end/routes/AvisSurConducteur/utilisaterFaitDonneAvisSurtrajet')(app);
require('../back_end/routes/AvisSurConducteur/rendreVisibleUnAvis')(app);
require('../back_end/routes/AvisSurConducteur/rendreUnAvisInVisible')(app);
require('../back_end/routes/AvisSurConducteur/deleteUserAvis')(app);
require('../back_end/routes/AvisSurConducteur/recupereeAvisVisible')(app);
require('../back_end/routes/AvisSurConducteur/recupereeTousAvis')(app);

/*==========================================
            Paiement endPoint
===========================================*/
require('../back_end/routes/paiement/facturationReservation')(app);


/*==========================================
            Paiement endPoint
===========================================*/
require('../back_end/routes/recus/recupereeRecue')(app);

/* Error handler middleware */
app.use(({res}) => {
    const message = 'Impossible de trouver la ressource demandée ! Vous pouvez essayer une autre URL.'
      res.status(404).json({message,donnees:{satusCode:404}});
  });

   //port
const port =normalizePort(process.env.PORT || 2912)

//lencement du server
app.listen(port, console.log(`Le serveur est connecté avec succès sur le port ${port}`));