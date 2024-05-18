'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nom: {
        type: Sequelize.STRING,
        notEmpty:{
          arg:true,
          msg:"Ce champ  ne peut être vide"
        }
      },
      prenoms: {
        type: Sequelize.STRING,
        notEmpty:{
          arg:true,
          msg:"Ce champ  ne peut être vide"
        }
      },
      profil: {
        type: Sequelize.ENUM('voyageur','conducteur','admin',"superAdmin"),
        defaultValue:'voyageur'
      },
      email: {
        type: Sequelize.STRING,
        unique:true,
        notEmpty:{
          arg:true,
          msg:"Ce champ  ne peut être vide"
        }
      },
      genre: {
        type: Sequelize.STRING,
        notEmpty:{
          arg:true,
          msg:"Ce champ  ne peut être vide"
        }
      },
      password: {
        type: Sequelize.STRING,
        validate:{
          is:/^\d{4}$/,
          notEmpty:{
            arg:true,
            msg:"Ce champ  ne peut être vide"
          }
        }
      },
      pays: {
        type: Sequelize.STRING,
        notEmpty:{
          arg:true,
          msg:"Ce champ  ne peut être vide"
        }
      },
      tels: {
        type: Sequelize.STRING,
        validate:{
          is:/^\d{10}$/,
          notEmpty:{
            arg:true,
            msg:"Ce champ  ne peut être vide"
          },
          unique:true
        }
      },
      dateNaissance: {
        type: Sequelize.STRING,
        notEmpty:{
          arg:true,
          msg:"Ce champ  ne peut être vide"
        }
        
      },
      
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Users');
  }
};