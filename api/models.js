import mongoose from 'mongoose'
import mongoosePaginate from 'mongoose-paginate-v2'
import schedule from 'node-schedule'
mongoose.connect(process.env.MONGO_URI)
const db = mongoose.connection
db.on('error', () => {
    console.log('Database connection error...')
    process.exit(1)
})
db.once('open', () => console.log('API Database connected...'))

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
    username: {
        type: String,
        unique: true,
        required: true,
        lowercase: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
    },
    verified: {
        type: Boolean,
        default: false,
    },
})
userSchema.plugin(mongoosePaginate)
export const User = mongoose.model('User', userSchema)

// Scrub users who have not verified in 1-hour, check every hour
schedule.scheduleJob('00 * * * *',async()=>{
    let list = []
    let users = await User.find({verified:false})
    users.forEach(user=>{
        let date = user._id.getTimestamp().toISOString()
        if(date<new Date(Date.now()-(1000*60*60)).toISOString()){ // 1-hour
            list.push(user._id)
        }
    })
    list.forEach(async(userId)=>{await User.findByIdAndDelete(userId)})
    console.log('Unverified users scrubbed: ',list.length)
})