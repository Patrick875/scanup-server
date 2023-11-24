"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class AttendanceList extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
			this.hasMany(models.Attendance, { foreignKey: "listId" });
		}
	}
	AttendanceList.init(
		{
			date: DataTypes.STRING,
		},
		{
			sequelize,
			modelName: "AttendanceList",
			timestamps: true,
		}
	);
	return AttendanceList;
};
