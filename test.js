import { Leads, Devices } from './api/controllers.js'
import 'dotenv/config'
import mongoose from 'mongoose'
async function run() {
    mongoose.connect(process.env.MONGO_URI)
    const db = mongoose.connection
    db.on('error', console.error.bind(console, 'Database connection error:'))
    db.once('open', () => console.log('API Database connected!'))
    try {
        console.log('Running Tests...')
        // Devices
        let updates = [{ field: 'battery', content: 99.99 }]
        const device = await Devices.newDevice(
            "phone",
            "Apple",
            "iPhone X"
        )
        const foundDevice = await Devices.getDevice(device._id)
        await Devices.updateDevice(foundDevice._id,updates)        
        // Leads
        updates = [{ field: 'firstName', content: 'TestyTwo' }]
        await Leads.getLead()
        const lead = await Leads.newLead(
            'Testy',
            'McTesterson',
            '71st',
            'kyle@thephonedoctors.com',
            9180000000,
            'Apple',
            'iPhone X',
            'battery'
        )
        const foundLead = await Leads.getLead(lead._id)
        await Leads.updateLead(foundLead._id, updates)
        await Leads.removeLead(lead._id)
        // Cleanup and close connection
        await Devices.removeDevice(foundDevice._id)
        mongoose.connection.close()
        return console.log('All Tests Passed!')
    } catch (err) {
        mongoose.connection.close()
        return console.log(err)
    }
}
run()
