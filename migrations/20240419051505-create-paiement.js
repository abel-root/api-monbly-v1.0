'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Paiements', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      voyageurId: {
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        references: {
          model: 'Users',
          key: 'id',
          as: 'voyageurId',
        }
      },
      type: {
        type: Sequelize.STRING
      },
      montantTotal: {
        type: Sequelize.FLOAT
      },
      reservationId:{
          type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        references: {
          model: 'Reservevation',
          key: 'id',
          as: 'reservationId',
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
    await queryInterface.dropTable('Paiements');
  }
};