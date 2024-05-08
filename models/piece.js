'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Piece extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Piece.belongsTo(models.User,{ as:'user', foreignKey: 'userId' })
    }
  }
  Piece.init({
    retro: DataTypes.STRING,
    verso: DataTypes.STRING,
    userId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Piece',
  });
  return Piece;
};