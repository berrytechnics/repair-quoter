import nodemailer from "nodemailer"
import path from 'path'
import { fileURLToPath } from "url"
import ejs from 'ejs'
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
class Email {
	constructor(to, subject, template, data) {
		this.to = to
		this.subject = subject 
		this.template = `${__dirname}/templates/${template}.ejs`
		this.data = data
	}
	async send() {
		let transporter = nodemailer.createTransport({
			host: process.env.EMAIL_HOST,
			port: process.env.EMAIL_PORT,
			auth: {
				user: process.env.EMAIL_USER,
				pass: process.env.EMAIL_PASS,
			},
		})
		transporter.sendMail(
			{
				from: process.env.EMAIL_USER,
				to: this.to,
				subject: this.subject,
				html: await ejs.renderFile(this.template),
			},
			(err, info) => {
				err ? this._handleError(err) : info
			}
		)
	}
	_handleError(err) {
		console.log(err)
	}
}
export { Email }
