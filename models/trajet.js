'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Trajet extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Trajet.belongsTo(models.User,{ as: 'user' })
      Trajet.hasMany(models.AvisUser,{ as:'avisuser', foreignKey: 'trajetId' })
      Trajet.belongsTo(models.Vehicule, {onDelete:"CASCADE", as:'vehicule',foreignKey: 'vehiculeId' })
      Trajet.hasOne(models.Reservevation,{as:'reservation', foreignKey: 'trajet_id' })
      
    }
  }
  Trajet.init({
    depart: DataTypes.STRING,
    arrivee: DataTypes.STRING,
    date: DataTypes.STRING,
    heure: DataTypes.STRING,
    montant: DataTypes.FLOAT,
    distance:DataTypes.FLOAT,
    userId:DataTypes.INTEGER,
    vehiculeId:DataTypes.INTEGER,
    place_restantes:DataTypes.INTEGER,
    place_occupees:DataTypes.INTEGER,
    nombre_places:DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Trajet',
  });
  return Trajet;
};