const mongoose = require("mongoose");

const dogsSchema = new mongoose.Schema(
	{
		name: String,
		age: String,
		description: String,
		gender: String,
		color: String,
		price: String,
		website: String,
		isVaccinated: {
			type: Boolean,
			default: false,
		},
	},
	{ timestamps: true }
)

const Dogs = mongoose.model("Dogs", dogsSchema);

module.exports = Dogs;