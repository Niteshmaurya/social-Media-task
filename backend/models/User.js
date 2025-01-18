const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	socialId: {
		type: String,
		required: true,
		unique: true,
	},
	images: {
		type: [String],
	},
});

module.exports = mongoose.model("User", userSchema);
