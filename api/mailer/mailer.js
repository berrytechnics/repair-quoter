import nodemailer from 'nodemailer'
import mailerText from 'nodemailer-html-to-text'
import ejs from 'ejs'
import * as EmailValidator from 'email-validator'
import path from 'path'
import { fileURLToPath } from 'url'
import { camelize } from '../helpers.js'
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const lookup = (i) => {
    const table = [
        'Screen Glass',
        'LCD',
        'Battery',
        'Charge Port',
        'Front Camera',
        'Rear Camera',
        'Ear Speaker',
        'Loud Speaker',
        'Rear Glass',
        'Liquid Damage',
    ]
    return table.filter((x) => camelize(x) === i)[0]
}
class Email {
    constructor(to, subject, template, data) {
        this.to = to
        this.subject = subject
        this.template = `${__dirname}/${template}.ejs`
        this.data = data
    }
    async send() {
        let lead = {
            name: this.data.firstName,
            make: this.data.make,
            model: this.data.model,
            issue: lookup(this.data.issue) || this.data.issue,
            price: this.data.price,
        }
        let emailSent = false
        const validation = EmailValidator.validate(this.to)
        if (!validation) throw 'Invalid email address!'
        const transporter = nodemailer.createTransport({
            host: process.env.EMAIL_HOST,
            port: process.env.EMAIL_PORT,
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        })
        transporter.use('compile', mailerText.htmlToText())
        const result = await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: this.to,
            subject: this.subject,
            html: await ejs.renderFile(this.template, lead),
        })
        result.accepted && this.data.price > 0 ? (emailSent = true) : null
        return emailSent
    }
}
export { Email }
