'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Trajets', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      depart: {
        type: Sequelize.STRING,
        notEmpty: true,
      },
      arrivee: {
        type: Sequelize.STRING,
        notEmpty: true,
      },
      date: {
        type: Sequelize.STRING,
        notEmpty: true,
      },
      heure: {
        type: Sequelize.STRING,
        notEmpty: true,
      },
      montant: {
        type: Sequelize.FLOAT
      },
      distance:{
        type: Sequelize.FLOAT
      },
      userId: {
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        references: {
          model: 'Users',
          key: 'id',
          as: 'userId',
        }
      },
      vehiculeId: {
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        references: {
          model: 'Vehicule',
          key: 'id',
          as: 'vehiculeId',
        }
      },
      place_restantes:{
        type: Sequelize.INTEGER,
      },
      nombre_places:{
        type: Sequelize.INTEGER,
      },
      place_occupees:{
        type: Sequelize.INTEGER,
        defaultValue:0
      },
      createdAt: {
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Trajets');
  }
};