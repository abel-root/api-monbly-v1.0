'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Vehicules', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
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
      modele: {
        type: Sequelize.STRING,
        notEmpty: true,
      },
      immatriculation: {
        type: Sequelize.STRING,
        notEmpty: true,
        unique:true
      },
      nb_places: {
        type: Sequelize.INTEGER,
        notEmpty: true,
      },
      image: {
        type: Sequelize.STRING,
        notEmpty: true,
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
    await queryInterface.dropTable('Vehicules');
  }
};