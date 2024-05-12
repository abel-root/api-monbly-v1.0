const { Paiement, Reservevation, Trajet, User,Recue } = require('../../models');
const jwt = require('jsonwebtoken');
const numeroRecue = require('../../numeroRecue');

const facturationReservationCTRL = async (req, res) => {
    const { voyageurId, reservationId } = req.params;

    const privateKey = "TOKEN_KEY_MONBLY_2024_PAIE";

    try {
        
        const reservation = await Reservevation.findByPk(parseInt(reservationId));

        // Vérification si le paiement a déjà été effectué pour cette reservation
        
            
        const paiement=await Paiement.findOne({
            where:{
                reservationId:reservation.id
            }
        });

        if(paiement){
            const message = `Cette réservation a déjà été facturée.`;
            return res.status(400).json({ message });
        }

        //verification de l'existance de la reservation
        
        if (!reservation) {
            const message = `Cette réservation est introuvable !`;
            return res.status(404).json({ message });
        }

        const trajet = await Trajet.findOne({
            where:{
                id:reservation.trajet_id
            }
        });

        if (!trajet) {
            const message = `Ce trajet est introuvable !`;
            return res.status(404).json({ message });
        }

        const conducteur = await User.findOne({
            where:{
                id:trajet.userId
            }
        });

        const paie = await Paiement.create({
            voyageurId: parseInt(voyageurId),
            reservationId: parseInt(reservationId),
            montantTotal: reservation.montantTotal,
            type: req.body.type || "mobil"
        });

        if(paie){
            await Recue.create({
                conducteurId: conducteur.id,
                reservationId:reservation.id,
                montantHorsTaxe:paie.montantTotal,
                montantTVA:paie.montantTotal*0.18,
                montantTTC: paie.montantTotal+ (paie.montantTotal*0.18),
                numeroRecu:numeroRecue(paie.montantTotal,voyageurId),
                voyageurId:voyageurId
            });
        }
        // mise en place du token permettant de payer le conducteur

        const montantTotalConducteur = paie.montantTotal - (paie.montantTotal * 0.15);
        const paieToken = jwt.sign(
            {
                userId: conducteur.id,
                profil: conducteur.profil,
                email: conducteur.email,
                tels: conducteur.tels,
                montantTotal_conducteur: montantTotalConducteur
            },
            privateKey,
            { expiresIn: '0.05h' }
        );
        
        const message = `Initialisation de la facturation du trajet.`;
        res.status(201).json({ message, donnees: paie, privateKey,paieToken });
    } catch (err) {
        const message = `Échec de facturation !`;
        res.status(500).json({ message, donnees: err.message });
    }
}

module.exports = facturationReservationCTRL;
