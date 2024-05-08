'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Paiement extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Paiement.belongsTo(models.User,{ as:'paie', foreignKey: 'voyageurId' })
      Paiement.belongsTo(models.Reservevation,{ as:'paiement', foreignKey: 'reservationId' })
    }
  }
  Paiement.init({
    type: DataTypes.STRING,
    montantTotal: DataTypes.FLOAT,
    voyageurId:DataTypes.INTEGER,
    reservationId:DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Paiement',
  });
  return Paiement;
};