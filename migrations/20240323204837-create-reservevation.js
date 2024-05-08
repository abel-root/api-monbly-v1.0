'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Reservevations', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userId: {
        type: Sequelize.INTEGER,
        notEmpty:true,
        onDelete: 'CASCADE',
        references: {
          model: 'Users',
          key: 'id',
          as: 'voyageur_id',
        }
      },
      trajet_id: {
        type: Sequelize.INTEGER,
        notEmpty: true,
        onDelete: 'CASCADE',
        references: {
          model: 'Trajets',
          key: 'id',
          as: 'trajet_id',
        }
      },
      nombresPlace: {
        type: Sequelize.INTEGER,
        notEmpty: true,
      },
      statut: {
        type: Sequelize.ENUM("en_attente", "acceptee", "refusee")
      },
      redirection: {
        type: Sequelize.ENUM("paiement", "liste_vehicules")
      },
      montantTotal:{
        type : Sequelize.FLOAT,
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
    await queryInterface.dropTable('Reservevations');
  }
};