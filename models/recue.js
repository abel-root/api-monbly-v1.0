'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Recue extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Recue.belongsTo(models.Reservevation,{as: "reservation", foreignKey: "reservationId"})
    }
  }
  Recue.init({
    conducteurId: DataTypes.INTEGER,
    reservationId: DataTypes.INTEGER,
    montantHorsTaxe: DataTypes.FLOAT,
    montantTVA: DataTypes.FLOAT,
    montantTTC: DataTypes.FLOAT,
    numeroRecu: DataTypes.STRING,
    voyageurId:DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Recue',
  });
  return Recue;
};