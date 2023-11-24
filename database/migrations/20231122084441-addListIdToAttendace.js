"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.addColumn("Attendances", "listId", {
			type: Sequelize.INTEGER,
			allowNull: false,
		});
	},
	down: async (queryInterface, Sequelize) => {
		await queryInterface.removeColumn("Attendances", "listId");
	},
};
