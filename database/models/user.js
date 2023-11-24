"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class User extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
			this.hasMany(models.Attendance, { foreignKey: "userId" });
		}
	}
	User.init(
		{
			firstName: DataTypes.STRING,
			lastName: DataTypes.STRING,
			nationalId: { type: DataTypes.STRING(16), unique: true },
			department: DataTypes.STRING,
			email: { type: DataTypes.STRING, unique: true },
			tel: DataTypes.STRING,
			password: DataTypes.STRING,
			role: { type: DataTypes.STRING, defaultValue: "user" },
		},
		{
			sequelize,
			modelName: "User",
		}
	);
	return User;
};
