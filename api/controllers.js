import C from './constants.js'
import { Email } from './mailer/mailer.js'
import {LeadEntry,Pricelist} from './models.js'
const camelize = str => {
	let string = str
		.replace(/(?:^\w|[A-Z]|\b\w)/g, function (word, index) {
			return index === 0 ? word.toLowerCase() : word.toUpperCase()
		})
		.replace(/\s+/g, "")
	string === "lCD" ? string = "lcd" : null
	return string.charAt(0).toLowerCase() + string.slice(1)
}
export const Leads = {
	getLead: async (id=null) => {
		let leads
		id===null ? leads = await LeadEntry.find({}) : leads = await LeadEntry.find({id:id})
		return leads
	},
	updateLead: async (id,updates) => {
		const lead = await LeadEntry.findById(id)
		updates.forEach(update=>{
			lead[update.field] = update.content
		})
		try{
			await lead.save()
			return lead
		}
		catch(err){
			console.log(err)
			throw new Error(err)
		}
	},
	newLead: async (firstname,lastname,location,email,phone,make,model,issue) => {
		//create lead from model...
		const lead = new LeadEntry({
			location:location,
			firstName:firstname,
			lastName:lastname,
			phone:phone,
			email:email,
			make:make,
			model:model,
			issue:issue,
		})
		// get quote price...
		const prices = await Pricelist.find({model:lead.model})
		lead.price = prices[camelize(lead.issue)]||0
		// save to database & send email...
		try{
			const message = new Email(
				email,
				`Your ${C.brand} Repair Quote is Here!`,
				'quote',
				lead
			)
			const emailResult = await message.send()
			emailResult.accepted.length > 0 ? lead.emailed = true : null
			await lead.save()
			return lead
		}
		// handle errors...
		catch(e){
			console.log(e)
			throw new Error(e)
		}
	},
	removeLead: async (id) => {
		try{
			await LeadEntry.findByIdAndRemove(id)
			return false
		}
		catch(err){
			console.log(err)
			throw new Error(err)
		}
	},
}
export const Devices = {
	getDevice: async (id=null) => {
		let devices;
		id===null ? devices = await Pricelist.find({}) : devices = await Pricelist.find({id:id})
		devices.forEach(device=>{
			for(let i=0;i<device.repairs.length;i++){
				device.repairs[i] = 0.00
			}
		})
		return devices
	},
	newDevice: async (type,make,model) => {
		const device = new Pricelist({
			type:type,
			make:make,
			model:model
		})
		try{
			await device.save()
			return device
		}
		catch(err){
			console.log(err)
			throw new Error(err)
		}
	},
	updateDevice: async (id,updates) => {
		const device = await Pricelist.findById(id)
		updates.forEach(update=>{
			device[update.repair] = update.price
		})
		try{
			await device.save()
			return device
		}
		catch(err){
			console.log(err)
			throw new Error(err)
		}
	},
	removeDevice: async (id) => {
		try{
			await Pricelist.findByIdAndRemove(id)
			return false
		}
		catch(err){
			console.log(err)
			throw new Error(err)
		}
	},
}