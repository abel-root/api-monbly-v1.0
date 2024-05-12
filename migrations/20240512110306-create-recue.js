'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Recues', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      conducteurId: {
        type: Sequelize.INTEGER
      },
      reservationId: {
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        references: {
          model: 'Reservevations',
          key: 'id',
          as: 'reservationId',
        }
      },
      montantHorsTaxe: {
        type: Sequelize.FLOAT
      },
      montantTVA: {
        type: Sequelize.FLOAT
      },
      montantTTC: {
        type: Sequelize.FLOAT
      },
      numeroRecu: {
        type: Sequelize.STRING
      },
      voyageurId:{
        type:Sequelize.INTEGER
      }
      ,
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
    await queryInterface.dropTable('Recues');
  }
};