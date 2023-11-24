const { Attendance, User, AttendanceList } = require("../database/models");
const qr = require("qrcode");
exports.create = async (req, res) => {
	const { userId } = req.body;
	if (!userId) {
		return res.status(401).json({
			status: "failed",
			message: "User Id not provided",
		});
	}
	const time = new Date().toISOString();

	try {
		const nowDate = new Date().toDateString();

		let attendanceList = await AttendanceList.findOne({
			where: { date: nowDate },
		});

		console.log({ attendanceList });
		if (!attendanceList) {
			attendanceList = await AttendanceList.create({ date: nowDate });
			console.log({ attendanceList });
		}

		await Attendance.create({ userId, time, listId: attendanceList.id });

		return res.status(201).json({
			status: "success",
			message: "attendance registered",
		});
	} catch (error) {
		console.log({ error });
		return res.status(400).json({
			status: "failed",
			message: "error registering attendance",
		});
	}
};
exports.generateQr = async (req, res) => {
	const { userId } = req.body;
	try {
		const user = await User.findOne({ where: { id: userId } });
		if (!user || user.role !== "admin") {
			return res.status(400).json({
				status: "failed",
				message: "Non admin user can't generate QR",
			});
		} else {
			qr.toDataURL(process.env.QR_CONTENT_LINK, function (err, code) {
				if (err) return console.log({ err });
				return res.status(200).json({
					status: "Success",
					message: "QR code generated",
					data: { qr: code },
				});
			});
		}
	} catch (error) {
		console.log({ error });
		return res.status(400).json({
			status: "failed",
			message: "Error generating QR code ",
		});
	}
};
