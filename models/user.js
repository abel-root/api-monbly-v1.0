'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      
      User.hasOne(models.Piece,{ as:'piece', foreignKey: 'userId' })
      User.hasOne(models.ImageUser,{ as:'imageUser', foreignKey: 'userId' })
       
      //User.hasMany(models.Trajet,{ as:'trajet', foreignKey: 'userId' })
      User.hasMany(models.Trajet,{ as:'trajet', foreignKey: 'userId' })
      //User.hasMany(models.ChangerStatut,{ as:'changerstatut', foreignKey: 'userId' })
      User.hasOne(models.Vehicule,{ as:'vehicule', foreignKey: 'userId' })
      User.hasOne(models.Wallet,{ as:'wallet', foreignKey: 'userId' })
      User.hasMany(models.AvisUser,{ as:'avisuser', foreignKey: 'userId' })
     
      User.hasMany(models.Reservevation,{as:'reservation',foreignKey: 'userId'})
      User.hasMany(models.Paiement,{ as:'paie', foreignKey: 'voyageurId' })
      User.hasOne(models.Tag,{ as:'tag', foreignKey: 'conducteurId' })
      
    }
  }
  User.init({
    nom: DataTypes.STRING,
    prenoms: DataTypes.STRING,
    profil: DataTypes.ENUM('voyageur','conducteur','admin'),
    genre: DataTypes.STRING,
    email: DataTypes.STRING,
    password: {
      type:DataTypes.STRING,
      allowNull:false
    },
    pays: DataTypes.STRING,
    tels: DataTypes.STRING,
    dateNaissance: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};