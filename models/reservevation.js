'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Reservevation extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Reservevation.belongsTo(models.User, {as: "voyageur", foreignKey: "userId"});
      Reservevation.belongsTo(models.Trajet, {  as: "trajet", foreignKey: "trajet_id"});
      Reservevation.hasOne(models.Paiement, {  as: "paiement", foreignKey: "reservationId"})
      Reservevation.hasOne(models.Recue,{as: "recue", foreignKey: "reservationId"})
    }
  }
  Reservevation.init({
    userId: DataTypes.INTEGER,
    trajet_id: DataTypes.INTEGER,
    nombresPlace: DataTypes.INTEGER,
    statut: DataTypes.ENUM("en_attente", "acceptee", "refusee"),
    redirection: DataTypes.ENUM("paiement", "liste_vehicules"),
    montantTotal:DataTypes.FLOAT
  }, {
    sequelize,
    modelName: 'Reservevation',
  });
  return Reservevation;
};