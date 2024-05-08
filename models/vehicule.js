'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Vehicule extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Vehicule.belongsTo(models.User,{ as: 'user' });
      Vehicule.hasMany(models.Trajet, { as:'trajet',foreignKey: 'vehiculeId' });
    }
  }
  Vehicule.init({
    userId: DataTypes.INTEGER,
    modele: DataTypes.STRING,
    immatriculation: DataTypes.STRING,
    nb_places: DataTypes.INTEGER,
    image: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Vehicule',
  });
  return Vehicule;
};