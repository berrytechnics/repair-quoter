import mongoose from 'mongoose'
import mongoosePaginate from 'mongoose-paginate-v2'

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
export const LeadEntry = mongoose.model('Leads', leadSchema)

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
export const Pricelist = mongoose.model('Pricelist', pricelistSchema)

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        unique:true,
        required:true,
        lowercase:true,
        trim:true
    },
    password:{
        type:String,
        required:true
    }
})
userSchema.plugin(mongoosePaginate)
export const User = mongoose.model('User',userSchema)