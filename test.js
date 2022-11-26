import { Pricelist,LeadEntry } from './api/models.js'
import {Leads,Devices} from './api/controllers.js'
import 'dotenv/config'
import chalk from 'chalk'
import mongoose from 'mongoose'

const wipeDB = async()=>{
    await Pricelist.deleteMany({wanttokeep:false})
    await LeadEntry.deleteMany({wanttokeep:false})
}
const testPaginate = async()=>{
    await Devices.newDevice('phone','Apple','iPhone X')
    await Devices.newDevice('phone','Apple','iPhone 11')
    await Leads.newLead(
        'Test','Test','71st',
        'test@email.com','0000000000',
        'Apple','iPhone X','battery'
    )
    await Leads.newLead(
        'Test','Test','71st',
        'test@email.com','0000000000',
        'Apple','iPhone 11','battery'
    )
    return [
        await Devices.getDevice(),
        await Leads.getLead()
    ]
}
const createDevice = async()=>{
    const device = await Devices.newDevice('phone','Apple','iPhone X')
    device.repairs.battery = 59.99
    return await Devices.updateDevice(device)
}
const createLead = async()=>{
    return await Leads.newLead(
        'Test','Test','71st',
        'test@email.com','0000000000',
        'Apple','iPhone X','battery'
    )
}
const cleanup = async(lead,device)=>{
    await Leads.removeLead(lead._id)
    await Devices.removeDevice(device._id)
    return false
}

async function run(){
    try{
        mongoose.connect(process.env.MONGO_URI)
        console.log(chalk.cyan('Wiping DB entries...'))
        await wipeDB()
        console.log(chalk.cyan('Generating device...'))
        const device = await createDevice()
        console.log(chalk.cyan('Generating lead...'))
        const lead = await createLead()
        const result = [
            await Leads.getLead(false,'pageless'),
            await Devices.getDevice(false,'pageless'),
        ]
        result.forEach(res=>res.docs[0] = JSON.stringify(res.docs[0]))
        console.log(chalk.cyan('Cleaning up...'))
        await cleanup(lead,device)
        console.log(chalk.green('RESULTS:'))
        console.log(result)
        await mongoose.connection.close()
        process.exit(0)
    } catch(err) {
        console.log(chalk.red(err))
        await mongoose.connection.close()
        process.exit(1)
    }
}
run()


