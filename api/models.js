import mongoose from 'mongoose'
import mongoosePaginate from 'mongoose-paginate-v2'
import passportLocalMongoose from 'passport-local-mongoose'

const leadSchema = new mongoose.Schema({
    firstName: {
        type: String,
        immutable: true,
    },
    lastName: {
        type: String,
        immutable: true,
    },
    location: {
        type: String,
        immutable: true,
    },
    email: {
        type: String,
        immutable: true,
    },
    phone: {
        type: String,
        immutable: true,
    },
    make: {
        type: String,
        immutable: true,
    },
    model: {
        type: String,
        immutable: true,
    },
    issue: {
        type: String,
        immutable: true,
    },
    price: Number,
    respondedDate: Date,
    convertedDate: Date,
    convertedUser: {
        type: String,
        default: '',
    },
    respondedUser: {
        type: String,
        default: '',
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
    hidden: {
        type: Boolean,
        default: false,
    },
})
leadSchema.plugin(mongoosePaginate)
const leadModel = mongoose.model('Leads', leadSchema)
export const LeadEntry = leadModel

const pricelistSchema = new mongoose.Schema({
    type: String,
    make: String,
    model: String,
    fusedDisplay: {
        type: Boolean,
        default: false,
    },
    repairs: {
        screenGlass: {
            type: Number,
            default: 0.0,
        },
        lcd: {
            type: Number,
            default: 0.0,
        },
        battery: {
            type: Number,
            default: 0.0,
        },
        chargePort: {
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
        earSpeaker: {
            type: Number,
            default: 0.0,
        },
        loudSpeaker: {
            type: Number,
            default: 0.0,
        },
        rearGlass: {
            type: Number,
            default: 0.0,
        },
        liquidDamage: {
            type: Number,
            default: 0.0,
        },
    },
})
pricelistSchema.plugin(mongoosePaginate)
const priceModel = mongoose.model('Pricelist', pricelistSchema)
export const Pricelist = priceModel

const userSchema = new mongoose.Schema({})
userSchema.plugin(passportLocalMongoose)
const userModel = mongoose.model('User',userSchema)
export const UserEntry = userModel
