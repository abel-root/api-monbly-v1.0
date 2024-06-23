const { Reservevation, Trajet } = require("../../models");
const jwt = require('jsonwebtoken');

const voyageurAnnuleUneReservationCTRL = async (req, res) => {
    const { voyageurId, reservationId } = req.params;
    const privateKey = "TOKEN_KEY_MONBLY_2024_RENBOUCEMENT";

    const ONE_HOUR = 60 * 60 * 1000; 
    const ONE_DAY = 24 * ONE_HOUR;
    const THIRTY_MINUTES = 30 * 60 * 1000;

    let refund = 0;
    let driverCompensation = 0;
    let paieToken = "";

    try {
        const reservation = await Reservevation.findOne({
            where: {
                id: parseInt(reservationId),
                userId: parseInt(voyageurId)
            }
        });

        if (!reservation) {
            return res.status(404).json({ message: "Échec de récupération de la réservation." });
        }

        const trajet = await Trajet.findOne({
            where: {
                id: reservation.trajet_id
            }
        });

        if (!trajet) {
            return res.status(404).json({ message: "Aucun trajet trouvé pour cette réservation." });
        }

        const bookingTime = new Date(reservation.createdAt).getTime(); // temps de réservation
        const departureTime = new Date(`${trajet.date}T${trajet.heure}`).getTime();
        const cancellationTime = new Date(req.body.date).getTime();

        const timeDifference = departureTime - cancellationTime;
        const bookingDifference = departureTime - bookingTime;

        const cancelReservation = await Reservevation.update({
            statut: "annulee",
            redirection: "liste_vehicules"
        }, {
            where: {
                id: parseInt(reservationId),
                userId: parseInt(voyageurId)
            }
        });

        if (cancelReservation[0] > 0) {
            await Trajet.update({
                place_occupees: trajet.place_occupees - reservation.nombresPlace,
                place_restantes: trajet.place_restantes + reservation.nombresPlace 
            }, {
                where: {
                    id: trajet.id
                }
            });

            // Calcul des prix et conditions liées à la réservation
            if (timeDifference > ONE_DAY) {
                refund = 0.85; // 85% de remboursement
                driverCompensation = 0;
            } else if (timeDifference < ONE_DAY && timeDifference >= ONE_HOUR) {
                refund = 0.50; // 50% de remboursement
                driverCompensation = 0.25; // 25% pour le conducteur
            } else if (timeDifference < ONE_HOUR) {
                driverCompensation = 0.50; // 50% pour le conducteur, rien pour le voyageur
                refund = 0;
            }

            if (bookingDifference < ONE_DAY && timeDifference <= THIRTY_MINUTES) {
                refund = 0.85; // 85% de remboursement
                driverCompensation = 0; // Pas de compensation pour le conducteur
            }

            paieToken = jwt.sign(
                {
                    Montant_a_rembourse_voyageur: reservation.montantTotal * refund,
                    compensationConducteur: reservation.montantTotal * driverCompensation
                },
                privateKey,
                {expiresIn:'48h'}
            );

            const message = "Réservation annulée avec succès.";
            res.status(200).json({ message, donnees: reservation, cancel_token: paieToken });
        } else {
            const message = `La réservation avec l'ID ${reservationId} n'existe pas.`;
            res.status(404).json({ message });
        }

    } catch (err) {
        const message = "Échec d'acceptation de la réservation côté serveur.";
        res.status(500).json({ message, donnees: err });
    }
};

module.exports = voyageurAnnuleUneReservationCTRL;
