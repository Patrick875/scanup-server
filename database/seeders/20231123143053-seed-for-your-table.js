// In a new seed file (e.g., clear-table.js)

"use strict";

module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.bulkDelete("AttendanceLists", null, {});
	},

	down: async (queryInterface, Sequelize) => {
		// Down function is not necessary for this use case
	},
};
