import C from './constants.js'
import { Email } from './mailer/mailer.js'
import { LeadEntry, Pricelist } from './models.js'
const camelize = (str) => {
    let string = str
        .replace(/(?:^\w|[A-Z]|\b\w)/g, function (word, index) {
            return index === 0 ? word.toLowerCase() : word.toUpperCase()
        })
        .replace(/\s+/g, '')
    string === 'lCD' ? (string = 'lcd') : null
    return string.charAt(0).toLowerCase() + string.slice(1)
}
export const Leads = {
    getLead: async (id = false) => {
        let leads
        !id
            ? (leads = await LeadEntry.find({hidden:false}))
            : (leads = await LeadEntry.findById(id))
        return leads
    },
    updateLead: async (lead) => {
        const updatedLead = await LeadEntry.findByIdAndUpdate(lead._id,lead,{new:true})
        await updatedLead.save()
        return updatedLead
    },
    newLead: async (
        firstname,
        lastname,
        location,
        email,
        phone,
        make,
        model,
        issue
    ) => {
        //create lead from model...
        const lead = new LeadEntry({
            location: location,
            firstName: firstname,
            lastName: lastname,
            phone: phone,
            email: email,
            make: make,
            model: model,
            issue: issue,
            price: 0,
            hidden:false
        })
        // get quote price...
        const prices = await Pricelist.findOne({ model: lead.model })
        prices ? lead.price = prices.repairs[camelize(lead.issue)] || 0 : 0
        //check for duplicate lead
        let duplicates = await LeadEntry.find({email:email,model:model,issue:issue,price:lead.price})
        duplicates.length>0 ? lead.hidden=true:lead.hidden=false
        // save to database & send email...
        const message = new Email(
            email,
            `Your ${C.brand} Repair Quote is Here!`,
            lead.price > 0 ? 'quote' : 'noQuote',
            lead
        )
        const emailResult = await message.send()
        lead.emailed = emailResult
        await lead.save()
        return lead
    },
    removeLead: async (id) => {
        await LeadEntry.findByIdAndRemove(id)
        return false
    },
}
export const Devices = {
    getDevice: async (id = false) => {
        let devices
        !id
            ? (devices = await Pricelist.find({}))
            : (devices = await Pricelist.findById(id))
        if (devices.length > 1) {
            devices.forEach((device) => {
                for (let i = 0; i < device.repairs.length; i++) {
                    device.repairs[i] = 0.0
                }
            })
        } else if(devices.repairs) {
            for (let i = 0; i < devices.repairs.length; i++) {
                devices.repairs[i] = 0.0
            }
        }
        else return false
        return devices
    },
    newDevice: async (type, make, model) => {
        if(!type||!make||!model) throw 'Missing device information!'
        const device = new Pricelist({
            type: type,
            make: make,
            model: model,
        })
        await device.save()
        return device
    },
    updateDevice: async (lead) => {
        const device = await Pricelist.findByIdAndUpdate(lead._id,lead,{new:true})
        await device.save()
        return device
    },
    removeDevice: async (id) => {
        await Pricelist.findByIdAndRemove(id)
        return false
    },
}
