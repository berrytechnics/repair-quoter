import nodemailer from 'nodemailer'
import mailerText from 'nodemailer-html-to-text'
import ejs from 'ejs'
import * as EmailValidator from 'email-validator'
import path from 'path'
import { fileURLToPath } from 'url'
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
        const options = {
            from: process.env.EMAIL_USER,
            to: this.to,
            subject: this.subject,
            html: await ejs.renderFile(this.template, this.data),
        }
        const result = await transporter.sendMail(options)
        result.accepted && this.data.price > 0 ? (emailSent = true) : null
        return emailSent
    }
}
export { Email }
