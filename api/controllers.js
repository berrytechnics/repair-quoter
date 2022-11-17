import nodemailer from "nodemailer"
import { Email } from './mailer.js'
const camelize = str => {
	let string = str
		.replace(/(?:^\w|[A-Z]|\b\w)/g, function (word, index) {
			return index === 0 ? word.toLowerCase() : word.toUpperCase()
		})
		.replace(/\s+/g, "")
	return string.charAt(0).toLowerCase() + string.slice(1)
}
class leadController{
	submit(){}
	update(){}
	_handleError(err){
		console.log(err)
	}
}
class priceListController{
	create(){}
	update(){}
	_handleError(err){
		console.log(err)
	}
}
export { leadController,priceListController }
