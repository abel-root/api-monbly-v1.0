'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class AvisUser extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      AvisUser.belongsTo(models.Trajet,{ as:'trajet', foreignKey: 'trajetId' })
      AvisUser.belongsTo(models.User,{ as:'user', foreignKey: 'userId' })
    }
  }
  AvisUser.init({
    userId: DataTypes.INTEGER,
    trajetId: DataTypes.INTEGER,
    point: DataTypes.INTEGER,
    comment: DataTypes.STRING,
    isVisible: DataTypes.ENUM("Yes","No")
  }, {
    sequelize,
    modelName: 'AvisUser',
  });
  return AvisUser;
};