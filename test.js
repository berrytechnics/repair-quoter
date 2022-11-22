import { Leads, Devices } from './api/controllers.js'
import {Pricelist,LeadEntry} from './api/models.js'
import 'dotenv/config'
import chalk from 'chalk'
import mongoose from 'mongoose'
export default async function test(){
    mongoose.connect(process.env.MONGO_URI)
    try{
        const device = await Devices.newDevice('phone','Apple','iPhone X')
        const prices = await Devices.updateDevice(device._id,[
            'chargePort',69.99,
            'frontCamera',89.99,
            'battery',54.99,
            'lcd',109.99,
            'rearCamera',119.99,
            'earSpeaker',49.99,
            'loudSpeaker',69.99,
            'rearGlass',149.99
        ])
        console.log(prices)
        const lead = await Leads.newLead(
            'Testy','McTesterson','Test',
            process.env.TESTEMAIL,'918',
            'Apple','iPhone X','rearGlass'
        )
        console.log(lead)
        await Pricelist.deleteMany({nonsense:false})
        await LeadEntry.deleteMany({nonsense:false})
    }
    catch(e){
        await Pricelist.deleteMany({nonsense:false})
        await LeadEntry.deleteMany({nonsense:false})
        console.log(e)
    }
    mongoose.connection.close()
    process.exit(0)
}test()