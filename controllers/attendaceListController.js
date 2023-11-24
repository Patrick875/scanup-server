const { Attendance, User, AttendanceList } = require("../database/models");
exports.createList = async (req, res) => {
	const { userId } = req.body;
	if (!userId) {
		return res.status(401).json({
			status: "failed",
			message: "User Id not provided",
		});
	}

	try {
		const user = await User.findOne({ where: { id: userId } });
		if (!user || user.role !== "admin") {
			return res.status(400).json({
				status: "failed",
				message: "Non admin user can't create attendance list",
			});
		} else {
			const nowDate = new Date().toDateString();
			const list = await AttendanceList.create({ date: nowDate });
			console.log({ list });
			return res.status(200).json({
				status: "Success",
				message: "Attendance list created",
				data: { list },
			});
		}
	} catch (error) {
		console.log({ error });
		return res.status(400).json({
			status: "failed",
			message: "error creating attendance list",
		});
	}
};
exports.getLists = async (req, res) => {
	try {
		const lists = await AttendanceList.findAll({
			include: [
				{
					model: Attendance,
					include: [
						{
							model: User,
							attributes: { exclude: ["password", "createdAt", "updatedAt"] },
						},
					],
				},
			],
		});
		return res.status(200).json({
			status: "Success",
			data: lists,
			length: lists.length,
		});
	} catch (error) {
		console.log({ error });
		return res.status(400).json({
			status: "failed",
			message: "Error generating QR code ",
		});
	}
};
exports.getCurrentList = async (req, res) => {
	const nowDate = new Date().toDateString();
	try {
		const list = await AttendanceList.findOne({
			where: { date: nowDate },
			include: [
				{
					model: Attendance,
					include: [
						{
							model: User,
							attributes: { exclude: ["password", "createdAt", "updatedAt"] },
						},
					],
				},
			],
		});
		if (!list) {
			return res.status(200).json({
				status: "Success",
				message: "Current attendance not available",
				data: null,
			});
		}

		return res.status(200).json({
			status: "Success",
			message: "Current attendance retrieved",
			data: list,
		});
	} catch (error) {
		console.log(error);
	}
};

exports.getList = async (req, res) => {
	const { listId } = req.params;
	console.log(req.params);
	console.log(listId);
	if (!listId) {
		return res.status(400).json({
			status: "Error",
			message: "list id is required",
			data: null,
		});
	}
	try {
		const list = await AttendanceList.findOne({
			where: { id: listId },
			include: [
				{
					model: Attendance,
					include: [
						{
							model: User,
							attributes: { exclude: ["password", "createdAt", "updatedAt"] },
						},
					],
				},
			],
		});
		if (!list) {
			return res.status(404).json({
				status: "failed",
				message: "List not found",
				data: null,
			});
		}

		return res.status(200).json({
			status: "Success",
			message: "Current attendance retrieved",
			data: list,
		});
	} catch (error) {
		console.log(error);
	}
};
