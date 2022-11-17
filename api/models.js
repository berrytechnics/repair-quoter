import mongoose, { Mongoose } from "mongoose"
const leadSchema = new mongoose.Schema({
	firstName: String,
	lastName: String,
	location: String,
	email: String,
	phone: String,
	make: String,
	model: String,
	issue: String,
	price: Number,
	respondedDate: Date,
	convertedDate: Date,
	convertedUser: {
		type: String,
		default: "",
	},
	respondedUser: {
		type: String,
		default: "",
	},
	date: {
		type: Date,
		default: new Date().toISOString(),
	},
	modified: {
		type: Date,
		default: new Date().toISOString(),
	},
	emailed: {
		type: Boolean,
		default: false,
	},
	responded: {
		type: Boolean,
		default: false,
	},
	converted: {
		type: Boolean,
		default: false,
	},
	duplicate: {
		type: Boolean,
		default: false,
	},
	hidden: {
		type: Boolean,
		default: false,
	},
})
const pricelistSchema = new Mongoose.Schema({
	make: String,
	model: String,
	repairs: {
		rearGlass: {
			type: Number,
			default: 0.0,
		},
		battery: {
			type: Number,
			default: 0.0,
		},
		frontCamera: {
			type: Number,
			default: 0.0,
		},
		rearCamera: {
			type: Number,
			default: 0.0,
		},
		chargePort: {
			type: Number,
			default: 0.0,
		},
		earSpeaker: {
			type: Number,
			default: 0.0,
		},
		lcd: {
			type: Number,
			default: 0.0,
		},
		screen: {
			type: Number,
			default: 0.0,
		},
		loudSpeaker: {
			type: Number,
			default: 0.0,
		},
		liquidDamage: {
			type: Number,
			default: 0.0,
		},
	},
})
const Leads = mongoose.model("Leads", leadSchema)
const Pricelist = mongoose.model("Pricelist", pricelistSchema)
export { Leads, Pricelist }
