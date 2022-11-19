import nodemailer from "nodemailer"
import ejs from 'ejs'
import path from 'path'
import { fileURLToPath } from "url"
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
class Email {
	constructor(to, subject, template, data) {
		this.to = to
		this.subject = subject 
		this.template = `${__dirname}/${template}.ejs`
		this.data = data
	}
	async send() {
		const transporter = nodemailer.createTransport({
			host: process.env.EMAIL_HOST,
			port: process.env.EMAIL_PORT,
			auth: {
				user: process.env.EMAIL_USER,
				pass: process.env.EMAIL_PASS,
			},
		})
		const options = {
			from: process.env.EMAIL_USER,
			to: this.to,
			subject: this.subject,
			html: await ejs.renderFile(this.template,{data:this.data}),
		}
		try{
			const result = await transporter.sendMail(options)
			return result
		}
		catch(err){
			this._handleError(err)
		}
		
	}
	_handleError(err) {
		return err
	}
}
export { Email }
