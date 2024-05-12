module.exports = (montant,voyageurId) => {
    let numero = voyageurId;
    let recu = ""; // Déclaration correcte d'une variable mutable

    if (montant) {
        numero += parseInt(montant); // Ajout du montant au numéro de base
        const date = new Date().getFullYear(); // Appel de la fonction getFullYear()
        recu = date.toString() + numero.toString(); // Concaténation de la date et du numéro
    }

    return recu;
}
