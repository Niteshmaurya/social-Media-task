const User = require("../models/User");
const AdminSchema = require("../models/Admin");

exports.getUser = async (req, res) => {
	try {
		const { username, password } = req.body;

		const admin = await AdminSchema.findOne({ username });

		if (!admin) {
			return res.status(401).json({
				success: false,
				message: "Admin username or password is incorrect",
			});
		}

		const userData = await User.find({});

		res.json({
			success: true,
			data: userData,
		});
	} catch (error) {
		return res.status(500).json({
			success: false,
			message: error.message,
		});
	}
};
